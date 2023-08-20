import { useGetPostViewCount } from "Hooks/Post";
import React from "react";
import styles from "./styles.module.scss";
import useQueryId from "Hooks/useQueryId";
import LoadingOrNot from "components/shared/LoadingOrNot";

const PostViewCount = () => {
  const postId = useQueryId();

  const { data: viewCount, isLoading } = useGetPostViewCount(postId);

  return (
    <div className={styles.viewCountWrapper}>
      <LoadingOrNot isLoading={isLoading}>
        <span>조회수 : {Number(viewCount) + 1}</span>
      </LoadingOrNot>
    </div>
  );
};

export default PostViewCount;
