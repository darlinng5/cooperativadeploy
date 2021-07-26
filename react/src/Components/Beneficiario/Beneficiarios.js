import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../Constants/api_url";

const Api = baseUrl + "beneficiario";

class Beneficiarios extends Component {
  onClickDelete(id) {
    swal({
      title: "Eliminar",
      text: "Esta seguro que desea eliminar el Beneficiario?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        axios
          .delete(`${Api}/${id}`)
          .then((res) => {
            swal("Exito", "Eliminado con Exito", "success");
            this.props.history.replace("/beneficiarios");
          })
          .catch((error) => {
            swal("Error!", error.response.data, "error");
          });
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      buscarUsuario: "",
    };
    this.updateInputBuscarUsuario = this.updateInputBuscarUsuario.bind(this);
  }

  componentDidMount() {
    fetch(Api)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items, buscarUsuario } = this.state;
    const itemsFilter = items.filter((item) =>
      item.identidadBeneficiario.startsWith(buscarUsuario)
    );
    if (!isLoaded) {
      return (
        <div>
          <CircularProgress size={80} />
        </div>
      );
    } else {
      return (
        <div>
          <Navigation />
          <div class="buttonAdd">
            <Link to="/crearbeneficiarios">
              <Fab color="primary" aria-label="add" className="buttonAdd">
                <AddIcon />
              </Fab>
            </Link>
          </div>
          <div>
            <br />
            <strong> Escriba para Buscar: </strong>
            <TextField
              name="buscarUsuario"
              label="Buscar Beneficiario"
              defaultValue={this.state.buscarUsuario}
              margin="normal"
              variant="outlined"
              onChange={this.updateInputBuscarUsuario}
              style={{ marginLeft: 20 }}
            />
            <br />
            <TableContainer component={Paper}>
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
                      <strong>Apellido</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Telefono</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsFilter.map((item) => (
                    <TableRow key={item.identidadBeneficiario}>
                      <TableCell component="th" scope="row">
                        {item.identidadBeneficiario}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.primerNombre}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.primerApellido}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.telefono}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="Delete"
                          onClick={() =>
                            this.onClickDelete(item.identidadBeneficiario)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Link
                          to={{
                            pathname: "/editarbeneficiarios",
                            state: { item },
                          }}
                        >
                          <IconButton aria-label="Update">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <Link
                          to={{ pathname: "/infobeneficiarios", state: { item } }}
                        >
                          <IconButton aria-label="Details">
                            <InfoIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      );
    }
  }
  updateInputBuscarUsuario(event) {
    this.setState({ buscarUsuario: event.target.value });
  }
}

export default Beneficiarios;
