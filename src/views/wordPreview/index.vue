<!-- word模板预览页 -->
<template>
  <div class="word-preview-container">
    <!-- 页面头部 -->
    <div class="preview-header">
      <div class="container">
        <h1 class="template-title">{{ wordInfo.name }}</h1>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="container main-content">
      <div class="content-grid">
        <!-- 图片预览区域 -->
        <div class="preview-section">
          <div class="preview-wrapper">
            <!-- 图片列表 -->
            <div class="thumbnail-list">
              <c-scrollbar trigger="hover" style="height: 600px">
                <div
                  v-for="(item, index) in wordInfo.previewUrl"
                  :key="index"
                  :class="['thumbnail-item', { active: currentIndex === index }]"
                  @click="selectPreUrl(item, index)"
                >
                  <el-image class="thumbnail-img" :src="item.url" fit="cover" />
                </div>
              </c-scrollbar>
            </div>
            
            <!-- 图片大图展示 -->
            <div class="main-preview">
              <div class="preview-card">
                <el-image class="preview-img" :src="bigPreviewUrl" fit="contain" />
              </div>
            </div>
          </div>
        </div>

        <!-- 模板信息介绍页 -->
        <div class="info-section">
          <!-- 操作区 -->
          <div class="action-card">
            <div class="stats-container">
              <div class="stat-item">
                <svg-icon icon-name="icon-xiazailiang" color="#6c63ff" size="20px"></svg-icon>
                <span class="stat-value">{{ wordInfo.downloads }}</span>
                <span class="stat-label">下载量</span>
              </div>
              <div class="stat-item">
                <svg-icon icon-name="icon-liulanliang1" color="#6c63ff" size="20px"></svg-icon>
                <span class="stat-value">{{ wordInfo.views }}</span>
                <span class="stat-label">浏览量</span>
              </div>
              <div v-config:open_comment class="stat-item">
                <svg-icon icon-name="icon-pinglun1" color="#6c63ff" size="20px"></svg-icon>
                <span class="stat-value">{{ wordInfo.commentCount }}</span>
                <span class="stat-label">评论</span>
              </div>
            </div>
            
            <div class="download-section">
              <div class="price-info" v-if="!userInfo.isAllFree && (!membershipInfo.hasMembership || membershipInfo.isExpired) && !isPay">
                <span class="price-value">{{ Math.abs(wordInfo.payValue) || '' }}</span>
                <img class="coin-icon" width="20" src="@/assets/images/jianB.png" alt="简币" />
              </div>
              <button class="download-btn" @click="download">
                <span>立即下载</span>
              </button>
            </div>
          </div>

          <!-- 详细信息展示区 -->
          <div class="info-card">
            <h2 class="info-title">简历信息</h2>
            <div class="info-item">
              <span class="info-label">简介</span>
              <p class="info-content">{{ wordInfo.profile }}</p>
            </div>
            <div class="info-item">
              <span class="info-label">分类</span>
              <div class="tag-list">
                <span v-for="(item, index) in wordInfo.category" :key="index" class="tag-item">{{
                  getCategoryLabel(item)
                }}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-label">标签</span>
              <div class="tag-list">
                <span v-for="(item, index) in wordInfo.tags" :key="index" class="tag-item">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播图 -->
      <div class="carousel-section">
        <word-carousel
          v-if="wordInfo.previewUrl"
          :preview-url-list="wordInfo.previewUrl"
        ></word-carousel>
      </div>

      <!-- 评论组件 -->
      <div v-config:open_comment class="comment-section">
        <div class="comment-header">
          <h2 class="comment-title">
            <svg-icon icon-name="icon-pinglun1" color="#6c63ff" size="20px"></svg-icon>
            <span>用户评论</span>
          </h2>
        </div>
        <comment-com
          width="100%"
          :comment-type-id="id"
          comment-type="resumeTemplate"
        ></comment-com>
      </div>
    </div>

    <!-- 下载警告弹窗 -->
    <pay-integral-dialog
      :dialog-get-integral-visible="dialogGetIntegralVisible"
      :title="`确定消费简币下载模板？只需一次支付，即可多次下载！`"
      btn-text="确认下载"
      :confirm-disabled="confirmDisabled"
      :confirm-tip="confirmTip"
      @cancle="cancleDialog"
      @confirm="confirmDialog"
    ></pay-integral-dialog>

    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />
  </div>

  <FooterCom />
