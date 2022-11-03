/** @format */

import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAvathar } from "../../../store/ActivateSlice";

const StepAvatar = () => {
  const { name } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const dispatch = useDispatch();

  const submit = async () => {};
  const captureImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvathar(reader.result));
    };
  };

  return (
    <>
      <div className={styles.cardWrapp}>
        <Card title={`Okay, ${name}!`} icon="monkey-emoji">
          <div>
            <p className={styles.subHedaing}>How's this photo?</p>
            <div className={styles.avatarWrapper}>
              <img className={styles.avatarImage} src={image} alt="avatar" />
            </div>
            <div className={styles.avatarInputWrapper}>
              <input
                onChange={captureImage}
                id="avatarInput"
                type="file"
                className={styles.avatarInput}
              />
              <label className={styles.avatarLabel} htmlFor="avatarInput">
                choose a different photo
              </label>
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
