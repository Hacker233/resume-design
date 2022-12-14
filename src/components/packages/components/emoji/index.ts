import { withInstall } from '../../util/index';
import emojiVue from './emoji.vue';

export * from './interface';
export type EmojiInstance = InstanceType<typeof emojiVue>;
export const UEmoji = withInstall(emojiVue);
export default UEmoji;
