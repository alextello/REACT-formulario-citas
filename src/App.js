import React, { Fragment, useState } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // arreglo de citas
  const [citas, guardarCitas] = useState([]);

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
              <h2>Administrar citas</h2>
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

export default App;
