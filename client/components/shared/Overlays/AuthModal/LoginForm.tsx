import React from "react";
import styles from "./styles.module.scss";
import { useLogin } from "@hooks/query";
import { toast } from "react-toastify";
import { MESSAGE } from "@constants";
import { UserFormDataType } from "@Types/user";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMsg, Input } from "@components/shared/Form";
import Button from "@components/shared/Form/Button";
interface Props {
  onClose: () => void;
  openSignUpModal: () => void;
}

type LoginFormType = Omit<UserFormDataType, "nickname">;

const LoginForm = ({ onClose, openSignUpModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>();

  const { mutate: loginMutate } = useLogin({
    onSuccess: () => {
      toast.success(MESSAGE.LOGIN_SUCCESS);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = ({ email, password }) => {
    loginMutate({ email, password });
  };

  return (
    <>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: MESSAGE.NEED_EMAIL,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "올바른 이메일 형식을 입력해주세요.",
            },
          })}
          data-testid="emailInput"
          placeholder="이메일"
        />
        {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        <Input
          {...register("password", { required: MESSAGE.NEED_PASSWORD })}
          data-testid="passwordInput"
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        <Button>로그인</Button>
      </form>
      <button className={styles.SignUpButton} onClick={openSignUpModal}>
        회원가입
      </button>
    </>
  );
};

export default LoginForm;
