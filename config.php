<?php 
define('DB_HOST', '202.169.224.10'); 
define('DB_USERNAME', 'magang'); 
define('DB_PASSWORD', 'gps2024'); 
define('DB_NAME', 'gps');

// define('DB_HOST', 'localhost'); 
// define('DB_USERNAME', 'root'); 
// define('DB_PASSWORD', ''); 
// define('DB_NAME', 'gps_coba');

date_default_timezone_set('Asia/Jakarta');

// Connect with the database 
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME); 
 
// Display error if failed to connect 
if ($db->connect_errno) { 
    echo "Connection to database is failed: ".$db->connect_error;
    exit();
}