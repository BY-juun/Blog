import React, { useCallback, useRef } from "react";
import styles from "./styles.module.scss";
import WriteButton from "./writeButton";
import AuthButton from "./AuthButton";
import { useGetUserQuery } from "Hooks/User";
import ThemeToggleButton from "./ThemeToggleButton";
import useScroll from "Hooks/useScroll";
import Logo from "./Logo";
import PageNavigaition from "./PageNavigaition";
import MobileMenuToggleButton from "./MobileMenuToggleButton";

const HEADER_HEIGHT = "65px";

const Header = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  const { data: userData } = useGetUserQuery();

  const isLoggedIn = !!userData;

  const hideHeader = useCallback(() => {
    if (!headerRef?.current) {
      return;
    }
    headerRef.current.style.marginTop = `-${HEADER_HEIGHT}`;
  }, []);

  const showHeader = useCallback(() => {
    if (!headerRef?.current) {
      return;
    }
    headerRef.current.style.marginTop = "0px";
  }, []);

  useScroll({ onScrollDown: hideHeader, onScrollUp: showHeader });

  return (
    <header ref={headerRef} className={styles.headerStyleWrap}>
      <div className={styles.headerContentWrap}>
        <Logo />
        <div className={styles.headerRightWrap}>
          {isLoggedIn && (
            <span>
              <strong>{userData.nickname}</strong>님
            </span>
          )}
          <PageNavigaition />
          <WriteButton />
          <AuthButton isLoggedIn={isLoggedIn} />
          <ThemeToggleButton />
          <MobileMenuToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
