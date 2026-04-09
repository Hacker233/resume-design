<template>
  <el-dialog
    v-model="dialogVisible"
    title="示例诊断报告"
    width="1000px"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    class="example-report-dialog"
    @close="handleClose"
    append-to-body
  >
    <div class="example-report-content">
      <img
        :key="imageKey"
        :src="imageUrl"
        alt="示例诊断报告"
        class="example-report-image"
        v-show="!isImageLoading"
        @load="handleImageLoad"
      />
      
      <div v-if="isImageLoading" class="image-loading">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>加载中...</span>
      </div>
      
      <!-- 回到顶部按钮 - Element Plus 实现 -->
      <el-backtop :right="30" :bottom="30" :visibility-height="50" target=".example-report-content" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Loading } from '@element-plus/icons-vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: 'https://maobucv.com:9000/resume/templatePreview/cv-report.png'
  }
});

const emit = defineEmits(['update:visible', 'close']);

const dialogVisible = ref(props.visible);
const isImageLoading = ref(true);
const imageKey = ref(Date.now()); // 用于刷新图片节点的 key

// 监听 visible 属性变化
watch(() => props.visible, (newValue) => {
  dialogVisible.value = newValue;
  if (newValue) {
    isImageLoading.value = true;
    // 关键点：每次打开时更新 key，确保 img 重新触发 @load
    imageKey.value = Date.now();
  }
});

// 监听 dialogVisible 变化，通知父组件
watch(dialogVisible, (newValue) => {
  emit('update:visible', newValue);
});

// 处理图片加载完成
const handleImageLoad = () => {
  isImageLoading.value = false;
};

// 处理弹窗关闭
const handleClose = () => {
  emit('close');
};
</script>

<style lang="scss">
/* 示例诊断报告对话框样式 */
.example-report-dialog {
  position: relative;
  
  .el-dialog__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 24px;
    border-radius: 12px 12px 0 0;
    
    .el-dialog__title {
      font-size: 18px;
      font-weight: 600;
      color: white;
    }
    
    .el-dialog__headerbtn .el-icon {
      color: white;
      font-size: 20px;
      
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  
  .el-dialog__body {
    padding: 0;
    overflow: hidden;
  }
  
  .el-dialog__footer {
    padding: 20px 24px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    border-radius: 0 0 12px 12px;
  }
  
  /* 隐藏弹窗的滚动条，只保留内容区的滚动条 */
  &.el-dialog {
    overflow: hidden;
  }
  
  /* 调整回到顶部按钮位置，使其显示在弹窗内部 */
  :deep(.el-backtop) {
    position: absolute !important;
    right: 30px !important;
    bottom: 30px !important;
    z-index: 100 !important;
  }
}

/* 示例诊断报告内容样式 */
.example-report-content {
  position: relative;
  width: 100%;
  min-height: 600px;
  max-height: 80vh;
  overflow-y: auto; // 保持滚动
  overflow-x: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  padding: 20px;    // 增加内边距，让图片不紧贴边缘
  
  /* 关键修改：去掉 display: flex 或改为 block */
  display: block;
}

.example-report-image {
  /* 确保图片宽度自适应，高度自动延长 */
  display: block;
  width: 100%;
  height: auto; 
  margin: 0 auto; // 水平居中
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  object-fit: contain; // 图片保持比例，不拉伸
  
  &:hover {
    transform: scale(1.001); // 缩放比例调小一点，防止溢出产生不必要的滚动条
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }
}

/* 图片加载状态 */
.image-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  
  .el-icon {
    font-size: 48px;
    color: #667eea;
  }
  
  span {
    font-size: 16px;
    color: #4a5568;
    font-weight: 500;
  }
}


</style>