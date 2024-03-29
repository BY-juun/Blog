import { Post, allPosts } from "contentlayer/generated";
import { groupBy } from "./array";

export const allPostsSortedByDate = sortedPosts(allPosts);

export function dateSortDesc(a: string, b: string, reverse: boolean) {
  if (a > b) return reverse ? 1 : -1;
  if (a < b) return reverse ? -1 : 1;
  return 0;
}

export function sortedPosts(posts: Post[], reverse = false) {
  return posts.sort((a, b) => dateSortDesc(a.date, b.date, reverse));
}
function getCurrentPostIdxInPostList(postList: Post[], post: Post) {
  return postList.findIndex((v) => v.title === post.title);
}

function getNextPostInPostList(postList: Post[], currentPostIdx: number) {
  return currentPostIdx === postList.length - 1
    ? null
    : postList[currentPostIdx + 1];
}

function getPrevPostInPostList(postList: Post[], currentPostIdx: number) {
  return currentPostIdx === 0 ? null : postList[currentPostIdx - 1];
}

function getSameSeriesPost(series: Required<Post["series"]>) {
  return sortedPosts(
    allPosts.filter((post) => post.series === series),
    true
  );
}

function getSameCategoryPost(category: Post["category"]) {
  return sortedPosts(
    allPosts.filter((post) => post.category === category),
    true
  );
}

let categories: { text: string; count: number }[] | null = null;

export function getCategories() {
  if (categories) {
    return categories;
  } else {
    categories = Object.entries(groupBy(allPosts, "category"))
      .map(([category, posts]) => ({
        text: category,
        count: posts.length,
      }))
      .sort((a, b) => b.count - a.count);

    return categories;
  }
}

export function getSeriesInfoWithPost(post: Post) {
  const postListInSeries = getSameSeriesPost(post.series);
  const currentPostIdx = getCurrentPostIdxInPostList(postListInSeries, post);
  const prevPost = getPrevPostInPostList(postListInSeries, currentPostIdx);
  const nextPost = getNextPostInPostList(postListInSeries, currentPostIdx);
  return {
    postListInSeries,
    currentPostIdx,
    prevPost,
    nextPost,
  };
}

export function getNextAndPrevPostInSameCategory(post: Post) {
  const postsInSameCategory = getSameCategoryPost(post.category);
  const currentPostIdx = getCurrentPostIdxInPostList(postsInSameCategory, post);
  const prevPost = getPrevPostInPostList(postsInSameCategory, currentPostIdx);
  const nextPost = getNextPostInPostList(postsInSameCategory, currentPostIdx);

  return {
    prevPost,
    nextPost,
  };
}
