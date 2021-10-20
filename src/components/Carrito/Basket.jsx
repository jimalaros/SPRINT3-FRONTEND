import React from 'react';
import { Table, TableBody, TableCell } from '@material-ui/core';
import { TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Paper, Box } from '@material-ui/core';
import { crearOrden } from '../../utils/api';

function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const IVA = itemsPrice * 0.19;
  const totalPrice = itemsPrice + IVA;
    return (
      <aside className="block col-1">
        <h2>Productos</h2>
        <div>
          {cartItems.length === 0 && <div>Cart is empty</div>}
          {cartItems.map((item) => (
            <div key={item.id} className="row">
              <div className="col-2">{item.name}</div>
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
              <div className="col-2 text-right">
                {item.qty} x ${item.price.toFixed(2)}
              </div>
            </div>
          ))}

          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div className="row">
                <div className="col-2">Precio Productos</div>
                <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col-2">IVA</div>
                <div className="col-1 text-right">${IVA.toFixed(2)}</div>
              </div>

              <div className="row">
                <div className="col-2">
                  <strong>Precio Total Compra</strong>
                </div>
                <div className="col-1 text-right">
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
        <div>
        <Paper className="checkout">
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
            >
            <TableHead>
            <TableRow>
            <TableCell style={{ minWidth: 170 }}>
            Producto
            </TableCell>
            <TableCell
              align="right"
              style={{ minWidth: 100 }}
            >
              Cantidad
            </TableCell>
            <TableCell
              align="right"
              style={{ minWidth: 170 }}
            >
              Precio
            </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">
                    {item.qty}
                  </TableCell>
                  <TableCell align="right">
                    {item.qty} x ${item.price.toFixed(2)}
                  </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            </Table>
            <Box display="flex" justifyContent="flex-end" p={1}>
              Precio Total: ${totalPrice}
            </Box>
            </TableContainer>
            </Paper>
            <div className="checkout">
                <button onClick={() => crearOrden({producto: cartItems})}>
                  <a href="/admin/Ordenes">Confirmar Orden</a>
                </button>
            </div>
        </div>
      </aside>
    );
}
export default Basket;