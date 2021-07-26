import React, { Component } from 'react';
import Navigation from "../Navigation";
import { Col, Row } from 'react-flexbox-grid';
import TableContainer from '@material-ui/core/TableContainer';

class Usuarios extends Component {

  constructor(props) {
    super(props);
    const { item } = this.props.location.state;

    this.state = {
      isLoaded: false,
      estadosCiviles: [],
      primerNombre: item.primerNombre,
      segundoNombre: item.segundoNombre,
      primerApellido: item.primerApellido,
      segundoApellido: item.segundoApellido,
      identidadBeneficiario: item.identidadBeneficiario,
      lugardeNacimiento: item.lugardeNacimiento,
      telefono: item.telefono,
      fechadeNacimiento: item.fechadeNacimiento.split("T")[0],
      direccion: item.direccion,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div >
        <Navigation />
        <h1>Informacion del Beneficiario: </h1>
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
              <h3>No. de Telefono: </h3><h4>{this.state.telefono}</h4>
            </Col>
            <Col xs={12} md={3}>
              <h3>Identidad: </h3> <h4> {this.state.identidadBeneficiario} </h4>
              <br />
              <h3>Lugar de Nacimiento: </h3><h4>{this.state.lugardeNacimiento}</h4>
              <br />
              <h3>Direccion </h3><h4>{this.state.direccion}</h4>
            </Col>
            <Col xs={12} md={3}>
              <br />

            </Col>
          </Row>
        </TableContainer>
      </div>

    );
  }


}

export default Usuarios;
