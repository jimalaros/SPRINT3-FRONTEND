import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Template1 from './layouts/Template2';
import Template2 from './layouts/Template2';
import Template3 from './layouts/Template3';
import Template4 from './layouts/Template4';
import Inicio from './pages/admin/Inicio';
import Ordenes from './pages/admin/Ordenes';
import SesionU from './pages/usuarios/SesionU.jsx'
import Users from './pages/usuarios/Users';
import Home from './pages/Home';
import Menu from './pages/Menu';
import './styles/styles.css';

function App() {
  return (
    <Auth0Provider
      domain='devstwo.us.auth0.com'
      clientId='cTzOiqZucpuhCvleQXNUqJXD7eY5jnqP'
      redirectUri='https://frontenddevstwo.herokuapp.com'
    >
      <div className="App">
        <Router>
          <Switch>
          <Route path={["/menu"]}>
              <Template1>
                <Switch>
                  <Route path="/menu">
                    <Menu />
                  </Route>
                </Switch>
              </Template1>
            </Route>
            <Route path={["/admin/Inicio", "/admin/Ordenes"]}>
              <Template2>
                <Switch>
                  <Route path="/admin/Inicio">
                    <Inicio />
                  </Route>
                  <Route path="/admin/Ordenes">
                    <Ordenes />
                  </Route>
                </Switch>
              </Template2>
            </Route>
            <Route path={["/usuarios/Users", "/usuarios/SesionU"]}>
              <Template4>
                <Switch>
                  <Route path="/usuarios/SesionU">
                    <SesionU />
                  </Route>
                  <Route path="/usuarios/Users">
                    <Users />
                  </Route>
                </Switch>
              </Template4>
            </Route>
            <Route path={["/*"]}>
              <Template3>
                <Switch>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Template3>
            </Route>
          </Switch>
        </Router>
      </div>
    </Auth0Provider>
  );
};

export default App;