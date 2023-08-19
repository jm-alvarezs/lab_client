import React, { useContext, useEffect, useState } from "react";
import PreguntasNechapi from "../components/cuestionario/PreguntasNechapi";
import PreguntasCUPOM from "../components/cuestionario/PreguntasCUPOM";
import { preguntasCUPOM, preguntasNechapi } from "../utils";
import { SurveyContext } from "../context/SurveyContext";
import { ModalContext } from "../context/ModalContext";
import UserService from "../services/UserService";

const AnswerCuestionario = ({ endCallback }) => {
  const [observaciones, setObservaciones] = useState("");
  const [questions, setQuestions] = useState([]);
  const [finished, setFinished] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState("");

  const { survey, getSurvey, postAnswer } = useContext(SurveyContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    if (survey === null) {
    }
    let currentToken = window.location.href.split("token=")[1];
    if (!currentToken && survey === null) {
      alert("No se puede iniciar la prueba");
    } else {
      currentToken = currentToken.split("&")[0];
      setToken(currentToken);
      UserService.setToken(currentToken);
      const idSurvey = window.location.href.split("idSurvey=")[1].split("&")[0];
      getSurvey(idSurvey, currentToken);
    }
  }, []);

  useEffect(() => {
    if (survey !== null) {
      if (survey.results && survey.results !== null) {
        setDisabled(true);
        setTimeout(() => {
          if (typeof endCallback === "function") {
            endCallback(true);
          }
        }, 1500);
      }
    }
  }, [survey]);

  const renderForm = () => {
    if (finished) {
      return (
        <div>
          <p>Gracias. Ya terminaste, puedes cerrar esta ventana.</p>
        </div>
      );
    }
    if (disabled) {
      return (
        <p className="mb-0 text-danger">
          Lo sentimos, este ejercicio ya fue realizado.
        </p>
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
    if (survey.type === 2) {
      answered = questions.filter((question) => question !== "").length;
      targetAnswers = preguntasCUPOM.length;
    } else {
      answered = questions.filter((question) => question.before !== "").length;
      targetAnswers = preguntasNechapi.length;
    }
    if (answered < targetAnswers) {
      return alert("Aun no has terminado de contestar el cuestionario");
    }
    const idSurvey = survey.id;
    const data = {
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

  const renderType = () => {
    if (survey && survey !== null) {
      if (survey.survey && survey.survey !== null) {
        if (survey.survey.surveyType && survey.survey.surveyType !== null) {
          return survey.survey.surveyType.name;
        }
      }
    }
  };

  const renderPreguntas = () => {
    if (!survey || survey === null) {
      return <div className="spinner-border"></div>;
    }

    if (survey.type === 2) return <PreguntasCUPOM modifier={setQuestions} />;
    return <PreguntasNechapi modifier={setQuestions} />;
  };
  return (
    <div className="container py-4">
      <h1 className="h2 mb-3">Cuestionario - {renderType()}</h1>
      <div className="card p-3">{renderForm()}</div>
    </div>
  );
};

export default AnswerCuestionario;
