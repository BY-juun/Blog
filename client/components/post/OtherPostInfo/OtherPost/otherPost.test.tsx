import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import OtherPost from ".";
import { createMockRouter } from "utils/test/createMockRouter";
import { renderWithContext } from "utils/test/renderWithContext";

describe("<OtherPost />", () => {
  const defaultProps = {
    mode: "next",
    Post: {
      OtherId: 10,
      OtherCreatedAt: new Date(),
      OtherTitle: "testPost",
    },
  };

  it("rendering test", () => {
    renderWithContext(<OtherPost Post={defaultProps.Post} mode={defaultProps.mode} />);
    expect(screen.getByText("다음게시글")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.Post.OtherTitle)).toBeInTheDocument();
  });

  it("click and gotoPost function test", () => {
    renderWithContext(<OtherPost Post={defaultProps.Post} mode={defaultProps.mode} />);

    const otherPost = screen.getByTestId("OtherPost");
    fireEvent.click(otherPost);
  });

  it("test with no post", () => {
    const router = createMockRouter();
    const props = {
      mode: "prev",
      Post: {
        OtherId: null,
        OtherCreatedAt: new Date(),
        OtherTitle: "testPost",
      },
    };
    renderWithContext(<OtherPost Post={props.Post} mode={props.mode} />, router);

    expect(screen.getByText("이전게시글")).toBeInTheDocument();
    const otherPost = screen.getByTestId("OtherPost");
    fireEvent.click(otherPost);

    //이전, 이후 포스트가 없다면, 클릭 시 이동을 하지 않아야 함.
    expect(router.push).not.toBeCalled();
  });
});
