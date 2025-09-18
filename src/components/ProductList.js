
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { addCartItem, fetchCart, updateCartItemQty, removeCartItemById } from '../redux/cartSlice';
import CategoryList from './CategoryList';
import { Link } from 'react-router-dom';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const baseimgurl = 'https://estetica-backend-9sje.onrender.com/';
  const cartItems = useSelector(state => state.cart.items);
  console.log(cartItems)

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);





  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    (!selectedCategoryId || product.category._id === selectedCategoryId) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className='row'>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <CategoryList onSelectCategory={setSelectedCategoryId} />
        <div className={cartItems.length == 0 ? "col-md-12" : "col-md-8"}>

          <div className="row">


            {filteredProducts.length == 0 ? (
              <div>
                <h5 className='text-muted text-center'>No Data found</h5>
              </div>
            ) : (
              <>

                {filteredProducts.map(product => (
                  <div key={product._id} className={cartItems.length == 0 ? "col-md-2 mb-3" : "col-md-3 mb-3"}>
                    <div onClick={() => dispatch(addCartItem({ productId: product._id, qty: 1 }))} type="button" className="card" >
                      <div className='card-body'>
                        <img src={baseimgurl + product.image} style={{ height: "150px", width: "100%" }} className="card-img-top " alt={product.name} />
                        <div className="card-body">
                          <h6 style={{ fontSize: "14px" }}>{product.name.slice(0, 25)}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {cartItems.length == 0 ? (
          ""
        ) : (
          <div className='col-md-4'>
            <div className="card p-3">
              <h5>Product Cart</h5>
              <div className="container">
                {cartItems.map(item => (
                  <div key={item.product._id} className="card mb-3 shadow-sm">
                    <div className="row g-2 align-items-center p-2">

                      <div className="col-auto">
                        <img
                          src={baseimgurl + item.product.image}
                          alt={item.product.name}
                          className="img-fluid rounded"
                          style={{ height: '60px', width: '60px', objectFit: 'cover' }}
                        />
                      </div>

                      <div className="col">
                        <h6 className="mb-1">{item.product.name.slice(0, 30) + ".."}</h6>
                        <div className='row'>


                          <div className="col">
                            <p className="mb-0 text-muted">₹{item.product.price}</p>
                          </div>

                          <div className="col-auto d-flex align-items-center">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                dispatch(
                                  updateCartItemQty({ id: item._id, qty: item.qty - 1 > 0 ? item.qty - 1 : 1 })
                                )
                              }
                            >
                              -
                            </button>

                            <input
                              type="number"
                              value={item.qty}
                              min="1"
                              className="form-control form-control-sm mx-1 text-center"
                              style={{ width: '60px' }}
                              onChange={(e) =>
                                dispatch(
                                  updateCartItemQty({ id: item._id, qty: +e.target.value })
                                )
                              }
                            />

                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() =>
                                dispatch(
                                  updateCartItemQty({ id: item._id, qty: item.qty + 1 })
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="col-auto">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => dispatch(removeCartItemById(item._id))}
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>

                        </div>
                      </div>



                    </div>
                  </div>
                ))}
              </div>
              
            </div>
            <Link to="/order-completion">
            <button
              className="complete-payment-btn position-fixed"
              style={{ bottom: '50px', width: "250px", right: '185px', zIndex: 1000 }}
              onClick={() => { }}
            >
              Checkout
            </button>
</Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductList;
