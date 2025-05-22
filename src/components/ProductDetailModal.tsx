import React, { useEffect, useState } from "react";
import {
  fetchProductById,
  fetchReviews,
  submitReview,
  updateReview,
  deleteReview,
} from "../services/dataService";
import { Product, Review } from "../types";
import ReviewFormModal from "./ReviewFormModal";
import "../styles/ProductDetailModal.css";

interface Props {
  productId: string;
  onClose: () => void;
}

const ProductDetailModal: React.FC<Props> = ({ productId, onClose }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const refreshData = () => {
    fetchProductById(productId).then(setProduct);
    fetchReviews(productId).then(setReviews);
  };

  useEffect(() => {
    refreshData();
  }, [productId]);

  const handleAddClick = () => {
    setEditingReview(null);
    setShowFormModal(true);
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setShowFormModal(true);
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteReview(productId, reviewId);
    refreshData(); // updates averageRating
  };

  const handleFormSubmit = async (data: Omit<Review, "id" | "date">) => {
    if (editingReview) {
      await updateReview(productId, editingReview.id, data);
    } else {
      await submitReview(productId, data);
    }
    setShowFormModal(false);
    setEditingReview(null);
    refreshData(); // update everything
  };

  const handleFormCancel = () => {
    setShowFormModal(false);
    setEditingReview(null);
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <p className="detail">Category: <span className="value">{product.category}</span></p>
          <p className="detail">Price: <span className="value price">${product.price.toFixed(2)}</span></p>
          <p className="detail">Rating: <span className="value rating">{product.averageRating.toFixed(1)}</span> (<span className="review-count">{product.reviewCount}</span> reviews)</p>
        </div>

        <h3 className="reviews-title">Reviews</h3>
        <ul className="reviews-list">
          {reviews.map((r) => (
            <li key={r.id} className="review-item">
              <div className="review-header">
                <strong className="review-author">{r.author}</strong>
                <span className="review-rating">({r.rating}/5)</span>
              </div>
              <p className="review-comment">{r.comment}</p>
              <small className="review-date">
                {new Date(product.dateAdded).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
              <div className="review-actions">
                <button className="button edit-review" onClick={() => handleEditClick(r)}>Edit</button>
                <button className="button delete-review" onClick={() => handleDeleteReview(r.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        <button className="button add-review" onClick={handleAddClick}>Add Review</button>
        <button className="button back-products" onClick={onClose}>Back to Products</button>

        {showFormModal && (
          <ReviewFormModal
            productId={productId}
            review={editingReview}
            onClose={handleFormCancel}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;
