import React, { useContext, useEffect, useState } from "react";
import { MultiTestContext } from "../../context/MultiTestContext";
import MultiTest from "../MultiTest";
import Consent from "./Consent";
import ExclusionForm from "./ExclusionForm";
import SingleTestRun from "./SingleTestRun";

const MultiTestRun = ({ idMultiTest }) => {
  const [position, setPosition] = useState(1);
  const [testIndex, setTestIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { multitest, getSingleMultiTest } = useContext(MultiTestContext);

  useEffect(() => {
    getSingleMultiTest(idMultiTest);
  }, []);

  useEffect(() => {
    if (multitest !== null && !loaded) {
      handlePreviousMultiTest();
    }
  }, [multitest]);

  const getTest = () => {
    let tests = multitest.tests;
    let current = tests[testIndex];
    return current;
  };

  const handlePreviousMultiTest = () => {
    let localData = window.localStorage.getItem(`multitest-${idMultiTest}`);
    if (localData && localData !== null) {
      localData = JSON.parse(localData);
      setPosition(localData.position);
    }
    setLoaded(true);
  };

  const renderContent = () => {
    if (loaded) {
      switch (position) {
        case 1:
          return <Consent callback={() => setPosition(position + 1)} />;
        case 2:
          <ExclusionForm callback={() => setPosition(position + 1)} />;
        default:
          return <SingleTestRun test={getTest()} />;
      }
    }
  };

  return <div>{renderContent()}</div>;
};

export default MultiTestRun;
