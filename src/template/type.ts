interface ITempList {
  ONLINE_LINK: string;
  _id: string;
  ID: string;
  NAME: string;
  previewUrl: string;
  LIKES: number;
  VIEWS: number;
  commentCount: number;
  userInfo: {
    name: string;
    userId: string;
    avatar: string;
  };
}

export { ITempList };
