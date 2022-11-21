/** @format */

import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import Textinput from "../../../../components/shared/Textinput/Textinput";
import { sendOTP } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/AuthSlice";

import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    if (!phoneNumber) return;
    const { data } = await sendOTP({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  };

  return (
    <Card title="Enter your Phone Number" icon="phone">
      <Textinput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
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
  );
};

export default Phone;
