import React from "react";
import { Product } from "../types";
import "../styles/ProductSummary.css";

interface ProductSummaryProps {
  product: Product;
  onViewDetails: (id: string) => void;
  onEdit: (product: Product) => void;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ product, onViewDetails, onEdit }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-details">
        <p className="detail">
          Added: {new Date(product.dateAdded).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="detail">Price: <span className="price">${product.price.toFixed(2)}</span></p>
        <p className="detail">Rating: <span className="rating">{product.averageRating.toFixed(1)}</span> (<span className="review-count">{product.reviewCount}</span> reviews)</p>
      </div>
      <div className="product-actions">
        <button className="button view-details" onClick={() => onViewDetails(product.id)}>View Details</button>
        <button className="button edit-product" onClick={() => onEdit(product)}>Edit Product</button>
      </div>
    </div>
  );
};

export default ProductSummary;
