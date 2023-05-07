import React from "react";
import { useMobileMenuContext } from "context/mobileMenuContext";
import styles from "./styles.module.scss";
import CloseIcon from "components/Icon/close";
import MobileMenuItem from "./menuItem";
import { Category } from "constants/category";
import { useGetUserInfo } from "Hooks/User";
import IconButton from "components/shared/IconButton/IconButton";

const NotLoggedInMenu = ["검색", "로그인", "회원가입"];
const LoggedInMenu = ["검색", "로그아웃", ""];

const Menu = () => {
  const { data: userData } = useGetUserInfo();
  const { showMobileMenu, toggleShowMobileMenu } = useMobileMenuContext();

  const isLoggedIn = !!userData;
  const MobileMenu = isLoggedIn ? [...LoggedInMenu, ...Category] : [...NotLoggedInMenu, ...Category];

  if (!showMobileMenu) return null;

  return (
    <nav className={styles.MobileMenu}>
      <IconButton
        onClick={toggleShowMobileMenu}
        className={styles.closeButton}
        Icon={<CloseIcon />}
        aria-label="menuCloseButton"
      />
      <div className={styles.menuWrap}>
        {MobileMenu.map((menu) => (
          <MobileMenuItem menu={menu} key={menu} />
        ))}
      </div>
    </nav>
  );
};

export default Menu;
