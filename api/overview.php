<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';

$database = new Database();
$db = $database->getConnection();

if (isset($_GET['company_id'])) {
    $company_id = $_GET['company_id'];
    
    $query = "SELECT c.*, co.* 
              FROM companies c 
              LEFT JOIN company_overview co ON c.company_id = co.company_id 
              WHERE c.company_id = ?";
    
    $stmt = $db->prepare($query);
    $stmt->execute([$company_id]);
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($row);
    } else {
        echo json_encode(["message" => "No company found"]);
    }
} else {
    echo json_encode(["message" => "Company ID is required"]);
}
?> 