
import React from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';

function ProductPage() {
  return (
    <>
    
      <Header />
    <div className="container my-4">
      <h3>Products</h3>
      <ProductList />
    </div>
    </>
  );
}

export default ProductPage;
