import React, { useEffect } from "react";
import hljs from "highlight.js";
import Script from "next/script";
import styles from "./styles.module.scss";
import "highlight.js/styles/atom-one-dark.css";
import useGetTopics from "./useGetTopics";
import useAddClassName from "./useAddClassName";
import PostNavBar from "components/Block/Post/PostNavBar";

const PostContent = ({ content }: { content: string }) => {
  const { topicArr, loading } = useGetTopics();
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useAddClassName("pre", " hljs");

  return (
    <section className={styles.PostContent}>
      <Script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></Script>
      <article className={`Code ${styles.Content}`} dangerouslySetInnerHTML={{ __html: content }} />
      {!loading && <PostNavBar topicArr={topicArr} />}
    </section>
  );
};

export default PostContent;
