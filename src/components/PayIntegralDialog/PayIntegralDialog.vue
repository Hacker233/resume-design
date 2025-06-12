<template>
  <el-dialog
    :model-value="dialogGetIntegralVisible"
    class="get-integral-dialog-box"
    width="850px"
    :show-close="true"
    :close-on-click-modal="true"
    :before-close="handleBeforeClose"
    append-to-body
  >
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          确定消费{{ Math.abs(payNumber) }}个<img
            width="22"
            src="@/assets/images/jianB.png"
            alt="简币"
          />{{ placeholder }}？
        </template>
      </div>
    </template>
    <div class="get-integral-content-box">
      <!-- 当前简币数量 -->
      <div class="content-box">
        <h1 class="title">您当前简币数量</h1>
        <div class="content">
          <p class="jb-num"
            >{{ formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal) }}
            <img width="24" src="@/assets/images/jianB.png" alt="简币"
          /></p>
        </div>
        <!-- <div class="get-bi-method" @click="openGetDialog">获取简币</div> -->
      </div>
      <!-- 获取简币方式 -->
      <div class="content-box">
        <h1 class="title">获取简币方式</h1>
        <div class="content">
          <div class="table">
            <ul>
              <li>
                <div class="top">
                  <h1>签到</h1>
                  <div class="circle">
                    1
                    <img width="16" src="@/assets/images/jianB.png" alt="简币" />
                  </div>
                </div>
                <div class="bottom">
                  <p class="content-desc">每日签到可得+1个简币</p>
                  <div class="attendance-box" @click="toAttendance">
                    <div
                      v-if="!appStore.useUserInfoStore.userIntegralInfo.isattendance"
                      class="button"
                    >
                      签到
                    </div>
                    <el-tooltip v-else content="今天您已经签过到啦~">
                      <div class="have-attend">已签到</div>
                    </el-tooltip>
                  </div>
                </div>
              </li>

              <li v-config:open_invite_register>
                <div class="top">
                  <h1>邀请注册</h1>
                  <div class="circle"
                    >20 <img width="16" src="@/assets/images/jianB.png" alt="简币"
                  /></div>
                </div>
                <div class="bottom">
                  <p class="content-desc"
                    >每邀请一位新用户注册猫步简历，您将获得+20个简币（新用户注册时填写您的专属邀请码）</p
                  >
                  <div class="attendance-box">
                    <div class="button" @click="getInviteCode">获取专属邀请码</div>
                  </div>
                </div>
              </li>

              <li>
                <div class="top">
                  <h1>点Star</h1>
                  <div class="circle"
                    >20 <img width="16" src="@/assets/images/jianB.png" alt="简币"
                  /></div>
                </div>
                <div class="bottom">
                  <p class="content-desc"
                    >给猫步简历项目点Star，添加小编微信，凭点赞截图和注册邮箱获取+20简币（入口在首页开源信息栏目）</p
                  >
                  <div class="attendance-box" @click="toGithub">
                    <div class="button"> 去点Star </div>
                  </div>
                </div>
              </li>

              <li>
                <div class="top">
                  <h1>直接购买</h1>
                  <div class="circle"
                    >∞ <img width="16" src="@/assets/images/jianB.png" alt="简币"
                  /></div>
                </div>
                <div class="bottom">
                  <p class="content-desc">直接购买简币！9.9元得+99个简币，合计1毛钱一个简币</p>
                  <div class="attendance-box" @click="toPayIntegral">
                    <div class="button"> 去购买 </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 无限制下载方式 -->
      <div class="content-box">
        <h1 class="title">网站所有内容无限制下载方式（强烈推荐！）</h1>
        <div class="content-member-box">
          <div class="card premium-card" @click="toMembership">
            <div class="card-text">
              <div class="portada">
                <p>🔥 无限制下载</p>
              </div>
              <div class="title-total">
                <h2>开通会员（9.9￥）</h2>
                <div class="desc"
                  >开通会员即可无限制下载全站所有资源！免费使用AI智能诊断、生成简历等</div
                >
                <div class="actions">
                  <el-button type="primary" size="small" round>立即开通</el-button>
                  <span class="arrow">→</span>
                </div>
              </div>
            </div>
            <div class="badge">最受欢迎</div>
          </div>
          <div class="card code-card" @click="toWebCode">
            <div class="card-text">
              <div class="portada">
                <p>💻 私有化部署</p>
              </div>
              <div class="title-total">
                <h2>购买源码</h2>
                <div class="desc">购买源码即可私有化部署，拥有全部资源+作者技术支持！</div>
                <div class="actions">
                  <el-button type="success" size="small" round>了解详情</el-button>
                  <span class="arrow">→</span>
                </div>
              </div>
            </div>
            <div class="badge">开发者首选</div>
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
            btnText
          }}</el-button>
        </el-tooltip>
      </span>
    </template>
  </el-dialog>

  <!-- 购买简币弹窗 -->
  <buy-integral-dialog
    :dialog-buy-integral-visible="dialogBuyIntegralVisible"
    @cancle="handlePayIntegralCancle"
  ></buy-integral-dialog>

  <!-- 邀请用户弹窗 -->
  <invitation-dialog
    :dialog-invitation-visible="dialogInvitationVisible"
    @cancle="cancleInvitationDialog"
  ></invitation-dialog>
