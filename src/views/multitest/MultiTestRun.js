import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { MultiTestContext } from "../../context/MultiTestContext";
import PacientesService from "../../services/PacientesService";
import PrivacyPolicy from "../PrivacyPolicy";
import ExclusionForm from "./ExclusionForm";
import MultiTestInstructions from "./MultiTestInstructions";
import MultiTestThankYou from "./MultiTestThankYou";
import SingleSurveyRun from "./SingleSurveyRun";
import SingleTestRun from "./SingleTestRun";
import SocialVariables from "./SocialVariables";
import { validateEmail } from "../../utils";
import MultiTestFinalQuestions from "./MultiTestFinalQuestions";
import { PacientesContext } from "../../context/PacientesContext";
import WelcomeBack from "./WelcomeBack";
import IntermediateScreen from "./IntermediateScreen";
import ConsentA from "./ConsentA";
import ConsentB from "./ConsentB";
import ConsentC from "./ConsentC";

const MultiTestRun = ({ idMultiTest }) => {
  const [position, setPosition] = useState(-1);
  const [testIndex, setTestIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [answers, setAnswers] = useState({});
  const [finalAnswer, setFinalAnswer] = useState("");
  const [patient, setPatient] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prevPosition, setPrevPosition] = useState(null);
  const [multiTestAmount, setMultiTestAmount] = useState(0);
  const [multiSurveyAmount, setMultiSurveyAmount] = useState(0);

  const { multitest, getSingleMultiTest } = useContext(MultiTestContext);

  const { updatePaciente } = useContext(PacientesContext);

  const { alert } = useContext(ModalContext);

  useEffect(() => {
    getSingleMultiTest(idMultiTest);
  }, []);

  useEffect(() => {
    if (multitest !== null && !loaded) {
      handlePreviousMultiTest();
      let generalTests = multitest.tests.filter(
        (test) => test.idPatient === null
      );
      let generalSurveys = multitest.surveys.filter(
        (survey) => survey.idPatient === null
      );
      setMultiTestAmount(generalTests.length);
      setMultiSurveyAmount(generalSurveys.length);
    }
  }, [multitest]);

  useEffect(() => {
    if (patient !== null) {
      if (position < 4 && position !== "welcomeback") {
        setPosition(4);
        setTimeout(() => {
          saveLocalData();
        }, 1000);
      }
    }
  }, [patient]);

  useEffect(() => {
    if (testIndex > 0) {
      saveLocalData();
    }
  }, [testIndex]);

  const handleReset = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const getTest = () => {
    let test = null;
    if (patient !== null) {
      if (testIndex >= multiTestAmount) {
        if (testIndex - multiTestAmount >= multiSurveyAmount) {
          if (position <= 5) {
            return setPosition(position + 1);
          }
        }
        //Get Survey
        if (position <= 4) {
          setPosition(position + 1);
        }
        let surveyIndex = testIndex - multiTestAmount;
        const patientSurveys = multitest.surveys.filter(
          (survey) => parseInt(survey.idPatient) === parseInt(patient.id)
        );
        if (patientSurveys.length > 0) {
          let survey = patientSurveys[surveyIndex];

          if (survey) {
            return survey;
          }
        }
        const generalSurveys = multitest.surveys.filter(
          (survey) => survey.idPatient === null
        );
        let survey = generalSurveys[surveyIndex];
        if (survey) {
          return survey;
        }
      } else {
        //Get Test
        let patientTests = multitest.tests.filter(
          (test) => parseInt(test.idPatient) === parseInt(patient.id)
        );
        patientTests = patientTests.sort((a, b) =>
          a.order > b.order ? -1 : 1
        );
        let patientTestAmount = patientTests.length;
        if (patientTestAmount > 0) {
          if (patientTestAmount > multiTestAmount) {
            patientTests = patientTests.slice(multiTestAmount);
          }
          let current = patientTests[testIndex];
          if (current) {
            test = patientTests[testIndex];
            return test;
          }
        }
        let generalTests = multitest.tests
          .filter((test) => test.idPatient === null)
          .sort((a, b) => (a.order < b.order ? -1 : 1));
        test = generalTests[testIndex];
      }
    }
    return test;
  };

  const setAnswer = (index, value) => {
    let current = answers;
    current[index] = value;
    setAnswers(current);
  };

  const processAnswers = () => {
    let current = Object.keys(answers).map((key) => answers[key]);
    if (current.length < 4) {
      alert("Debes contestar todas las preguntas.");
      return false;
    }
    setAnswers(current);
    saveLocalData();
    return true;
  };

  const savePatientData = () => {
    if (name === "" || String(name).length < 3) {
      return alert("Debes ingresar un nombre válido.");
    }
    if (!validateEmail(email)) {
      return alert("Debes ingresar un correo electrónico válido.");
    }
    if (String(phone).length < 10) {
      return alert("Debes ingresar un teléfono válido de 10 dígitos");
    }
    validatePaciente();
    setPosition(position + 1);
  };

  const validatePaciente = () => {
    PacientesService.getPacienteByEmail(email, multitest.idUser).then((res) => {
      let paciente = res.data.data.patient;
      setPosition("welcomeback");
      setPatient(paciente);
    });
  };

  const postPatient = (patient) => {
    patient.idUser = multitest.idUser;
    patient.email = email;
    patient.name = name;
    patient.phone = phone;
    patient.q1 = answers[0];
    patient.q2 = answers[1];
    patient.q3 = answers[2];
    patient.q4 = answers[3];
    PacientesService.postPaciente(patient)
      .then((res) => {
        let current = res.data.data;
        setPatient(current);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          let current = error.data.paciente;
          setPatient(current);
        }
      });
  };

  const saveLocalData = () => {
    window.localStorage.setItem(
      `multitest-${idMultiTest}`,
      JSON.stringify({
        position,
        answers,
        patient,
        testIndex,
      })
    );
  };

  const testEndCallback = () => {
    setPrevPosition(position);
    setPosition("inter");
  };

  const nextTestCallback = () => {
    setPosition(prevPosition);
    setTestIndex(testIndex + 1);
  };

  const testSetupCallback = () => {
    getSingleMultiTest(idMultiTest);
  };

  const handlePreviousMultiTest = () => {
    let localData = window.localStorage.getItem(`multitest-${idMultiTest}`);
    if (localData && localData !== null) {
      localData = JSON.parse(localData);
      setPosition(localData.position);
      setAnswers(localData.answers);
      setPatient(localData.patient);
      setTestIndex(localData.testIndex);
    } else {
      saveLocalData();
    }
    setLoaded(true);
  };

  const handleExclusionForm = () => {
    if (processAnswers()) {
      setPosition(position + 1);
    }
  };

  const handleFinalForm = () => {
    if (finalAnswer === "") {
      return alert("Debes contestar la última pregunta");
    }
    patient.q5 = finalAnswer;
    patient.idUser = multitest.idUser;
    updatePaciente(patient);
    setPosition(position + 1);
  };

  const renderContent = () => {
    if (loaded) {
      let test = getTest();
      switch (position) {
        case "welcomeback":
          return (
            <WelcomeBack patient={patient} handleNext={() => setPosition(4)} />
          );
        case "inter":
          return <IntermediateScreen handleNext={nextTestCallback} />;
        case -1:
          return (
            <MultiTestInstructions
              handleNext={() => {
                setPosition(position + 1);
                saveLocalData();
              }}
            />
          );
        case 0:
          return (
            <PrivacyPolicy
              name={name}
              email={email}
              phone={phone}
              setName={setName}
              setEmail={setEmail}
              setPhone={setPhone}
              handleSubmit={savePatientData}
            />
          );
        case 1:
          switch (idMultiTest) {
            case 4:
              return (
                <ConsentB
                  alert={alert}
                  callback={() => setPosition(position + 1)}
                />
              );
            case 5:
              return (
                <ConsentC
                  alert={alert}
                  callback={() => setPosition(position + 1)}
                />
              );
            default:
              return (
                <ConsentA
                  alert={alert}
                  callback={() => setPosition(position + 1)}
                />
              );
          }

        case 2:
          return (
            <ExclusionForm
              modifier={setAnswer}
              callback={handleExclusionForm}
            />
          );
        case 3:
          return <SocialVariables alert={alert} callback={postPatient} />;
        case 4:
          return (
            <SingleTestRun
              test={test}
              order={testIndex}
              patient={patient}
              multiTestAmount={multiTestAmount}
              endCallback={testEndCallback}
              testSetupCallback={testSetupCallback}
            />
          );
        case 5:
          return (
            <SingleSurveyRun
              patient={patient}
              currentSurvey={test}
              idMultiTest={idMultiTest}
              endCallback={testEndCallback}
              testSetupCallback={testSetupCallback}
            />
          );
        case 6:
          return (
            <MultiTestFinalQuestions
              modifier={setFinalAnswer}
              questions={[
                "¿Tiene conocimiento técnico de las pruebas que fueron aplicadas en esta investigación?",
              ]}
              callback={handleFinalForm}
            />
          );
        default:
          return <MultiTestThankYou handleReset={handleReset} />;
      }
    }
  };

  return <div>{renderContent()}</div>;
};

export default MultiTestRun;
