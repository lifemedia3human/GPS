<?php 

require 'config.php';

$lat = $_GET['lat'];
$lng = $_GET['lng'];
$device = $_GET['device']; // Capture the device from the URL parameters

echo $lat;
echo "<br>";
echo $lng;
echo "<br>";
echo $device; // Print the device information

$sql = "INSERT INTO tbl_gps(device, lat, lng, date) 
        VALUES('".$device."','".$lat."','".$lng."','".date("Y-m-d H:i:s")."')";

if($db->query($sql) === FALSE) {
    echo "Error: " . $sql . "<br>" . $db->error;
}

echo "<br>";
echo $db->insert_id;

?>
<!-- gpsdata.php?lat=-7.801339&lng=110.364757&device=Device1 -->




