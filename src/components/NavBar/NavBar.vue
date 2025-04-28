<!-- 首页标题栏 -->
<template>
  <div :class="['nav-bar-box', { 'background-nav': props.bgColor ? true : false }]">
    <logo-com
      :icon-color="iconColor ? iconColor : '#fff'"
      :font-color="fontColor ? fontColor : '#fff'"
    ></logo-com>
    <div v-config:open_homne_menu class="center">
      <el-menu
        :default-active="route.path"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        router
        :popper-offset="10"
      >
        <template v-for="(item, index) in indexMenuList" :key="index">
          <!-- 只显示启用中的 -->
          <index-menu-item v-if="item.status === 1" :item="item" :key-index="item.name + index" />
        </template>
        <!-- <el-menu-item @click="toArticles">求职攻略</el-menu-item> -->
      </el-menu>
    </div>
    <!-- GitHub -->
    <div class="right">
      <!-- 今日签到总人数 -->
      <span v-config:open_sign_in class="attendance-total">今日已签到{{ attendanceTotal }}人~</span>
      <!-- 签到按钮 -->
      <div v-config:open_sign_in class="attendance-box">
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
      <!-- 开通会员 -->
      <div v-config:open_membership class="membership-box" @click="toMembership">
        <template v-if="!membershipInfo.hasMembership">
          <el-popover popper-class="create-membership-popper">
            <template #reference>
              <div class="content-box not-membership">
                <img src="@/assets/images/membership.svg" alt="猫步会员" title="会员" width="20" />
                <span>开通会员</span>
              </div>
            </template>
            <div class="create-membership-pop-content">
              <div
                v-for="(item, index) in membershipCardList"
                :key="index"
                :class="[
                  'member-goods-item',
                  ['monthly', 'yearly', 'lifetime'].indexOf(item.value) > -1
                    ? item.value
                    : 'monthly'
                ]"
              >
                <template v-if="['monthly', 'yearly', 'lifetime'].indexOf(item.value) > -1">
                  <img :src="getAssetsImagesFile(`membership/${item.value}.gif`)" />
                </template>
                <template v-else>
                  <div>
                    <img :src="getAssetsImagesFile(`membership/monthly.gif`)" />
                  </div>
                </template>
                <div class="info-container">
                  <div :class="['goods-name', `name-${item.value}`]">
                    <img
                      src="@/assets/images/membership.svg"
                      alt="猫步会员"
                      title="会员"
                      width="20"
                    />
                    开通{{ item.label }}
                  </div>
                  <!-- 权益 -->
                  <div v-if="item.value === 'monthly'" class="goods-tips">
                    <p>31天会员权益</p>
                    <p>4份简历存储</p>
                    <p>无限制导出</p>
                    <p>无限制使用AI</p>
                  </div>
                  <div v-else-if="item.value === 'yearly'" class="goods-tips">
                    <p>365天会员权益</p>
                    <p>8份简历存储</p>
                    <p>无限制导出</p>
                    <p>无限制使用AI</p>
                  </div>
                  <div v-else-if="item.value === 'lifetime'" class="goods-tips">
                    <p>永久会员权益</p>
                    <p>无限制简历存储</p>
                    <p>无限制导出</p>
                    <p>无限制使用AI</p>
                  </div>
                  <div :class="['price-desc', `desc-${item.value}`]" @click="toMembership">
                    立即开通
                  </div>
                </div>
              </div>
            </div>
          </el-popover>
        </template>

        <div
          v-else-if="membershipInfo.hasMembership && membershipInfo.daysRemaining > 0"
          class="content-box is-membership"
        >
          <!-- <svg-icon icon-name="icon-VIP" size="20px" color="#789e45"></svg-icon> -->
          <img src="@/assets/images/membership.svg" alt="会员" title="会员" width="20" />
          <span v-if="membershipInfo.type === 'lifetime'">永久会员</span>
          <span v-else>剩余{{ membershipInfo.daysRemaining }}天</span>
        </div>
        <!-- 已过期 -->
        <div v-else class="content-box expiredDays">
          <span>已过期{{ membershipInfo.expiredDays }}天</span>
        </div>
      </div>
      <!-- 简币 -->
      <div v-config:open_get_source_code class="jb-num-box" @click="toMyIntegral">
        <div class="content">
          <img
            width="18"
            src="@/assets/images/jianB.png"
            alt="简币"
            title="简币 - 您的专属虚拟货币"
          />
          <span>{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal || 0 }}</span>
        </div>
      </div>
      <!-- 登录注册以及用户展示区域 -->
      <div class="user-box">
        <div v-if="!appStore.useUserInfoStore.userInfo" class="logon-register-box">
          <el-button v-config:open_sign class="register-btn" @click="openRegisterDialog"
            >注册</el-button
          >
          <el-button class="login-btn" type="primary" @click="openLoginDialog">登录</el-button>
        </div>
        <div
          v-else
          :class="[
            'user-avatar-box',
            { 'user-avatar-box-vip': membershipInfo.hasMembership && !membershipInfo.isExpired }
          ]"
        >
          <!-- vip图标 -->
          <div
            v-if="membershipInfo.hasMembership && !membershipInfo.isExpired"
            class="user-vip-icon"
          >
            <img src="@/assets/images/membership.svg" alt="会员" title="会员" width="18" />
          </div>
          <el-dropdown v-config:open_person_in :teleported="false">
            <span class="el-dropdown-link">
              <el-avatar
                v-if="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
                :size="45"
                :src="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
                alt="用户头像"
                title="用户个人头像"
              />
              <el-avatar v-else :size="45">
                {{ appStore.useUserInfoStore.userInfo.name.split('')[0] }}
              </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="toPerson">个人中心</el-dropdown-item>
                <el-dropdown-item @click="toMyIntegral"> 我的资产 </el-dropdown-item>
                <!-- 管理员入口 -->
                <el-dropdown-item
                  v-if="
                    appStore.useUserInfoStore.userInfo &&
                    appStore.useUserInfoStore.userInfo.roles.indexOf('Admin') !== -1
                  "
                  @click="toAdmin"
                >
                  管理端
                </el-dropdown-item>
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
  import { storeToRefs } from 'pinia';
  import IndexMenuItem from './components/IndexMenuItem.vue';
  import { getMembershipConfigsByUserAsync } from '@/http/api/membership';
  import { getAssetsImagesFile } from '@/utils/common';

  interface IBgcColor {
    bgColor?: string;
    fontColor?: string;
    position?: string;
    iconColor?: string;
  }
  const route = useRoute();
  const props = withDefaults(defineProps<IBgcColor>(), {
    bgColor: '',
    fontColor: '',
    iconColor: '#fff',
    position: 'fixed'
  });

  // 查询首页导航菜单
  const { getIndexMenuList } = appStore.useIndexMenuStore;
  getIndexMenuList();

  // 菜单列表
  const { indexMenuList } = storeToRefs(appStore.useIndexMenuStore);

  // 获取用户会员信息
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);
  console.log('用户会员信息', membershipInfo.value);

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
  // const toWebCode = () => {
  //   router.push('/webcode');
  // };

  // 跳转至管理员界面
  const toAdmin = () => {
    router.push('/admin');
  };

  // 跳转至开通会员
  const toMembership = () => {
    router.push('/membership');
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
  const { saveMembershipInfo } = appStore.useMembershipStore;
  const loginout = () => {
    saveToken(''); // 清除token
    saveUserInfo(''); // 清除用户信息
    saveIntegralInfo(''); // 清除用户简币信息
    saveMembershipInfo(''); // 清除会员信息
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

  // 获取会员配置列表
  const membershipCardList = ref<any>([]);
  const getMembershipConfigsByUser = async () => {
    const data = await getMembershipConfigsByUserAsync();
    if (data.status === 200) {
      membershipCardList.value = data.data.map((item: any) => {
        return {
          label: item.membershipName,
          value: item.type,
          price: item.price,
          orgPrice: item.originalPrice
        };
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getMembershipConfigsByUser();
</script>
<style lang="scss" scoped>
  .background-nav {
    // 增强毛玻璃效果
    backdrop-filter: blur(16px); // 增加模糊强度
    -webkit-backdrop-filter: blur(12px); // Safari 和其他 WebKit 浏览器
    background-color: rgba(255, 255, 255, 0.5); // 半透明背景（浅色）
    // background-color: rgba(0, 0, 0, 0.3); // 半透明背景（深色）

    // 备用背景颜色（如果浏览器不支持毛玻璃效果）
    @supports not (backdrop-filter: blur(12px)) {
      background-color: v-bind('props.bgColor');
    }
  }
  .nav-bar-box {
    display: flex;
    height: 65px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    user-select: none;
    padding: 0 20px 0 30px;
    position: v-bind('props.position');
    top: 0;
    transition: all 0.3s;

    .center {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 2vw;
      .el-menu {
        border: none;
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        :deep(.el-menu-item) {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          // 渐变字体
          background: linear-gradient(45deg, #2ddd9d, #137c56) !important; // 自定义渐变颜色
          -webkit-background-clip: text !important; // Safari 和其他 WebKit 浏览器
          background-clip: text !important;
          padding: 0 15px !important;
          letter-spacing: 1px;
          font-size: 16px;
          border-bottom: 4px solid transparent;
          transition: all 0.3s;
          color: transparent;
          font-weight: 550;
          &:hover {
            border-color: #2ddd9d;
            background-color: rgba(#ccc, 0.1);
          }
        }
        .el-sub-menu {
          height: 100%;
          // 渐变字体
          background: linear-gradient(45deg, #2ddd9d, #137c56); // 自定义渐变颜色
          -webkit-background-clip: text; // Safari 和其他 WebKit 浏览器
          background-clip: text;
          border-bottom: 4px solid transparent;
          width: 130px;
          color: transparent;
          font-weight: 550;
          &:hover {
            border-bottom: 4px solid #2ddd9d !important;
            background-color: rgba(#ccc, 0.1);
          }
          :deep(.el-sub-menu__title) {
            letter-spacing: 1px;
            font-size: 16px;
            // 渐变字体
            background: linear-gradient(45deg, #2ddd9d, #137c56); // 自定义渐变颜色
            -webkit-background-clip: text; // Safari 和其他 WebKit 浏览器
            background-clip: text;
            border: none;
            color: transparent;
            font-weight: 550;
            &:hover {
              background-color: rgba(#ccc, 0.1);
            }
            .el-sub-menu__icon-arrow {
              color: #21a474;
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
        letter-spacing: 1px;
        flex-shrink: 0;
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
        height: 28px;
        flex-shrink: 0;
        .button {
          height: 100%;
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
          font-size: 13px;
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
        .expiredDays {
          background-color: #3b7962;
          span {
            color: rgb(237, 218, 218);
          }
        }
      }
      .membership-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 8px;
        height: 28px;
        cursor: pointer;
        transition: all 0.3s;
        flex-shrink: 0;
        &:hover {
          opacity: 0.9;
        }
        .content-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          height: 100%;
          background-color: #83ffd1;
          border-radius: 15px;
          font-size: 13px;
          span {
            font-size: 12px;
            letter-spacing: 1px;
            color: #617745;
            margin: 2px 0 3px 4px;
          }
          .svg-icon {
            margin-right: 5px;
          }
        }
        .not-membership {
          background: linear-gradient(
            300deg,
            #4c4d51,
            #2a2a31 10%,
            #85858a 40%,
            #393a3c 60%,
            #393838 80%,
            #5e5f62 100%
          );
          transition: all 0.3s;
          &:hover {
            opacity: 0.9;
          }
          span {
            color: #fff;
          }
        }
        .is-membership {
          background-image: linear-gradient(to right, #fa709a 0%, #f8da2c 100%);
          transition: all 0.3s;
          &:hover {
            opacity: 0.9;
          }
          span {
            color: #fff;
          }
        }
        .expiredDays {
          background: linear-gradient(
            300deg,
            #4c4d51,
            #2a2a31 10%,
            #85858a 40%,
            #393a3c 60%,
            #393838 80%,
            #5e5f62 100%
          );
          transition: all 0.3s;
          &:hover {
            opacity: 0.9;
          }
          span {
            color: #fff;
          }
        }
      }
      .jb-num-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 0 10px;
        height: 28px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          opacity: 0.9;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          height: 100%;
          background-image: linear-gradient(to right, #fa709a 0%, #f8da2c 100%);
          border-radius: 15px;
          span {
            font-size: 13px;
            letter-spacing: 1px;
            color: #fff;
            margin-left: 2px;
          }
          img {
            margin-right: 2px;
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
          position: relative;
          right: -7px;
          bottom: 0;
          z-index: 1;
          .user-vip-icon {
            position: absolute;
            right: 13px;
            top: -12px;
            z-index: 2;
          }
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
          .el-dropdown {
            z-index: 1;
          }
        }
        .user-avatar-box-vip {
          position: relative;
          width: 45px; /* 同步实际头像尺寸 */
          height: 45px;
          border-radius: 50%;
          background: #fff;
        }

        .user-avatar-box-vip::before {
          content: '';
          position: absolute;
          top: -1px; /* 超细边框偏移量 */
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, #ffd700 25%, #ffaa00 50%, #ffd700 75%);
          background-size: 200% 100%; /* 优化小尺寸渐变效果 */
          border-radius: 50%;
          animation: vip-glow 4s linear infinite; /* 减慢动画速度 */
          z-index: -1;
        }

        .user-avatar-box-vip::after {
          content: '';
          position: absolute;
          top: 0; /* 贴合主容器 */
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          box-shadow: 0 0 3px rgba(255, 215, 0, 0.3); /* 微型发光 */
          animation: vip-shine 2s ease-in-out infinite;
        }

        @keyframes vip-glow {
          0% {
            background-position: 200% 50%;
            transform: rotate(0deg);
          }
          100% {
            background-position: -200% 50%;
            transform: rotate(360deg);
          }
        }

        @keyframes vip-shine {
          0%,
          100% {
            opacity: 0.6;
            box-shadow: 0 0 2px #ffd70033;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 4px #ffd70066;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .navbar-popper-box {
    // overflow: hidden;
    border: none;
    border-radius: 0;

    .el-menu {
      padding: 0;
      min-width: 130px;
      .el-menu-item {
        height: 50px;
        font-size: 14px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 1px;
        // 渐变字体
        background: linear-gradient(45deg, #2ddd9d, #137c56); // 自定义渐变颜色
        -webkit-background-clip: text; // Safari 和其他 WebKit 浏览器
        background-clip: text;
      }
      .el-sub-menu {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        // 渐变字体
        background: linear-gradient(45deg, #2ddd9d, #137c56); // 自定义渐变颜色
        -webkit-background-clip: text; // Safari 和其他 WebKit 浏览器
        background-clip: text;
        padding: 0 15px !important;
        letter-spacing: 1px;
        font-size: 16px;
        border-bottom: 4px solid transparent;
        transition: all 0.3s;
        color: transparent;
        font-weight: 550;
        &:hover {
          background-color: rgba(#ccc, 0.1);
        }
        :deep(.el-sub-menu__title) {
          letter-spacing: 1px;
          font-size: 16px;
          // 渐变字体
          background: linear-gradient(45deg, #2ddd9d, #137c56); // 自定义渐变颜色
          -webkit-background-clip: text; // Safari 和其他 WebKit 浏览器
          background-clip: text;
          border: none;
          color: transparent;
          font-weight: 550;
          &:hover {
            background-color: rgba(#ccc, 0.1);
          }
          .el-sub-menu__icon-arrow {
            color: #21a474;
          }
        }
      }
    }
  }

  // 开通会员浮窗
  .create-membership-popper {
    width: 260px !important;
    padding: 15px 5px 0 5px !important;
    border-radius: 12px;
    .create-membership-pop-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .member-goods-item {
        width: 235px;
        height: 150px;
        border-radius: 12px;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
        flex-shrink: 0;
        margin-bottom: 15px;
        padding: 10px 15px;
        img {
          width: 94px;
          height: 94px;
          position: absolute;
          right: 16px;
          top: 14px;
          z-index: 1;
        }
        .info-container {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          .goods-name {
            font-size: 15px;
            font-weight: 600;
            line-height: 28px;
            display: flex;
            align-items: center;
            z-index: 10;
            img {
              width: 22px;
              height: auto;
              margin-right: 5px;
              position: inherit;
              margin-bottom: 2px;
            }
          }
          .goods-tips {
            flex: 1;
            font-size: 12px;
            color: #333;
            margin: 5px 0 10px 0;
          }
          .price-desc {
            font-size: 12px;
            letter-spacing: 1px;
            font-weight: 400;
            color: #72511d !important;
            background: linear-gradient(270deg, #ada48a, #eae5b7 45%, #f5efd6);
            width: fit-content;
            padding: 2px 10px;
            border-radius: 40px;
            box-shadow: 0 0 10px rgba(26, 22, 15, 0.3);
            transition: all 0.3s;
            &:hover {
              opacity: 0.8;
            }
          }
          .name-monthly {
            background: linear-gradient(70.95deg, #3974af 29.76%, #2d537a 71.28%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .name-yearly {
            background: linear-gradient(83.16deg, #af764c 19.01%, #774d26 88.14%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .name-lifetime {
            background: linear-gradient(83.16deg, #4c50af 19.01%, #3b2677 88.14%);
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .desc-monthly {
            color: #6face1;
          }
          .desc-yearly {
            color: #c99b68;
          }
          .desc-lifetime {
            color: #746dbb;
          }
        }
      }
      .active {
        border: 1.5px solid #2d537a;
      }
      .monthly {
        background-image: url(@/assets/images/membership/membership-monthly.png);
      }
      .yearly {
        background-image: url(@/assets/images/membership/membership-yearly.png);
      }
      .lifetime {
        background-image: url(@/assets/images/membership/membership-lifetime.png);
      }
    }
  }
</style>
