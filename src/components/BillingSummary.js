
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, fetchCart, removeCartItemById, clearCart , clearCartapi } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function BillingSummary() {
  const cartItems = useSelector(state => state.cart.items);
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  console.log(cartItems)
    const productTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const tax = productTotal * 0.18;
  const discountAmount = (productTotal) * (discount / 100);
  const finalTotal = productTotal + tax - discountAmount;
  
  const handleDiscountChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 100) value = 100;
    setDiscount(value);
  };

  const handleCompletePayment = () => {
    dispatch(clearCartapi());
    alert('Payment Successful completed.');
    navigate("/products")
  
  };


  return (
    <div className='row'>
      <div className='col-md-8'>
        <div className="card p-3">
          <h5><b>Product Cart</b></h5>
          <div className="container">
            {cartItems.map(item => (
              <div key={item.product._id} className="card mb-3 shadow-sm">
                <div className="row g-2 align-items-center p-2">

                  <div className='col'>
                    <h6 className="mb-1">{item.product.name.slice(0, 30) + ".."}</h6>
                  </div>
                  {/* <div className='col'> */}
                  <div className="col-auto">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(removeCartItemById(item._id))}
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                  {/* </div> */}

                  <div className='row'>
                    <div className="col-3">
                      <p className='text-secondary'>Quantity</p>
                      <p className="mb-0 text-dark"><b>{item.qty}</b></p>
                    </div>
                    <div className="col-3">
                      <p className='text-secondary'>Unit Price</p>
                      <p className="mb-0 text-dark"><b>₹{item.product.price}</b></p>
                    </div>
                    <div className="col-3">
                      <p className='text-secondary'>Total Price</p>
                      <p className="mb-0 text-dark"><b>₹{item.product.price * item.qty}</b></p>
                    </div>
                  </div>
                </div>


              </div>
            ))}
            <Link to="/products">
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => { }}
              >
                + Add Extra Product
              </button>
            </Link>
          </div>
        </div>

      </div>
      <div className='col-md-4'>
        <div className="card p-3">
          <h5><b>Billing Summary</b></h5>

          <div className='row'>
            <div className='col'>
              <p>Product Total</p>
            </div>
            <div className='col text-end'>
              <p>₹{productTotal}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <p>Order Discount(%)</p>
            </div>
            <div className='col text-end'>
              <input
                type="number"
                className="form-control d-inline-block w-50"
                min="0"
                max="100"
                value={discount}
                onChange={handleDiscountChange}
              />

            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <p>Tax (18%)</p>
            </div>
            <div className='col text-end'>
              <p>₹{tax.toFixed(2)}</p>
            </div>
          </div>
          <hr />

          <div className='row'>
            <div className='col'>
              <p>Final Total</p>
            </div>
            <div className='col text-end'>
              <p>₹{finalTotal.toFixed(2)}</p>
            </div>
          </div>

        </div>
        <button
          className="complete-payment-btn w-100 mt-3"
       onClick={handleCompletePayment}
        >
          <span >✨</span> Complete Payment
        </button>


      </div>
    </div>

  );
}

export default BillingSummary;
