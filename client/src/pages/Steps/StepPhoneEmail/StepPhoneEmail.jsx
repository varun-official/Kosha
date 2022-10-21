/** @format */

import React, { useState } from "react";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
import styles from "./StepPhoneEmail.module.css";

const StepPhoneEmailStep = {
  Phone: Phone,
  Email: Email,
};

const StepPhoneEmail = () => {
  const [RenderType, setRenderType] = useState("Phone");
  const RenderComponent = StepPhoneEmailStep[RenderType];

  return (
    <div className={styles.cardWrapp}>
      <div>
        <div className={styles.buttonWraper}>
          <button onClick={() => setRenderType("Phone")}>Phone</button>
          <button onClick={() => setRenderType("Email")}>Email</button>
        </div>
        <RenderComponent></RenderComponent>
      </div>
    </div>
  );
};

export default StepPhoneEmail;
