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

const Api = baseUrl + "prestamoAportacion";
const ApiUsuario = baseUrl + "usuario";




class informacionCuentas extends Component {

  constructor(props) {
    super(props);
    const { prestamo } = this.props.location.state;

    const { prestamoId } = this.props.location.state.prestamo;
    const { identidadUsuario } = this.props.location.state.prestamo;
    const { monto } = this.props.location.state.prestamo;
    const { tiempoPrestamo } = this.props.location.state.prestamo;
    const { fechaCreacion } = this.props.location.state.prestamo;


    this.state = {
      isLoaded: false,
      usuarios: [],
      interesProcentaje: [],
      prestamoAportacion: [],
      prestamoId: prestamoId,
      identidadUsuario: identidadUsuario,
      monto: monto,
      tiempoPrestamo: tiempoPrestamo,
      fechaCreacion: fechaCreacion,
      prestamo: prestamo,
      saldoTotal: null
    };
  }

  componentDidMount() {

    fetch(ApiUsuario)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          usuarios: json,
        })
      });

    fetch(baseUrl + "prestamointeresgeneral")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          interesProcentaje: json,
        })
      });

    fetch(baseUrl + "prestamoaportacion")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          prestamoAportacion: json,
        })
      });
  }

  render() {
    var { isLoaded, usuarios, prestamoAportacion, prestamoId, identidadUsuario, monto, tiempoPrestamo, fechaCreacion, prestamo, saldoTotal, interesProcentaje } = this.state;
    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (
        <div >
          <Navigation />
          <h1 >Informacion del Prestamo</h1>
          <TableContainer>
            <Row>
              <Col xs={12} md={3}>
                <h3 style={{ marginLeft: 20 }}>No. de Prestamo: </h3> <h4 style={{ marginLeft: 20 }}> {this.state.prestamoId} </h4>
                <h3 style={{ marginLeft: 20 }}>Cantidad del Prestamo: </h3> <h4 style={{ marginLeft: 20 }}> {this.state.monto} </h4>
                <br />
                <h3 style={{ marginLeft: 20 }}>Nombre Usuario: </h3>
                {usuarios.filter(item => item.identidadUsuario.startsWith(identidadUsuario)).map((usuario) => (
                  <h4 style={{ marginLeft: 20 }}>{usuario.primerNombre} {usuario.primerApellido}</h4>
                ))}
              </Col >
              <Col xs={12} md={3}>
                <h3>Saldo Total de la Prestamo:</h3><h4>{saldoTotal}</h4>
                <br />
                <h3 style={{ marginLeft: 20 }}>Fecha Fin del Prestamo: </h3> <h4 style={{ marginLeft: 20 }}> {this.state.tiempoPrestamo.split("T")[0]} </h4>
                <br />
                <h3 style={{ marginLeft: 20 }}>Fecha de Inicio del Prestamo: </h3> <h4 style={{ marginLeft: 20 }}> {this.state.fechaCreacion.split("T")[0]} </h4>
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
                    {prestamoAportacion.filter(prestamoAp => prestamoAp.prestamoId.toString().startsWith(prestamoId)).map((item) => (
                      <TableRow key={item.prestamoAportacionId}>
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
