'use client';
import { Navbar } from '@/app/components/navbar/navbar';
import OrderContent from '@/app/components/orderContent/OrderContent';
import store from '../../../../redux/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function page({ searchParams: { success } }) {
  return (
    <>
      <Navbar />
      <Provider store={store}>
        <OrderContent success={success}></OrderContent>
      </Provider>
    </>
  );
}
