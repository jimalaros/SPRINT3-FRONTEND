import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import '../styles/PrivateRoute.css';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
      }

      return isAuthenticated ? (
          children
      ) : (
        <div>
        <div className="Advertencia">No has iniciado sesión</div>
        <Link to='https://devstwo.us.auth0.com/u/login?state=hKFo2SB5M3MyclZCV0hCMXFlYV9hbHppdUtxdVczTF81WUpLTKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIE82WHZRUE9PNkc1Wll5Q19kVWotNGtFVEFxeENpOFZ3o2NpZNkgY1R6T2lxWnVjcHVoQ3ZsZVFYTlVxSlhEN2VZNWpucVA'>
            <p className="Advertencia">Iniciar sesión</p>
        </Link>
      </div>
    );
};

export default PrivateRoute;