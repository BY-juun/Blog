import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import CategorySelect from "../components/Block/CategorySelect";
import Pagination from "../components/Block/Pagination";
import Posts from "../components/Block/Posts";
import AdditionalInfoSectionRight from "../components/Block/AdditionalInfoSectionRight";
import { useGetPostNum, useGetMainPost } from "../Hooks/Post";
import styles from "./styles.module.scss";
import AdditionalInfoSectionLeft from "../components/Block/AdditionalInfoSectionLeft";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { data: totalPageNum } = useGetPostNum("main");
  const { data: MainPosts, isLoading } = useGetMainPost(Number(query.page) || 1);
  return (
    <>
      <Head>
        <meta name="description" content="π¨βπ» μλνμΈμ μ¬μ©μ μΉνμ μΈ μλΉμ€λ₯Ό κ°λ°νκ³  μΆμ κ°λ°μ μλ³μ€μ λΈλ‘κ·Έμλλ€." />
        <meta property="og:title" content="By_juun.com" />
        <meta property="og:description" content="π¨βπ» μλνμΈμ μ¬μ©μ μΉνμ μΈ μλΉμ€λ₯Ό κ°λ°νκ³  μΆμ κ°λ°μ μλ³μ€μ λΈλ‘κ·Έμλλ€." />
        <meta property="og:image" content={"https://s3.ap-northeast-2.amazonaws.com/byjuun.com/original/Original.png"} />
        <meta property="og:url" content="https://byjuun.com" />
      </Head>
      <div className={styles.HomeWrapper}>
        <AdditionalInfoSectionLeft />
        <div className={styles.HomeContentWrapper}>
          <CategorySelect />
          <Posts posts={MainPosts} isLoading={isLoading} />
          <Pagination totalPage={totalPageNum} />
        </div>
        <AdditionalInfoSectionRight />
      </div>
    </>
  );
};

export default Home;
