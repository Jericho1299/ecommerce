<?php
class Product {
    private $conn;
    private $table = "products";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt;
    }

    public function add($name, $price, $image) {
        $stmt = $this->conn->prepare("INSERT INTO {$this->table} (name, price, image) VALUES (:name, :price, :image)");
        return $stmt->execute([
            ':name' => $name,
            ':price' => $price,
            ':image' => $image
        ]);
    }
}
?>
