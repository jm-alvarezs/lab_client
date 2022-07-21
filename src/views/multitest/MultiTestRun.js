import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import { MultiTestContext } from "../../context/MultiTestContext";
import PacientesService from "../../services/PacientesService";
import Consent from "./Consent";
import ExclusionForm from "./ExclusionForm";
import MultiTestInstructions from "./MultiTestInstructions";
import MultiTestThankYou from "./MultiTestThankYou";
import SingleSurveyRun from "./SingleSurveyRun";
import SingleTestRun from "./SingleTestRun";
import SocialVariables from "./SocialVariables";

const MultiTestRun = ({ idMultiTest }) => {
  const [position, setPosition] = useState(0);
  const [testIndex, setTestIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [answers, setAnswers] = useState({});
  const [patient, setPatient] = useState(null);
  const [multiTestAmount, setMultiTestAmount] = useState(0);
  const [multiSurveyAmount, setMultiSurveyAmount] = useState(0);

  const { multitest, getSingleMultiTest } = useContext(MultiTestContext);

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
      if (position < 4) {
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
        if (patientTests.length > 0) {
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
    setAnswers(current);
    saveLocalData();
  };

  const postPatient = (patient) => {
    patient.idUser = multitest.idUser;
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
        testIndex,
      })
    );
  };

  const testEndCallback = () => {
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

  const renderContent = () => {
    if (loaded) {
      let test = getTest();
      switch (position) {
        case 0:
          return (
            <MultiTestInstructions
              handleNext={() => {
                setPosition(1);
                saveLocalData();
              }}
            />
          );
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
        default:
          return <MultiTestThankYou handleReset={handleReset} />;
      }
    }
  };

  return <div>{renderContent()}</div>;
};

export default MultiTestRun;
