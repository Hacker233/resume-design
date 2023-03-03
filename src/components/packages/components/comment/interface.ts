import { InjectionKey, Ref } from 'vue';
import { EmojiApi } from '../emoji/interface';

export interface CommentSubmitParam {
  content: string;
  parentId: string | null;
  finish: () => void;
  closeLoading: () => void;
}

export interface CommentApi {
  id: string | number;
  parentId: string | number | null;
  uid: string | number;
  username: string;
  avatar: string;
  level: number;
  link: string;
  address: string;
  content: string;
  like: number;
  createTime: string;
  reply?: ReplyApi | null;
}

export interface UserApi {
  id: string | number;
  username: string;
  avatar: string;
  likeIds: string[] | number[];
}

export interface ReplyApi {
  total: number;
  list: CommentApi[];
}

export interface ConfigApi {
  user: UserApi;
  emoji: EmojiApi;
  comments: CommentApi[];
}

export interface ReplyPageParam {
  parentId: string | number;
  pageNum: number;
  pageSize: number;
  finish: (comments: CommentApi[]) => void;
}

export interface ReplyParam {
  replyPage: (
    parentId: string,
    pageNum: number,
    pageSize: number,
    finish: (comments: CommentApi[]) => void
  ) => void;
  page: boolean;
  showSize: number;
  comments: Ref<CommentApi[]>;
}

export interface ContentBoxParam {
  isUserInfo: boolean;
  user: Ref<UserApi>;
  like: (id: string) => void;
  /**
   * 返回用户id，show回调是否显示用户信息卡片
   */
  getUser: (uid: string, show: Function) => void;
  report: (id: string, finish: () => void) => void;
  remove: (id: string, parentId: string | null, finish: () => void) => void;
}

export const InjectionCommentFun: InjectionKey<(obj: CommentSubmitParam) => void> = Symbol();
export const InjectionReply: InjectionKey<ReplyParam> = Symbol();
export const InjectionContentBox: InjectionKey<ContentBoxParam> = Symbol();
