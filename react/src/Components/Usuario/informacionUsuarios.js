import React, { Component } from 'react';
import Navigation from "../Navigation";
import { Col, Row } from 'react-flexbox-grid';
import TableContainer from '@material-ui/core/TableContainer';

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
    const { estadoCivilId } = this.props.location.state.item;
    const { direccion } = this.props.location.state.item;

    this.state = {
      isLoaded: false,
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
      estadoCivil: estadoCivilId,
      direccion: direccion,
      item: item
    };
  }

  componentDidMount() {

  }

  render() {
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
              <h3>Estado Civil: </h3><h4>{this.state.item.estadoCivil.nombre}</h4>
            </Col>
            <Col xs={12} md={3}>
              <h3>Identidad: </h3> <h4> {this.state.identidadUsuario} </h4>
              <br />
              <h3>Lugar de Nacimiento: </h3><h4>{this.state.lugardeNacimiento}</h4>
              <br />
              <h3>Direccion </h3><h4>{this.state.direccion}</h4>
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
