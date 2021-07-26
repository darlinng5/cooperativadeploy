import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import swal from "sweetalert";


import { baseUrl } from "../../Constants/api_url";

const Api = baseUrl + "prestamo/";


class crearPrestamos extends Component {
    onClickDelete(id) {
        var i = this.state.identidadUsuario.indexOf(id);

        if (i !== -1) {
            this.state.identidadUsuario.splice(i, 1);
            this.forceUpdate();
        }
    }

    handleChangeusuario(value) {
        this.setState({ identidadUsuarioRadio: value });
    }

    handleChangefechadePago = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChangeMonto = e => {
        this.setState({ monto: e.target.value })
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            usuarios: [],
            identidadUsuarioRadio: null,
            identidadUsuario: [],
            usuario: null,
            cuentaId: null,
            tiempoPrestamo: null,
            buscarCuenta: null,
            monto: null
        };
        this.updateInputBuscarCuenta = this.updateInputBuscarCuenta.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "usuario")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    usuarios: json,
                });
            });
    }

    render() {
        const nuevoPrestamo = {
            identidadUsuario: this.state.identidadUsuarioRadio,
            fechaCreacion: "2020-01-01",
            monto: this.state.monto,
            tiempoPrestamo: this.state.tiempoPrestamo
        };

        const {
            usuarios,
            identidadUsuario,
            buscarCuenta,
            tiempoPrestamo,
            monto
        } = this.state;

        console.log(nuevoPrestamo);
        return (
            <div>
                <Navigation />
                <div>
                    <h1>Creacion de Prestamo</h1>
                    <h3>Elija el Usuario:</h3>
                    <form class="formCuenta">
                        <TextField
                            name="buscarCuenta"
                            label="Buscar Usuario"
                            defaultValue={this.state.buscarCuenta}
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputBuscarCuenta}
                            style={{ marginLeft: 20 }}
                        />
                        <br />
                        <FormControl
                            variant="outlined"
                            style={{ marginLeft: 10, marginTop: 16 }}
                        >
                            <RadioGroup
                                aria-label="Usuario"
                                name="usuario"
                                onChange={(event) =>
                                    this.handleChangeusuario(event.target.value)
                                }
                            >
                                {usuarios
                                    .filter((usuario) =>
                                        usuario.identidadUsuario.startsWith(buscarCuenta)
                                    )
                                    .map((usuario) => (
                                        <FormControlLabel
                                            value={usuario.identidadUsuario}
                                            control={<Radio />}
                                            label={
                                                usuario.identidadUsuario +
                                                " - " +
                                                usuario.primerNombre +
                                                " " +
                                                usuario.primerApellido
                                            }
                                        />
                                    ))}
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            type="date"
                            name="tiempoPrestamo"
                            value={tiempoPrestamo}
                            onChange={this.handleChangefechadePago}
                            label="Fecha de Pago"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '200px', marginLeft: 10 }}
                        />

                        <TextField
                            name="monto"
                            label="Cantidad"
                            defaultValue={this.state.monto}
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChangeMonto}
                            style={{ marginLeft: 20 }}
                        />

                        <div style={{ marginTop: 20 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 1, margin: 10 }}
                                onClick={() => PostApi(nuevoPrestamo)
                                }
                            >
                                Guardar
                </Button>
                            <Link to="/prestamos">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginLeft: 10 }}
                                >
                                    Cancelar
                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    updateInputBuscarCuenta(event) {
        if (event.target.value === "") {
            this.setState({ buscarCuenta: null });
            this.forceUpdate();
        } else if (event.target.value === " ") {
            this.setState({ buscarCuenta: "" });
            this.forceUpdate();
        } else {
            this.setState({ buscarCuenta: event.target.value });
        }
    }

}

const PostApi = (nuevoPrestamo) => {

    axios
        .post(Api, nuevoPrestamo)
        .then((response) => {
            swal("Exito!", "Prestamo Creado!", "success");
            this.props.history.replace("/prestamos");
        })
        .catch((error) => {
            swal("Exito!", "Prestamo Creado!", "success");
            this.props.history.replace("/prestamos");
        })
}



export default crearPrestamos;
