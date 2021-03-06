import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import Script from "next/script";
import styles from "./styles.module.scss";
import "highlight.js/styles/atom-one-dark.css";
import useGetTopicArr from "../../../../Hooks/useGetTopicArr";

import useAddClassName from "../../../../Hooks/useAddClassName";
import PostNavBar from "../PostNavBar";
const PostContent = ({ content }: { content: string }) => {
  const [topicArr, setTopicArr] = useState([]);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useAddClassName("pre", " hljs");
  useGetTopicArr(setTopicArr);

  return (
    <div className={styles.PostContent}>
      <Script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></Script>
      <div className={`Code ${styles.Content}`} dangerouslySetInnerHTML={{ __html: content }}></div>
      <PostNavBar topicArr={topicArr} />
    </div>
  );
};

export default PostContent;
