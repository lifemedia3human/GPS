#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <AltSoftSerial.h>

#define rxPin 2
#define txPin 3
SoftwareSerial sim800L(rxPin, txPin);

// GPS Module RX pin to Arduino 9
// GPS Module TX pin to Arduino 8
AltSoftSerial neogps;

TinyGPSPlus gps;

unsigned long previousMillis = 0;
const long interval = 10000;
const String device = "Device2"; // Define your device name here


void setup() {
  // Begin serial communication with Arduino and Arduino IDE (Serial Monitor)
  Serial.begin(115200);

  // Begin serial communication with Arduino and SIM800L
  sim800L.begin(9600);

  // Begin serial communication with Arduino and GPS module
  neogps.begin(9600);

  Serial.println(F("Initializing..."));

  // Initialize SIM800L module
  if (sendATcommand("AT", "OK", 2000) == 1) {
    Serial.println(F("SIM800L initialized"));
  } else {
    Serial.println(F("SIM800L initialization failed"));
  }

  if (sendATcommand("AT+CMGF=1", "OK", 2000) == 1) {
    Serial.println(F("SIM800L set to text mode"));
  } else {
    Serial.println(F("Failed to set SIM800L to text mode"));
  }
}

void loop() {
  while (sim800L.available()) {
    Serial.println(sim800L.readString());
  }
  while (Serial.available()) {
    sim800L.println(Serial.readString());
  }

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;
    sendGpsToServer();
  }
}

void sendGpsToServer() {
  // Can take up to 60 seconds
  boolean newData = false;
  for (unsigned long start = millis(); millis() - start < 2000;) {
    while (neogps.available()) {
      if (gps.encode(neogps.read())) {
        newData = true;
        break;
      }
    }
  }

  // If newData is true
  if (newData) {
    String latitude = String(gps.location.lat(), 6);
    String longitude = String(gps.location.lng(), 6);

    Serial.print(F("Latitude= "));
    Serial.print(latitude);
    Serial.print(F(" Longitude= "));
    Serial.println(longitude);
    
    // Create URL with device parameter
    String url = "http://202.169.224.10/mapsv/gpsdata.php?lat=";
    url += latitude;
    url += "&lng=";
    url += longitude;
    url += "&device=";
    url += device;

    Serial.println(url);
    delay(300);

    sendATcommand("AT+CFUN=1", "OK", 2000);
    sendATcommand("AT+CGATT=1", "OK", 2000);
    sendATcommand("AT+SAPBR=3,1,\"Contype\",\"GPRS\"", "OK", 2000);
    sendATcommand("AT+SAPBR=3,1,\"APN\",\"internet\"", "OK", 2000);
    sendATcommand("AT+SAPBR=1,1", "OK", 2000);
    sendATcommand("AT+HTTPINIT", "OK", 2000);
    sendATcommand("AT+HTTPPARA=\"CID\",1", "OK", 1000);
    
    sim800L.print(F("AT+HTTPPARA=\"URL\",\""));
    sim800L.print(url);
    sim800L.println("\"");

    if (sendATcommand("", "OK", 1000) == 1) {
      sendATcommand("AT+HTTPACTION=0", "0,200", 10000);  // Increased timeout for HTTP action
    } else {
      Serial.println(F("Failed to set URL"));
    }
    
    sendATcommand("AT+HTTPTERM", "OK", 1000);
    sendATcommand("AT+CIPSHUT", "SHUT OK", 1000);
  }
}

int8_t sendATcommand(const char* ATcommand, const char* expected_answer, unsigned int timeout) {
  uint8_t x = 0, answer = 0;
  char response[100];
  unsigned long previous;

  // Initialize the string
  memset(response, '\0', 100);
  delay(100);

  // Clean the input buffer
  while (sim800L.available() > 0) sim800L.read();

  if (ATcommand[0] != '\0') {
    // Send the AT command
    sim800L.println(ATcommand);
  }

  x = 0;
  previous = millis();

  // This loop waits for the answer with a timeout
  do {
    if (sim800L.available() != 0) {
      response[x] = sim800L.read();
      x++;
      // Check if the desired answer is in the response of the module
      if (strstr(response, expected_answer) != NULL) {
        answer = 1;
      }
    }
  } while ((answer == 0) && ((millis() - previous) < timeout));

  Serial.println(response);
  return answer;
}