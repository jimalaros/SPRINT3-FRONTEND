import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav>
      <ul className="Superior">
        <li className="elementos">
          <a href="/">Home</a>
        </li>
        <li className="elementos">
          <a href="/Menu">Menu</a>
        </li>
        <li className="elementos">
          <a href="/usuarios/sesionU">Comprar</a>
        </li>
        <li className="elementos Movement">
          <button
            onClick={() => loginWithRedirect()}
            className="bg-black-200 p-2 text-white rounded-lg shadow-md hover:bg-orange-200"
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
