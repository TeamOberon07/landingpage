import React, { useEffect, useState } from 'react';
import {useFetch} from "./useFetch";

function getOrderId() {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get('order');
}

function parseUrl() {
    /*
        parse url data
    */
}

export function LandingPage() {
    const [order, isLoaded, error] = useFetch('http://localhost:8000/orders/'+ getOrderId());
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className='error'>Loading...</div>;
    } else {
      return (
        <div>
          <ul id='order'>
            <li key='1'>ID: {order.id}</li>
            <li key='2'>Price: {order.price}</li>
            <li key='3'>Buyer Address: {order.buyerAddress}</li>
            <li key='4'>Seller Address: {order.sellerAddress}</li>
          </ul>
        </div>
      );
    }
}