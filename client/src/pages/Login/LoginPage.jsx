/** @format */

import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const LoginPage = () => {
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

export default LoginPage;