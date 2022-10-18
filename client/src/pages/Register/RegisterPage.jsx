/** @format */

import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepUserName from "../Steps/StepUserName/StepUserName";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUserName,
};

const RegisterPage = () => {
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

export default RegisterPage;
