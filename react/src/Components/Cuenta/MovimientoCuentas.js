import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "../Navigation";
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import { baseUrl } from '../../Constants/api_url';

const ApiCuentaAportacion = baseUrl + "cuentaaportacion";
const ApiCuenta = baseUrl + "cuenta";



class movimientoCuentas extends Component {

    onClickDelete(id) {
        var i = this.state.identidadUsuario.indexOf(id);
        console.log(i);

        if (i !== -1) {

            this.state.identidadUsuario.splice(i, 1);
            this.forceUpdate()

        }
    }
    handleChangecuenta(value) {

        this.setState({ cuentaRadio: value });

    }

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

        this.state = {
            isLoaded: false,
            usuarios: [],
            cuentaRadio: null,
            identidadUsuario: [],
            usuario: null,
            cuentaId: null,
            esMancomunada: null,
            fechaCreacion: null,
            buscarCuenta: null,
            cantidadUsuarios: null,
            cuentas: [],
            movimiento: null,
            saldo: null,
        };
        this.updateInputBuscarCuenta = this.updateInputBuscarCuenta.bind(this);
        this.updateInputSaldo = this.updateInputSaldo.bind(this);
    };

    componentDidMount() {
        fetch(baseUrl + "usuario")
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    usuarios: json,
                })
            });

        fetch(ApiCuenta)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    cuentas: json,
                })
            });
    }

    render() {

        const nuevoMovimiento = {
            cantidad: parseInt(this.state.saldo),
            cuentaId: parseInt(this.state.cuentaRadio),
            fecha: "2000-1-1"
        }

        const { buscarCuenta, cuentas, movimiento } = this.state;

        return (

            <div >
                <Navigation />
                <div>
                    <h1>Elija la Cuenta para Crear el Movimiento:</h1>
                    <form class="formCuenta">
                        <TextField
                            name="buscarCuenta"
                            label="Buscar Cuenta"
                            defaultValue={this.state.buscarCuenta}
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputBuscarCuenta}
                            style={{ marginLeft: 20 }}
                        />
                        <br />
                        <FormControl variant="outlined" style={{ marginLeft: 10, marginTop: 16 }}>

                            <RadioGroup aria-label="Cuenta" value={this.cuentaRadio} name="cuenta" onChange={event => this.handleChangecuenta(event.target.value)} >
                                {
                                    cuentas.filter(cuenta => cuenta.cuentaId.toString().startsWith(buscarCuenta)).map((cuenta) => (
                                        <FormControlLabel value={cuenta.cuentaId} control={<Radio />} label={cuenta.cuentaId} />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <hr />

                        <FormControl variant="outlined" style={{ marginLeft: 10, marginTop: 16 }}>
                            <InputLabel id="demo-simple-select-outlined-label">Movimiento</InputLabel>
                            <Select
                                value={movimiento}
                                onChange={event => this.handleChangeMovimiento(event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                labelId="demo-simple-select-outlined-label"
                                style={{ width: '200px', marginLeft: 10 }}
                            >
                                <MenuItem value="+">Entrada</MenuItem>
                                <MenuItem value="-">Salida</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="Saldo"
                            label="Saldo"
                            defaultValue={this.state.saldo}
                            margin="normal"
                            variant="outlined"
                            onChange={this.updateInputSaldo}
                            style={{ marginLeft: 20 }}
                        />

                        <div style={{ marginTop: 20 }} >
                            <Link to="/cuentas">
                                <Button variant="contained" color="primary" style={{ marginTop: 1, margin: 10 }} onClick={() => PostApi(nuevoMovimiento)}>
                                    Guardar
                                </Button>
                            </Link>
                            <Link to="/cuentas">
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
    updateInputBuscarCuenta(event) {
        if (event.target.value === "") {
            this.setState({ buscarCuenta: null })
            this.forceUpdate();
        }
        else if (event.target.value === " ") {
            this.setState({ buscarCuenta: "" })
            this.forceUpdate();
        }
        else {
            this.setState({ buscarCuenta: event.target.value })
        }
    }

    updateInputSaldo(event) {

        this.setState({ saldo: this.state.movimiento + event.target.value })
    }
}

const PostApi = (nuevoMovimiento) => (
    axios
        .post(ApiCuentaAportacion, nuevoMovimiento)
        .then(response => {
            swal("Exito!", "Movimiento Creado!", "success");
        })
        .catch(error => {
            swal("Error!", "Movimiento no Creado!", "error");
        })
)



export default movimientoCuentas;