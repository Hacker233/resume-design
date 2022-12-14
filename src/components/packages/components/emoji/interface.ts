import { InjectionKey } from 'vue';

export interface Emoji {
  [key: string]: string;
}
export interface EmojiApi {
  faceList: string[];
  emojiList: Emoji[];
  allEmoji: Emoji;
}

export const InjectionEmojiApi: InjectionKey<EmojiApi> = Symbol();
