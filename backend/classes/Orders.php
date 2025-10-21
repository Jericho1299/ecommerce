<?php
class Orders {
    private $conn;
    private $table = "orders";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Add item to orders
    public function add($user_id, $product_name, $price, $qty) {
        $sql = "INSERT INTO {$this->table} (user_id, product_name, price, qty) VALUES (:user_id, :product_name, :price, :qty)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":product_name", $product_name);
        $stmt->bindParam(":price", $price);
        $stmt->bindParam(":qty", $qty);
        return $stmt->execute();
    }

    // Get all orders for a user
    public function get($user_id) {
        $sql = "SELECT * FROM {$this->table} WHERE user_id = :user_id ORDER BY id DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
