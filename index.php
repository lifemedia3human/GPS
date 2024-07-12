<?php
require 'config.php';

$sql = "SELECT * FROM tbl_gps WHERE 1";
$result = $db->query($sql);
if (!$result) {
    echo "Error: " . $sql . "<br>" . $db->error;
    exit();
}

$rows = $result->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <title>GPS</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>GPS</h1>
        </header>
        <div class="controls">
            <label for="device-select">Select Device:</label>
            <select id="device-select">
                <option value="all">All Devices</option>
            </select>
            <label for="date-input">Select Date:</label>
            <input type="date" id="date-input">
            <button onclick="loadData()">Load Data</button>
        </div>
        <div id="map-layer"></div>
        <ul id="data-list"></ul>
    </div>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBdmK4pYC3ifhG8z-gqSci2MC7iqSnONQ0&callback=initMap" async defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
