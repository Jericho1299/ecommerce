<?php
header("Content-Type: application/json");
include_once "../config/Database.php";
include_once "../classes/Cart.php";

$db = (new Database())->connect();
$cart = new Cart($db);

$user_id = $_GET['user_id'];
$stmt = $cart->fetch($user_id);
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($items);
?>
