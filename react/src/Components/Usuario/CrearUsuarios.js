import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "../Navigation";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import swal from 'sweetalert';
import { baseUrl } from '../../Constants/api_url';

const Api = baseUrl + "usuario/";

class crearUsuarios extends Component {

    handleChangebarrio(value) {
        this.setState({ barrio: value });
    }

    handleChangeestadoCivil(value) {
        this.setState({ estadoCivil: value });
    }

    handleChangefechadeNacimiento = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            barrios: [],
            estadosCiviles: [],
            primerNombre: null,
            segundoNombre: null,
            primerApellido: null,
            segundoApellido: null,
            identidadUsuario: null,
            lugardeNacimiento: null,
            profesionuOficio: null,
            telefono: null,
            fechadeNacimiento: null,
            barrio: null,
            estadoCivil: null,
            direccion: null
        };

        this.updateInputprimerNombre = this.updateInputprimerNombre.bind(this);
        this.updateInputsegundoNombre = this.updateInputsegundoNombre.bind(this);
        this.updateInputprimerApellido = this.updateInputprimerApellido.bind(this);
        this.updateInputsegundoApellido = this.updateInputsegundoApellido.bind(this);
        this.updateInputidentidadUsuario = this.updateInputidentidadUsuario.bind(this);
        this.updateInputlugardeNacimiento = this.updateInputlugardeNacimiento.bind(this);
        this.updateInputprofesionuOficio = this.updateInputprofesionuOficio.bind(this);
        this.updateInputtelefono = this.updateInputtelefono.bind(this);
        this.updateInputfechadeNacimiento = this.updateInputfechadeNacimiento.bind(this);
        this.updateInputdireccion = this.updateInputdireccion.bind(this);

    };

    componentDidMount() {
        fetch(baseUrl + "barrio")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isLoaded: true,
                    barrios: json,
                })
            });

        fetch(baseUrl + "estadocivil")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isLoaded: true,
                    estadosCiviles: json,
                })
            });

    }

    render() {
        console.log(this.props);
        const nuevoUsuario = {
            primerNombre: this.state.primerNombre,
            segundoNombre: this.state.segundoNombre,
            primerApellido: this.state.primerApellido,
            segundoApellido: this.state.segundoApellido,
            identidadUsuario: this.state.identidadUsuario,
            lugardeNacimiento: this.state.lugardeNacimiento,
            profesionuOficio: this.state.profesionuOficio,
            telefono: this.state.telefono,
            fechadeNacimiento: this.state.fechadeNacimiento,
            barrioId: this.state.barrio,
            estadoCivilId: this.state.estadoCivil,
            direccion: this.state.direccion,
        }
        const { barrio, estadoCivil, barrios, estadosCiviles, fechadeNac } = this.state;

        return (

            <div >
                <Navigation />
                <div>
                    <h1>Ingrese la Informacion del Usuario:</h1>
                    <form class="formUsuario">
                        <TextField
                            name="primerNombre"
                            label="Primer Nombre"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputprimerNombre}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            name="segundoNombre"
                            label="Segundo Nombre"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputsegundoNombre}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            name="primerApellido"
                            label="Primer Apellido"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputprimerApellido}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            name="segundoApellido"
                            label="Segundo Apellido"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputsegundoApellido}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            name="identidadUsuario"
                            label="Identidad"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputidentidadUsuario}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            name="lugardeNacimiento"
                            label="Lugar de Nacimiento"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputlugardeNacimiento}
                            style={{ marginLeft: 10 }}
                        />
                        <br />
                        <TextField
                            name="profesionuOficio"
                            label="Profesion u Oficio"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputprofesionuOficio}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            name="telefono"
                            label="No. de Telefono"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputtelefono}
                            style={{ marginLeft: 10 }}
                        />
                        <TextField
                            type="date"
                            name="fechadeNacimiento"
                            value={fechadeNac}
                            onChange={this.handleChangefechadeNacimiento}
                            label="Fecha de Nacimiento"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: '200px', marginLeft: 10 }}
                        />
                        <FormControl variant="outlined" style={{ marginLeft: 10, marginTop: 16 }}>
                            <InputLabel id="demo-simple-select-outlined-label">Barrio</InputLabel>
                            <Select
                                value={barrio}
                                onChange={event => this.handleChangebarrio(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                labelId="demo-simple-select-outlined-label"
                                style={{ width: '200px', marginLeft: 10 }}
                            >
                                {barrios.map(item => (
                                    <MenuItem key={item.barrioId} value={item.barrioId}>{item.nombreBarrio}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginLeft: 10, marginTop: 16 }}>
                            <InputLabel id="demo-simple-select-outlined-label">Estado Civil</InputLabel>
                            <Select
                                value={estadoCivil}
                                onChange={event => this.handleChangeestadoCivil(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                labelId="demo-simple-select-outlined-label"
                                style={{ width: '200px', marginLeft: 10 }}
                            >
                                {estadosCiviles.map(item => (
                                    <MenuItem key={item.estadoCivilId} value={item.estadoCivilId}>{item.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <TextField
                            name="direccion"
                            label="Direccion"
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputdireccion}
                            style={{ marginLeft: 10 }}
                            fullWidth
                        />
                        <div style={{ marginTop: 20 }} >
                            <Button variant="contained" color="primary" style={{ marginTop: 1 }} onClick={() => [
                                axios
                                    .post(Api, nuevoUsuario)
                                    .then(response => {
                                        swal("Exito!", "Usuario Creado!", "success");
                                        this.props.history.replace("/usuarios");
                                    })
                                    .catch(error => {
                                        swal("Error!", error.response.data, "error");
                                    })
                            ]}>
                                Guardar
                                </Button>
                            <Link to="/usuarios">
                                <Button variant="contained" color="secondary" style={{ marginLeft: 10 }}>
                                    Cancelar
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

    updateInputprimerNombre(event) {
        this.setState({ primerNombre: event.target.value })
    }

    updateInputsegundoNombre(event) {
        this.setState({ segundoNombre: event.target.value })
    }

    updateInputprimerApellido(event) {
        this.setState({ primerApellido: event.target.value })
    }

    updateInputsegundoApellido(event) {
        this.setState({ segundoApellido: event.target.value })
    }

    updateInputidentidadUsuario(event) {
        this.setState({ identidadUsuario: event.target.value })
    }

    updateInputlugardeNacimiento(event) {
        this.setState({ lugardeNacimiento: event.target.value })
    }

    updateInputprofesionuOficio(event) {
        this.setState({ profesionuOficio: event.target.value })
    }

    updateInputtelefono(event) {
        this.setState({ telefono: event.target.value })
    }

    updateInputfechadeNacimiento(event) {
        this.setState({ fechadeNacimiento: event.target.value })
    }

    updateInputdireccion(event) {
        this.setState({ direccion: event.target.value })
    }
}

const PostApi = (nuevoUsuario) => (

    axios
        .post(Api, nuevoUsuario)
        .then(response => {
            swal("Exito!", "Usuario Creado!", "success");

        })
        .catch(error => {
            swal("Error!", error.response.data, "error");
        })


)

export default crearUsuarios;