/** @format */

import React, { useState } from "react";
import styles from "./StepName.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import Textinput from "../../../components/shared/Textinput/Textinput";

const StepName = ({ onNext }) => {
  const [name, setName] = useState("");

  const submit = async () => {};

  return (
    <>
      <Card title="EWhat's your full name?" icon="goggle-emoji">
        <Textinput value={name} onChange={(e) => setName(e.target.value)} />
        <div>
          <p className={styles.bottomParagrap}>
            People use real names at Kosha
          </p>
          <div className={styles.actionButtonWrapper}>
            <Button text="Next" onClick={submit} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepName;
