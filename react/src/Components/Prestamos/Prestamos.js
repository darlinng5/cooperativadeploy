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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ReceiptIcon from '@material-ui/icons/Receipt';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { baseUrl } from '../../Constants/api_url';

const Api = baseUrl + "prestamo";
const ApiPrestamoAportacion = baseUrl + "prestamoaportacion"


const onClickDelete = (id) => {

  swal({
    title: "Eliminar",
    text: "Esta seguro que desea eliminar el Usuario?",
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
          swal("Error!", "No de puede eliminar la Cuenta", "error");
        })
    }
  })

}

// const onClickPayment = (id) => {

//   const nuevoPrestamoAportacion = {
//     cantidad: null,
//     fecha: null,
//     prestamoId: id
//   },

//     Swal.fire({
//       title: 'Ingrese la cantidad de la cuota: ',
//       input: 'text',
//       inputAttributes: {
//         autocapitalize: 'off'
//       },
//       showCancelButton: true,
//       confirmButtonText: 'Agregar Cuota',
//       showLoaderOnConfirm: true,
//       preConfirm: (monto) => {
//         nuevoPrestamoAportacion.cantidad = monto;
//         axios
//           .post(ApiPrestamoAportacion, nuevoPrestamoAportacion)
//           .then((response) => {
//             swal("Exito!", "Cuenta Creada!", "success");
//             this.props.history.replace("/cuenta");
//           })
//           .catch((error) => {
//             console.log(nuevaCuentaAportacion);
//             swal("Error!", "Aqui esta el error", "error");
//           }

//   })



// swal({
//   title: "Eliminar",
//   text: "Esta seguro que desea eliminar el Usuario?",
//   icon: "warning",
//   buttons: ["No", "Si"]
// }).then(respuesta => {
//   if (respuesta) {
//     axios.delete(`${Api}/${id}`)
//       .then(res => {
//         swal({
//           text: "Cuenta eliminada con exito",
//           icon: "success"
//         })
//         window.location.reload(true);
//       }).catch(error => {
//         swal("Error!", "No de puede eliminar la Cuenta", "error");
//       })
//   }
// })

// }

const reload = () => {
  window.location.reload(true);
}


class Prestamos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      prestamos: [],
      usuarios: [],
      cuentaUsuarioDetalle: [],
      buscarPrestamo: ""
    };
    this.updateInputBuscarPrestamo = this.updateInputBuscarPrestamo.bind(this);
  }

  componentDidMount() {
    fetch(Api)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          prestamos: json,
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
    var { isLoaded, prestamos, buscarPrestamo } = this.state;

    if (!isLoaded) {
      return <div><CircularProgress size={80} /></div>
    } else {
      return (
        <div >
          <Navigation />
          <div class="buttonAdd">
            <Link to="/crearprestamos" >
              <Fab color="primary" aria-label="add" className="buttonAdd">
                <AddIcon />
              </Fab>
            </Link>
          </div>
          <div>
            <br />
            <strong> Escriba para Buscar: </strong>
            <TextField
              name="buscarPrestamo"
              label="Buscar Prestamo"
              defaultValue={this.state.buscarPrestamo}
              margin="normal"
              variant="outlined"
              onChange={this.updateInputBuscarPrestamo}
              style={{ marginLeft: 20 }}
            />
            <br />
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>N. de Prestamo</strong></TableCell>
                    <TableCell><strong>Fecha de Creacion</strong></TableCell>
                    <TableCell ><strong>Usuario</strong></TableCell>
                    <TableCell ><strong>Monto Total</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prestamos.filter(prestamos => prestamos.prestamoId.toString().startsWith(buscarPrestamo)).map((prestamo) => (
                    < TableRow key={prestamo.prestamoId} >
                      <TableCell component="th" scope="row">
                        {prestamo.prestamoId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {prestamo.fechaCreacion.split("T")[0]}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {prestamo.usuario.primerNombre} {prestamo.usuario.primerApellido}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {prestamo.monto}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="Payment" onClick={() => onClickDelete(prestamo.prestamoId)}  >
                          < ReceiptIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={() => onClickDelete(prestamo.prestamoId)}  >
                          < DeleteIcon />
                        </IconButton>
                        <Link to={{ pathname: "/informacionprestamos", state: { prestamo } }}>
                          <IconButton aria-label="Details">
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

  updateInputBuscarPrestamo(event) {
    this.setState({ buscarPrestamo: event.target.value })
  }

}

export default Prestamos;
