import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import {
  PostTitle,
  PostDescription,
  PostTagList,
  PostComments,
  RoutePostButtons,
  PostListInSeries,
  Mdx,
  TableOfContents,
} from "@/components/post";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="py-6 prose dark:prose-invert">
        <PostTitle title={post.title} />
        <PostDescription description={post.description} />
        <PostTagList tags={post.tags} />
        <hr className="my-4" />
        <div className="relative">
          <PostListInSeries
            series={post.series}
            currentPostTitle={post.title}
          />
          <Mdx code={post.body.code} />
          <TableOfContents headings={post.headings} />
        </div>
        <RoutePostButtons title={post.title} category={post.category} />
        <PostComments />
      </article>
      <ScrollToTopButton />
    </>
  );
}
