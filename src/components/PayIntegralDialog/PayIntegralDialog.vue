<template>
  <el-dialog :model-value="dialogGetIntegralVisible" class="get-integral-dialog-box" width="780px" :show-close="true"
    :close-on-click-modal="true" :before-close="handleBeforeClose" append-to-body>
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          确定消费{{ Math.abs(payNumber) }}个<img width="18" src="@/assets/images/jianB.png" alt="简币" />{{ placeholder }}？
        </template>
      </div>
    </template>
    <div class="get-integral-content-box">
      <!-- 当前简币数量 -->
      <div class="content-box integral-display">
        <div class="section-header">
          <span class="section-title">您当前简币数量</span>
        </div>
        <div class="integral-value">
          {{ formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal) }}
          <img width="20" src="@/assets/images/jianB.png" alt="简币" />
        </div>
      </div>

      <!-- 获取简币方式 -->
      <div class="content-box">
        <div class="section-header">
          <span class="section-title">💰 获取简币方式</span>
        </div>
        <div class="integral-methods">
          <div class="method-item">
            <div class="method-icon">📅</div>
            <div class="method-info">
              <div class="method-header">
                <div class="method-name">每日签到</div>
                <div class="method-reward">+1 <img width="14" height="14" src="@/assets/images/jianB.png" alt="简币" /></div>
              </div>
              <div class="method-desc">每天签到可获得1简币，连续签到奖励更多</div>
            </div>
            <div class="method-action">
              <span v-if="!appStore.useUserInfoStore.userIntegralInfo.isattendance" class="action-btn" @click="toAttendance">签到</span>
              <span v-else class="action-btn disabled">已签到</span>
            </div>
          </div>

          <div class="method-item" v-config:open_invite_register>
            <div class="method-icon">👥</div>
            <div class="method-info">
              <div class="method-header">
                <div class="method-name">邀请注册</div>
                <div class="method-reward">+20 <img width="14" height="14" src="@/assets/images/jianB.png" alt="简币" /></div>
              </div>
              <div class="method-desc">邀请新用户注册并完成认证，双方都可获得简币奖励</div>
            </div>
            <div class="method-action">
              <span class="action-btn secondary" @click.stop="getInviteProcess">详细流程</span>
              <span class="action-btn" @click="getInviteCode">获取邀请码</span>
            </div>
          </div>

          <div class="method-item">
            <div class="method-icon">⭐</div>
            <div class="method-info">
              <div class="method-header">
                <div class="method-name">GitHub Star</div>
                <div class="method-reward">+10 <img width="14" height="14" src="@/assets/images/jianB.png" alt="简币" /></div>
              </div>
              <div class="method-desc">给猫步简历项目点Star，添加小编微信，凭点赞截图和注册邮箱获取+10简币</div>
            </div>
            <div class="method-action">
              <span class="action-btn secondary" @click.stop="getGithubStarProcess">详细流程</span>
              <span class="action-btn" @click="toGithub">去点Star</span>
            </div>
          </div>

          <div class="method-item" v-config:open_friend_circle_share>
            <div class="method-icon">📱</div>
            <div class="method-info">
              <div class="method-header">
                <div class="method-name">朋友圈分享</div>
                <div class="method-reward">+20 <img width="14" height="14" src="@/assets/images/jianB.png" alt="简币" /></div>
              </div>
              <div class="method-desc">朋友圈分享猫步简历，公开权限半小时以上，获得+20个简币。具体分享细节见详细流程</div>
            </div>
            <div class="method-action">
              <span class="action-btn" @click.stop="getPyqShareProcess">详细流程</span>
            </div>
          </div>

          <div class="method-item">
            <div class="method-icon">💰</div>
            <div class="method-info">
              <div class="method-header">
                <div class="method-name">直接购买</div>
                <div class="method-reward">∞</div>
              </div>
              <div class="method-desc">直接购买简币！9.9元得+99个简币，合计1毛钱一个简币</div>
            </div>
            <div class="method-action">
              <span class="action-btn primary" @click="toPayIntegral">去购买</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 强烈推荐 -->
      <div class="content-box recommend-section">
        <div class="section-header highlight">
          <span class="section-title">🔥 强烈推荐</span>
        </div>
        <div class="recommend-list">
          <div class="recommend-item vip-item">
            <div class="item-content">
              <div class="item-header">
                <div class="item-icon">👑</div>
                <div class="item-info">
                  <div class="item-title">开通会员</div>
                  <div class="item-desc">无限制下载 · AI诊断 · 简历生成</div>
                </div>
                <div class="item-badge">最受欢迎</div>
              </div>
              <div class="item-footer">
                <div class="item-price">9.9元</div>
                <span class="action-btn primary" @click="toMembership">去开通</span>
              </div>
            </div>
          </div>

          <div class="recommend-item code-item">
            <div class="item-content">
              <div class="item-header">
                <div class="item-icon">💻</div>
                <div class="item-info">
                  <div class="item-title">购买源码</div>
                  <div class="item-desc">私有化部署 · 全部资源 · 技术支持</div>
                </div>
                <div class="item-badge">开发者首选</div>
              </div>
              <div class="item-footer">
                <div class="item-price">永久使用</div>
                <span class="action-btn primary" @click="toWebCode">了解详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗底部 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-tooltip :content="confirmTip" :disabled="!confirmTip" placement="top">
          <el-button type="primary" :disabled="confirmDisabled" @click="confirmDialog">{{
            btnText || '确认'
          }}</el-button>
        </el-tooltip>
      </span>
    </template>
  </el-dialog>

  <!-- 购买简币弹窗 -->
  <buy-integral-dialog :dialog-buy-integral-visible="dialogBuyIntegralVisible"
    @cancle="handlePayIntegralCancle"></buy-integral-dialog>

  <!-- 邀请用户弹窗 -->
  <invitation-dialog :dialog-invitation-visible="dialogInvitationVisible"
    @cancle="cancleInvitationDialog"></invitation-dialog>

  <!-- github star 获取简币操作流程弹窗 -->
  <github-star-process-dialog :dialog-github-star-process-visible="dialogGithubStarProcessVisible"
    @cancle="cancleGithubStarProcessDialog"></github-star-process-dialog>

  <!-- 朋友圈分享猫步简历获取简币操作流程弹窗 -->
  <pyq-share-dialog :dialog-pyq-share-visible="dialogPyqShareVisible" @cancle="canclePyqShareDialog"></pyq-share-dialog>
