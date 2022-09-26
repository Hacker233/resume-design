interface ITempList {
  ID: string;
  NAME: string;
  previewUrl: string;
  resumeActive: { views: number; likes: number };
  userInfo: {
    name: string;
    userId: string;
    avatar: string;
  };
}

export { ITempList };
