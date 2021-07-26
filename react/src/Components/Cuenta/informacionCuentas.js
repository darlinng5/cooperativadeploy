import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "../Navigation";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { Col, Row } from 'react-flexbox-grid';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
import swal from 'sweetalert';
import { baseUrl } from '../../Constants/api_url';

const Api = baseUrl + "cuentausuariodetalle";
const ApiCuentaAportacion = baseUrl + "cuentaaportacion";




class informacionCuentas extends Component {

  constructor(props) {
    super(props);
    const { cuenta } = this.props.location.state;

    const { cuentaUsuarioDetalleId } = this.props.location.state.cuenta;
    const { identidadUsuario } = this.props.location.state.cuenta;
    const { cuentaId } = this.props.location.state.cuenta;


    this.state = {
      isLoaded: false,
      usuarios: [],
      cuentaUsuarioDetalle: [],
      CuentaAportacion: [],
      cuentaUsuarioDetalleId: cuentaUsuarioDetalleId,
      saldoTotal: null,
      identidadUsuario: identidadUsuario,
      cuentaId: cuentaId,
      cuenta: cuenta
    };
  }

  componentDidMount() {

    fetch(baseUrl + "cuentausuariodetalle")
      .then(res => res.json())
      .then(json => {
        this.setState({
          cuentaUsuarioDetalle: json,
        })
      });

    fetch(ApiCuentaAportacion)
      .then(res => res.json())
      .then(json => {
        this.setState({
          CuentaAportacion: json,
          isLoaded: true,
        })
      });
  }

  render() {
    var { isLoaded, usuarios, cuentaUsuarioDetalle, cuentaId, CuentaAportacion, saldoTotal } = this.state;
    const usuariosFilter = null;

    cuentaUsuarioDetalle.map((item) => {
      if (item.cuentaId == cuentaId) {
        usuarios.push(item);
      }
    })
    // usuarios.map((item) => {
    //   if (usuariosFilter.filter(cuentas => cuentas.cuentaId == item.cuentaId).length <= 0) {
    //     usuariosFilter.push(item);
    //   }

    // })

    console.log(cuentaId);
    CuentaAportacion.filter(cuenta => cuenta.cuentaId.toString().startsWith(cuentaId)).map((item) => (
      saldoTotal = saldoTotal + item.cantidad

    ))


    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (
        <div >
          <Navigation />
          <h1 >Informacion del Usuario</h1>
          <TableContainer>
            <Row>
              <Col xs={12} md={3}>
                <h3 style={{ marginLeft: 20 }}>No. de Cuenta: </h3> <h4 style={{ marginLeft: 20 }}> {this.state.cuentaUsuarioDetalleId} </h4>
                <br />
                <h3 style={{ marginLeft: 20 }}>Nombre Usuario(s): </h3>
                {usuarios.map((item) => (
                  <h4 style={{ marginLeft: 20 }}>{item.usuario.identidadUsuario} - {item.usuario.primerNombre} {item.usuario.primerApellido}</h4>
                ))}
              </Col >
              <Col xs={12} md={3}>
                <h3>Saldo Total de la Cuenta:</h3><h4>{saldoTotal}</h4>
                <br />
              </Col>

              <TableContainer component={Paper}>
                <h3 style={{ marginLeft: 20 }}>Movimientos realizados en la Cuenta: </h3>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Fecha</strong></TableCell>
                      <TableCell><strong>Cantidad</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {CuentaAportacion.filter(cuenta => cuenta.cuentaId.toString().startsWith(cuentaId)).map((item) => (
                      <TableRow key={item.identidadUsuario}>
                        <TableCell component="th" scope="row">
                          {item.fecha.split("T")[0]}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.cantidad.toString().includes("-") ? "(" : ""}{item.cantidad}{item.cantidad.toString().includes("-") ? ")" : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Row>
          </TableContainer>
        </div>

      );
    }
  }

}

export default informacionCuentas;
