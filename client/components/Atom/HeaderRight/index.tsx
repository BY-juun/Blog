import React, { useCallback, useState } from "react";
import useGotoPage from "../../../Hooks/useGotoPage";
import useOpenModal from "../../../Hooks/useOpenModal";
import { useGetUserInfo, useLogOut } from "../../../Hooks/User";
import LoginModal from "../../Block/LoginModal";
import SearchModal from "../../Block/SearchModal";
import SignUpModal from "../../Block/SignUpModal";
import styles from "./styles.module.scss";

const HeaderRight = () => {
  const { data: UserInfo } = useGetUserInfo();
  const gotoPage = useGotoPage();
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [onClickLogin, onClickSignUp, onClickSearch] = useOpenModal(setOpenLogin, setOpenSignUp, setOpenSearch);

  const LogoutMutation = useLogOut();

  const LogOut = useCallback(() => {
    LogoutMutation.mutate();
  }, []);

  return (
    <>
      <div className={styles.HeaderRight}>
        {UserInfo?.nickname === "By_juun" && <span onClick={gotoPage("/Write")}>글 작성</span>}
        <span onClick={onClickSearch}>검색</span>
        {UserInfo === null ? (
          <>
            <span onClick={onClickLogin}>로그인</span>
            <span onClick={onClickSignUp}>회원가입</span>
          </>
        ) : (
          <>
            <span>{UserInfo?.nickname}님</span>
            <span onClick={LogOut}>로그아웃</span>
          </>
        )}
      </div>
      {openLogin && <LoginModal open={openLogin} setOpen={setOpenLogin} />}
      {openSignUp && <SignUpModal open={openSignUp} setOpen={setOpenSignUp} />}
      {openSearch && <SearchModal open={openSearch} setOpen={setOpenSearch} />}
    </>
  );
};

export default HeaderRight;