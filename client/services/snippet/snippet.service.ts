import { SnippetFormType, SnippetType } from "Types/snippets";
import request from "services/request";

export const addSnippetAPI = async (reqData: SnippetFormType) =>
  request({ method: "post", url: "/snippet", body: reqData });

export const editSnippetAPI = async ({ snippetId, ...reqData }: SnippetFormType & { snippetId: number }) =>
  request({ method: "patch", url: `/snippet/${snippetId}`, body: reqData });

export const getAllSnippetsAPI = async () =>
  request<Pick<SnippetType, "id">[]>({ method: "get", url: "/snippet/load/id" });

export const getSnippetAPI = async (snippetId: number) =>
  request<SnippetType>({ method: "get", url: `/load/${snippetId}` });
