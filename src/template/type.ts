interface ITempList {
  _id: string;
  ID: string;
  NAME: string;
  previewUrl: string;
  LIKES: number;
  VIEWS: number;
  userInfo: {
    name: string;
    userId: string;
    avatar: string;
  };
}

export { ITempList };
