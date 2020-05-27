import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

const NuevaCita = (props) => {
  // Generar state como objeto
  const [cita, guardarCita] = useState({
    nombre: '',
    medico: '',
    fecha: '',
    hora: '',
    consultorio: '',
    sintomas: '',
  });

  // Lea los datos del formulario
  const actualizarState = (e) => {
    guardarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar una peticion a la API
  const crearNuevaCita = (e) => {
    e.preventDefault();

    // Enviar la petion por Axios
    clienteAxios
      .post('/pacientes', cita)
      .then((res) => {
        console.log(res);

        // Cambiar la consulta a true para que se traiga el ultimo registro agregado
        props.guardarConsultar(true);

        // Redireccionar
        props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <h1 className="my-5">Crear nueva cita</h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={'/'}
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <form onSubmit={crearNuevaCita} className="bg-white p-5 bordered">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Paciente</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre Paciente"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="medico">Nombre Medico</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="medico"
                  name="medico"
                  placeholder="Nombre Medico"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Consultorio</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="consultorio"
                  name="consultorio"
                  placeholder="Consultorio"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha">Fecha Alta</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="fecha"
                  name="fecha"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora Alta</label>
                <input
                  type="time"
                  className="form-control form-control-lg"
                  id="hora"
                  name="hora"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sintomas">Síntomas</label>
                <textarea
                  className="form-control"
                  name="sintomas"
                  rows="6"
                  onChange={actualizarState}
                ></textarea>
              </div>

              <input
                type="submit"
                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Crear Cita"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(NuevaCita);
