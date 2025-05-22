import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/dataService";
import ProductSummary from "../components/ProductSummary";
import FilterBar from "../components/FilterBar";
import ProductDetailModal from "../components/ProductDetailModal";
import ProductFormModal from "../components/ProductFormModal";
import { Product } from "../types";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const limit = 10;
  const totalPages = Math.ceil(totalCount / limit);

  const loadProducts = () => {
    fetchProducts({ category, searchQuery, page })
      .then(({ products, totalCount }) => {
        setProducts(products);
        setTotalCount(totalCount);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setError("Failed to load products");
      });
  };

  useEffect(() => {
    loadProducts();
  }, [category, searchQuery, page]);

  const handleViewDetails = (id: string) => {
    setSelectedProductId(id);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
    loadProducts();
  };

  const closeModal = () => {
    setSelectedProductId(null);
    loadProducts();
  };

  useEffect(() => {
    setPage(1);
  }, [category, searchQuery]);

  if (error) return <p className="error-message">{error}</p>;
  if (products.length === 0) return <p className="no-products">No products found</p>;

  return (
    <div className="home-page-container">
      <h2 className="home-page-title">Product List</h2>
      <FilterBar
        category={category}
        setCategory={setCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="product-grid">
        {products.map((product) => (
          <ProductSummary
            key={product.id}
            product={product}
            onViewDetails={handleViewDetails}
            onEdit={handleEditProduct}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      <button onClick={handleAddProduct} className="add-product-button fab">+</button>

      {selectedProductId && (
        <ProductDetailModal productId={selectedProductId} onClose={closeModal} />
      )}

      {showProductModal && (
        <ProductFormModal product={editingProduct} onClose={handleCloseProductModal} />
      )}
    </div>
  );
};

export default HomePage;
