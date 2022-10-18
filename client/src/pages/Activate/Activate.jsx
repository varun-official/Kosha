/** @format */

import React, { useState } from "react";
import styles from "./Activate.module.css";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const RenderStep = steps[step];

  const onNext = async () => {
    setStep(step + 1);
  };

  return (
    <div>
      <RenderStep onNext={onNext} />
    </div>
  );
};

export default Activate;
