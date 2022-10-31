/** @format */

import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import Textinput from "../../../components/shared/Textinput/Textinput";
import { verifyOtp } from "../../../http/index";
import { useSelector } from "react-redux";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");

  const dataFromStore = useSelector((state) => state.auth);
  const { phone, hash } = dataFromStore.otp;

  const submit = async () => {
    try {
      const { data } = await verifyOtp({ otp: otp, phone: phone, hash: hash });
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // onNext();
  };

  return (
    // TODO: css code are repeting make main module.css and compose that here see css file for ref
    <div className={styles.cardWrapp}>
      <Card title="Enter the code we just texted you" icon="lock-emoji">
        <Textinput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <div>
          <div className={styles.actionButtonWrapper}>
            <Button text="Next" onClick={submit} />
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
