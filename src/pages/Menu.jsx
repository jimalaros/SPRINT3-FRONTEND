import React from 'react';
import CardMenu from '../components/CardMenu';
import titulomenu from '../media/titulomenu.png';
import '../styles/carrito.css';
import '../styles/styles.css';

const Menu = () => {
    return (
        <CardMenu>
            <img className='estilotitulo' src={titulomenu} alt="titulomenu" />
        </CardMenu>
    )
};

export default Menu;