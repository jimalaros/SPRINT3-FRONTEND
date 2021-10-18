import React from 'react';

//import BOTON from '../media/botoncompra.png';

function Product(props) {
const { product, onAdd } = props;
return (
    <div>
    <img className="small" src={product.image} alt={product.name} />
    <h3 className="Productos">{product.name}</h3>
    <div className="Precios">${product.price}</div>
    <div className="Buying">
        <button onClick={() => onAdd(product)}>COMPRAR</button>
    </div>
    </div>
);
}

export default Product;