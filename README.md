GPS Tracking Application
Overview
This GPS Tracking Application provides a complete solution for tracking multiple devices using GPS coordinates and displaying them on a Google Map. The application includes a frontend interface, backend PHP scripts for handling data requests, a database for storing GPS data, and an Arduino sketch for collecting GPS data from a GPS module and sending it to the server.

Project Structure
Frontend

index.php: The main HTML file that includes the map and control elements.
style.css: The stylesheet for styling the HTML elements.
script.js: JavaScript file that handles the map initialization, data fetching, and display logic.
Backend

config.php: Configuration file for database connection.
get_device.php: PHP script to fetch distinct devices from the database.
get_data.php: PHP script to fetch GPS data based on selected device and date.
Database

gps_coba.sql: SQL file to create the database table and insert sample data.
Arduino

arduino_gps.ino: Arduino sketch to collect GPS data from a GPS module and send it to the server using a SIM800L module.
Detailed Description
Frontend
index.php

Fetches all data from the tbl_gps table on load.
Includes HTML structure for displaying the map, controls for selecting device and date, and a list for displaying data.
Uses Google Maps JavaScript API to display GPS points on the map.
Includes scripts to fetch device list and GPS data from the server.
style.css

Provides basic styling for the HTML elements.
Styles the map container, controls, and data list for a clean layout.
script.js

Initializes the Google Map with default settings.
Fetches the list of devices and updates the device selection dropdown.
Fetches and displays GPS data based on selected device and date.
Updates the map with markers and polylines for each device's path.
Includes functions for clearing the map and updating the data list.
Backend
config.php

Defines database connection parameters and connects to the database.
Sets the default timezone.
get_device.php

Queries the database for distinct devices and returns the result as JSON.
get_data.php

Fetches GPS data from the database based on selected device and date.
Returns the result as JSON.
Database
gps_coba.sql
SQL script to create the tbl_gps table.
Sample data for testing.
Arduino
arduino_gps.ino
Collects GPS data using the TinyGPS++ library.
Sends GPS data to the server every 10 seconds using the SIM800L module.
Includes functions for initializing the SIM800L module and sending HTTP requests.
Installation and Setup
Database Setup

Import the gps_coba.sql file into your MySQL database to create the tbl_gps table and insert sample data.
Backend Setup

Update the database connection parameters in config.php to match your database configuration.
Upload the PHP files to your web server.
Frontend Setup

Update the Google Maps API key in index.php.
Ensure the frontend files (index.php, style.css, script.js) are accessible on your web server.
Arduino Setup

Connect the GPS module and SIM800L module to the Arduino as per the pin configurations.
Update the device name in arduino_gps.ino.
Upload the sketch to the Arduino.
Usage
Open the index.php file in a web browser.
Select a device and date from the controls and click "Load Data" to display the GPS data on the map.
The map will display markers for each GPS point and draw a polyline connecting them.
The data list below the map will show the details of each GPS point.
License
This project is open-source and available under the MIT License.

Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

Acknowledgments
Google Maps JavaScript API
TinyGPS++ Library
SIM800L Module Documentation
This project is designed to provide a comprehensive and customizable solution for GPS tracking using readily available hardware and web technologies.
