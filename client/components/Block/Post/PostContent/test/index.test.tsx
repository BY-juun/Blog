import { render, screen } from "@testing-library/react";
import React from "react";
import PostContent from "..";

describe("<PostContent />", () => {
  const props = {
    content: "<h1>testTitle1</h1><h2>testTitle2</h2><p>testContent</p>",
  };
  it("rendering test", async () => {
    render(<PostContent content={props.content} />);
    expect(screen.getByText("testContent")).toBeInTheDocument();
  });
});
