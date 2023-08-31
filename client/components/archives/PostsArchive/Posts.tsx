import React from "react";
import styles from "./styles.module.scss";
import useArchivePosts from "./useArchivePosts";
import Link from "next/link";

const PostsArchive = () => {
  const data = useArchivePosts();

  if (!data) return null;

  const years = sortByYearDesc(Object.keys(data));

  return (
    <div>
      <div className={styles.PostsListWrap}>
        {years.map((year) => (
          <div className={styles.PostsList} key={year}>
            <h3>
              {year} ({data[year].length})
            </h3>
            <div className={styles.Posts}>
              {data[year].map(({ title, date, id }) => (
                <Link href={`/post/${id}`} className={styles.Post} key={title}>
                  <div className={styles.date}>{date}</div>
                  <span className={styles.title}>{title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const sortByYearDesc = (keys: string[]) =>
  keys.sort((a, b) => Number(b) - Number(a));

export default PostsArchive;
