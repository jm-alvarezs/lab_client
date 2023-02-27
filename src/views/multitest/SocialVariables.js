import React, { useState } from "react";

const SocialVariables = ({ alert, callback }) => {
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [level, setLevel] = useState(null);
  const [major, setMajor] = useState(null);
  const [birthPlace, setBirthPlace] = useState(null);
  const [semester, setSemester] = useState(null);
  const [dominantHand, setHand] = useState(null);

  const handleSubmit = () => {
    if (age < 15) {
      return alert("Ingresa una edad válida");
    }
    if (gender === null) {
      return alert("Ingresa un sexo válido");
    }
    if (level === null) {
      return alert("Ingresa un nivel de educación válido");
    }
    if (major === null) {
      return alert("Ingresa una carrera válida");
    }
    if (birthPlace === null) {
      return alert("Ingresa un lugar de nacimiento válido");
    }
    if (semester === null) {
      return alert("Ingresa un semestre válido");
    }
    if (dominantHand === null) {
      return alert("Ingresa una mano dominante válida");
    }
    callback({
      age,
      gender,
      scholarship: level,
      major,
      birthPlace,
      level: semester,
      dominantHand,
    });
  };

  return (
    <div className="container-fluid p-5 bg-light vh-100">
      <div className="container card p-4 shadow-sm">
        <h1 className="h4 bold mb-3 pb-2 border-bottom">Preguntas Generales</h1>
        <div className="row mb-3">
          <div className="col-6">
            <label>Edad</label>
          </div>
          <div className="col-6">
            <input
              type="number"
              min="17"
              value={age}
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Sexo</label>
          </div>
          <div className="col-6">
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value={null}>Selecciona uno</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Lugar de Nacimiento</label>
          </div>
          <div className="col-6">
            <input
              type="text"
              value={birthPlace}
              className="form-control"
              onChange={(e) => setBirthPlace(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Escolaridad</label>
          </div>
          <div className="col-6">
            <select
              className="form-control"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value={null}>Selecciona uno</option>
              <option value="superior">Educación superior</option>
              <option value="media">Educación media superior</option>
              <option value="básica">Educación básica</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Carrera</label>
          </div>
          <div className="col-6">
            <select
              className="form-control"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value={null}>Selecciona uno</option>
              <option value="arte">Arte y Diseño</option>
              <option value="arquitectura">
                Arquitectura y Ciencias del Hábitat
              </option>
              <option value="educacion">Educación y Humanidades</option>
              <option value="ingenieria">Ingenerías y Tecnologías</option>
              <option value="salud">Ciencias de la Salud</option>
              <option value="derecho">Derecho y Ciencias Sociales</option>
              <option value="negocios">Negocios</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Semestre</label>
          </div>
          <div className="col-6">
            <select
              className="form-control"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value={null}>Selecciona uno</option>
              <option value="1-3">1ero a 3ero</option>
              <option value="4-6">4to a 6to</option>
              <option value="7-9">7mo a 9no</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label>Mano Dominante</label>
          </div>
          <div className="col-6">
            <select
              className="form-control"
              value={dominantHand}
              onChange={(e) => setHand(e.target.value)}
            >
              <option value={null}>Selecciona uno</option>
              <option value="izquierda">Izquierda</option>
              <option value="derecha">Derecha</option>
              <option value="ambidiestro">Ambidiestro</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary my-3" onClick={handleSubmit}>
          Terminé
        </button>
      </div>
    </div>
  );
};

export default SocialVariables;
