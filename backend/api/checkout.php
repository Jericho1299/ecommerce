<?php
// CORS headers
$allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

include_once "../config/Database.php";
$db = (new Database())->connect();

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!isset($data->user_id)) {
    echo json_encode(["success" => false, "message" => "Missing user_id"]);
    exit();
}

// Fetch cart items for this user
$stmt = $db->prepare("SELECT * FROM cart WHERE user_id = ?");
$stmt->execute([$data->user_id]);
$cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$cartItems) {
    echo json_encode(["success" => false, "message" => "Cart is empty"]);
    exit();
}

// Move items to orders table
foreach ($cartItems as $item) {
    $stmt = $db->prepare("INSERT INTO orders (user_id, product_id, name, price, qty, image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->user_id, $item['product_id'], $item['name'], $item['price'], $item['qty'], $item['image']]);
}

// Delete items from cart
$stmt = $db->prepare("DELETE FROM cart WHERE user_id = ?");
$stmt->execute([$data->user_id]);

echo json_encode(["success" => true, "message" => "Checkout complete"]);
?>
