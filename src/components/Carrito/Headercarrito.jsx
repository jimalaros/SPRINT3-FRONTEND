import React from 'react';

export default function Header(props) {
    return (
        <header>
            <nav>
                <ul className="Superior">
                    <li className="Header">
                            Carrito{" "}
                            {props.countCartItems ? (
                                <button className="badge">{props.countCartItems}</button>
                            ) : (
                                ""
                            )}
                        {" "}
                    </li>
                </ul>
            </nav>
        </header>
    );
}