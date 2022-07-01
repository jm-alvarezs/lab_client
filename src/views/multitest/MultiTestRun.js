import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { MultiTestContext } from "../../context/MultiTestContext";
import { UserContext } from "../../context/UserContext";
import PacientesService from "../../services/PacientesService";
import Consent from "./Consent";
import ExclusionForm from "./ExclusionForm";
import SingleTestRun from "./SingleTestRun";
import SocialVariables from "./SocialVariables";

const MultiTestRun = ({ idMultiTest }) => {
  const [position, setPosition] = useState(1);
  const [testIndex, setTestIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [answers, setAnswers] = useState({});
  const [patient, setPatient] = useState(null);

  const { multitest, getSingleMultiTest } = useContext(MultiTestContext);

  const { alert } = useContext(ModalContext);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getSingleMultiTest(idMultiTest);
  }, []);

  useEffect(() => {
    if (multitest !== null && !loaded) {
      handlePreviousMultiTest();
    }
  }, [multitest]);

  useEffect(() => {
    if (patient !== null) {
      if (position < 4) {
        setPosition(4);
        saveLocalData();
      }
    }
  }, [patient]);

  const getTest = () => {
    if (patient !== null) {
      let patientTests = multitest.tests.filter(
        (test) => parseInt(test.idPatient) === parseInt(patient.id)
      );
      if (patientTests.length > 0) {
        patientTests = patientTests.sort((a, b) =>
          a.order > b.order ? 1 : -1
        );
        return patientTests[testIndex];
      }
      return multitest.tests[testIndex];
    }
    return null;
  };

  const setAnswer = (index, value) => {
    let current = answers;
    current[index] = value;
    setAnswers(current);
  };

  const processAnswers = () => {
    let current = Array.from(answers);
    setAnswers(current);
    saveLocalData();
  };

  const postPatient = (patient) => {
    patient.idUser = user.idUser;
    patient.email = "";
    patient.name = "";
    patient.q1 = answers[0];
    patient.q2 = answers[1];
    patient.q3 = answers[2];
    patient.q4 = answers[3];
    PacientesService.postPaciente(patient).then((res) => {
      let current = res.data.data;
      setPatient(current);
    });
  };

  const saveLocalData = () => {
    window.localStorage.setItem(
      `multitest-${idMultiTest}`,
      JSON.stringify({
        position,
        answers,
        patient,
      })
    );
  };

  const testSetupCallback = () => {
    getSingleMultiTest(idMultiTest);
  };

  const handlePreviousMultiTest = () => {
    let localData = window.localStorage.getItem(`multitest-${idMultiTest}`);
    if (localData && localData !== null) {
      localData = JSON.parse(localData);
      console.log(localData);
      setPosition(localData.position);
      setAnswers(localData.answers);
      setPatient(localData.patient);
    } else {
      saveLocalData();
    }
    setLoaded(true);
  };

  const renderContent = () => {
    if (loaded) {
      switch (position) {
        case 1:
          return (
            <Consent alert={alert} callback={() => setPosition(position + 1)} />
          );
        case 2:
          return (
            <ExclusionForm
              modifier={setAnswer}
              callback={() => {
                processAnswers();
                setPosition(position + 1);
              }}
            />
          );
        case 3:
          return <SocialVariables alert={alert} callback={postPatient} />;
        default:
          return (
            <SingleTestRun
              order={testIndex}
              test={getTest()}
              patient={patient}
              testSetupCallback={testSetupCallback}
            />
          );
      }
    }
  };

  return <div>{renderContent()}</div>;
};

export default MultiTestRun;
