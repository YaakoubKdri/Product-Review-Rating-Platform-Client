//ProductFormModal.tsx
import React, { useState, useEffect } from "react";
import { Product } from "../types";
import { addProduct, updateProduct } from "../services/dataService";
import "../styles/ProductFormModal.css";

interface Props {
  product: Product | null; // null for add
  onClose: () => void;
}

const ProductFormModal: React.FC<Props> = ({ product, onClose }) => {
  const isEditing = !!product;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
    } else {
      setName("");
      setDescription("");
      setCategory("");
      setPrice(0);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { name, description, category, price };

    if (isEditing && product) {
      await updateProduct(product.id, newProduct);
    } else {
      await addProduct(newProduct);
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal-title">{isEditing ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="Price"
              required
              step="0.01"
              min="0"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="button primary">
              {isEditing ? "Update" : "Add"}
            </button>
            <button type="button" onClick={onClose} className="button secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
