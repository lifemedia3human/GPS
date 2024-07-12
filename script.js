var map;
var markers = [];
var polylines = [];
var deviceColors = {
    'Device1': '#FF0000',       // Merah
    'Device2': '#00FF00',       // Hijau
    'Device3': '#0000FF',       // Biru
    'Device4': '#FFFF00',       // Kuning
    'Device5': '#FF00FF',       // Magenta
    'Device6': '#00FFFF',       // Biru Muda
    'Device7': '#C0C0C0',       // Abu-abu
    'Device8': '#FFA500',       // Jingga
    'Device9': '#A52A2A',       // Coklat Muda
    'Device10': '#8A2BE2',      // Biru Keunguan
    'Device11': '#FFA500'       // Oranye
};
var infoWindow;

function initMap() {
    var mapLayer = document.getElementById("map-layer");
    var centerCoordinates = new google.maps.LatLng(-7.801339354845236, 110.36475671548371);
    var defaultOptions = { center: centerCoordinates, zoom: 10 };

    map = new google.maps.Map(mapLayer, defaultOptions);
    loadDevices();
    infoWindow = new google.maps.InfoWindow();  // Initialize the info window
}

function loadDevices() {
    $.get('get_devices.php', function(data) {
        var devices = JSON.parse(data);
        var deviceSelect = document.getElementById("device-select");
        devices.forEach(function(device) {
            var option = document.createElement("option");
            option.value = device.device;
            option.text = device.device;
            deviceSelect.appendChild(option);
        });

        // Update device list colors
        updateDeviceListColors(devices);
    });
}

function updateDeviceListColors(devices) {
    var dataList = document.getElementById("data-list");
    dataList.innerHTML = ""; // Clear existing list

    devices.forEach(function(device) {
        var listItem = document.createElement("li");

        var colorBlock = document.createElement("span");
        colorBlock.className = "device-color";
        colorBlock.style.backgroundColor = deviceColors[device.device];
        listItem.appendChild(colorBlock);

        var listItemText = document.createElement("span");
        listItemText.textContent = `Device: ${device.device}`;
        listItem.appendChild(listItemText);

        dataList.appendChild(listItem);
    });
}

function loadData() {
    var device = document.getElementById("device-select").value;
    var date = document.getElementById("date-input").value;
    if (!date) {
        alert("Please select a date");
        return;
    }

    $.get('get_data.php', { device: device, date: date }, function(data) {
        var gpsData = JSON.parse(data);
        clearMap();

        var devicePaths = {}; // Object to store paths for each device separately

        gpsData.forEach(function(point) {
            var location = new google.maps.LatLng(point.lat, point.lng);

            // Skip points with coordinates (0, 0)
            if (point.lat == 0 && point.lng == 0) {
                return;
            }

            if (!devicePaths[point.device]) {
                devicePaths[point.device] = [];
            }

            devicePaths[point.device].push(location);

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: `Device: ${point.device}, Date: ${point.date}`,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 6,
                    strokeColor: '#FFF',
                    strokeWeight: 2,
                    fillColor: deviceColors[point.device],
                    fillOpacity: 1
                }
            });

            // Add click event listener to marker for info window
            marker.addListener('click', function() {
                var content = `<strong>Device: ${point.device}</strong><br>Lat: ${point.lat}, Lng: ${point.lng}<br>Date: ${point.date}`;
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });

            markers.push(marker);
            addDataToList(point);
        });

        // Draw polylines for each device
        for (var device in devicePaths) {
            var path = new google.maps.Polyline({
                path: devicePaths[device],
                geodesic: true,
                strokeColor: deviceColors[device], // Use color of each device
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            path.setMap(map);
            polylines.push(path);
        }
    });
}

function clearMap() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    polylines.forEach(polyline => polyline.setMap(null));
    polylines = [];
    document.getElementById("data-list").innerHTML = "";
}

function addDataToList(point) {
    var dataList = document.getElementById("data-list");
    var listItem = document.createElement("li");

    var colorBlock = document.createElement("span");
    colorBlock.className = "device-color";
    colorBlock.style.backgroundColor = deviceColors[point.device];
    listItem.appendChild(colorBlock);

    var listItemText = document.createElement("span");
    listItemText.textContent = `Device: ${point.device}, Lat: ${point.lat}, Lng: ${point.lng}, Date: ${point.date}`;
    listItem.appendChild(listItemText);

    dataList.appendChild(listItem);
}