</template>
<script lang="ts" setup>
import { addIntegralLogAsync } from '@/http/api/integral';
import appStore from '@/store';
import { formatNumberWithCommas } from '@/utils/common';
import GithubStarProcessDialog from '@/components/GithubStarProcessDialog/GithubStarProcessDialog.vue';
import PyqShareDialog from '@/components/PyqShareDialog/PyqShareDialog.vue';

const emit = defineEmits(['cancle', 'confirm']);
interface TDialog {
  dialogGetIntegralVisible: boolean;
  payNumber?: number;
  placeholder?: string;
  title?: string;
  confirmDisabled?: boolean;
  btnText?: string;
  confirmTip?: string;
}
withDefaults(defineProps<TDialog>(), {
  dialogGetIntegralVisible: false,
  payNumber: 0,
  placeholder: '下载该模板',
  title: '',
  confirmDisabled: false,
  btnText: '确认',
  confirmTip: ''
});

const router = useRouter();

const handleBeforeClose = () => {
  emit('cancle');
};

const confirmDialog = () => {
  emit('confirm');
  emit('cancle');
};

const cancle = () => {
  emit('cancle');
};

const toAttendance = async () => {
  let params = {
    integralAddType: '1'
  };
  const data = await addIntegralLogAsync(params);
  if (data.data.status === 200) {
    ElMessage.success('签到成功！简币+1！');
    appStore.useUserInfoStore.getUserIntegralTotal();
  } else {
    ElMessage.error(data.data.message);
  }
};

const toGithub = () => {
  window.open('https://github.com/Hacker233/resume-design', '_blank');
};

const dialogBuyIntegralVisible = ref<boolean>(false);
const toPayIntegral = () => {
  dialogBuyIntegralVisible.value = true;
};
const handlePayIntegralCancle = () => {
  dialogBuyIntegralVisible.value = false;
};

