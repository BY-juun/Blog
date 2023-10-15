import React from "react";
import styles from "./styles.module.scss";
import { PostListPageDataType } from "@Types";
import Link from "next/link";
import { S3_PREFIX, THUMBNAIL } from "@constants";
import Image from "next/image";
import TagButton from "components/shared/tagButton";
import { AiOutlineEye } from "react-icons/ai";
import PostCardSkeleton from "./Skeleton";
import CustomWebPImage from "components/shared/CustomWebPImage";
import { DATE_FORM, convertDateToString, isNull } from "@utils";

interface Props {
  post: PostListPageDataType;
}

const PostCard = ({ post }: Props) => {
  const {
    thumbNailUrl,
    title,
    category,
    shortDescription = "",
    createdAt,
  } = post;
  const isThumbNailExist = !isNull(thumbNailUrl);

  return (
    <Link href={`/post/${post.id}`} className={styles.PostCard}>
      <figure className={styles.thumbnailImgWrapper}>
        {isThumbNailExist ? (
          <Image
            src={thumbNailUrl as string}
            fill
            alt="category"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        ) : (
          <CustomWebPImage
            webPSrc={S3_PREFIX + THUMBNAIL[category]?.webp}
            fallbackSrc={S3_PREFIX + THUMBNAIL[category]?.jpg}
            alt="thumbNail"
          />
        )}
      </figure>
      <article className={styles.articleWrap}>
        <div>
          <h2>{title}</h2>
          <ul className={styles.tagListWrap}>
            {post.Tags.length !== 0 &&
              post.Tags.map((tag) => (
                <TagButton key={`${post.title}#${tag?.content}`} tag={tag} />
              ))}
          </ul>
          <div className={styles.shortDescription}>
            {post.isPublic ? (
              <span>{shortDescription}</span>
            ) : (
              <>
                <span className={styles.prepare}>준비중인 포스트입니다</span>
                <span>📝</span>
              </>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <time>
            {" "}
            {convertDateToString({
              date: createdAt,
              converter: DATE_FORM["ko"],
            })}
          </time>
          <div>
            <AiOutlineEye />
            <span> {post.isPublic ? post.views : 0}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

PostCard.Skeleton = PostCardSkeleton;

export default PostCard;

const blurDataURL =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";
