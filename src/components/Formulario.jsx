import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';

const Formulario = ({ crearCita }) => {
	// Crear state de citas
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});

	const [error, actualizarError] = useState(false);

	// Función que se ejecuta cada que el usuario escribe en input
	const actualizarState = ({ target }) => {
		actualizarCita({
			...cita,
			[target.name]: target.value,
		});
	};

	// Extraer valores
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	// Evento de submit
	const submitCita = (e) => {
		e.preventDefault();
		// Validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			actualizarError(true);
		} else {
			//Eliminar mensaje previo de error
			actualizarError(false);
			// Asignar ID
			cita.id = uuid();
			// Crear la cita
			crearCita(cita);
			// Reiniciar el form
			actualizarCita({
				mascota: '',
				propietario: '',
				fecha: '',
				hora: null,
				sintomas: '',
			});
			// se agregó para limpiar el campo de hora
			e.currentTarget.reset();
		}
	};
	return (
		<Fragment>
			<h2>Crear cita</h2>
			{error ? (
				<p className="alerta-error">
					Todos los campos son obligatorios
				</p>
			) : (
				''
			)}
			<form onSubmit={submitCita}>
				<label>Nombre mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre mascota"
					onChange={actualizarState}
					value={mascota}
				/>
				<label>Nombre dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre propietario"
					onChange={actualizarState}
					value={propietario}
				/>
				<label>Fecha</label>
				<input
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actualizarState}
					value={fecha}
				/>
				<label>Hora</label>
				<input
					type="time"
					name="hora"
					className="u-full-width"
					onChange={actualizarState}
					hora={hora}
				/>
				<label>Síntomas</label>
				<textarea
					name="sintomas"
					className="u-full-width"
					onChange={actualizarState}
					value={sintomas}
				></textarea>
				<button type="submit" className="u-full-width button-primary">
					Agregar cita
				</button>
			</form>
		</Fragment>
	);
};

export default Formulario;
