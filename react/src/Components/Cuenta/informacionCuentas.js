import React, { Component } from 'react';
import Navigation from "../Navigation";
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { Col, Row } from 'react-flexbox-grid';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { baseUrl } from '../../Constants/api_url';

const ApiCuentaAportacion = baseUrl + "cuentaaportacion";




class informacionCuentas extends Component {

  constructor(props) {
    super(props);
    const { cuenta } = this.props.location.state;

    const { cuentaUsuarioDetalleId } = this.props.location.state.cuenta;
    const { identidadUsuario } = this.props.location.state.cuenta;
    const { cuentaId } = this.props.location.state.cuenta;
    const { esMancomunada } = this.props.location.state.cuenta;


    this.state = {
      isLoaded: false,
      usuarios: [],
      beneficiarios: [],
      cuentaUsuarioDetalle: [],
      cuentaBeneficiarioDetalle: [],
      CuentaAportacion: [],
      cuentaUsuarioDetalleId: cuentaUsuarioDetalleId,
      saldoTotal: null,
      identidadUsuario: identidadUsuario,
      cuentaId: cuentaId,
      cuenta: cuenta,
      esMancomunada: esMancomunada,
      refresh: 0
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

    fetch(baseUrl + "cuentabeneficiariodetalle")
      .then(res => res.json())
      .then(json => {
        this.setState({
          cuentaBeneficiarioDetalle: json,
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
    var { isLoaded, usuarios, cuentaUsuarioDetalle, cuentaId, CuentaAportacion, saldoTotal, beneficiarios, cuentaBeneficiarioDetalle, esMancomunada, refresh } = this.state;

    CuentaAportacion.filter(cuenta => cuenta.cuentaId.toString().startsWith(cuentaId)).map((item) => (
      saldoTotal = saldoTotal + item.cantidad

    ))
    if (usuarios.length === 0) {
      cuentaUsuarioDetalle.map((item) => {
        if (item.cuentaId == cuentaId) {
          usuarios.push(item);
        }
      })
    }
    if (beneficiarios.length === 0) {
      this.state.cuentaBeneficiarioDetalle.map((item) => {
        if (item.cuentaId == this.state.cuentaId) {
          this.state.beneficiarios.push(item);
        }
      })
    }

    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (

        <div >
          <Navigation />
          <h1 >Informacion de la Cuenta</h1>
          <TableContainer>
            <Row>
              <Col xs={12} md={3}>
                <h3 style={{ marginLeft: 20 }}>No. de Cuenta: </h3> <h4 style={{ marginLeft: 20 }}> {this.state.cuentaUsuarioDetalleId} </h4>
                <br />
                <h3 style={{ marginLeft: 20 }}>Nombre Usuario(s): </h3>
                {esMancomunada ? usuarios.map((item) => (
                  <h4 style={{ marginLeft: 20 }}>{item.usuario.identidadUsuario} - {item.usuario.primerNombre} {item.usuario.primerApellido}</h4>
                ))
                  :
                  usuarios.slice(0).map((item) => (
                    <h4 style={{ marginLeft: 20 }}>{item.usuario.identidadUsuario} - {item.usuario.primerNombre} {item.usuario.primerApellido}</h4>
                  ))

                }
                <h3 style={{ marginLeft: 20 }}>Nombre Beneficiario(s): </h3>
                {beneficiarios.map((item) => (
                  <h4 style={{ marginLeft: 20 }}>{item.beneficiario.identidadBeneficiario} - {item.beneficiario.primerNombre} {item.beneficiario.primerApellido}</h4>
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
