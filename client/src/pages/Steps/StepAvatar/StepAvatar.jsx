/** @format */

import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";

const StepAvatar = () => {
  const { name } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");

  const submit = async () => {};
  return (
    <>
      <div className={styles.cardWrapp}>
        <Card title={`Okay, ${name}!`} icon="monkey-emoji">
          <div>
            <p className={styles.subHedaing}>How's this photo?</p>
            <div className={styles.avatarWrapper}>
              <img className={styles.avatarImage} src={image} alt="avatar" />
            </div>
            <div className={styles.actionButtonWrapper}>
              <Button text="Next" onClick={submit} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
