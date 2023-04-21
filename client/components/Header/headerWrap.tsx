import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import useHideHeader from "./useHideHeader";
import useHeaderAnimation from "./useHeaderAnimation";
import DarkModeButton from "components/Header/DarkModeButton";
import GoogleIcon from "components/Icon/google";
import GithubIcon from "components/Icon/github";
import useToggle from "Hooks/useToggle";
import useGotoPage from "Hooks/useGotoPage";
import useWidthAnimation from "Hooks/useWidthAnimation";
import { useHeaderContext } from "context/headerContext";
import MobileMenu from "components/Header/mobileMenu";
import { useGetUserInfo } from "Hooks/User";
import LoginModal from "components/_Modal/LoginModal";
import SignUpModal from "components/_Modal/SignUpModal";
import SearchModal from "components/_Modal/SearchModal";
import IconButton from "components/shared/IconButton";
import SearchButton from "./searchButton";
import LogoutButton from "./logoutButton";
import AccountButton from "./accountButton";
import WriteButton from "./writeButton";

const ADMIN_EMAIL = "neostgeart@gmail.com";

const HeaderWrap = () => {
  const { data: UserInfo } = useGetUserInfo();
  const headerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState<boolean>(false);
  const [showEmail, _, onClickEmail] = useToggle(false);

  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    isSearchModalOpen,
    setIsLoginModalOpen,
    setIsSearchModalOpen,
    setIsSignUpModalOpen,
    openSignUp,
  } = useHeaderContext();

  const gotoPage = useGotoPage();

  useWidthAnimation(emailRef, showEmail);

  useHideHeader(setHide);

  useHeaderAnimation({ headerRef, hide, setHide });

  return (
    <>
      <header ref={headerRef} className={styles.headerStyleWrap}>
        <div>
          <div className={styles.HeaderLeft}>
            <h1 onClick={gotoPage("/")}>ByJuun.</h1>
            <IconButton
              Icon={<GithubIcon />}
              aria-label="gotoGithubButton"
              onClick={() => window.open("https://github.com/BY-juun")}
            />
            <IconButton Icon={<GoogleIcon />} aria-label="toggleEmailButton" onClick={onClickEmail} />
            <div ref={emailRef} className={styles.HeaderLeft_email}>
              {ADMIN_EMAIL}
            </div>
          </div>
          <div className={styles.HeaderRightWrapper}>
            <DarkModeButton />
            <div className={styles.HeaderRight}>
              <WriteButton />
              <SearchButton />
              {UserInfo ? (
                <>
                  <span>
                    <strong>{UserInfo?.nickname}</strong>님
                  </span>
                  <LogoutButton />
                </>
              ) : (
                <AccountButton />
              )}
            </div>
          </div>
          <div className={styles.headerStyleWrap_mobileBtn}>
            <DarkModeButton />
            <MobileMenu />
          </div>
        </div>
      </header>
      {isLoginModalOpen && <LoginModal setOpen={setIsLoginModalOpen} openSignUp={openSignUp} />}
      {isSignUpModalOpen && <SignUpModal setOpen={setIsSignUpModalOpen} />}
      {isSearchModalOpen && <SearchModal setOpen={setIsSearchModalOpen} />}
    </>
  );
};

export default HeaderWrap;
