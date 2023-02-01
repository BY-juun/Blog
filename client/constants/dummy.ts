export const DummyUser = {
  createdAt: "2022-05-25T12:19:28.000Z",
  email: "test@test.com",
  id: 1,
  nickname: "testNickname",
};

export const DummyPost = {
  mainPost: {
    id: 1,
    title: "testPost",
    category: "testCategory",
    content: "testContent",
    thumbNailUrl: "/test.png",
    views: 10,
    createdAt: new Date("2022-11-13T06:26:45.837Z"),
    Tags: [
      { content: "tag1", id: 10 },
      { content: "tag2", id: 20 },
      { content: "tag3", id: 30 },
    ],
  },
  prevPost: {
    OtherId: 2,
    OtherTitle: "prevTestPost",
    OtherCreatedAt: "2022-05-25T12:19:30.000Z",
  },
  nextPost: {
    OtherId: 3,
    OtherTitle: "nextTestPost",
    OtherCreatedAt: "2022-05-25T12:19:32.000Z",
  },
};