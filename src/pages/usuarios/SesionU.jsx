import React from "react";
import { useState } from 'react';
import Headercarrito from '../../components/Carrito/Headercarrito';
import Main from '../../components/Carrito//Main';
import Basket from '../../components/Carrito//Basket';
import data from '../../components/data';
import PrivateRoute from '../../components/PrivateRoute';
import '../../styles/carrito.css';

function SesionU() {
    const { products } = data;
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    return (
          <PrivateRoute>
            <div className="row">
                <Headercarrito countCartItems={cartItems.length}></Headercarrito>
                <Main products={products} onAdd={onAdd}></Main>
                <Basket
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                ></Basket>
            </div>
          </PrivateRoute>
    );
}

export default SesionU;