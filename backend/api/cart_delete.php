<?php
// CORS headers
$allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

header("Content-Type: application/json");

include_once "../config/Database.php";
$db = (new Database())->connect();

$data = json_decode(file_get_contents("php://input"));

if (!$data->id) {
    echo json_encode(["success" => false, "message" => "Missing ID"]);
    exit();
}

$stmt = $db->prepare("DELETE FROM cart WHERE id = ?");
$success = $stmt->execute([$data->id]);

echo json_encode(["success" => $success]);
?>
