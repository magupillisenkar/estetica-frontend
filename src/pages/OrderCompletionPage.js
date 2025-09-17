
import React from 'react';
import { useDispatch } from 'react-redux';
import BillingSummary from '../components/BillingSummary';
import Header from '../components/Header';

function OrderCompletionPage() {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <div className="container my-4">
        <h3>Order Completion</h3>
        <p className='text-muted'>Booking Summary -APT-001</p>
        <BillingSummary />
      </div>
    </>
  );
}

export default OrderCompletionPage;
