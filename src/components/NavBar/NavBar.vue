<!-- 首页标题栏 -->
<template>
  <div class="nav-bar-box">
    <div class="logo" @click="toHome">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span>化简</span>
    </div>
    <div class="center">
      <el-menu :default-active="route.name" class="el-menu-demo" @select="handleSelect">
        <el-menu-item index="Template">简历模板</el-menu-item>
      </el-menu>
    </div>
    <!-- GitHub -->
    <div class="right">
      <!-- 登录注册以及用户展示区域 -->
      <div class="user-box">
        <div v-if="!appStore.useUserInfoStore.userInfo" class="logon-register-box">
          <el-button class="register-btn" @click="openRegisterDialog">注册</el-button>
          <el-button class="login-btn" type="primary" @click="openLoginDialog">登录</el-button>
        </div>
        <div v-else class="user-avatar-box">
          <el-dropdown>
            <span class="el-dropdown-link">
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

  // 跳转至首页
  const router = useRouter();
  const toHome = () => {
    router.push('/');
  };
  // 跳转至个人中心页
  const toPerson = () => {
    router.push('/person');
  };

  // 退出登录
  const { saveToken } = appStore.useTokenStore;
  const { saveUserInfo } = appStore.useUserInfoStore;
  const { setUuid } = appStore.useRefreshStore;
  const loginout = () => {
    saveToken(''); // 清除token
    saveUserInfo(''); // 清除用户信息
    setUuid(); // 全局刷新
    router.push('/');
  };
</script>
<style lang="scss" scoped>
  .nav-bar-box {
    display: flex;
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background-color: v-bind('bgColor');
    z-index: 10;
    user-select: none;
    padding: 0 40px;
    position: v-bind('props.position');
    top: 0;
    transition: all 0.3s;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      img {
        width: 80px;
        height: 80px;
      }
      span {
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 600;
        font-family: cursive;
        color: v-bind('fontColor');
      }
    }
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
          color: v-bind('fontColor');
          padding: 0 25px !important;
          letter-spacing: 4px;
          font-size: 16px;
          border-bottom: 4px solid transparent;
          transition: all 0.3s;
          &:hover {
            // color: #2ddd9d;
            border-color: #2ddd9d;
            background-color: rgba(#ccc, 0.1);
          }
        }
        .is-active {
          background-color: rgba(255, 255, 255, 0);
          // color: #21a474;
          border-color: #2ddd9d;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .contact-me {
        cursor: pointer;
        margin-right: 15px;
        font-size: 14px;
        color: v-bind('iconColor');
      }
      .svg-icon {
        cursor: pointer;
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
          .login-btn {
          }
        }
        .user-avatar-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 15px;
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
