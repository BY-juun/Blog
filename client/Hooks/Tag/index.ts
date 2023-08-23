import { useQuery } from "react-query";
import CACHE_OPTION from "constants/cacheOption";
import QUERY_KEY from "constants/queryKey";
import { getAllTags } from "services/tag";
import { ArchiveTagType } from "Types/Tag";
import { useEffect, useState } from "react";

export const useGetAllTags = (showMore: boolean) => {
  const [tags, setTags] = useState<ArchiveTagType[]>([]);

  const { data } = useQuery<ArchiveTagType[]>(
    [QUERY_KEY.TAG.RECENT],
    () => getAllTags(),
    CACHE_OPTION.ALL
  );

  useEffect(() => {
    if (data) setTags(data);
  }, [data]);

  return showMore ? tags : tags.slice(0, 20);
};
