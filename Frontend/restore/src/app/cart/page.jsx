'use client';
import React from 'react';
import CartContent from '../components/cartContent/CartContent';
import { Navbar } from '../components/navbar/navbar';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function page() {
  return (
    <div>
      <Navbar />
      <Provider store={store}>
        <CartContent />
      </Provider>
    </div>
  );
}
