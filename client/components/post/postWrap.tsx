import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import PostTop from "./PostHeader";
import PostContent from "./PostContent";
import { MainPost } from "Types/post";
import { PostContainer } from "context/postContext";
import Utterances from "./Utterances";
import RoutePostButtons from "./RoutePostButtons";

interface PostWrapProps {
  children: ReactNode;
  Post: MainPost;
}

const PostWrap = Object.assign(
  ({ children, Post }: PostWrapProps) => (
    <PostContainer Post={Post}>
      <main className={styles.PostWrap}>{children}</main>
    </PostContainer>
  ),
  {
    Header: PostTop,
    Content: PostContent,
    RoutePostButtons: RoutePostButtons,
    Utterances: Utterances,
  }
);

export default PostWrap;
