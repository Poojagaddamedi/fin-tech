<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT company_id, company_name FROM companies ORDER BY company_name";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if ($companies) {
        echo json_encode($companies);
    } else {
        echo json_encode([]);
    }
} catch(PDOException $e) {
    echo json_encode([
        "message" => "Error fetching companies",
        "error" => $e->getMessage()
    ]);
}
?> 