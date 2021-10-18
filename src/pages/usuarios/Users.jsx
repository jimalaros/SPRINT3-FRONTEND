import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario } from '../../utils/api';
import ReactLoading from 'react-loading';


const Users = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      await obtenerUsuarios(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setUsuarios(response.data);
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
      fetchUsuarios();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de usuarios desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Usuario');
      setColorBoton('green');
    } else {
      setTextoBoton('Mostrar Todos los usuarios');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de usuarios
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

      {mostrarTabla ? (
        <TablaUsuarios
          loading={loading}
          listaUsuarios={usuarios}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <FormularioCreacionUsuarios
          setMostrarTabla={setMostrarTabla}
          listaUsuarios={usuarios}
          setusUsuarios={setUsuarios}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaUsuarios = ({ loading, listaUsuarios, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='Busqueda'
      />
      <h2>Usuarios</h2>
      <div>
        {loading ? (
          <ReactLoading/>
        ) : (
          <table className='tabla'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => {
                return (
                  <FilaUsuario
                    key={nanoid()}
                    usuario={usuario}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {usuariosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    _id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    telefono: usuario.telefono,
    direccion: usuario.direccion,
    administrador: usuario.rol,
  });

  const actualizarUsuario = async () => {
    //enviar la info al backend

    await editarUsuario(
      usuario._id,
      {
        nombre: infoNuevoUsuario.nombre,
        apellido: infoNuevoUsuario.apellido,
        correo: infoNuevoUsuario.correo,
        telefono: infoNuevoUsuario.telefono,
        direccion: infoNuevoUsuario.direccion,
        rol: infoNuevoUsuario.rol,
      },
      (response) => {
        console.log(response.data);
        toast.success('Usuario modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el usuario');
        console.error(error);
      }
    );
  };

  const deleteUser = async () => {
    await eliminarUsuario(
      usuario._id,
      (response) => {
        console.log(response.data);
        toast.success('usuario eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el usuario');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoUsuario._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.nombre}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, nombre: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.apellido}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, apellido: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.correo}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, correo: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.telefono}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, telefono: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.direccion}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, direccion: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.rol}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{usuario._id.slice(20)}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.apellido}</td>
          <td>{usuario.correo.slice(10)}</td>
          <td>{usuario.telefono}</td>
          <td>{usuario.direccion}</td>
          <td>{usuario.rol}</td>
        </>
      )}

        <td>
          <div className='flex w-full justify-around'>
            {edit ? (
              <>
                <Tooltip title='Confirmar Edición' arrow>
                  <i
                    onClick={() => actualizarUsuario()}
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
                <Tooltip title='Editar Usuario' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
                <Tooltip title='Eliminar Usuario' arrow>
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
                ¿Está seguro de querer eliminar el usuario?
              </h1>
              <div className='flex items-center justify-center my-4'>
                <button
                  onClick={() => deleteUser()}
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

const FormularioCreacionUsuarios = ({ setMostrarTabla, listaUsuarios, setUsuarios }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });

    await crearUsuario(
      {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        correo: nuevoUsuario.correo,
        telefono: nuevoUsuario.telefono,
        direccion: nuevoUsuario.direccion,
        rol: nuevoUsuario.rol,
      },
      (response) => {
        console.log(response.data);
        toast.success('Usuario agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un usuario');
      }
    );

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo usuario</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del usuario
          <input
            name='nombre'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='apellido'>
          Apellido del usuario
          <input
            name='apellido'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='correo'>
          Correo del usuario
          <input
            name='correo'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='email'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='telefono'>
          Telefono del usuario
          <input
            name='telefono'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='direccion'>
          Direccion del usuario
          <input
            name='direccion'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='rol'>
          Rol del usuario
          <input
            name='rol'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            required
            defaultValue={0}
          />
        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar usuario
        </button>
      </form>
    </div>
  );
};

export default Users;