</template>
<script lang="ts" setup>
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import WordCarousel from './components/WordCarousel.vue';
  import {
    getWordCategoryListAsync,
    getWordTemplateInfoAsync,
    wordDownloadUrl
  } from '@/http/api/wordTemplate';
  import { downloadFileUtil } from '@/utils/common';
  import appStore from '@/store';
  import { useUserIsPayGoods } from '@/hooks/useUsrIsPayGoods';
  import { storeToRefs } from 'pinia';
  import { title } from '@/config/seo';
  import { useHead } from '@vueuse/head';

  // 获取用户会员信息
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);

  // 获取用户信息
  const { userInfo } = storeToRefs(appStore.useUserInfoStore);

  // 获取word模板id
  const route = useRoute();
  const id = route.params.id;
  const currentIndex = ref<number>(-1); // 选中哪一张预览图

  // 查询模板详细信息
  const wordInfo = ref<any>([]);
  const getWordTemplateInfo = async () => {
    const data = await getWordTemplateInfoAsync(id);
    if (data.status === 200) {
      wordInfo.value = data.data;
      wordInfo.value.previewUrl = JSON.parse(wordInfo.value.previewUrl);
      bigPreviewUrl.value = wordInfo.value.previewUrl[0].url;
      currentIndex.value = 0;
      // 设置seo
      useHead({
        title: wordInfo.value.name || title
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getWordTemplateInfo();

  // 查询word模板分类列表
  const categoryList = ref<any>({});
  const getWordCategoryList = async () => {
    const data = await getWordCategoryListAsync();
    if (data.status === 200) {
      data.data.forEach((item: any) => {
        categoryList.value[item._id] = item.name;
      });
    } else {
      ElMessage.error(data.message);
    }
  };
  getWordCategoryList();

  // 返回分类名称
  const getCategoryLabel = (id: string) => {
    console.log('categoryList', categoryList.value);
    if (categoryList.value) {
      return categoryList.value[id];
    }
  };

  // 图片预览大图
  const bigPreviewUrl = ref<string>('');
  // 点击预览图
  const selectPreUrl = (item: any, index: number) => {
    bigPreviewUrl.value = item.url;
    currentIndex.value = index;
  };

  // 查询用户是否消费过该资源
  const isPay = ref<any>(false);
  onMounted(async () => {
    isPay.value = await useUserIsPayGoods(id);
  });

  // 点击立即下载
  const dialogGetIntegralVisible = ref<boolean>(false);
  const confirmDisabled = ref<boolean>(false);
  const confirmTip = ref<string>('');
  const download = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      LoginDialog(true);
      LoginDialog(true, '', async () => {
        isPay.value = await useUserIsPayGoods(id);
      });
    } else {
      // 全站免费直接下载
      if (userInfo.value.isAllFree) {
        downloadTemplate();
        return;
      }
      // 会员直接下载
      if (membershipInfo.value.hasMembership && !membershipInfo.value.isExpired) {
        downloadTemplate();
        return;
      }
      // 判断用户是否支付过
      if (isPay.value) {
        downloadTemplate();
      } else {
        // 判断当前用户简币是否充足
        const userIntegralTotal = appStore.useUserInfoStore.userIntegralInfo.integralTotal;
        if (userIntegralTotal < Math.abs(wordInfo.value.payValue)) {
          confirmDisabled.value = true;
          dialogGetIntegralVisible.value = true;
          confirmTip.value = '您的简币数量不足！';
          return;
        } else {
          confirmTip.value = '';
          dialogGetIntegralVisible.value = true;
        }
      }
    }
  };

  // 关闭弹窗
  const cancleDialog = () => {
    dialogGetIntegralVisible.value = false;
  };

  // 下载弹窗确认
  const confirmDialog = () => {
    dialogGetIntegralVisible.value = false;
    downloadTemplate();
  };

  // 下载文件
  const downloadTemplate = async () => {
    const data = await wordDownloadUrl(id);
    if (data.data.status === 200) {
      ElMessage.success('即将开始下载');
      let url = JSON.parse(data.data.data.fileUrl)[0].url;
      downloadFileUtil(url);
      isPay.value = await useUserIsPayGoods(id); // 更新用户是否支付过的状态
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
<style lang="scss" scoped>
  // 全局样式变量
  $primary-color: #6c63ff;
  $secondary-color: #f0f0f0;
  $text-color: #333;
  $text-light: #666;
  $border-radius: 8px;
  $box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  $transition: all 0.3s ease;

  .word-preview-container {
    width: 100%;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  // 容器宽度
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  // 页面头部
  .preview-header {
    background: linear-gradient(135deg, #6c63ff 0%, #8a2be2 100%);
    color: white;
    padding: 40px 0;
    margin-bottom: 30px;
    .template-title {
      font-size: 28px;
      font-weight: 600;
      text-align: center;
      margin: 0;
    }
  }

  // 主要内容区
  .main-content {
    padding-bottom: 50px;
  }

  // 内容网格布局
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 30px;
    margin-bottom: 40px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  // 预览区域
  .preview-section {
    .preview-wrapper {
      display: flex;
      gap: 20px;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }

    // 缩略图列表
    .thumbnail-list {
      width: 140px;
      .thumbnail-item {
        width: 100%;
        height: 180px;
        margin-bottom: 12px;
        border-radius: $border-radius;
        overflow: hidden;
        cursor: pointer;
        transition: $transition;
        border: 2px solid transparent;
        box-shadow: $box-shadow;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        &.active {
          border-color: $primary-color;
          box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
        }
      }
    }

    // 主预览图
    .main-preview {
      flex: 1;
      .preview-card {
        background: white;
        border-radius: $border-radius;
        padding: 30px;
        box-shadow: $box-shadow;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 600px;
      }

      .preview-img {
        max-width: 100%;
        max-height: 540px;
        border-radius: 4px;
      }
    }
  }

  // 信息区域
  .info-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  // 操作卡片
  .action-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: $border-radius;
    padding: 30px;
    box-shadow: $box-shadow;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(108, 99, 255, 0.1);
    position: relative;
    overflow: hidden;

    // AI风格装饰元素
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $primary-color, #00d4ff);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -50px;
      right: -50px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(108, 99, 255, 0.1), transparent 70%);
      border-radius: 50%;
    }

    // 统计信息
    .stats-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      position: relative;
      z-index: 1;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 15px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.7);
        transition: $transition;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(108, 99, 255, 0.2);
        }

        .stat-value {
          font-size: 20px;
          font-weight: 600;
          color: $primary-color;
          text-shadow: 0 2px 4px rgba(108, 99, 255, 0.3);
        }

        .stat-label {
          font-size: 14px;
          color: $text-light;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }

    // 下载区域
    .download-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      position: relative;
      z-index: 1;

      .price-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 15px;
        border-radius: 10px;
        background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05));
        border: 1px solid rgba(255, 107, 107, 0.2);

        .price-value {
          font-size: 24px;
          font-weight: 600;
          color: #ff6b6b;
          text-shadow: 0 2px 4px rgba(255, 107, 107, 0.3);
        }

        .coin-icon {
          vertical-align: middle;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
      }

      .download-btn {
        width: 100%;
        height: 48px;
        background: linear-gradient(135deg, $primary-color 0%, #00d4ff 100%);
        color: white;
        border: none;
        border-radius: 24px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: $transition;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(108, 99, 255, 0.5);
        }

        &:active {
          transform: translateY(0);
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
      }
    }
  }

  // 信息卡片
  .info-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: $border-radius;
    padding: 30px;
    box-shadow: $box-shadow;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(108, 99, 255, 0.1);
    position: relative;
    overflow: hidden;

    // AI风格装饰元素
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $primary-color, #00d4ff);
    }

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(108, 99, 255, 0.1), transparent 70%);
      border-radius: 50%;
    }

    .info-title {
      font-size: 18px;
      font-weight: 600;
      color: $text-color;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(108, 99, 255, 0.1);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, $primary-color, #00d4ff);
      }
    }

    .info-item {
      margin-bottom: 20px;
      position: relative;
      z-index: 1;

      .info-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: $primary-color;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .info-content {
        font-size: 14px;
        line-height: 1.6;
        color: $text-light;
        margin: 0;
      }

      // 标签列表
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .tag-item {
          display: inline-block;
          padding: 6px 12px;
          background-color: rgba(108, 99, 255, 0.05);
          border-radius: 16px;
          font-size: 12px;
          color: $primary-color;
          transition: $transition;
          border: 1px solid rgba(108, 99, 255, 0.2);

          &:hover {
            background-color: $primary-color;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(108, 99, 255, 0.4);
          }
        }
      }
    }
  }

  // 轮播图区域
  .carousel-section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: $border-radius;
    padding: 30px;
    box-shadow: $box-shadow;
    margin-bottom: 40px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(108, 99, 255, 0.1);
    position: relative;
    overflow: hidden;

    // AI风格装饰元素
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $primary-color, #00d4ff);
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(108, 99, 255, 0.05), transparent 70%);
      border-radius: 50%;
      z-index: 0;
    }
  }

  // 评论区域
  .comment-section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: $border-radius;
    padding: 30px;
    box-shadow: $box-shadow;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(108, 99, 255, 0.1);
    position: relative;
    overflow: hidden;

    // AI风格装饰元素
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, $primary-color, #00d4ff);
    }

    .comment-header {
      margin-bottom: 20px;
      position: relative;

      .comment-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: 600;
        color: $text-color;
        margin: 0;

        svg {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
    }
  }
</style>
