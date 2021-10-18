import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Sidebar.css';
import * as FaIcons from 'react-icons/fa';

const SidebarAdmin = () => {
  const { logout } = useAuth0();
  return (
    <div class="main-menu">
      <h2><FaIcons.FaBars className="me-3"/>MENÚ</h2>
        <ul>
            <section class="home">
            <br/>
            <li className="nav-item"><a href="./Principal" className="list-group-item list-group-item-action bg-dark p-2 border 0"><FaIcons.FaUser className="me-3"/>Principal</a></li>
            <li className="nav-item"><a href="./Ordenes" className="list-group-item list-group-item-action bg-dark p-2 border 0"><FaIcons.FaChartLine className="me-3"/>Ordenes</a></li>
            <button onClick={() => logout({ returnTo: 'http://localhost:3000' })}>Cerrar Sesión</button>
            <br/>
            <li className="nav-item"><a href="/Index" className="list-group-item list-group-item-action bg-dark p-2 border 0"><FaIcons.FaHome className="me-3"/>Home</a></li>
            <br/>
            </section>
        </ul>
    </div>
  )
};
export default SidebarAdmin;