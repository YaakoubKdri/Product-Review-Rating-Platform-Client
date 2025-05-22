//ReviewFormModal.tsx
import React, { useState, useEffect } from "react";
import { Review } from "../types";
import "../styles/ReviewFormModal.css";

interface Props {
  productId: string;
  review?: Review | null;
  onClose: () => void;
  onSubmit: (review: Omit<Review, "id" | "date">) => void;
}

const ReviewFormModal: React.FC<Props> = ({ productId, review, onClose, onSubmit }) => {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (review) {
      setAuthor(review.author);
      setRating(review.rating);
      setComment(review.comment);
    } else {
      setAuthor("");
      setRating(5);
      setComment("");
    }
  }, [review]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;
    onSubmit({ author, rating, comment, productId });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal-title">{review ? "Edit Review" : "Add Review"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="author">Your Name</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select id="rating" value={rating} onChange={(e) => setRating(+e.target.value)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Your Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your comment"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="button primary">
              {review ? "Update" : "Submit"}
            </button>
            <button type="button" className="button secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;
