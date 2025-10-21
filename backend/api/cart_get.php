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

$user_id = $_GET['user_id'] ?? null;
if (!$user_id) {
    echo json_encode([]);
    exit();
}

$db = (new Database())->connect();
$stmt = $db->prepare("SELECT * FROM cart WHERE user_id = ?");
$stmt->execute([$user_id]);
$cart = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($cart);
?>
