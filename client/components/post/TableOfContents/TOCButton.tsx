import React, { useCallback, useRef, useState } from "react";
import styles from "./styles.module.scss";
import useScroll from "Hooks/useScroll";
import TOCModal from "./TOCModal";

const TOCButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const TOCButtonRef = useRef<HTMLButtonElement | null>(null);

  const hideButton = useCallback(() => {
    if (!TOCButtonRef.current) {
      return;
    }
    TOCButtonRef.current.style.marginRight = "-50px";
  }, []);

  const showButton = useCallback(() => {
    if (!TOCButtonRef.current) {
      return;
    }
    if (openModal) {
      return;
    }
    TOCButtonRef.current.style.marginRight = "0px";
  }, [openModal]);

  const handleClickButton = () => {
    setOpenModal(true);
  };

  useScroll({ onScrollDown: hideButton, onScrollUp: showButton });

  return (
    <>
      <button
        ref={TOCButtonRef}
        className={styles.TOCButton}
        onClick={handleClickButton}
      >
        TOC
      </button>
      <TOCModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default TOCButton;
