import { PostPOM_MockAPIParams } from "./POM/post";
import { PostsPOM_MockAPIParams } from "./POM/posts";
import { WritePOM_MockAPIParams } from "./POM/write";

type MockAPIParams = PostsPOM_MockAPIParams &
  PostPOM_MockAPIParams &
  WritePOM_MockAPIParams;

export type PipeParams<T> = { data: T; feature: MockAPIParams };

export type FuncsType<T> = ({ data, feature }: PipeParams<T>) => PipeParams<T>;
