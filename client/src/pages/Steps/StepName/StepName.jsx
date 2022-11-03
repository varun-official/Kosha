/** @format */

import React, { useState } from "react";
import styles from "./StepName.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import Textinput from "../../../components/shared/Textinput/Textinput";

import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/ActivateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const [fullname, setFullName] = useState(name);
  const dispatch = useDispatch();

  const submit = async () => {
    if (!fullname) return;

    dispatch(setName(fullname));
    onNext();
  };

  return (
    <>
      <div className={styles.cardWrapp}>
        <Card title="What's your full name?" icon="goggle-emoji">
          <Textinput
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div>
            <p className={styles.bottomParagrap}>
              People use real names at Kosha
            </p>
            <div className={styles.actionButtonWrapper}>
              <Button text="Next" onClick={submit} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepName;
