import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <nav class="stroke">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/usuarios">Usuario</Link></li>
                    <li><Link to="/cuentas">Cuenta</Link></li>
                    <li><Link to="/movcuentas">Movimientos</Link></li>
                    <li><Link to="/beneficiarios">Beneficiarios</Link></li>
                    <li><Link to="/prestamos">Prestamos</Link></li>
                </ul>
            </nav>

        )
    }
}


export default Navigation;