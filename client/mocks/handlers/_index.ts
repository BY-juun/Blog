import { getOnePost, postComment } from "./post";
import { getUserInfo } from "./user";

export const handlers = [getUserInfo, postComment, getOnePost];
