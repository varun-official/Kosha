/** @format */

import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import Textinput from "../../../../components/shared/Textinput/Textinput";

import styles from "../StepPhoneEmail.module.css";

const Email = ({ onNext }) => {
  const [emailid, setEmailid] = useState("");

  return (
    <Card title="Enter your Email id" icon="email-emoji">
      <Textinput value={emailid} onChange={(e) => setEmailid(e.target.value)} />
      <div>
        <div className={styles.actionButtonWrapper}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.bottomParagrap}>
          By entering your email, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
