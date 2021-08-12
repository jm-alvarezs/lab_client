import React, { useContext, useEffect, useState } from "react";
import PreguntasCUPOM from "../components/cuestionario/PreguntasCUPOM";
import PreguntasNechapi from "../components/cuestionario/PreguntasNechapi";
import { ModalContext } from "../context/ModalContext";
import { SurveyContext } from "../context/SurveyContext";
import { preguntasCUPOM, preguntasNechapi } from "../utils";

const AnswerCuestionario = () => {
  const [tipo, setTipo] = useState("");
  const [idPatient, setIdPatient] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [questions, setQuestions] = useState([]);
  const [token, setToken] = useState("");
  const [idSurvey, setIdSurvey] = useState("");
  const [idSurveyType, setidSurveyType] = useState("");

  const { postAnswer } = useContext(SurveyContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    let currentToken = window.location.href.split("token=")[1];
    if (!currentToken) {
      return alert("No se puede iniciar la prueba");
    }
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
    if (idSurveyType === 1) setTipo("nechapi");
    else setTipo("cupom");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let answered = true;
    let targetAnswers;
    if (idSurveyType === 2) {
      answered = questions.filter((question) => question !== "").length;
      targetAnswers = preguntasCUPOM.length;
    } else {
      answered = questions.filter(
        (question) => question.before !== "" && question.after !== ""
      ).length;
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
      <div className="card p-3">
        <form onSubmit={handleSubmit}>
          <div className="row my-2 mx-0">
            <div className="col-12 col-md-6">
              <label>Observaciones</label>
            </div>
            <div className="col-12 col-md-6">
              <textarea
                rows="4"
                className="form-control mw-100"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>
          </div>
          {renderPreguntas()}
          <button type="submit" className="btn btn-dark">
            Terminado
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerCuestionario;
