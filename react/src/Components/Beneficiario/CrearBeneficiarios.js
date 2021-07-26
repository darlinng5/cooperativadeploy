import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "../../Constants/api_url";

const Api = baseUrl + "beneficiario/";

class crearBeneficiarios extends Component {


  handleChangefechadeNacimiento = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      primerNombre: null,
      segundoNombre: null,
      primerApellido: null,
      segundoApellido: null,
      identidadUsuario: null,
      lugardeNacimiento: null,
      telefono: null,
      fechadeNacimiento: null,
      direccion: null,
    };

    this.updateInputprimerNombre = this.updateInputprimerNombre.bind(this);
    this.updateInputsegundoNombre = this.updateInputsegundoNombre.bind(this);
    this.updateInputprimerApellido = this.updateInputprimerApellido.bind(this);
    this.updateInputsegundoApellido = this.updateInputsegundoApellido.bind(
      this
    );
    this.updateInputidentidadBeneficiario = this.updateInputidentidadBeneficiario.bind(
      this
    );
    this.updateInputlugardeNacimiento = this.updateInputlugardeNacimiento.bind(
      this
    );
    this.updateInputtelefono = this.updateInputtelefono.bind(this);
    this.updateInputfechadeNacimiento = this.updateInputfechadeNacimiento.bind(
      this
    );
    this.updateInputdireccion = this.updateInputdireccion.bind(this);
  }


  render() {
    const nuevoBeneficiario = {
      primerNombre: this.state.primerNombre,
      segundoNombre: this.state.segundoNombre,
      primerApellido: this.state.primerApellido,
      segundoApellido: this.state.segundoApellido,
      identidadBeneficiario: this.state.identidadBeneficiario,
      lugardeNacimiento: this.state.lugardeNacimiento,
      telefono: this.state.telefono,
      fechadeNacimiento: this.state.fechadeNacimiento,
      direccion: this.state.direccion,
    };
    const { fechadeNac } = this.state;

    return (
      <div>
        <Navigation />
        <div>
          <h1>Ingrese la Informacion del Beneficiario:</h1>
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
              name="identidadBeneficiario"
              label="Identidad"
              margin="normal"
              variant="outlined"
              onChange={this.updateInputidentidadBeneficiario}
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
              style={{ width: "200px", marginLeft: 10 }}
            />
            <TextField
              name="direccion"
              label="Direccion"
              margin="normal"
              variant="outlined"
              onChange={this.updateInputdireccion}
              style={{ marginLeft: 10 }}
              fullWidth
            />
            <div style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 1 }}
                onClick={() => [
                  axios
                    .post(Api, nuevoBeneficiario)
                    .then((response) => {
                      swal("Exito!", "Beneficiario Creado!", "success");
                      this.props.history.replace("/beneficiarios");
                    })
                    .catch((error) => {
                      swal("Error!", error.response.data, "error");
                    }),
                ]}
              >
                Guardar
              </Button>
              <Link to="/beneficiarios">
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

  updateInputprimerNombre(event) {
    this.setState({ primerNombre: event.target.value });
  }

  updateInputsegundoNombre(event) {
    this.setState({ segundoNombre: event.target.value });
  }

  updateInputprimerApellido(event) {
    this.setState({ primerApellido: event.target.value });
  }

  updateInputsegundoApellido(event) {
    this.setState({ segundoApellido: event.target.value });
  }

  updateInputidentidadBeneficiario(event) {
    this.setState({ identidadBeneficiario: event.target.value });
  }

  updateInputlugardeNacimiento(event) {
    this.setState({ lugardeNacimiento: event.target.value });
  }

  updateInputtelefono(event) {
    this.setState({ telefono: event.target.value });
  }

  updateInputfechadeNacimiento(event) {
    this.setState({ fechadeNacimiento: event.target.value });
  }

  updateInputdireccion(event) {
    this.setState({ direccion: event.target.value });
  }
}

export default crearBeneficiarios;
