import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerOrdenes, editarOrden, eliminarOrden } from '../../utils/api';
import ReactLoading from 'react-loading';

const Orders = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ordenes, setOrdenes] = useState([]);
  const [textoBoton, setTextoBoton] = useState();
  const [colorBoton, setColorBoton] = useState();
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrdenes = async () => {
      setLoading(true);
      await obtenerOrdenes(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setOrdenes(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error('Salio un error:', error);
          setLoading(false);
        }
      );
    };
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchOrdenes();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Mostrar Todas las ordenes');
      setColorBoton('green');
    } 
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de ordenes
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>

      {mostrarTabla}
        <TablaOrdenes
          loading={loading}
          listaOrdenes={ordenes}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaOrdenes = ({ loading, listaOrdenes, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [OrdenesFiltrados, setOrdenesFiltrados] = useState(listaOrdenes);

  useEffect(() => {
    setOrdenesFiltrados(
      listaOrdenes.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaOrdenes]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='Busqueda'
      />
      <h2>Ordenes</h2>
      <div>
        {loading ? (
          <ReactLoading/>
        ) : (
          <table className='tabla'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {OrdenesFiltrados.map((orden) => {
                return (
                  <FilaOrden
                    key={nanoid()}
                    orden={orden}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {OrdenesFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaOrden = ({ orden, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoOrden, setInfoNuevoOrden] = useState({
    _id: orden._id,
    producto: orden.producto,
    cantidad: orden.cantidad,
    precio: orden.precio
  });

  const actualizarOrden = async () => {
    //enviar la info al backend

    await editarOrden(
      orden._id,
      {
        producto: infoNuevoOrden.producto,
        cantidad: infoNuevoOrden.cantidad,
        precio: infoNuevoOrden.precio
      },
      (response) => {
        console.log(response.data);
        toast.success('Orden modificada con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando la orden');
        console.error(error);
      }
    );
  };

  const deleteOrder = async () => {
    await eliminarOrden(
      orden._id,
      (response) => {
        console.log(response.data);
        toast.success('orden eliminada con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando la orden');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoOrden._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoOrden.producto}
              onChange={(e) => setInfoNuevoOrden({ ...infoNuevoOrden, producto: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevoOrden.cantidad}
              onChange={(e) =>
                setInfoNuevoOrden({ ...infoNuevoOrden, cantidad: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevoOrden.precio}
              onChange={(e) =>
                setInfoNuevoOrden({ ...infoNuevoOrden, precio: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{orden._id.slice(20)}</td>
          <td>{orden.producto}</td>
          <td>{orden.cantidad}</td>
          <td>{orden.precio}</td>
        </>
      )}

        <td>
          <div className='flex w-full justify-around'>
            {edit ? (
              <>
                <Tooltip title='Confirmar Edición' arrow>
                  <i
                    onClick={() => actualizarOrden()}
                    className='fas fa-check text-green-700 hover:text-green-500'
                  />
                </Tooltip>
                <Tooltip title='Cancelar edición' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Editar Orden' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
                <Tooltip title='Eliminar Orden' arrow>
                  <i
                    onClick={() => setOpenDialog(true)}
                    className='fas fa-trash text-red-700 hover:text-red-500'
                  />
                </Tooltip>
              </>
            )}
          </div>

          <Dialog open={openDialog}>
            <div className='p-8 flex flex-col'>
              <h1 className='text-gray-900 text-2xl font-bold'>
                ¿Está seguro de querer eliminar la Orden?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => deleteOrder()}
                  className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                >
                  No
                </button>
              </div>
            </div>
          </Dialog>
        </td>
    </tr>
  );
};

export default Orders;