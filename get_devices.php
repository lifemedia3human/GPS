<?php
require 'config.php';

$sql = "SELECT DISTINCT device FROM tbl_gps";
$result = $db->query($sql);
if (!$result) {
    echo "Error: " . $sql . "<br>" . $db->error;
    exit();
}

$devices = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($devices);
?>
