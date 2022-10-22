/** @format */

import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import Textinput from "../../../components/shared/Textinput/Textinput";
import styles from "./StepOtp.module.css";

const StepOtp = () => {
  const [otp, setOtp] = useState("");

  return (
    // TODO: css code are repeting make main module.css and compose that here see css file for ref
    <div className={styles.cardWrapp}>
      <Card title="Enter the code we just texted you" icon="lock-emoji">
        <Textinput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <div>
          <div className={styles.actionButtonWrapper}>
            <Button text="Next" />
          </div>
          <p className={styles.bottomParagrap}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StepOtp;
