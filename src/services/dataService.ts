import axios from "axios";
import { Product, Review } from "../types";

const API_BASE = "https://product-review-rating-platform-server.onrender.com";

export const fetchProducts = async (
  params: { category?: string; searchQuery?: string; page?: number } = {}
): Promise<{ products: Product[]; totalCount: number }> => {
  const { category = "", searchQuery = "", page = 1 } = params;

  const res = await axios.get(`${API_BASE}/products`, {
    params: { category, q: searchQuery, page },
  });

  return res.data; 
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};

export const fetchReviews = async (productId: string): Promise<Review[]> => {
  const res = await axios.get(`${API_BASE}/products/${productId}/reviews`);
  return res.data;
};

export const submitReview = async (
  productId: string,
  review: Omit<Review, "id" | "date">
): Promise<void> => {
  await axios.post(`${API_BASE}/products/${productId}/reviews`, review);
};

export const updateReview = async (
  productId: string,
  reviewId: string,
  review: Partial<Review>
): Promise<void> => {
  await axios.put(`${API_BASE}/products/${productId}/reviews/${reviewId}`, review);
};

export const deleteReview = async (
  productId: string,
  reviewId: string
): Promise<void> => {
  await axios.delete(`${API_BASE}/products/${productId}/reviews/${reviewId}`);
};

export const addProduct = async (
  product: Omit<Product, "id" | "dateAdded" | "averageRating" | "reviewCount">
): Promise<void> => {
  await axios.post(`${API_BASE}/products`, product);
};

export const updateProduct = async (
  productId: string,
  updates: Partial<Omit<Product, "id" | "dateAdded" | "averageRating" | "reviewCount">>
): Promise<void> => {
  await axios.put(`${API_BASE}/products/${productId}`, updates);
};

