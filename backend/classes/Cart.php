<?php
class Cart {
    private $conn;
    private $table = "cart";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Add item to cart
    public function add($user_id, $product_name, $price, $qty) {
        $sql = "INSERT INTO {$this->table} (user_id, product_name, price, qty) VALUES (:user_id, :product_name, :price, :qty)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":product_name", $product_name);
        $stmt->bindParam(":price", $price);
        $stmt->bindParam(":qty", $qty);
        return $stmt->execute();
    }

    // Get all items for a user
    public function get($user_id) {
        $sql = "SELECT * FROM {$this->table} WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Delete an item
    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    // Checkout: move items to orders table
    public function checkout($user_id, $ordersClass) {
        $items = $this->get($user_id);
        if (!$items) return false;

        foreach ($items as $item) {
            $ordersClass->add($user_id, $item['product_name'], $item['price'], $item['qty']);
        }

        // Clear cart
        $sql = "DELETE FROM {$this->table} WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":user_id", $user_id);
        return $stmt->execute();
    }
}
?>
