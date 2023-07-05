import { useHeaderContext } from "context/headerContext";
import React from "react";
import styles from "./styles.module.scss";

const LoginButton = () => {
  const { openLogin } = useHeaderContext();
  return (
    <button type="button" onClick={openLogin} className={styles.LoginButton}>
      Sign in
    </button>
  );
};

export default LoginButton;