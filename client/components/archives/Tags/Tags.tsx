import { useGetAllTags } from "Hooks/Tag";
import FontAppliedElement from "components/shared/FontAppliedElement";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useBooleanState } from "Hooks/useBooleanState";
import ShowMoreButton from "components/shared/ShowMoreButton/ShowMoreButton";

const Tags = () => {
  const [showMore, , , toggleShowMore] = useBooleanState(false);
  const data = useGetAllTags(showMore);

  if (!data) return null;

  return (
    <div className={styles.Tags}>
      <FontAppliedElement tagName="h3">
        🔗 Tags <span>({data.length})</span>
      </FontAppliedElement>
      <div className={styles.TagListWrap}>
        {data.map(({ content, Posts }) => (
          <Link key={content} href={`/?tag=${content}`}>
            <span>
              {content} ({Posts.length})
            </span>
          </Link>
        ))}
      </div>
      <ShowMoreButton toggleShowMore={toggleShowMore} showMore={showMore} />
    </div>
  );
};

export default Tags;
