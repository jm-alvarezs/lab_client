import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { SurveyContext } from "../context/SurveyContext";
import { preguntasCUPOM, preguntasNechapi } from "../utils";
import PreguntasCUPOM from "../components/cuestionario/PreguntasCUPOM";
import PreguntasNechapi from "../components/cuestionario/PreguntasNechapi";

const AnswerCuestionario = ({ endCallback }) => {
  const [tipo, setTipo] = useState("");
  const [idPatient, setIdPatient] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [questions, setQuestions] = useState([]);
  const [token, setToken] = useState("");
  const [idSurvey, setIdSurvey] = useState("");
  const [idSurveyType, setidSurveyType] = useState("");
  const [finished, setFinished] = useState(false);

  const { survey, postAnswer } = useContext(SurveyContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    let currentToken = window.location.href.split("token=")[1];
    if (survey !== null) {
      if (survey.results && survey.results !== null) {
        if (survey.results.config) {
          if (typeof endCallback === "function") {
            endCallback();
          }
          return alert("Este cuestionario ya ha sido contestado.");
        }
      }
    }
    if (!currentToken && survey === null) {
      return alert("No se puede iniciar la prueba");
    } else if (survey !== null) {
      setIdSurvey(survey.survey.id);
      setToken(survey.survey.accessUrl.token);
      setIdPatient(survey.survey.idPatient);
      setidSurveyType(survey.survey.type);
    } else {
      currentToken = currentToken.split("&")[0];
      setToken(currentToken);
      let idSurveyType = window.location.href
        .split("idSurveyType=")[1]
        .split("&")[0];
      let idPatient = window.location.href.split("idPatient=")[1].split("&")[0];
      let idSurvey = window.location.href.split("idSurvey=")[1].split("&")[0];
      setidSurveyType(parseInt(idSurveyType));
      setIdPatient(idPatient);
      setIdSurvey(idSurvey);
      if (parseInt(idSurveyType) === 1) setTipo("nechapi");
      else setTipo("cupom");
    }
  }, []);

  const renderForm = () => {
    if (finished) {
      return (
        <div>
          <p>Gracias. Ya terminaste, puedes cerrar esta ventana.</p>
        </div>
      );
    }
    return (
      <form onSubmit={handleSubmit}>
        {renderPreguntas()}
        <button type="submit" className="btn btn-primary">
          Terminado
        </button>
      </form>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let answered = true;
    let targetAnswers;
    if (idSurveyType === 2) {
      answered = questions.filter((question) => question !== "").length;
      targetAnswers = preguntasCUPOM.length;
    } else {
      answered = questions.filter((question) => question.before !== "").length;
      targetAnswers = preguntasNechapi.length;
    }
    if (answered < targetAnswers) {
      return alert("Aun no has terminado de contestar el cuestionario");
    }
    const data = {
      idPatient,
      idSurvey,
      observaciones,
      questions,
    };
    postAnswer(data, token);
    setFinished(true);
    if (typeof endCallback === "function") {
      endCallback();
    }
  };

  const renderPreguntas = () => {
    if (idSurveyType === 2) return <PreguntasCUPOM modifier={setQuestions} />;
    return <PreguntasNechapi modifier={setQuestions} />;
  };
  return (
    <div className="container py-4">
      <h1 className="h2 mb-3">
        Cuestionario -{" "}
        {tipo !== ""
          ? String(tipo)[0].toUpperCase() + String(tipo).substring(1)
          : ""}
      </h1>

      <div className="card p-3">{renderForm()}</div>
    </div>
  );
};

export default AnswerCuestionario;
