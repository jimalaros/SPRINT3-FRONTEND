import axios from 'axios';
const URL = 'http://localhost:5000'

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${URL}/usuarios`,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearUsuario = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${URL}/usuarios/nuevos`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuario = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${URL}/usuarios/${id}`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarUsuario = async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `${URL}/usuarios/Eliminar/${id}`,
    headers: { 'Content-Type': 'application/json',  },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerOrdenes = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${URL}/ordenes`,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearOrden = async (data) => {
  const options = {
    method: 'POST',
    url: `${URL}/ordenes/nuevas`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(console.log('Exit')).catch(console.error('Error'));
};

/**export const crearOrden = async (data) => {
  data.producto.map(async (item) => {
    const options = {
      method: 'POST',
      url: `${URL}/ordenes/nuevas`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        producto: item.producto,
        cantidad: item.cantidad,
        precio: item.precio
      }),
    };
    await axios.request(options).then(console.log('Exit')).catch(console.error('Error'));
  })
};**/

export const editarOrden = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `${URL}/ordenes/Editar/${id}`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarOrden = async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `${URL}/ordenes/Eliminar/${id}`,
    headers: { 'Content-Type': 'application/json',  },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
