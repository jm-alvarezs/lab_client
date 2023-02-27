import React from "react";

const PrivacyPolicy = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  handleSubmit,
}) => {
  return (
    <div className="container-fluid bg-light p-5">
      <div className="container card p-4 shadow-sm">
        <h2>Aviso de privacidad</h2>
        <p>
          La Universidad de Monterrey, UDEM, Institución Educativa Privada con
          domicilio en Avenida Ignacio Morones Prieto, Número 4500 Poniente,
          Piso 4, Colonia Jesús M. Garza, Municipio San Pedro Garza García,
          Nuevo León, Código Postal 66238, México, sitio web: www.udem.edu.mx,
          correo electrónico datospersonales@udem.edu, teléfono (81) 8215-1000
          ext. 2000 y horario de atención de lunes a jueves de 10 a 13h; hace de
          su conocimiento que su información de identificación y de contacto,
          será manejada de manera confidencial y que las finalidades para las
          cuales realizamos el tratamiento de sus datos personales se relacionan
          con fines académicos y para dar seguimiento a su evaluación. Conozca
          la versión Integral de nuestro Aviso de Privacidad en nuestro sitio
          web oficial: www.udem.edu.mx/es/conoce/avisos-de-privacidad.
        </p>
        <p>
          Por medio de la presente yo, acepto que las investigadoras que llevan
          a cabo su estudio titulado “Estudio de validez y fiabilidad de una
          batería de pruebas neuropsicológicas autoadministradas vía online”
          utilicen las siglas de mi nombre para recabar los resultados de las
          pruebas. Asimismo, autorizo la utilización de los siguientes datos
          para continuar con la segunda faceta del estudio:
        </p>
        <p>
          Entiendo también que los datos que proporcione a través de las
          baterías de pruebas serán utilizados estadísticamente en materia de
          salud, sin que se vulnere mi identidad mediante el proceso de
          disociación para proteger la identificación de los mismos.
        </p>
        <p>
          Las investigadoras del Estudio de validez y fiabilidad de una batería
          de pruebas neuropsicológicas autoadministradas vía online, son las
          responsables del tratamiento de los datos personales que usted
          proporcione con motivo de la participación en un protocolo de
          Investigación, mismos que serán tratados estadísticamente en materia
          de salud.{" "}
        </p>
        <p>
          De manera adicional, los datos personales que usted nos proporcione
          podrán ser utilizados para contar con datos de control, estadísticos e
          informes sobre el Protocolo de Investigación, sin que se vulnere su
          identidad mediante el proceso de disociación del titular, con la
          finalidad de no permitir por su estructura, contenido o grado de
          desagregación, la identificación de este.{" "}
        </p>
        <p>
          El Investigador principal del protocolo de Investigación podrá acceder
          a sus datos personales de identificación y datos personales sensibles,
          con la finalidad de cumplir con lo establecido en el párrafo cuarto.
        </p>
        <form onSubmit={handleSubmit}>
          <h4>
            A continuación completa tus datos y al hacer click en "Continuar"
            aceptas el aviso de privacidad.
          </h4>
          <label>Nombre</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Correo Electrónico</label>
          <input
            type="text"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input type="submit" value="Continuar" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
