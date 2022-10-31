// 注册每一个头像组件
import SQUARE_AVATAR from '@/material/Avatar/SquareAvatar.vue';
import RECTANGLE_AVATAR from '@/material/Avatar/RectangleAvatar.vue';
import CIRCLE_AVATAR from '@/material/Avatar/CircleAvatar.vue';
// 定义属性组件列表
const avatarComponents: any = {
  SQUARE_AVATAR: SQUARE_AVATAR,
  RECTANGLE_AVATAR: RECTANGLE_AVATAR,
  CIRCLE_AVATAR: CIRCLE_AVATAR
};
export default avatarComponents;
