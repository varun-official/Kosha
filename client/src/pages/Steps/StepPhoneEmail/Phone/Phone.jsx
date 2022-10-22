/** @format */

import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import Textinput from "../../../../components/shared/Textinput/Textinput";
import styles from "../StepPhoneEmail.module.css";

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Card title="Enter your Phone Number" icon="phone">
      <Textinput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
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
  );
};

export default Phone;
