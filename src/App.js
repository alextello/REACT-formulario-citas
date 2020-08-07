import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use effect para realizar ciertas operaciones cuando el state cambie

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Función que elimina cita por ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>

      <div className="App">
        <h1>Administrador de pacientes</h1>
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario crearCita={crearCita} />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita cita={cita} key={cita.id} eliminarCita={eliminarCita} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Manera de documentar qué requieren nuestros componentes
Formulario.protoTypes = {
  crearCita: PropTypes.func.isRequired
}
export default App;
