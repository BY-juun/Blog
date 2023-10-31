import React, { type PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@components/Icon/close";
interface Props {
  title: string;
  onClose: () => void;
}

const ModalView = ({ children, title, onClose }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.ModalWrap}>
      <div className={styles.Overlay} onClick={onClose} />
      <div className={styles.Modal}>
        <div className={styles.Modal_Header}>
          <h3>{title}</h3>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.Modal_Content}>{children}</div>
      </div>
    </div>
  );
};

export default ModalView;