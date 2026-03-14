<template>
  <div class="person-menu">
    <ul class="menu-list">
      <li 
        v-for="(item, index) in menuListComputed" 
        :key="index"
        class="menu-item"
        :class="{ 'active': currentIndex === item.index }"
        @click="toDetail(item.path, item.index)"
      >
        <div class="menu-icon">
          <svg-icon
            :icon-name="item.iconfont"
            size="20px"
            :color="currentIndex === item.index ? '#667eea' : '#606266'"
          ></svg-icon>
        </div>
        <span class="menu-title">{{ item.title }}</span>
        <div class="menu-indicator" v-if="currentIndex === item.index"></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import appStore from '@/store';

  // 菜单列表
  const menuList = reactive<Array<any>>([
    {
      index: 'PersonDetail',
      iconfont: 'icon-jibenziliao',
      title: '个人信息',
      path: '/person/personDetail',
      freeUserNotShow: false // 全站免费用户是否不展示
    },
    {
      index: 'PersonIntegral',
      iconfont: 'icon-jifen',
      title: '我的资产',
      path: '/person/personIntegral',
      freeUserNotShow: true // 全站免费用户是否不展示
    },
    {
      index: 'AccountSetting',
      iconfont: 'icon-shezhi',
      title: '账号设置',
      path: '/person/accountSetting',
      freeUserNotShow: false // 全站免费用户是否不展示
    },
    {
      index: 'MyResume',
      iconfont: 'icon-xiangmujingli-04',
      title: '我的简历',
      path: '/person/myResume',
      freeUserNotShow: false // 全站免费用户是否不展示
    },
    {
      index: 'AiOptimizeLogs',
      iconfont: 'icon-zhinengyouhua',
      title: 'AI诊断记录',
      path: '/person/aiOptimizeLogs',
      freeUserNotShow: false // 全站免费用户是否不展示
    },
    {
      index: 'AiGenerateLogs',
      iconfont: 'icon-zujian',
      title: 'AI生成记录',
      path: '/person/aiGenerateLogs',
      freeUserNotShow: false // 全站免费用户是否不展示
    },
    {
      index: 'MyExportRecords',
      iconfont: 'icon-xiazai-wenjianxiazai-01',
      title: '导出记录',
      path: '/person/exportRecords',
      freeUserNotShow: false // 全站免费用户是否不展示
    }
  ]);

  // 是否是免费用户
  const menuListComputed = computed(() => {
    const isAllFree = appStore.useUserInfoStore.userInfo.isAllFree;
    return menuList.filter((item) => {
      if (!isAllFree) {
        return item;
      } else {
        return !item.freeUserNotShow;
      }
    });
  });

  const route = useRoute();
  const router = useRouter();
  // 选中的菜单index
  const currentIndex = ref<any>(route.name);

  // 跳转详情
  const toDetail = (path: string, index: string) => {
    currentIndex.value = index;
    router.push(path);
  };
</script>
<style lang="scss" scoped>
  .person-menu {
    padding: 20px 0;
    flex: 1;

    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 14px 30px 14px 27px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      border-left: 3px solid transparent;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 0;
      }

      &:hover {
        background-color: #f5f7fa;
        border-left-color: #667eea;
        .menu-title {
          color: #667eea;
        }
        .menu-icon svg {
          color: #667eea;
          transform: scale(1.1);
        }
        &::before {
          transform: translateX(0);
        }
      }

      &.active {
        background-color: #f0f2ff;
        border-left-color: #667eea;
        .menu-title {
          color: #667eea;
          font-weight: 600;
        }
        .menu-icon svg {
          color: #667eea;
        }
        &::before {
          transform: translateX(0);
        }
      }

      .menu-icon {
        margin-right: 16px;
        flex-shrink: 0;
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;
      }

      .menu-title {
        font-size: 14px;
        color: #606266;
        transition: all 0.3s ease;
        position: relative;
        z-index: 1;
      }

      .menu-indicator {
        position: absolute;
        right: 20px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #667eea;
        transition: all 0.3s ease;
        z-index: 1;
        animation: pulse 2s infinite;
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .person-menu {
      padding: 15px 0;

      .menu-item {
        padding: 12px 20px;

        .menu-icon {
          margin-right: 12px;

          svg {
            size: 18px;
          }
        }

        .menu-title {
          font-size: 13px;
        }

        .menu-indicator {
          right: 15px;
          width: 5px;
          height: 5px;
        }
      }
    }
  }
</style>
