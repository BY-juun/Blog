import React, { useContext, useEffect, useMemo, useRef } from "react";
import useGotoPage from "Hooks/useGotoPage";
import { PostsType } from "Types/Post";
import { dateForm } from "utils/dateForm";
import { getThumbNail } from "utils/getThumbnail";
import { ThemeContext } from "utils/ThemeContext";
import { S3_PREFIX } from "utils/variable";
import PostTagBtn from "components/Atom/PostTagBtn";
import styles from "./styles.module.scss";
import Image from "next/image";

const PostCard = ({ post }: { post: PostsType }) => {
  const gotoPage = useGotoPage();
  const { theme } = useContext(ThemeContext);
  const defaultThumbNail = useMemo(() => getThumbNail(post.category), [post]);

  return (
    <section
      data-testid="postCard"
      className={`${styles.PostCard} ${styles[theme]}`}
      onClick={gotoPage(`/post/${post.id}`)}
    >
      <figure className={styles.PostCard_imgWrapper}>
        {post.thumbNailUrl && post.thumbNailUrl !== "null" ? (
          <Image src={post.thumbNailUrl} layout="fill" alt="category" placeholder="blur" blurDataURL={blurDataURL} />
        ) : (
          <picture>
            <source data-srcset={S3_PREFIX + defaultThumbNail.webp} type="image/webp" />
            <Image
              layout="fill"
              src={S3_PREFIX + defaultThumbNail.jpg}
              alt="category"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </picture>
        )}
      </figure>
      <article className={`${styles.PostCard_titleBox} ${styles[`${theme}titleBox`]}`}>
        <h2 className={styles.PostCard_titleBox_title}>{post.title}</h2>
        <ul className={styles.PostCard_titleBox_tagBox}>
          {post.Tags.length !== 0 && post.Tags.map((tag) => <PostTagBtn key={tag?.id} tag={tag} />)}
        </ul>
        <div className={styles.PostCard_titleBox_createdAt}>
          <time>{dateForm(post.createdAt)}</time>
          <span>조회수 : {post.views}</span>
        </div>
      </article>
    </section>
  );
};

export default PostCard;

const blurDataURL =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";
