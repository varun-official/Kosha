/** @format */

import React, { useState, useEffect } from "react";
import styles from "./StepAvatar.module.css";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAvathar } from "../../../store/ActivateSlice";
import { setAuth } from "../../../store/AuthSlice";

import { activate } from "../../../http/index";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = () => {
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setUnMounted(true);
    };
  }, []);

  const submit = async () => {
    if (!name || !avatar) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        if (!unMounted) {
          dispatch(setAuth(data));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const captureImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvathar(reader.result));
    };
  };

  if (loading) return <Loader message="Activation in progress" />;

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
