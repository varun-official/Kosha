/** @format */

import React, { useState } from "react";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
import styles from "./StepPhoneEmail.module.css";

const StepPhoneEmailStep = {
  Phone: Phone,
  Email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [RenderType, setRenderType] = useState("Phone");
  const RenderComponent = StepPhoneEmailStep[RenderType];

  return (
    <div className={styles.cardWrapp}>
      <div>
        <div className={styles.buttonWraper}>
          <button
            className={`${styles.tabButton} ${
              RenderType == "Phone" ? styles.active : ""
            } `}
            onClick={() => setRenderType("Phone")}
          >
            <img src="/images/phone-white.png" alt="phone" />
          </button>
          <button
            className={`${styles.tabButton} ${
              RenderType == "Email" ? styles.active : ""
            } `}
            onClick={() => setRenderType("Email")}
          >
            <img src="/images/mail-white.png" alt="email" />
          </button>
        </div>
        <RenderComponent onNext={onNext}></RenderComponent>
      </div>
    </div>
  );
};

export default StepPhoneEmail;
