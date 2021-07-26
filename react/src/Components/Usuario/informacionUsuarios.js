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

const Api = baseUrl + "usuario";




class Usuarios extends Component {

  constructor(props) {
    super(props);
    const { item } = this.props.location.state;

    const { primerNombre } = this.props.location.state.item;
    const { segundoNombre } = this.props.location.state.item;
    const { primerApellido } = this.props.location.state.item;
    const { segundoApellido } = this.props.location.state.item;
    const { identidadUsuario } = this.props.location.state.item;
    const { lugardeNacimiento } = this.props.location.state.item;
    const { profesionuOficio } = this.props.location.state.item;
    const { telefono } = this.props.location.state.item;
    var { fechadeNacimiento } = this.props.location.state.item;
    const { barrioId } = this.props.location.state.item;
    const { estadoCivilId } = this.props.location.state.item;
    const { direccion } = this.props.location.state.item;

    this.state = {
      isLoaded: false,
      barrios: [],
      estadosCiviles: [],
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      identidadUsuario: identidadUsuario,
      lugardeNacimiento: lugardeNacimiento,
      profesionuOficio: profesionuOficio,
      telefono: telefono,
      fechadeNacimiento: fechadeNacimiento.split("T")[0],
      barrio: barrioId,
      estadoCivil: estadoCivilId,
      direccion: direccion,
      item: item
    };
  }

  componentDidMount() {

  }

  render() {
    var { isLoaded, items } = this.state;
    return (
      <div >
        <Navigation />
        <h1>Informacion del Usuario</h1>
        <TableContainer>
          <Row>
            <Col xs={12} md={3}>
              <h3>Primer Nombre: </h3> <h4> {this.state.primerNombre} </h4>
              <br />
              <h3>Segundo Nombre: </h3><h4>{this.state.segundoNombre}</h4>
              <br />
              <h3>Fecha de Nacimiento: </h3><h4>{this.state.fechadeNacimiento}</h4>
            </Col >
            <Col xs={12} md={3}>
              <h3>Primer Apellido: </h3> <h4> {this.state.primerApellido} </h4>
              <br />
              <h3>Segundo Apellido: </h3><h4>{this.state.segundoApellido}</h4>
              <br />
              <h3>Barrio: </h3><h4>{this.state.item.barrio.nombreBarrio}</h4>
            </Col>
            <Col xs={12} md={3}>
              <h3>Identidad: </h3> <h4> {this.state.identidadUsuario} </h4>
              <br />
              <h3>Lugar de Nacimiento: </h3><h4>{this.state.lugardeNacimiento}</h4>
              <br />
              <h3>Estado Civil: </h3><h4>{this.state.item.estadoCivil.nombre}</h4>
            </Col>
            <Col xs={12} md={3}>
              <h3>Profesion u Oficio: </h3> <h4> {this.state.profesionuOficio} </h4>
              <br />
              <h3>No. de Telefono: </h3><h4>{this.state.telefono}</h4>
            </Col>
          </Row>
        </TableContainer>
      </div>

    );
  }


}

export default Usuarios;
