import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from '.././utils/api';
import { nanoid } from 'nanoid';
import '../styles/styles.css'

const Nombre = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log('usuarios', respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);

  return (
    <div className='NombreUsuario'>
      <span>
        {usuarios.map((user) => {
          return (
            <div key={nanoid()}>
              <p>{user.nombre}</p>
            </div>
          );
        })}
      </span>
    </div>
  );
};

export default Nombre;