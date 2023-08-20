import PAGE from "constants/page";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import { useHeaderContext } from "context/headerContext";
import LeftSlideLayer from "components/shared/LeftSlideLayer";
import FontAppliedElement from "components/shared/FontAppliedElement";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const MobileMenu = ({ isOpen, handleClose }: Props) => {
  const { openLogin, openSignUp } = useHeaderContext();
  const { pathname } = useRouter();

  const handleClickLoginButton = () => {
    handleClose();
    openLogin();
  };

  const handleClickSignUpButton = () => {
    openSignUp();
    handleClose();
  };

  return (
    <LeftSlideLayer isOpen={isOpen} className={styles.MobileMenu}>
      <div className={styles.closeArea}>
        <button onClick={handleClose}>
          <IoClose />
        </button>
      </div>
      <FontAppliedElement tagName="div" className={styles.Navigator}>
        <FontAppliedElement tagName="button" onClick={handleClickLoginButton}>
          LOGIN
        </FontAppliedElement>
        <FontAppliedElement tagName="button" onClick={handleClickSignUpButton}>
          SIGNUP
        </FontAppliedElement>
        {Object.values(PAGE).map(({ text, url }) => (
          <Link
            key={text}
            href={url}
            className={isCurrentPath(pathname, url) ? `${styles.current}` : ""}
          >
            {text}
          </Link>
        ))}
      </FontAppliedElement>
    </LeftSlideLayer>
  );
};

const isCurrentPath = (pathname: string, url: string) => pathname === url;

export default MobileMenu;
