import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "../Navigation";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import TableContainer from '@material-ui/core/TableContainer';
import { Col, Row } from 'react-flexbox-grid';

import { baseUrl } from '../../Constants/api_url';

const ApiPrestamoAportacion = baseUrl + "prestamoaportacion";
const ApiPrestamoInteresGeneral = baseUrl + "prestamointeresgeneral";

class movimientoPretamos extends Component {



    handleChangeMovimiento(value) {

        this.setState({
            movimiento: value,
        });
        if (this.state.movimiento === "-") {
            this.state.saldo = "-" + this.state.saldo;

        }
    }

    constructor(props) {
        super(props);

        const { prestamoId } = this.props.location.state.prestamo;
        const { monto } = this.props.location.state.prestamo;
        const { fechaCreacion } = this.props.location.state.prestamo;
        const { tiempoPrestamo } = this.props.location.state.prestamo;

        this.state = {
            isLoaded: false,
            prestamoId: prestamoId,
            monto: monto,
            fechaCreacion: fechaCreacion,
            tiempoPrestamo: tiempoPrestamo,
            movimiento: null,
            saldo: null,
            prestamoAportacion: [],
            prestamoInteresGeneral: [],
            aportacionesTotales: null,
            cantidadAportacion: null,
        };
        this.updateInputCantidadAportacion = this.updateInputCantidadAportacion.bind(this);
    };

    componentDidMount() {

        fetch(ApiPrestamoAportacion)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    prestamoAportacion: json,
                })
            });

        fetch(ApiPrestamoInteresGeneral)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    prestamoInteresGeneral: json[0],
                })
            });
    }

    render() {
        var { isLoaded, aportacionesTotales, prestamoId, prestamoAportacion, cantidadAportacion } = this.state;

        prestamoAportacion.filter(prestamoAportacionf => prestamoAportacionf.prestamoId.toString().startsWith(prestamoId)).map((item) => (
            aportacionesTotales = aportacionesTotales + item.cantidad
        ))

        if (!isLoaded) {
            return <div><CircularProgress size={80} /></div>
        } else {
            console.log(prestamoAportacion.filter(prestamoAportacionf => prestamoAportacionf.prestamoId.toString().startsWith()))

            console.log(prestamoAportacion);

            const saldoTotal = parseInt(this.state.monto) * ((parseInt(this.state.prestamoInteresGeneral.interesPocentaje) / 100) + 1);

            const nuevoMovimiento = {
                prestamoId: prestamoId,
                cantidad: cantidadAportacion,
                fecha: "2000-1-1"
            }
            return (

                <div >
                    <Navigation />
                    <div>
                        <h1>Movimiento Prestamo:</h1>

                        <TableContainer>
                            <Row>
                                <Col xs={12} md={3}>
                                    <h3>Numero de Prestamo:</h3>
                                    <h4>{prestamoId}</h4>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h3>Usuario de Prestamo:</h3>
                                    <h4>{this.props.location.state.prestamo.usuario.primerNombre} {this.props.location.state.prestamo.usuario.primerApellido}</h4>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h3>Monto del Prestamo:</h3>
                                    <h4>{this.state.monto} </h4>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h3>Saldo del Prestamo:</h3>
                                    <h4>{saldoTotal.toFixed(0)} </h4>
                                </Col>
                                <Col xs={12} md={3}>
                                    <h3>Saldo Restante del Prestamo:</h3>
                                    <h4>{saldoTotal.toFixed(0) - aportacionesTotales} </h4>
                                </Col>
                            </Row>
                        </TableContainer>
                        <form class="formAportacion">
                            <h3>Ingresa la Cantidad:</h3>
                            <TextField
                                name="cantidad"
                                label="Cantidad"
                                defaultValue={this.state.cantidadAportacion}
                                margin="normal"
                                variant="outlined"
                                onChange={this.updateInputCantidadAportacion}
                                style={{ marginLeft: 10 }}
                            />
                            <br />

                            <div style={{ marginTop: 20 }} >
                                <Link to="/prestamos">
                                    <Button variant="contained" color="primary" style={{ marginTop: 1, margin: 10 }} onClick={() => PostApi(nuevoMovimiento)}>
                                        Guardar
                                </Button>
                                </Link>
                                <Link to="/prestamos">
                                    <Button variant="contained" color="secondary" style={{ marginLeft: 10 }}>
                                        Cancelar
                                </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div >

            );
        }
    }


    updateInputCantidadAportacion(event) {
        this.setState({ cantidadAportacion: event.target.value })
    }
}

const PostApi = (nuevoMovimiento) => (
    axios
        .post(ApiPrestamoAportacion, nuevoMovimiento)
        .then(response => {
            swal("Exito!", "Movimiento Creado!", "success");
        })
        .catch(error => {
            swal("Error!", "Movimiento no Creado!", "error");
        })
)



export default movimientoPretamos;