</template>
<script lang="ts" setup>
  import { addIntegralLogAsync } from '@/http/api/integral';
  import appStore from '@/store';
  import { formatNumberWithCommas } from '@/utils/common';

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

  // 关闭前回调
  const handleBeforeClose = () => {
    emit('cancle');
  };

  // 确定弹窗
  const confirmDialog = () => {
    emit('confirm');
    emit('cancle');
  };

  // 取消弹窗
  const cancle = () => {
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

  // 去github
  const toGithub = () => {
    window.open('https://github.com/Hacker233/resume-design', '_blank');
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

  // 跳转至开通会员
  const toMembership = () => {
    router.push('/membership');
  };

  // 跳转至源码
  const toWebCode = () => {
    router.push('/webcode');
  };

  // 获取专属邀请码
  const dialogInvitationVisible = ref<boolean>(false);
  const getInviteCode = async () => {
    dialogInvitationVisible.value = true;
  };

  // 关闭邀请弹窗
  const cancleInvitationDialog = () => {
    dialogInvitationVisible.value = false;
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
        margin: 0 1px;
      }
    }
    .el-dialog__body {
      padding: 0 20px;
    }
    .get-integral-content-box {
      .content-box {
        font-size: 12px;
        color: #777777;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-bottom: none;
        margin-bottom: 10px;
        .content-desc {
          height: 40px;
          font-size: 14px;
          display: flex;
          align-items: center;
          color: #fb8444;
          img {
            margin-left: 5px;
          }
        }
        .jb-num {
          font-size: 24px;
          font-weight: 600;
          background: -webkit-linear-gradient(top, #ff0000, #00ff00); /*设置线性渐变*/
          /*为了支持更多的浏览器*/
          background-clip: text; /*背景被裁剪到文字*/
          -webkit-text-fill-color: transparent; /*设置文字的填充颜色*/
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          img {
            margin-left: 5px;
          }
        }
      }
      .title {
        font-size: 16px;
        color: #009a74;
        position: relative;
        height: 20px;
        display: flex;
        align-items: center;
        margin-left: 10px;
        letter-spacing: 1px;
        &::before {
          content: '';
          position: absolute;
          height: 10px;
          width: 3px;
          background-color: #009a74;
          left: -10px;
        }
      }
      .content {
        width: 100%;
        padding: 10px 10px;

        .table {
          background-color: #ffffff;
          display: flex;
          width: 100%;
          height: 280px;
          width: 100%;
          margin: 10px 0 15px 0;
          ul {
            display: flex;
            width: 100%;
            justify-content: space-between;
          }
        }

        ul li {
          float: left;
          text-align: center;
          border-left: 1px solid #dddcd8;
          border-bottom: 1px solid #dddcd8;
          list-style: none;
          flex: 1;
          &:last-child {
            border-right: 1px solid #dddcd8;
            .top {
              background: linear-gradient(45deg, #ededee 0%, #58b5e1 70%);
            }
          }
          &:first-child {
            .top {
              background: linear-gradient(
                45deg,
                #e0f3fa 0%,
                #d8f0fc 50%,
                #b8e2f6 51%,
                #b6dffd 100%
              );
            }
          }
          &:nth-child(2) {
            .top {
              background: linear-gradient(45deg, #fcfff4 0%, #e9e9ce 100%);
            }
          }
          &:nth-child(3) {
            .top {
              background: linear-gradient(45deg, #b4e391 0%, #61c419 50%, #b4e391 100%);
            }
          }
        }

        .top {
          background-color: #eae9e4;
          height: 60px;
          display: flex;
          justify-content: center;
          position: relative;
          h1 {
            padding-top: 20px;
            font-size: 15px;
          }
        }

        .circle {
          position: absolute;
          left: 50%;
          bottom: -35px;
          transform: translate(-50%, 0);
          width: 50px;
          height: 50px;
          border-radius: 40px;
          font-size: 15px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #989a8f;
          letter-spacing: 2px;
        }

        .bottom {
          margin-top: 50px;
          padding: 0 15px;
          display: flex;
          height: 150px;
          flex-direction: column;
          justify-content: space-between;
          .content-desc {
            font-size: 14px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            letter-spacing: 1px;
            text-align: justify;
            line-height: 20px;
            img {
              margin: 0;
            }
          }
        }

        .attendance-box {
          width: 100%;
          height: 40px;
          user-select: none;
          .button {
            cursor: pointer;
            height: 100%;
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
            height: 100%;
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
            cursor: pointer;
          }
        }
      }
      .content-member-box {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 20px;

        .card {
          position: relative;
          width: 48%;
          height: 220px;
          background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          overflow: hidden;

          &:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

            .portada {
              background-size: 110%;
            }

            .arrow {
              transform: translateX(5px);
            }
          }

          .card-text {
            padding: 15px;
            height: 100%;
            display: flex;
            flex-direction: column;

            .portada {
              font-size: 18px;
              font-weight: bold;
              color: #fff;
              margin-bottom: 15px;
              padding: 8px 12px;
              background: linear-gradient(90deg, #409eff, #36b5ff);
              border-radius: 20px;
              display: inline-block;
              transition: all 0.3s;
            }

            .title-total {
              flex: 1;

              h2 {
                font-size: 20px;
                margin-bottom: 12px;
                color: #333;
                font-weight: 600;
              }

              .desc {
                font-size: 14px;
                color: #666;
                line-height: 1.5;
                margin-bottom: 20px;
                height: 40px;
                display: flex;
                align-items: center;
                text-align: justify;
                text-justify: inter-character;
              }

              .actions {
                display: flex;
                align-items: center;
                gap: 8px;

                .arrow {
                  font-size: 18px;
                  color: #409eff;
                  transition: all 0.3s;
                }
              }
            }
          }

          .badge {
            position: absolute;
            top: 15px;
            right: -30px;
            background: #ff4d4f;
            color: white;
            padding: 3px 30px;
            font-size: 12px;
            transform: rotate(45deg);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        }

        .premium-card {
          .portada {
            background: linear-gradient(90deg, #ff7bab, #ff6b81) !important;
            color: #fff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .badge {
            background: #ff4d4f;
          }

          .title-total {
            h2 {
              color: #d4237a;
            }
          }
        }

        .code-card {
          .portada {
            background: linear-gradient(90deg, #36cfc9, #13c2c2) !important;
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }

          .badge {
            background: #13c2c2;
          }

          .title-total {
            h2 {
              color: #0b7d78;
            }
          }
        }
      }
    }
  }
</style>