const toMembership = () => {
  router.push('/membership');
};

const toWebCode = () => {
  router.push('/webcode');
};

const dialogInvitationVisible = ref<boolean>(false);
const getInviteCode = async () => {
  dialogInvitationVisible.value = true;
};

const cancleInvitationDialog = () => {
  dialogInvitationVisible.value = false;
};

const dialogGithubStarProcessVisible = ref<boolean>(false);
const getGithubStarProcess = () => {
  dialogGithubStarProcessVisible.value = true;
};
const cancleGithubStarProcessDialog = () => {
  dialogGithubStarProcessVisible.value = false;
};

const dialogPyqShareVisible = ref<boolean>(false);
const getPyqShareProcess = () => {
  dialogPyqShareVisible.value = true;
};
const canclePyqShareDialog = () => {
  dialogPyqShareVisible.value = false;
};



// 邀请注册操作流程
const getInviteProcess = () => {
  // 这里可以添加邀请注册操作流程的逻辑
  ElMessage.info('邀请注册操作流程：获取邀请码后分享给好友，好友注册并完成认证后双方都可获得简币奖励');
};


</script>
<style lang="scss">
.get-integral-dialog-box {
  width: 780px;

  & .el-dialog__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 12px 18px;
    padding-right: 45px;
    border-bottom: none;

    .el-dialog__headerbtn {
      color: #ffffff;
      font-size: 20px;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;

      &:hover {
        color: #f0f0f0;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  .get-integral-header-box {
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 6px;

    img {
      width: 18px;
      height: 18px;
    }
  }

  .el-dialog__body {
    padding: 14px;
    background: #fafbfc;
  }

  .el-dialog__footer {
    padding: 10px 18px 14px;
    background: #ffffff;
    border-top: 1px solid #e8ecf1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    .el-button {
      border-radius: 6px;
      padding: 6px 16px;
      font-weight: 500;
      font-size: 13px;

      &--primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;

        &.is-disabled {
          background: #e2e8f0;
          border-color: #e2e8f0;
          color: #a0aec0;
          cursor: not-allowed;

          &:hover {
            background: #e2e8f0;
            border-color: #e2e8f0;
            color: #a0aec0;
          }
        }
      }

      &.is-disabled {
        background: #f7fafc;
        border-color: #e2e8f0;
        color: #a0aec0;
        cursor: not-allowed;

        &:hover {
          background: #f7fafc;
          border-color: #e2e8f0;
          color: #a0aec0;
        }
      }
    }
  }

  .get-integral-content-box {
    .content-box {
      background: #ffffff;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);

      &:last-child {
        margin-bottom: 0;
      }
    }

    .integral-display {
      text-align: center;
      padding: 20px 12px 12px 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;

      .section-header {
        margin-bottom: 16px;
        padding-bottom: 0;
        border-bottom: none;

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        &::after {
          display: none;
        }
      }

      .integral-value {
        font-size: 36px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }

    .section-header {
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
      position: relative;

      &.highlight {
        .section-title {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }
      }

      .section-title {
        font-size: 16px;
        font-weight: 700;
        color: #2d3748;
        position: relative;
        display: inline-block;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        border-radius: 1px;
      }

      &.highlight::after {
        background: linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%);
      }
    }

    .method-action {
      display: flex;
    }

    .action-btn {
      display: inline-block;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      font-size: 11px;
      font-weight: 600;
      background: #ffffff;
      color: #667eea;
      border: 1.5px solid #667eea;
      transition: all 0.2s ease;
      width: 75px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #667eea;
        color: #ffffff;
      }

      &.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #ffffff;
        border: none;
        height: 28px;
        width: 82px;
        text-align: center;

        &:hover {
          opacity: 0.9;
        }
      }

      &.disabled {
        background: #e2e8f0;
        color: #a0aec0;
        border-color: #e2e8f0;
        cursor: not-allowed;
        width: 75px;
        text-align: center;
      }

      &.secondary {
        background: #f7fafc;
        color: #718096;
        border: 1px solid #e2e8f0;
        margin-right: 10px;
        width: 90px;
        text-align: center;

        &:hover {
          background: #edf2f7;
          color: #4a5568;
        }
      }
    }

    .integral-methods {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .method-item {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        background: #f8fafc;
        border-radius: 6px;
        transition: all 0.2s ease;
        border: 1px solid transparent;

        &:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
          transform: translateX(3px);
        }

        .method-icon {
          font-size: 20px;
          margin-right: 10px;
        }

        .method-info {
          flex: 1;
          min-width: 0;

          .method-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
          }

          .method-name {
            font-size: 13px;
            font-weight: 600;
            color: #2d3748;
            width: 80px;
            flex-shrink: 0;
          }

          .method-reward {
            font-size: 14px;
            color: #667eea;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            padding: 3px 8px;
            border-radius: 10px;
            border: 1px solid rgba(102, 126, 234, 0.2);
            box-shadow: 0 1px 3px rgba(102, 126, 234, 0.15);
            width: 60px;
            flex-shrink: 0;

            img {
              width: 14px;
              height: 14px;
            }
          }

          .method-desc {
            font-size: 12px;
            color: #718096;
            line-height: 1.4;
            word-break: break-word;
          }
        }

        .action-btn {
          display: inline-block;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          font-size: 11px;
          font-weight: 600;
          background: #ffffff;
          color: #667eea;
          border: 1.5px solid #667eea;
          transition: all 0.2s ease;
          width: 75px;
          text-align: center;
          cursor: pointer;

          &:hover {
            background: #667eea;
            color: #ffffff;
          }

          &.primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            border: none;
            width: 80px;
            height: 28px;
            text-align: center;

            &:hover {
              opacity: 0.9;
            }
          }

          &.disabled {
            background: #e2e8f0;
            color: #a0aec0;
            border-color: #e2e8f0;
            cursor: not-allowed;
            width: 75px;
            text-align: center;
          }

          &.secondary {
            background: #f7fafc;
            color: #718096;
            border: 1px solid #e2e8f0;
            margin-right: 10px;
            width: 75px;
            text-align: center;

            &:hover {
              background: #edf2f7;
              color: #4a5568;
            }
          }
        }
      }

    }

    .recommend-list {
        display: flex;
        flex-direction: row;
        gap: 12px;

        .recommend-item {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 2px solid #e2e8f0;
          position: relative;
          overflow: hidden;
          flex: 1;
          min-width: 0;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          transition: all 0.3s ease;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .item-content {
          display: flex;
          flex-direction: column;
          padding: 16px;
          flex: 1;
          gap: 12px;
        }

        .item-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          position: relative;
        }

        .item-icon {
          font-size: 28px;
          flex-shrink: 0;
          line-height: 1;
        }

        .item-info {
          flex: 1;
          min-width: 0;

          .item-title {
            font-size: 16px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 6px;
            line-height: 1.3;
          }

          .item-desc {
            font-size: 12px;
            color: #718096;
            line-height: 1.4;
          }
        }

        .item-badge {
          position: absolute;
          top: 0;
          right: 0;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.25);
          white-space: nowrap;
        }

        .item-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0 0 0;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .item-price {
          font-size: 18px;
          font-weight: 800;
          color: #667eea;
        }

        &.vip-item {
          border-color: #ff6b6b;
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);

          &::before {
            background: #ff6b6b;
          }

          &:hover {
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.18);
          }

          .item-price {
            color: #ff6b6b;
          }

          .item-badge {
            background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
            box-shadow: 0 2px 6px rgba(255, 107, 107, 0.25);
          }
        }

        &.code-item {
          border-color: #38b2ac;
          background: linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%);

          &::before {
            background: #38b2ac;
          }

          &:hover {
            box-shadow: 0 6px 20px rgba(56, 178, 172, 0.18);
          }

          .item-price {
            color: #38b2ac;
          }

          .item-badge {
            background: linear-gradient(135deg, #38b2ac 0%, #4fd1c5 100%);
            box-shadow: 0 2px 6px rgba(56, 178, 172, 0.25);
          }
        }
      }
    }

    &.recommend-section {
      background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
      border: 2px solid #ff6b6b;
      box-shadow: 0 3px 12px rgba(255, 107, 107, 0.12);
    }
  }
}
</style>
