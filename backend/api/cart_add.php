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

if (!$data->user_id || !$data->id || !$data->name || !$data->price) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit();
}

// Check if item exists in cart
$stmt = $db->prepare("SELECT * FROM cart WHERE user_id = ? AND product_id = ?");
$stmt->execute([$data->user_id, $data->id]);
$existing = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existing) {
    $stmt = $db->prepare("UPDATE cart SET qty = qty + 1 WHERE user_id = ? AND product_id = ?");
    $stmt->execute([$data->user_id, $data->id]);
} else {
    $stmt = $db->prepare("INSERT INTO cart (user_id, product_id, name, price, qty, image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->user_id, $data->id, $data->name, $data->price, 1, $data->image]);
}

echo json_encode(["success" => true, "message" => "Added to cart"]);
?>
