import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import swal from "sweetalert";

import { baseUrl } from "../../Constants/api_url";

const Api = baseUrl + "cuenta/";
const ApiCuentaDetalle = baseUrl + "cuentausuariodetalle/";
const ApiCuentaAportacion = baseUrl + "cuentaaportacion/";
const ApiCuentaBeneficiarioDetalle = baseUrl + "cuentabeneficiariodetalle/";

class crearCuentas extends Component {
    onClickDelete(id) {
        var i = this.state.identidadUsuario.indexOf(id);

        if (i !== -1) {
            this.state.identidadUsuario.splice(i, 1);
            this.forceUpdate();
        }
    }

    onClickDeleteBeneficiario(id) {
        var i = this.state.identidadBeneficiario.indexOf(id);

        if (i !== -1) {
            this.state.identidadBeneficiario.splice(i, 1);
            this.forceUpdate();
        }
    }
    handleChangeusuario(value) {
        this.setState({ identidadUsuarioRadio: value });
    }

    handleChangebeneficiario(value) {
        this.setState({ identidadBeneficiarioRadio: value });
    }


    handleChangeusuarioButton() {
        if (this.state.identidadUsuarioRadio == null) {
            swal("Error!", "No se ha agregado ningun Usuario.", "error");
        } else {
            if (
                this.state.identidadUsuario.includes(
                    this.state.usuarios.filter((usuario) =>
                        usuario.identidadUsuario.startsWith(
                            this.state.identidadUsuarioRadio
                        )
                    )[0]
                )
            ) {
                swal("Error!", "El Usuario ya se encuentra agregado.", "error");
            } else {
                if (this.state.identidadUsuario.length < 3) {
                    this.state.identidadUsuario.push(
                        this.state.usuarios.filter((usuario) =>
                            usuario.identidadUsuario.startsWith(
                                this.state.identidadUsuarioRadio
                            )
                        )[0]
                    );
                    this.forceUpdate();
                } else {
                    swal(
                        "Error!",
                        "Solo se pueden agregar 3 usuarios como maximo.",
                        "error"
                    );
                }
            }
        }
    }
    handleChangebeneficiarioButton() {
        if (this.state.identidadBeneficiarioRadio == null) {
            swal("Error!", "No se ha agregado ningun Beneficiario.", "error");
        } else {
            if (
                this.state.identidadBeneficiario.includes(
                    this.state.beneficiarios.filter((beneficiario) =>
                        beneficiario.identidadBeneficiario.startsWith(
                            this.state.identidadBeneficiarioRadio
                        )
                    )[0]
                )
            ) {
                swal("Error!", "El Beneficiario ya se encuentra agregado.", "error");
            } else {
                if (this.state.identidadBeneficiario.length < 3) {
                    this.state.identidadBeneficiario.push(
                        this.state.beneficiarios.filter((beneficiario) =>
                            beneficiario.identidadBeneficiario.startsWith(
                                this.state.identidadBeneficiarioRadio
                            )
                        )[0]
                    );
                    this.forceUpdate();
                } else {
                    swal(
                        "Error!",
                        "Solo se pueden agregar 3 Beneficiarios como maximo.",
                        "error"
                    );
                }
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            usuarios: [],
            beneficiarios: [],
            identidadUsuarioRadio: null,
            identidadUsuario: [],
            identidadBeneficiario: [],
            identidadBeneficiarioRadio: null,
            usuario: null,
            cuentaId: null,
            esMancomunada: null,
            fechaCreacion: null,
            buscarCuenta: null,
            buscarBeneficiario: null,
            cantidadUsuarios: null,
        };
        this.updateInputBuscarCuenta = this.updateInputBuscarCuenta.bind(this);
        this.updateInputBuscarBeneficiario = this.updateInputBuscarBeneficiario.bind(
            this
        );
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

        fetch(baseUrl + "beneficiario")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    beneficiarios: json,
                });
            });

    }

    render() {
        const nuevaCuenta = {};
        const nuevaCuentaAportacion = {
            cantidad: 200,
            fecha: "2020-01-01",
            cuentaId: null,
        };

        const nuevaCuentaDetalle = {
            identidadUsuario: null,
            cuentaId: this.state.cuentaId,
            esMancomunada: this.state.esMancomunada,
        };

        const nuevaCuentaBeneficiario = {
            identidadBeneficiario: null,
            cuentaId: null,
        }

        const {
            usuarios,
            identidadUsuario,
            buscarCuenta,
            beneficiarios,
            buscarBeneficiario,
            identidadBeneficiario,
        } = this.state;

        if (identidadUsuario.length >= 2) {
            nuevaCuentaDetalle.esMancomunada = true;
        } else {
            nuevaCuentaDetalle.esMancomunada = false;
        }

        return (
            <div>
                <Navigation />
                <div>
                    <h1>Creacion de Cuenta</h1>
                    <h3>Elija el/los Usuario(s):</h3>
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
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: 20 }}
                                onClick={(event) =>
                                    this.handleChangeusuarioButton(event.target.value)
                                }
                            >
                                Agregar Usuario
              </Button>
                        </FormControl>

                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Identidad</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Nombre</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong></strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {identidadUsuario.map((item) => (
                                        <TableRow key={item.primerNombre}>
                                            <TableCell component="th" scope="row">
                                                {item.identidadUsuario}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.primerNombre}
                                            </TableCell>
                                            <IconButton
                                                aria-label="Delete"
                                                onClick={() => this.onClickDelete(item)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                        <br />
                        <h3>Elija el/los Beneficiario(s):</h3>
                        <TextField
                            name="buscarBenerficiario"
                            label="Buscar Beneficiario"
                            defaultValue={this.state.buscarBeneficiario}
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputBuscarBeneficiario}
                            style={{ marginLeft: 20 }}
                        />
                        <br />
                        <FormControl
                            variant="outlined"
                            style={{ marginLeft: 10, marginTop: 16 }}
                        >
                            <RadioGroup
                                aria-label="Beneficiario"
                                name="beneficiario"
                                onChange={(event) =>
                                    this.handleChangebeneficiario(event.target.value)
                                }
                            >
                                {beneficiarios
                                    .filter((beneficiario) =>
                                        beneficiario.identidadBeneficiario.startsWith(
                                            buscarBeneficiario
                                        )
                                    )
                                    .map((beneficiario) => (
                                        <FormControlLabel
                                            value={beneficiario.identidadBeneficiario}
                                            control={<Radio />}
                                            label={
                                                beneficiario.identidadBeneficiario +
                                                " - " +
                                                beneficiario.primerNombre +
                                                " " +
                                                beneficiario.primerApellido
                                            }
                                        />
                                    ))}
                            </RadioGroup>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: 20 }}
                                onClick={(event) =>
                                    this.handleChangebeneficiarioButton(event.target.value)
                                }
                            >
                                Agregar Beneficiario
              </Button>
                        </FormControl>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Identidad</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Nombre</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong></strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {identidadBeneficiario.map((item) => (
                                        <TableRow key={item.primerNombre}>
                                            <TableCell component="th" scope="row">
                                                {item.identidadBeneficiario}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.primerNombre}
                                            </TableCell>
                                            <IconButton
                                                aria-label="Delete"
                                                onClick={() => this.onClickDeleteBeneficiario(item)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div style={{ marginTop: 20 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 1, margin: 10 }}
                                onClick={() => [

                                    axios
                                        .post(Api, nuevaCuenta)
                                        .then(response => {
                                            identidadBeneficiario.map((item) => (
                                                (nuevaCuentaBeneficiario.identidadBeneficiario = item.identidadBeneficiario),
                                                (nuevaCuentaBeneficiario.cuentaId = response.data.cuentaId),
                                                PostBeneficiarioCuentaDetalle(nuevaCuentaBeneficiario)
                                            ));

                                            identidadUsuario.map((item) => (
                                                (nuevaCuentaDetalle.cuentaId = response.data.cuentaId),
                                                (nuevaCuentaAportacion.cuentaId = response.data.cuentaId),
                                                (nuevaCuentaDetalle.identidadUsuario = item.identidadUsuario),
                                                PostCuentaDetalle(nuevaCuentaDetalle, nuevaCuentaAportacion)
                                            ));
                                            swal("Exito!", "Cuenta Creada!", "success");
                                            this.props.history.replace("/cuentas");
                                        })
                                        .catch((error) => {
                                            swal("Error!", error.response.data, "error");
                                        })
                                ]}>
                                Guardar
                </Button>
                            <Link to="/cuentas">
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

    updateInputBuscarBeneficiario(event) {
        if (event.target.value === "") {
            this.setState({ buscarBeneficiario: null });
            this.forceUpdate();
        } else if (event.target.value === " ") {
            this.setState({ buscarBeneficiario: "" });
            this.forceUpdate();
        } else {
            this.setState({ buscarBeneficiario: event.target.value });
        }
    }
}


const PostBeneficiarioCuentaDetalle = (nuevaCuentaBeneficiario) =>
    axios
        .post(ApiCuentaBeneficiarioDetalle, nuevaCuentaBeneficiario)
        .then((response) => {
            console.log("Beneficiario Creado")
        })
        .catch((error) => {
            swal("Error!", error.response.data, "error");
        });


const PostCuentaDetalle = (nuevaCuentaDetalle, nuevaCuentaAportacion) =>
    axios
        .post(ApiCuentaDetalle, nuevaCuentaDetalle)
        .then((response) => {
            PostCuentaAportacion(nuevaCuentaAportacion);
        })
        .catch((error) => {
            swal("Error!", error.response.data, "error");
        });

const PostCuentaAportacion = (nuevaCuentaAportacion) =>
    axios
        .post(ApiCuentaAportacion, nuevaCuentaAportacion)
        .then((response) => {
            console.log("Exitos");
        })
        .catch((error) => {
            swal("Error!", error.response.data, "error");
        });



export default crearCuentas;
