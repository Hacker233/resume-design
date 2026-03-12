<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <div class="card-image">
      <img :src="type === 'old' ? cardData.previewUrl : cardData.template_cover" alt="简历预览" srcset="" />
      <div class="card-badge" v-if="cardData.is_new">
        新
      </div>
    </div>
    <div class="card-info">
      <h4 class="card-title">{{ getResumeTitle(cardData) }}</h4>
      <p class="card-date">{{ formatDate(cardData.create_time || cardData.created_at) }}</p>
    </div>
    <!-- 遮罩层 -->
    <div v-show="isShowLayer" class="mask-layer">
      <div class="delete-box" @click="deleteUserResume">
        <svg-icon icon-name="icon-shanchu" color="#fff" size="20px"></svg-icon>
      </div>
      <div class="action-buttons">
        <div class="design-button" @click="toDesign">
          <svg-icon icon-name="icon-bianji" color="#fff" size="14px" />
          继续编辑
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { openGlobalLoading } from '@/utils/common';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { formatListDate } from '@/utils/common';

  const props = defineProps<{
    cardData: any;
    type: string;
  }>();
  const emit = defineEmits(['delete']);

  // 鼠标移入显示遮罩层
  let isShowLayer = ref<boolean>(false);
  const mouseover = () => {
    isShowLayer.value = true;
  };
  const mouseleave = () => {
    isShowLayer.value = false;
  };

  // 格式化日期
  const formatDate = (date: string) => {
    if (!date) return '';
    return formatListDate(date);
  };

  // 获取简历标题
  const getResumeTitle = (cardData: any) => {
    if (cardData.template_json && cardData.template_json.config && cardData.template_json.config.title) {
      return cardData.template_json.config.title;
    }
    return cardData.template_name || '未命名简历';
  };

  // 点击继续制作
  const { resetResumeJson } = appStore.useCreateTemplateStore;
  const { selectedModuleId } = storeToRefs(appStore.useCreateTemplateStore);
  const router = useRouter();
  const toDesign = () => {
    console.log(props.cardData);
    if (props.type === 'old') {
      router.push({
        path: '/designer',
        query: {
          id: props.cardData.ID
        }
      });
    } else {
      openGlobalLoading(); // 等待动画层
      resetResumeJson(); // 重置json数据
      selectedModuleId.value = ''; // 重置选中模块
      router.push({
        path: `/designResume/${props.cardData.template_id}`
      });
    }
  };



  // 点击删除简历
  const deleteUserResume = async () => {
    ElMessageBox.confirm('删除该简历后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        if (props.type === 'old') {
          emit('delete', props.cardData.ID);
        } else {
          emit('delete', props.cardData._id);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .template-card-box {
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    position: relative;
    z-index: 0;
    user-select: none;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
    
    .card-image {
      position: relative;
      height: 300px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
        background-color: #f8f9fa;
      }
      
      &:hover img {
        transform: scale(1.03);
      }
      
      .card-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        z-index: 2;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
    }
    
    .card-info {
      padding: 10px 10px;
      
      .card-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
      }
      
      .card-date {
        font-size: 12px;
        color: #999;
      }
    }
    
    .mask-layer {
      height: 100%;
      width: 100%;
      border-radius: 16px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.7);
      transition: all 0.3s ease;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      .delete-box {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.25);
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transform: scale(1.15);
        }
      }
      
      .action-buttons {
        display: flex;
        justify-content: center;
        width: 65%;
        
        .design-button {
          padding: 14px 0;
          font-size: 14px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s ease;
          gap: 10px;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 100%;
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
          }
        }
      }
    }
  }
  
  .previewImg {
    height: 90vh;
  }
</style>
