<?php
header("Content-Type: application/json");
include_once "../config/Database.php";
include_once "../classes/Product.php";

$db = (new Database())->connect();
$product = new Product($db);

$stmt = $product->getAll();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);
?>
