import React from "react";

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="product-card">
      <div className="product-img">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>₱{price.toLocaleString()}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
