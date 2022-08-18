import React, { useState } from "react";

const ConsentA = ({ alert, callback }) => {
  const [selected, setSelected] = useState(false);

  const handleCallback = () => {
    if (!selected) {
      return alert("Debes aceptar para continuar con el ejercicio.");
    }
    callback();
  };

  return (
    <div className="container-fluid bg-light p-5">
      <div className="container card p-4 shadow-sm">
        <h1>Consentimiento Informado</h1>
        <p>
          “Por este medio, acepto participar en la presente investigación
          titulada: Estudio de validez y fiabilidad de una batería de pruebas
          neuropsicológicas autoadministradas vía online. Declaro que nadie ha
          influenciado en mi decisión y sé que puedo elegir participar en la
          investigación o no hacerlo. Asimismo, sé que puedo retirarme cuando
          quiera. Proclamo que he leído esta información (o se me ha leído la
          información) y la entiendo. Me han respondido las preguntas y sé que
          puedo hacer preguntas más tarde si las tengo. De igual modo, entiendo
          que cualquier cambio se discutirá conmigo previo a las alteraciones.”
        </p>
        <p>
          Le hacemos saber que usted está siendo invitado a formar parte de este
          estudio, ya que cumple con los criterios de inclusión del mismo:
          alumnos universitarios o adultos mayores (63 a 73 años). Este estudio
          se lleva a cabo por un equipo de estudiantes de último semestre de la
          Licenciatura en Psicología de la Universidad de Monterrey (UDEM), que
          está llevando a cabo una investigación que requiere la participación
          voluntaria de la comunidad de estudiantes en la Vicerrectoría de
          Ciencias de la Salud de la UDEM. Las personas que están realizando
          esta investigación son las estudiantes de psicología: Natalia Garza
          Quiroga, Anna Sofía Araujo Justo, Ma. Florencia Lugo Ramos y Sofía
          Zepeda Zambrano bajo la asesoría de: Dr. Umberto León Domínguez.
        </p>
        <h3>Lo que debe saber acerca de este estudio:</h3>
        <ul>
          <li>Alguien le explicará sobre este estudio de investigación.</li>
          <li>
            Un estudio de investigación es algo que se realiza de manera
            voluntaria.
          </li>
          <li>Si forma o no parte del estudio depende de usted.</li>
          <li>Deberá participar en el estudio sólo si así lo desea.</li>
          <li>
            Puede aceptar participar en el estudio y posteriormente cambiar de
            opinión.
          </li>
          <li>
            Cualquiera que sea su decisión no habrá repercusiones en su contra.
          </li>
          <li>
            Tiene la libertad de hacer todas las preguntas que quiera antes de
            tomar su decisión.
          </li>
          <li>
            El participante tiene derecho a pedir por los resultados de las
            pruebas aplicadas.
          </li>
        </ul>
        <h3>Propósito del estudio de investigación:</h3>
        <p>
          El objetivo principal de esta investigación es validar el uso de las
          pruebas autoadministradas de forma online para la evaluación
          neuropsicológica de las funciones ejecutivas a población estudiantil
          universitaria.
        </p>
        <h3>Lo que deberá hacer en este estudio:</h3>
        <p>
          Si acepta participar en este estudio, que es de carácter anónimo, se
          le pedirá contestar el cuestionario de información sociodemográfica,
          contestar un examen para evaluar la cognición y responder las
          evaluaciones neuropsicológicas en dos tiempos distintos (test-retest).
          Una evaluación se realizará de forma presencial y la otra de forma
          online que le haremos llegar por correo electrónico. Se estima una
          duración de 20 minutos.
        </p>
        <h3>Riesgos</h3>
        <p>
          Los riesgos de participar en este estudio son mínimos y poco
          probables; sin embargo, aquellas personas que participen estarán
          respondiendo preguntas acerca de opiniones personales y creencias.
          Aunque no se anticipa, si surge estrés como resultado de participación
          en el estudio, puedes contactar al Centro de Tratamiento de
          Investigación de la Ansiedad (CETIA) de la UDEM al teléfono 81
          8215-4569 (cetia@udem.edu.mx) de 9 a.m. a 9 p.m.
        </p>
        <h3>
          Contacto del estudio para preguntas acerca de la investigación o para
          reportar un problema:
        </h3>
        <p>
          Si tiene alguna pregunta, inquietud, queja, o piensa que la
          investigación le ha dañado, usted puede contactar a Natalia Garza
          Quiroga y/o Dr. Umberto León Domínguez por medio de correo
          electrónico: natalia.garzaq@udem.edu y umberto.leon@udem.edu
        </p>
        <label>
          <input
            type="radio"
            className="mr-2"
            checked={selected}
            onChange={(e) => {
              setSelected(e.target.checked);
            }}
          />{" "}
          Yo acepto participa en la investigación.
        </label>
        <button className="btn btn-dark mt-4" onClick={handleCallback}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ConsentA;
