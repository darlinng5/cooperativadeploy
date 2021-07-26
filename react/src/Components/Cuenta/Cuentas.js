import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "../Navigation";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import swal from 'sweetalert';
import { baseUrl } from '../../Constants/api_url';

const Api = baseUrl + "cuentausuariodetalle";


const onClickDelete = (id) => {

  swal({
    title: "Eliminar",
    text: "Esta seguro que desea eliminar la Cuenta",
    icon: "warning",
    buttons: ["No", "Si"]
  }).then(respuesta => {
    if (respuesta) {
      axios.delete(`${Api}/${id}`)
        .then(res => {
          swal({
            text: "Cuenta eliminada con exito",
            icon: "success"
          })
          window.location.reload(true);
        }).catch(error => {
          swal("Error!", "No se puede eliminar la Cuenta", "error");
        })
    }
  })

}
class Cuentas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      cuentas: [],
      usuarios: [],
      cuentaUsuarioDetalle: [],
      buscarCuenta: ""
    };
    this.updateInputBuscarCuenta = this.updateInputBuscarCuenta.bind(this);
  }

  componentDidMount() {
    fetch(Api)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          cuentas: json,
        })
      });

    fetch(baseUrl + "usuario")
      .then(res => res.json())
      .then(json => {
        this.setState({
          usuarios: json,
        })
      });

    fetch(baseUrl + "cuentausuariodetalle")
      .then(res => res.json())
      .then(json => {
        this.setState({
          cuentaUsuarioDetalle: json,
        })
      });
  }



  render() {
    var { isLoaded, cuentaUsuarioDetalle, buscarCuenta } = this.state;


    const cuentaUsuarioDetalleFilter = [];
    cuentaUsuarioDetalle.map((item) => {
      if (cuentaUsuarioDetalleFilter.filter(cuentas => cuentas.cuentaId === item.cuentaId).length <= 0) {
        cuentaUsuarioDetalleFilter.push(item);
      }

    })
    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (
        <div >
          <Navigation />
          <div class="buttonAdd">
            <Link to="/crearcuentas" >
              <Fab color="primary" aria-label="add" className="buttonAdd">
                <AddIcon />
              </Fab>
            </Link>
          </div>
          <div>
            <br />
            <strong> Escriba para Buscar: </strong>
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
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>N. de Cuenta</strong></TableCell>
                    <TableCell><strong>Fecha de Creacion</strong></TableCell>
                    <TableCell ><strong>Mancomunada</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cuentaUsuarioDetalleFilter.filter(cuentas => cuentas.cuentaId.toString().startsWith(buscarCuenta)).map((cuenta) => (
                    < TableRow key={cuenta.cuentaId} >
                      <TableCell component="th" scope="row">
                        {cuenta.cuentaId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {cuenta.cuenta.fechaCreacion.split("T")[0]}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {cuenta.esMancomunada ? < CheckIcon /> : < ClearIcon />}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="Delete" onClick={() => onClickDelete(cuenta.cuentaUsuarioDetalleId)}  >
                          < DeleteIcon />
                        </IconButton>
                        <Link to={{ pathname: "/infocuentas", state: { cuenta } }}>
                          <IconButton aria-label="Details"   >
                            < InfoIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div >

      );
    }
  }

  updateInputBuscarCuenta(event) {
    this.setState({ buscarCuenta: event.target.value })
  }

}

export default Cuentas;
