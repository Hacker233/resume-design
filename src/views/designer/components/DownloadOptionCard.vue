<!-- 下载选项卡片组件 -->
<template>
  <div class="download-option-wrapper">
    <!-- 会员专享标识 -->
    <div v-if="isMemberOnly && !isFreeMode && !isMember" class="member-badge">
      <img src="@/assets/images/membership.svg" alt="会员" />
      <span>会员专享</span>
    </div>

    <!-- 推荐标识 -->
    <div v-if="isRecommended" class="recommend-badge">
      <el-icon><StarFilled /></el-icon>
      <span>推荐</span>
    </div>

    <!-- 主卡片 -->
    <el-tooltip
      :disabled="tooltipDisabled"
      :content="tooltipContent"
      placement="top"
    >
      <div
        :class="[
          'download-card',
          `gradient-${gradient}`,
          {
            'is-disabled': isDisabled,
            'is-member-only': isMemberOnly && !isFreeMode && !isMember,
            'is-loading': isLoading
          }
        ]"
        @click="handleClick"
      >
        <!-- 加载遮罩 -->
        <div v-if="isLoading" class="loading-overlay">
          <el-icon class="loading-icon"><Loading /></el-icon>
        </div>
        <!-- 图标区域 -->
        <div class="card-icon">
          <svg-icon :icon-name="icon" color="#fff" size="32px" />
        </div>

        <!-- 标题 -->
        <div class="card-title">{{ title }}</div>

        <!-- 价格/状态区域 -->
        <div class="card-status">
          <template v-if="isFreeMode || isMember">
            <span class="status-free">
              <el-icon><CircleCheckFilled /></el-icon>
              免费下载
            </span>
          </template>
          <template v-else-if="isMemberOnly">
            <span class="status-member-only">
              <el-icon><Lock /></el-icon>
              会员专享
            </span>
          </template>
          <template v-else>
            <span class="status-price">
              <img src="@/assets/images/jianB.png" alt="简币" />
              {{ Math.abs(price) || 0 }}
              <el-tooltip :content="tooltipText" placement="top">
                <el-icon class="tip-icon"><QuestionFilled /></el-icon>
              </el-tooltip>
            </span>
          </template>
        </div>
      </div>
    </el-tooltip>

    <!-- 描述文字 -->
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { StarFilled, CircleCheckFilled, Lock, QuestionFilled, Loading } from '@element-plus/icons-vue';

  interface Props {
    // 下载类型
    type: string;
    // 图标名称
    icon: string;
    // 标题
    title: string;
    // 描述
    description: string;
    // 渐变主题色: purple | orange | blue | teal
    gradient: 'purple' | 'orange' | 'blue' | 'teal';
    // 是否为纯净模式
    isFreeMode: boolean;
    // 是否为会员
    isMember: boolean;
    // 是否可下载
    canDownload?: boolean;
    // 价格
    price?: number;
    // 是否仅会员可用
    isMemberOnly?: boolean;
    // 是否推荐
    isRecommended?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    canDownload: true,
    price: 0,
    isMemberOnly: false,
    isRecommended: false
  });

  const emit = defineEmits(['click']);

  // 是否正在加载
  const isLoading = ref(false);

  // 是否禁用
  const isDisabled = computed(() => {
    if (props.isFreeMode) return false;
    if (props.isMemberOnly) {
      return !props.isMember;
    }
    return !props.canDownload;
  });

  // 是否禁用tooltip
  const tooltipDisabled = computed(() => {
    if (props.isFreeMode) return true;
    if (props.isMemberOnly) {
      return props.isMember;
    }
    return props.canDownload;
  });

  // tooltip内容
  const tooltipContent = computed(() => {
    if (props.isMemberOnly && !props.isMember) {
      return '该功能仅限会员使用！';
    }
    return '简币数量不足！';
  });

  // 价格提示文本
  const tooltipText = computed(() => {
    switch (props.type) {
      case 'img':
        return '会员每日可无限次导出高清图片简历！';
      case 'pdf':
        return '会员每日可无限次导出高清PDF简历！';
      case 'md':
        return '会员可免费导出Markdown格式简历！';
      case 'json':
        return 'JSON格式完全免费，无需会员！';
      default:
        return '会员每日可无限次导出高清简历！';
    }
  });

  // 点击处理（带防抖）
  let clickTimer: ReturnType<typeof setTimeout> | null = null;

  const handleClick = () => {
    if (isDisabled.value || isLoading.value) return;

    // 设置加载状态
    isLoading.value = true;

    // 触发点击事件
    emit('click');

    // 清除之前的定时器
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    // 500ms后恢复可点击状态
    clickTimer = setTimeout(() => {
      isLoading.value = false;
    }, 500);
  };
