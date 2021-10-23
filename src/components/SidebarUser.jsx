import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Sidebar.css';
import * as FaIcons from 'react-icons/fa';

const SidebarUser = () => {
  const { logout } = useAuth0();
  return (
    <div class="main-menu">
      <h2>
        <FaIcons.FaBars className="me-3" />
        MENÚ
      </h2>
      <ul>
        <section class="home">
          <br />
          <li className="nav-item">
            <a href="../">
              <FaIcons.FaHome className="Iconos" />
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a href="./Ordenes">
              <FaIcons.FaBox className="Iconos" />
              Ordenes
            </a>
          </li>
          <br />
          <div>
            <button
              onClick={() => logout({ returnTo: "http://localhost:3000" })}
            >
              Cerrar Sesión
            </button>
          </div>
        </section>
      </ul>
    </div>
  );
};

export default SidebarUser;