<?php
require 'config.php';

$device = $_GET['device'];
$date = $_GET['date'];

if ($device == 'all') {
    $sql = "SELECT * FROM tbl_gps WHERE DATE(date) = '$date'";
} else {
    $sql = "SELECT * FROM tbl_gps WHERE device = '$device' AND DATE(date) = '$date'";
}

$result = $db->query($sql);
if (!$result) {
    echo "Error: " . $sql . "<br>" . $db->error;
    exit();
}

$data = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);
?>
