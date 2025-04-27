<template>
  <el-dialog
    :model-value="dialogContactVisible"
    width="500px"
    title="添加微信立即咨询"
    :show-close="true"
    :close-on-click-modal="true"
    append-to-body
    @close="cancle"
  >
    <div v-viewer class="resume-contact-dialog-box">
      <div class="left">
        <img :src="props.vxQun" alt="微信交流群" title="微信交流群" loading="lazy" />
        <h2>猫步简历交流群</h2>
      </div>
      <div class="right">
        <img :src="props.wx" alt="个人微信" title="个人微信" loading="lazy" />
        <h2>添加微信（备注：猫步简历）</h2>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogContactVisible: boolean;
    vxQun: string;
    wx: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogContactVisible: false,
    vxQun: '',
    wx: ''
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };
</script>

<style lang="scss">
  .resume-contact-dialog-box {
    display: flex;
    justify-content: space-between; // 左右两部分分开对齐
    align-items: center; // 垂直居中对齐
    gap: 16px; // 调整左右部分之间的间距
    padding: 20px 0; // 增加上下内边距，提升整体高度

    .left,
    .right {
      text-align: center; // 内容居中
      width: calc(50% - 8px); // 每个部分占一半宽度，减去间距的一半

      img {
        width: 130px; // 二维码图片宽度
        height: 130px; // 二维码图片高度
        object-fit: cover; // 确保图片比例不失真
        border: 1px solid #eaeaea; // 添加边框，提升视觉效果
        border-radius: 6px; // 圆角效果
        margin-bottom: 8px; // 图片与文字之间的间距
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06); // 添加阴影效果
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; // 添加悬停动画

        &:hover {
          transform: translateY(-2px); // 悬停时轻微上移
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1); // 加深阴影
        }
      }

      h2 {
        font-size: 14px; // 字体大小
        color: #333; // 标题颜色
        margin: 0; // 去掉默认外边距
        line-height: 1.4; // 提升文字行高，增强可读性
        margin-top: 15px;
      }
    }
  }

  /* 弹窗样式 */
  ::v-deep(.el-dialog) {
    min-height: 300px; // 设置最小高度，确保弹窗不过于紧凑
    max-height: 400px; // 最大高度限制
    overflow-y: auto; // 如果内容过多则允许滚动
    border-radius: 10px; // 给弹窗本身添加圆角
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1); // 弹窗阴影
  }

  ::v-deep(.el-dialog__header) {
    padding: 16px 20px; // 调整标题区域的内边距
    background-color: #f9f9f9; // 浅色背景，突出标题
    border-top-left-radius: 10px; // 匹配弹窗圆角
    border-top-right-radius: 10px;

    .el-dialog__title {
      font-size: 18px; // 标题字体大小
      color: #333; // 标题颜色
      font-weight: bold; // 加粗显示
    }
  }

  ::v-deep(.el-dialog__body) {
    padding: 20px; // 身体内边距调整
  }
</style>
