import React from 'react';
import '../styles/Sidebar.css';
import * as FaIcons from 'react-icons/fa';

const SidebarUser = () => {
  return (
    <div class="main-menu">
      <h2><FaIcons.FaBars className="me-3"/>MENÚ</h2>
        <ul>
            <section class="home">
            <br/>
            <li className="nav-item"><a href="/SesionU" className="list-group-item list-group-item-action bg-dark p-2 border 0"><FaIcons.FaUser className="me-3"/>SesionU</a></li>
            <li className="nav-item"><a href="/Home" className="list-group-item list-group-item-action bg-dark p-2 border 0"><FaIcons.FaWindowClose className="me-3"/>Cerrar Sesión</a></li>
            <br/>
            <li className="nav-item"><a href="/Users" className="list-group-item list-group-item-action bg-dark p-2 border 0"><FaIcons.FaUser className="me-3"/>Users</a></li>
            <br/>
            </section>
        </ul>
    </div>
  )
};

export default SidebarUser;