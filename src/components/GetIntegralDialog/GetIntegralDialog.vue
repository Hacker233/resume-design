<template>
  <el-dialog
    :model-value="dialogGetIntegralVisible"
    class="get-integral-dialog-box"
    width="500px"
    :show-close="true"
    :close-on-click-modal="true"
    :before-close="handleBeforeClose"
    append-to-body
  >
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        如何获取简币？
        <img width="24" src="@/assets/images/jianB.png" alt="简币" />
      </div>
    </template>
    <div class="get-integral-content-box">
      <!-- 当前简币数量 -->
      <div class="current-total">
        （当前简币数量：{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal }}
        <img width="18" src="@/assets/images/jianB.png" alt="简币" />）
      </div>
      <!-- 方式一 -->
      <div v-config:open_sign_in class="way way-1">
        <p class="way-tips"
          >每日可通过签到免费获得+1<img width="24" src="@/assets/images/jianB.png" alt="简币"
        /></p>
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
      </div>

      <!-- 方式二 -->
      <div class="way way-2">
        <p class="way-tips"
          >每次评论免费获得+1<img width="24" src="@/assets/images/jianB.png" alt="简币" />
          <span class="small-tips"
            >（每日最多+{{ Most_Integral_Comment }}，评论被删除将扣除已获得简币！）</span
          >
        </p>
      </div>

      <!-- 方式三 -->
      <div class="way way-1">
        <p class="way-tips"
          >给项目点Star，添加小编微信，凭点赞截图获取+20<img
            width="24"
            src="@/assets/images/jianB.png"
            alt="简币"
        /></p>
        <!-- 签到按钮 -->
        <div class="attendance-box">
          <div class="button" @click="toGithub"> 点star </div>
        </div>
      </div>

      <!-- 方式四 -->
      <div class="way way-1">
        <p class="way-tips"
          >直接购买简币！9.9元得+99个简币<img width="24" src="@/assets/images/jianB.png" alt="简币"
        /></p>
        <!-- 签到按钮 -->
        <div class="attendance-box">
          <div class="button" @click="toPayIntegral"> 充值 </div>
        </div>
      </div>

      <!-- 方式五 -->
      <div class="way way-1">
        <p class="way-tips">可通过购买本网站源代码的方式获得简币，一举多得！</p>
        <!-- 签到按钮 -->
        <div class="attendance-box">
          <div class="button" @click="toPay"> 购买源码 </div>
        </div>
      </div>

      <!-- 方式六 -->
      <div class="way way-1">
        <p class="way-tips">开通网站会员，无限制下载网站所有资源！</p>
        <!-- 签到按钮 -->
        <div class="attendance-box">
          <div class="button" @click="toMembership"> 去开通 </div>
        </div>
      </div>
    </div>
  </el-dialog>

  <!-- 购买简币弹窗 -->
  <buy-integral-dialog
    :dialog-buy-integral-visible="dialogBuyIntegralVisible"
    @cancle="handlePayIntegralCancle"
  ></buy-integral-dialog>
</template>
<script lang="ts" setup>
  import { addIntegralLogAsync } from '@/http/api/integral';
  import appStore from '@/store';
  import { Most_Integral_Comment } from '@/config/integral/index';

  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogGetIntegralVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogGetIntegralVisible: false
  });

  // 关闭前回调
  const handleBeforeClose = () => {
    emit('cancle');
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
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 充值
  const dialogBuyIntegralVisible = ref<boolean>(false);
  const toPayIntegral = () => {
    dialogBuyIntegralVisible.value = true;
  };
  // 关闭充值弹窗
  const handlePayIntegralCancle = () => {
    dialogBuyIntegralVisible.value = false;
  };

  // 去购买
  const router = useRouter();
  const toPay = () => {
    router.push('/webCode');
  };

  // 去github
  const toGithub = () => {
    window.open('https://github.com/Hacker233/resume-design', '_blank');
  };

  // 开通会员
  const toMembership = () => {
    router.push('/membership');
  };
</script>
<style lang="scss">
  .get-integral-dialog-box {
    .get-integral-header-box {
      display: flex;
      align-items: center;
      font-size: 18px;
      letter-spacing: 2px;
      font-weight: 600;
      img {
        margin: 0 5px;
      }
    }
    .el-dialog__body {
      padding: 0 20px;
    }
    .get-integral-content-box {
      .current-total {
        margin-bottom: 30px;
        font-size: 12px;
        color: #777777;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
      }
      .way {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .way-tips {
          display: flex;
          align-items: center;
          font-size: 14px;
          img {
            margin: 0 5px;
          }
          .small-tips {
            font-size: 12px;
            display: flex;
            align-items: center;
          }
        }
        .attendance-box {
          .button {
            padding: 5px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            align-items: center;
            border: 1px solid green;
            text-align: center;
            color: green;
            letter-spacing: 1px;
            font-size: 14px;
            border-radius: 3px;
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
            border: 1px solid #a0a0a0;
            color: #a0a0a0;
            padding: 5px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            align-items: center;
            text-align: center;
            letter-spacing: 4px;
            font-size: 14px;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
