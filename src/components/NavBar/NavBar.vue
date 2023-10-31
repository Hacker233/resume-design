<!-- 首页标题栏 -->
<template>
  <div class="nav-bar-box">
    <logo-com
      :icon-color="iconColor ? iconColor : '#fff'"
      :font-color="fontColor ? fontColor : '#fff'"
    ></logo-com>
    <div class="center">
      <el-menu
        :default-active="route.name"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <template v-for="(item, index) in menuList" :key="index">
          <template v-if="item.children">
            <el-sub-menu
              :index="item.name"
              popper-class="navbar-popper-box"
              :show-timeout="0"
              :hide-timeout="100"
            >
              <template #title>{{ item.title }}</template>
              <el-menu-item
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :index="childItem.name"
                >{{ childItem.title }}</el-menu-item
              >
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.name">{{ item.title }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
    <!-- GitHub -->
    <div class="right">
      <!-- 今日签到总人数 -->
      <span class="attendance-total">今日已签到{{ attendanceTotal }}人~</span>
      <!-- 签到按钮 -->
      <div class="attendance-box">
        <div
          v-if="!appStore.useUserInfoStore.userIntegralInfo.isattendance"
          class="button"
          @click="toAttendance"
        >
          签到
        </div>
        <el-tooltip v-else content="今天您已经签过到啦~">
          <div class="have-attend">已签到</div>
        </el-tooltip>
      </div>

      <!-- 源码购买 -->
      <div class="get-source-code" @click="toWebCode">
        <div class="content-box">
          <svg-icon icon-name="icon-VIP" size="20px" color="#789e45"></svg-icon>
          <span>获取源码</span>
        </div>
      </div>
      <!-- 简币 -->
      <div class="jb-num-box" @click="toMyIntegral">
        <div class="content">
          <img width="22" src="@/assets/images/jianB.png" alt="简币" />
          <span>{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal }}</span>
        </div>
      </div>
      <!-- 登录注册以及用户展示区域 -->
      <div class="user-box">
        <div v-if="!appStore.useUserInfoStore.userInfo" class="logon-register-box">
          <el-button class="register-btn" @click="openRegisterDialog">注册</el-button>
          <el-button class="login-btn" type="primary" @click="openLoginDialog">登录</el-button>
        </div>
        <div v-else class="user-avatar-box">
          <el-dropdown :teleported="false">
            <span class="el-dropdown-link" @click="toPerson">
              <el-avatar
                v-if="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
                :size="45"
                :src="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
              />
              <el-avatar v-else :size="45">
                {{ appStore.useUserInfoStore.userInfo.name.split('')[0] }}
              </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toPerson">个人中心</el-dropdown-item>
                <el-dropdown-item @click="toMyIntegral"> 我的资产 </el-dropdown-item>
                <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import { addIntegralLogAsync, getTodayAttendancePersonTotalAsync } from '@/http/api/integral';

  interface IBgcColor {
    bgColor?: string;
    fontColor?: string;
    iconColor?: string;
    position?: string;
  }
  const route = useRoute();
  const props = withDefaults(defineProps<IBgcColor>(), {
    bgColor: '',
    fontColor: '',
    iconColor: '#fff',
    position: 'fixed'
  });

  // 菜单列表
  const menuList = reactive([
    {
      iconfont: '',
      name: 'Template',
      title: '简历制作',
      children: [
        {
          iconfont: '',
          name: 'Template',
          title: '在线制作',
          children: null,
          path: '/template'
        },
        {
          iconfont: '',
          name: 'LegoTemplateList',
          title: '积木创作',
          children: null,
          path: '/legoTemplateList'
        }
      ]
    },
    {
      iconfont: '',
      name: 'TemplateDownload',
      title: '模板下载',
      children: [
        {
          iconfont: '',
          name: 'Word',
          title: '简历模板',
          children: null,
          path: '/word'
        },
        {
          iconfont: '',
          name: 'PPT',
          title: 'PPT模板',
          children: null,
          path: '/ppt'
        }
      ]
    },
    {
      iconfont: '',
      name: 'Resourceshare',
      title: '资源分享',
      children: [
        {
          iconfont: '',
          name: 'Soft',
          title: '软件分享',
          children: null,
          path: '/soft'
        },
        {
          iconfont: '',
          name: 'Website',
          title: '网站分享',
          children: null,
          path: '/website'
        },
        {
          iconfont: '',
          name: 'PanShare',
          title: '网盘资源',
          children: null,
          path: '/panshare'
        }
      ]
    },
    {
      iconfont: '',
      name: 'OnlineTool',
      title: '在线工具',
      children: [
        {
          iconfont: '',
          name: 'ImgCompress',
          title: '图片压缩',
          children: null,
          path: '/imgCompress'
        }
      ]
    },
    {
      iconfont: '',
      name: 'WebCode',
      title: '私有部署',
      children: [
        {
          iconfont: '',
          name: 'WebCode',
          title: '源码获取',
          children: null,
          path: '/webcode'
        },
        {
          iconfont: '',
          name: 'DeployDoc',
          title: '知识库',
          children: null,
          path: '/deployDoc'
        }
      ]
    }
  ]);

  // 菜单
  const currentMenu = ref<string>('');
  const handleSelect = (key: string) => {
    currentMenu.value = key;
    router.push({
      name: key
    });
    console.log(currentMenu.value);
  };

  const nameColor = computed(() => {
    return props.fontColor ? '#2ddd9d' : 'green';
  });

  // 打开注册弹窗
  const openRegisterDialog = () => {
    LoginDialog(false);
  };

  // 打开登录弹窗
  const openLoginDialog = () => {
    LoginDialog(true);
  };

  const router = useRouter();

  // 跳转至个人中心页
  const toPerson = () => {
    router.push('/person');
  };

  // 跳转至源码
  const toWebCode = () => {
    router.push('/webcode');
  };

  // 跳转至我的资产
  const toMyIntegral = () => {
    router.push('/person/personIntegral');
  };

  // 退出登录
  const { saveToken } = appStore.useTokenStore;
  const { saveUserInfo } = appStore.useUserInfoStore;
  const { setUuid } = appStore.useRefreshStore;
  const { saveIntegralInfo } = appStore.useUserInfoStore;
  const loginout = () => {
    saveToken(''); // 清除token
    saveUserInfo(''); // 清除用户信息
    saveIntegralInfo(''); // 清除用户简币信息
    setUuid(); // 全局刷新
    router.push('/');
  };

  // 签到
  const toAttendance = async () => {
    let params = {
      integralAddType: '1'
    };
    const data = await addIntegralLogAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('签到成功！简币+1！');
      // 更新用户简币信息
      appStore.useUserInfoStore.getUserIntegralTotal();
      getTodayAttendancePersonTotal();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 获取今日签到总人数
  const attendanceTotal = ref<number>(0);
  const getTodayAttendancePersonTotal = async () => {
    const data = await getTodayAttendancePersonTotalAsync();
    if (data.status === 200) {
      attendanceTotal.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getTodayAttendancePersonTotal();
</script>
<style lang="scss" scoped>
  .nav-bar-box {
    display: flex;
    height: 65px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(8px);
    background-color: v-bind('props.bgColor');
    z-index: 10;
    user-select: none;
    padding: 0 60px;
    position: v-bind('props.position');
    top: 0;
    transition: all 0.3s;
    .center {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-menu {
        border: none;
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        .el-menu-item {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          color: v-bind('props.fontColor');
          padding: 0 15px !important;
          letter-spacing: 3px;
          font-size: 16px;
          border-bottom: 4px solid transparent;
          transition: all 0.3s;
          &:hover {
            border-color: #2ddd9d;
            background-color: rgba(#ccc, 0.1);
          }
        }
        .el-sub-menu {
          height: 100%;
          color: v-bind('props.fontColor');
          border-bottom: 4px solid transparent;
          &:hover {
            border-bottom: 4px solid #2ddd9d !important;
            background-color: rgba(#ccc, 0.1);
          }
          :deep(.el-sub-menu__title) {
            letter-spacing: 3px;
            font-size: 16px;
            color: v-bind('props.fontColor');
            border: none;
            &:hover {
              background-color: rgba(#ccc, 0.1);
            }
          }
        }
        .is-active {
          background-color: rgba(255, 255, 255, 0);
          // color: #21a474;
          border-bottom: 4px solid #2ddd9d !important;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .attendance-total {
        font-size: 12px;
        color: v-bind('props.fontColor');
        margin-right: 20px;
        letter-spacing: 2px;
      }
      .contact-me {
        cursor: pointer;
        margin-right: 15px;
        font-size: 14px;
        color: v-bind('props.iconColor');
      }
      .svg-icon {
        cursor: pointer;
      }

      .attendance-box {
        margin-right: 10px;
        .button {
          padding: 6px 9px 6px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: center;
          border: 1px solid v-bind('props.fontColor');
          text-align: center;
          color: v-bind('props.fontColor');
          letter-spacing: 4px;
          font-size: 13px;
          border-radius: 15px;
          overflow: visible;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -moz-transition: all 0.2s;
          -ms-transition: all 0.2s;
          transition: all 0.2s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          transition: all 0.3s;
          &:hover {
            opacity: 0.7;
          }
        }
        .have-attend {
          border: 1px solid v-bind('props.fontColor');
          color: v-bind('props.fontColor');
          padding: 6px 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: center;
          text-align: center;
          letter-spacing: 4px;
          font-size: 13px;
          border-radius: 15px;
          overflow: visible;
        }
      }
      .get-source-code {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          opacity: 0.9;
        }
        .content-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 10px;
          background-color: #83ffd1;
          border-radius: 15px;
          span {
            font-size: 12px;
            letter-spacing: 1px;
            color: #617745;
            margin: 2px 0 0 4px;
          }
          .svg-icon {
            margin-right: 5px;
          }
        }
      }
      .jb-num-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          opacity: 0.9;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 10px;
          background-color: #83ffd1;
          border-radius: 15px;
          span {
            margin-left: 5px;
            font-size: 12px;
            letter-spacing: 1px;
            color: #617745;
            margin-top: 2px;
          }
          img {
            margin-right: 5px;
          }
        }
      }
      .user-box {
        display: flex;
        .logon-register-box {
          display: flex;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            width: 65px;
          }
          .register-btn {
            margin-left: 15px;
          }
        }
        .user-avatar-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 15px;
          cursor: pointer;
          .name-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: v-bind('nameColor');
            background-color: v-bind('iconColor');
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .navbar-popper-box {
    overflow: hidden;
    border: none;
    border-radius: 0;
    .el-menu {
      padding: 0;
      min-width: 134px;
      .el-menu-item {
        height: 50px;
        font-size: 14px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 2px;
      }
    }
  }
</style>
