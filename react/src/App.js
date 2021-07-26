import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Callback from './Callback';
import Home from './Home';
import Navigation from './Components/Navigation';
import NotFound from './Components/NotFound';
import Usuarios from './Components/Usuario/Usuarios';
import CrearUsuarios from './Components/Usuario/CrearUsuarios'
import EditarUsuarios from './Components/Usuario/editarUsuarios'
import InfoUsuarios from './Components/Usuario/informacionUsuarios'
import Cuentas from './Components/Cuenta/Cuentas'
import CrearCuentas from './Components/Cuenta/CrearCuentas'
import InfoCuentas from './Components/Cuenta/informacionCuentas'
import MovCuentas from './Components/Cuenta/MovimientoCuentas'
import Beneficiarios from './Components/Beneficiario/Beneficiarios'
import crearBeneficiario from './Components/Beneficiario/CrearBeneficiarios'
import editarBeneficiario from './Components/Beneficiario/editarBeneficiarios'
import prestamos from './Components/Prestamos/Prestamos'
import CrearPrestamos from './Components/Prestamos/CrearPrestamos'
import InformacionPrestamos from './Components/Prestamos/informacionPrestamos'


function App() {
  // class movimientoCuentas extends Component  

  return (
    <div className="App" >
      <switch>
        <Route exact path='/navigation' component={Navigation} />
        <Route exact path='/' component={Home} />
        <Route exact path='/callback' component={Callback} />
        <Route exact path='/notfound' component={NotFound} />
        <Route exact path='/usuarios' component={Usuarios} />
        <Route exact path='/crearusuarios' component={CrearUsuarios} />
        <Route exact path='/editarusuarios' component={EditarUsuarios} />
        <Route exact path='/cuentas' component={Cuentas} />
        <Route exact path='/crearcuentas' component={CrearCuentas} />
        <Route exact path='/infousuarios' component={InfoUsuarios} />
        <Route exact path='/infocuentas' component={InfoCuentas} />
        <Route exact path='/movcuentas' component={MovCuentas} />
        <Route exact path='/beneficiarios' component={Beneficiarios} />
        <Route exact path='/crearbeneficiarios' component={crearBeneficiario} />
        <Route exact path='/editarbeneficiarios' component={editarBeneficiario} />
        <Route exact path='/prestamos' component={prestamos} />
        <Route exact path='/crearprestamos' component={CrearPrestamos} />
        <Route exact path='/informacionprestamos' component={InformacionPrestamos} />
      </switch>
    </div>
  )
}

export default App;