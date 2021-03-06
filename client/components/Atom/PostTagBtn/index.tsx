import { useRouter } from "next/router";
import React, { useCallback, useContext } from "react";
import { TagType } from "../../../Types/Post";
import { ThemeContext } from "../../../utils/ThemeContext";
import styles from "./styles.module.scss";

const PostTagBtn = ({ tag }: { tag: TagType | null }) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const onClickTag = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string) => {
      e.stopPropagation();
      return router.push({
        pathname: "/filter",
        query: { tag: tag },
      });
    },
    [router]
  );

  return (
    <button className={`${styles.PostTagButton} ${styles[theme]}`} onClick={(e) => onClickTag(e, String(tag?.content))}>
      #{tag?.content}
    </button>
  );
};

export default React.memo(PostTagBtn);
