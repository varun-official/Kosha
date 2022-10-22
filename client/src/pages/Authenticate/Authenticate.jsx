/** @format */

import React, { useState } from "react";
// import styles from "./Authenticate.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(2);
  const RenderStep = steps[step];

  const onNext = async () => {
    setStep(step + 1);
  };

  return <RenderStep onNext={onNext} />;
};

export default Authenticate;
