import React from 'react';
import data from './data';
import Product from '../components/Carrito/Product';

export default function CardMenu() {
  const { products } = data;
  return (
    <div className="row">
      {products.map((product) => (
        <Product key={product.id} product={product}></Product>
      ))}
    </div>
  );
}