import { withInstall } from '../../util/index';
import commentVue from './src/comment.vue';

export * from './interface';
export type CommentInstance = InstanceType<typeof commentVue>;
export const UComment = withInstall(commentVue);
export default UComment;