</script>

<style lang="scss" scoped>
  .download-option-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;

    // 会员专享标识
    .member-badge {
      position: absolute;
      top: -10px;
      right: 10px;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(255, 183, 0, 0.3);

      img {
        width: 16px;
        height: 16px;
      }

      span {
        font-size: 12px;
        font-weight: 600;
        color: #7c4a00;
      }
    }

    // 推荐标识
    .recommend-badge {
      position: absolute;
      top: -10px;
      left: 10px;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(238, 90, 90, 0.3);

      .el-icon {
        font-size: 14px;
        color: #fff;
      }

      span {
        font-size: 12px;
        font-weight: 600;
        color: #fff;
      }
    }

    // 主卡片
    .download-card {
      position: relative;
      width: 100%;
      height: 140px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      user-select: none; // 禁止文字选中
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(-2px);
      }

      // 渐变主题
      &.gradient-purple {
        background: linear-gradient(135deg, #b39ddb 0%, #8e24aa 100%);

        &:hover {
          background: linear-gradient(135deg, #ce93d8 0%, #ba68c8 100%);
        }
      }

      &.gradient-orange {
        background: linear-gradient(135deg, #ffb74d 0%, #ef6c00 100%);

        &:hover {
          background: linear-gradient(135deg, #ffcc80 0%, #f57c00 100%);
        }
      }

      &.gradient-blue {
        background: linear-gradient(135deg, #64b5f6 0%, #1565c0 100%);

        &:hover {
          background: linear-gradient(135deg, #90caf9 0%, #42a5f5 100%);
        }
      }

      &.gradient-teal {
        background: linear-gradient(135deg, #4db6ac 0%, #00796b 100%);

        &:hover {
          background: linear-gradient(135deg, #80cbc4 0%, #4db6ac 100%);
        }
      }

      // 禁用状态
      &.is-disabled {
        cursor: not-allowed;
        opacity: 0.6;
        filter: grayscale(50%);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.15);
          border-radius: 16px;
          z-index: 1;
        }

        &:hover {
          transform: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .card-status {
          .status-price {
            color: #ff6b6b;

            img {
              opacity: 0.7;
            }
          }
        }
      }

      // 加载状态
      &.is-loading {
        cursor: wait;

        &:hover {
          transform: none;
        }
      }

      // 加载遮罩
      .loading-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 16px;
        z-index: 10;

        .loading-icon {
          font-size: 28px;
          color: #fff;
          animation: spin 1s linear infinite;
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      // 图标
      .card-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
      }

      // 标题
      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      // 状态
      .card-status {
        display: flex;
        align-items: center;
        justify-content: center;

        .status-free {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          backdrop-filter: blur(4px);

          .el-icon {
            font-size: 14px;
          }
        }

        .status-member-only {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.25);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          backdrop-filter: blur(4px);

          .el-icon {
            font-size: 14px;
            color: #ffd700;
          }
        }

        .status-price {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          backdrop-filter: blur(4px);

          img {
            width: 16px;
            height: 16px;
          }

          .tip-icon {
            margin-left: 4px;
            font-size: 14px;
            opacity: 0.8;
            cursor: help;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }

    // 描述文字
    .card-description {
      margin-top: 12px;
      font-size: 13px;
      color: #666;
      text-align: center;
      line-height: 1.5;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
  }
</style>
