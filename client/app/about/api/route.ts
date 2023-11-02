import { NotionAPI } from "notion-client";

const NOTION_PAGE_ID = "on-Website-8f7d18bbf99644dbac7129dfd252e373?pvs=4";

export async function GET() {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(NOTION_PAGE_ID);

  return Response.json(recordMap);
}
