<template>
  <div class="membership-box">
    <!-- 背景图 -->
    <div class="bg-box">
      <img src="@/assets/images/membership/member-bgc.png" />
    </div>
    <!-- 内容区 -->
    <div class="membership-content-box">
      <!-- 头部区域 -->
      <div class="head">
        <div class="left">
          <el-avatar
            v-if="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
            :size="43"
            :src="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
          />
          <div class="membership-time">
            <div class="user-info-box">
              <h1>{{ appStore.useUserInfoStore.userInfo.name }}</h1>
              <div v-if="!membershipInfo.hasMembership" class="not-membership-img"></div>
              <div
                v-else-if="membershipInfo.hasMembership && membershipInfo.daysRemaining > 0"
                class="content-box"
              >
                <span v-if="membershipInfo.type === 'lifetime'">永久会员</span>
                <span v-else>还剩{{ membershipInfo.daysRemaining }}天到期</span>
              </div>
              <!-- 已过期 -->
              <div v-else class="content-box expiredDays">
                <span>已过期{{ membershipInfo.expiredDays }}天</span>
              </div>
            </div>
            <!-- 提示 -->
            <p>开通会员立享站内无限制下载，快来吧！</p>
          </div>
        </div>
        <div class="right"></div>
      </div>
      <!-- 会员充值区域 -->
      <div class="pay-content-box">
        <div class="member-goods-container">
          <div
            v-for="(item, index) in membershipCardList"
            :key="index"
            :class="[
              'member-goods-item',
              ['monthly', 'yearly', 'lifetime'].indexOf(item.value) > -1 ? item.value : 'monthly',
              { active: selectedMembership === item.value }
            ]"
            @click="handleMembership(item)"
          >
            <template v-if="['monthly', 'yearly', 'lifetime'].indexOf(item.value) > -1">
              <img
                v-show="selectedMembership === item.value"
                :src="getAssetsImagesFile(`membership/${item.value}.gif`)"
              />
            </template>
            <template v-else>
              <div>
                <img
                  v-show="selectedMembership === item.value"
                  :src="getAssetsImagesFile(`membership/monthly.gif`)"
                />
              </div>
            </template>
            <div class="info-container">
              <div :class="['goods-name', `name-${item.value}`]">{{ item.label }}</div>
              <div :class="['goods-price', `name-${item.value}`]">
                <span class="rmb-icon"> ¥ </span>
                <span class="price-num">{{ item.price }}</span>
              </div>
              <div :class="['price-desc', `desc-${item.value}`]">
                原价<span class="price-line">{{ item.orgPrice }}￥</span>
              </div></div
            >
          </div>
        </div>
        <div class="join-membership-info-desc">立即生效</div>
        <div class="buy-know"
          ><div class="buy-know-title"> 购买须知： </div
          ><div class="buy-know-item">
            1.会员有效期：月度会员有效期31天，年度会员有效期为365天，在会员期内续费会员时，会员有效期天数累加，月度会员与年度会员购买不冲突，会员天数将累计。 </div
          ><div class="buy-know-item">
            2.会员权益说明：购买的会员将按照购买时间顺延生效，会员权益请查看具体权益对照表。
          </div>
        </div>
        <div class="bottom-pay-wrapper">
          <div class="pay-info">
            支付金额
            <span data-v-0be21c4c="" class="rmb-icon">¥ </span>
            <span data-v-0be21c4c="" class="pay-info-num">{{ selectedPrice }}</span>
          </div>
          <!-- 充值方式 -->
          <div class="pay-way">
            <h3>支付方式</h3>
            <div class="pay-way-box">
              <div
                :class="['pay-way-zfb', { 'pay-active': payType === 'zfb' }]"
                @click="selectPayWay('zfb')"
              >
                <img src="@/assets/images/pay/zfb1.png" alt="支付宝" />
              </div>
              <div
                :class="['pay-way-wx', { 'pay-active': payType === 'wxpay' }]"
                @click="selectPayWay('wxpay')"
              >
                <img src="@/assets/images/pay/wxpay.png" alt="微信支付" />
              </div>
            </div>
          </div>
          <div class="pay-btn" @click="getOrderQrcode">
            <div class="pay-btn-text">立即购买</div>
            <div class="pay-btn-light">
              <img src="@/assets/images/membership/line.png" />
            </div>
          </div>
        </div>
      </div>
      <!-- 权益对比 -->
      <div class="member-benefit">
        <div class="title"> 权益对比 </div>
        <div class="vip-yige">
          <div class="welfareBg">
            <div
              v-for="(color, index) in colors"
              :key="index"
              class="lineBg"
              :class="'color' + (index % 2)"
            ></div>
          </div>
          <div class="cotent-item-wrapper first">
            <div class="cotent-item cotent-item-type">
              <div class="item-card first-item-card">
                <div class="handsel"></div>
                <div class="price">
                  <div class="free"></div>
                </div>
              </div>
              <div class="welfare first-column">
                <div
                  v-for="(benefit, index) in benefits"
                  :key="index"
                  class="line"
                  :class="{ firstLine: index === 0 }"
                  >{{ benefit.name }}</div
                >
              </div>
            </div>
          </div>
          <div
            v-for="(membership, index) in memberships"
            :key="index"
            class="cotent-item-wrapper"
            :class="{ firstContent: index === 0, last: index === memberships.length - 1 }"
          >
            <div class="cotent-item" :class="{ active: membership.isActive }">
              <div class="item-card" :class="membership.class">
                <h1>{{ membership.label }}</h1>
                <p>{{ membership.description }}</p>
              </div>
              <div class="welfare">
                <div
                  v-for="(benefit, bIndex) in membership.benefits"
                  :key="bIndex"
                  v-dompurify-html="benefit.content"
                  class="line"
                  :class="{
                    specialLine: benefits[bIndex].special && index !== 0,
                    firstLine: bIndex === 0
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 充值弹窗 -->
    <buy-qr-code-dialog
      :model-value="dialogQrcodeVisible"
      :total-amount="selectedPrice"
      :order-type="2"
      :options="membershipOptions"
      :membership-type="selectedMembership"
      subject="购买猫步简历会员"
      @pay-success="handlePaySuccess"
      @cancel="handleCancel"
    ></buy-qr-code-dialog>

    <!-- 微信充值二维码弹窗 -->
    <w-x-buy-qr-code-dialog
      :model-value="dialogWXQrcodeVisible"
      :total-amount="selectedPrice"
      :order-type="2"
      pay-type="wxpay"
      :options="membershipOptions"
      :membership-type="selectedMembership"
      subject="购买猫步简历会员"
      @pay-success="handleWXPaySuccess"
      @cancel="handleWXCancel"
    ></w-x-buy-qr-code-dialog>

    <!-- 客服组件 -->
    <customer-service></customer-service>
  </div>
</template>
<script setup lang="ts">
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { getAssetsImagesFile } from '@/utils/common';
  import { getMembershipConfigsByUserAsync } from '@/http/api/membership';
  import BuyQrCodeDialog from '@/components/BuyQrcodeDialog/index.vue';
  import WXBuyQrCodeDialog from '@/components/WXBuyQrcodeDialog/index.vue';
  import CONFIG from '@/config';
  import { yipayTradePagePayAsync } from '@/utils/pay';

  const emit = defineEmits(['paySuccess', 'cancel']);

  // 支付方式
  const payType = ref<string>('zfb');

  // 选择支付方式
  const selectPayWay = (type: string) => {
    payType.value = type;
  };

  // 查询和更新用户信息
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;
  const { token } = appStore.useTokenStore;
  if (token) {
    getAndUpdateUserInfo();
  }

  // 获取用户会员信息
  const membershipCardList = ref<any>([]);
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);
  console.log('用户会员信息', membershipInfo.value);

  // 获取会员配置列表
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

  // 选择会员卡片
  const selectedMembership = ref<string>('monthly');
  const selectedPrice = ref<number>(9.9);
  // 充值会员配置
  const membershipOptions = reactive<any>({
    type: selectedMembership.value
  });
  const handleMembership = (item: any) => {
    selectedMembership.value = item.value;
    selectedPrice.value = item.price;
    membershipOptions.type = selectedMembership.value;
  };

  // 点击充值按钮
  const dialogQrcodeVisible = ref<boolean>(false);
  const dialogWXQrcodeVisible = ref<boolean>(false); // 微信
  const getOrderQrcode = async () => {
    if (payType.value === 'zfb') {
      dialogQrcodeVisible.value = true;
    } else if (payType.value === 'wxpay') {
      console.log('微信支付');
      if (CONFIG.yiPayWay === 'page') {
        let params = {
          type: 'wxpay', // 支付类型
          totalAmount: selectedPrice.value,
          subject: '购买猫步简历会员',
          orderType: 2
        };
        await yipayTradePagePayAsync(params);
      } else {
        dialogWXQrcodeVisible.value = true;
      }
    }
  };

  // 支付成功
  const handlePaySuccess = () => {
    dialogQrcodeVisible.value = false;
    getAndUpdateUserInfo();
    emit('paySuccess');
  };

  // 取消订单
  const handleCancel = () => {
    dialogQrcodeVisible.value = false;
    emit('cancel');
  };

  // 微信支付成功
  const handleWXPaySuccess = () => {
    dialogWXQrcodeVisible.value = false;
    emit('paySuccess');
  };

  // 微信取消订单
  const handleWXCancel = () => {
    dialogWXQrcodeVisible.value = false;
    emit('cancel');
  };
  // 数据结构化
  const jianBImage = new URL('@/assets/images/jianB.png', import.meta.url).href;
  const colors = ['0', '1'];
  const benefits = [
    { name: 'AI智能生成简历', special: false },
    { name: 'AI简历诊断', special: false },
    { name: 'AI简历翻译', special: false },
    { name: 'AI简历润色', special: false },
    { name: 'AI简历创作', special: false },
    { name: '导出PDF文件', special: false },
    { name: '导出PNG图片', special: false },
    { name: '下载Word简历模版', special: false },
    { name: '下载PPT模版', special: false },
    { name: '制作简历份数', special: false }
  ];

  const memberships = [
    {
      label: '免费版',
      description: '(欢迎白嫖)',
      class: 'non-vip',
      isActive: false,
      benefits: [
        {
          content: '消耗简币生成<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币诊断<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币翻译<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币润色<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币创作<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币导出<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币导出<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币下载<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        {
          content: '消耗简币下载<img width="22" src="' + jianBImage + '" alt="简币"/>',
          special: false
        },
        { content: '2份简历', special: false }
      ]
    },
    {
      label: '月度会员版',
      description: '(一瓶饮料钱)',
      class: 'vip',
      isActive: false,
      benefits: [
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制导出', special: false },
        { content: '无限制导出', special: false },
        { content: '无限制下载', special: false },
        { content: '无限制下载', special: false },
        { content: '4份简历', special: false }
      ]
    },
    {
      label: '年度会员版',
      description: '(一杯奶茶钱)',
      class: 'svip',
      isActive: false,
      benefits: [
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制导出', special: false },
        { content: '无限制导出', special: false },
        { content: '无限制下载', special: false },
        { content: '无限制下载', special: false },
        { content: '8份简历', special: false }
      ]
    },
    {
      label: '永久会员版',
      description: '(一顿饭钱)',
      class: 'ssvip',
      isActive: true,
      benefits: [
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制使用', special: false },
        { content: '无限制导出', special: false },
        { content: '无限制导出', special: false },
        { content: '无限制下载', special: false },
        { content: '无限制下载', special: false },
        { content: '无限制份数', special: false }
      ]
    }
  ];
</script>
<style lang="scss" scoped>
  .membership-box {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .bg-box {
      width: 100%;
      height: 403px;
      position: absolute;
      top: 0;
      z-index: 0;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .membership-content-box {
      width: 1024px;
      position: relative;
      z-index: 1;
      .head {
        width: 1010px;
        height: 50px;
        font-family: PingFang SC;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0px 18px;
        .left {
          display: flex;
          align-items: center;
          .membership-time {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 8px;
            .user-info-box {
              display: flex;
              align-items: center;
              margin-bottom: 2px;
              h1 {
                display: flex;
                align-items: center;
                font-size: 18px;
                font-weight: 500;
                color: #fff;
                margin-right: 8px;
              }
              .content-box {
                padding: 2px 10px;
                background-color: #83ffd1;
                border-radius: 15px;
                font-size: 13px;
              }
              .not-membership-img {
                width: 65px;
                height: 20px;
                position: relative;
                background-size: contain !important;
                cursor: pointer;
                background: url(@/assets/images/membership/not-membership.png) 100% / cover
                  no-repeat;
                &::before {
                  content: '';
                  position: absolute;
                  left: 6px;
                  top: 1px;
                  width: 59px;
                  height: 16px;
                  border-radius: 17px;
                  background: linear-gradient(
                    135deg,
                    hsla(0, 0%, 100%, 0) 30%,
                    hsla(0, 0%, 100%, 0.8) 50%,
                    hsla(0, 0%, 100%, 0) 70%
                  );
                  background-size: 100px 100%;
                  background-repeat: no-repeat;
                  background-position: -100px top;
                  animation: titleAnim 6.5s ease-in-out infinite;
                }
              }
              @keyframes titleAnim {
                0% {
                  background-position: -100px top;
                }

                30%,
                100% {
                  background-position: 240px top;
                }
              }
            }
            p {
              font-size: 13px;
              margin-top: 2px;
              font-weight: 400;
              color: hsla(0, 0%, 100%, 0.4);
            }
          }
        }
      }
      .pay-content-box {
        width: 100%;
        height: 600px;
        background-color: #fffaf0;
        border-radius: 20px;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        .member-goods-container {
          display: grid;
          grid-template-columns: repeat(4, 235px); /* 每行4列，每列235px */
          grid-column-gap: 15px; /* 行间距和列间距均为20px */
          box-sizing: border-box;
          .member-goods-item {
            border: 1.5px solid transparent;
            width: 235px;
            height: 150px;
            padding: 26px 0 0 25px;
            border-radius: 12px;
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            cursor: pointer;
            transition: all 0.3s;
            flex-shrink: 0;
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
              .goods-name {
                font-size: 20px;
                font-weight: 600;
                line-height: 28px;
              }
              .goods-price {
                margin: 0;
                padding: 0;
                border: 0;
                font-size: 100%;
                font-weight: 400;
                vertical-align: baseline;
                .rmb-icon {
                  font-size: 20px;
                  font-weight: 600;
                  line-height: 28px;
                }
                .price-num {
                  font-size: 40px;
                  font-weight: 600;
                  line-height: 56px;
                }
              }
              .price-desc {
                font-size: 14px;
                letter-spacing: 1px;
                font-weight: 400;
                .price-line {
                  text-decoration: line-through;
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
        .join-membership-info-desc {
          font-size: 13px;
          font-weight: 400;
          color: #5286bc;
          padding: 15px 0;
          height: 44px;
          color: #5856c4;
        }
        .buy-know {
          font-size: 13px;
          margin-top: 15px;
          line-height: 23px;
          .buy-know-title {
            font-weight: 500;
          }
          .buy-know-item {
            color: #666;
            font-weight: 400;
          }
        }
        .bottom-pay-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .pay-info {
            font-size: 15px;
            font-weight: 500;
            color: #333;
            text-align: center;
            height: 70px;
            margin-top: 20px;
            .rmb-icon {
              font-size: 25px;
              font-weight: 600;
              color: #fa5c2d;
            }
            .pay-info-num {
              font-size: 50px;
              font-weight: 600;
              color: #fa5c2d;
            }
          }
          .pay-way {
            height: 100px;
            width: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            h3 {
              font-size: 18px;
              margin-right: 30px;
            }
            .pay-way-box {
              display: flex;
              align-items: center;
              .pay-way-zfb {
                width: 116px;
                height: 40px;
                margin-right: 20px;
                border: 2px solid transparent;
                border-radius: 5px;
                padding: 3px 2px;
                cursor: pointer;
                user-select: none;
                transition: all 0.3s;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .pay-way-wx {
                width: 116px;
                height: 40px;
                border: 2px solid transparent;
                border-radius: 5px;
                padding: 1px;
                cursor: pointer;
                user-select: none;
                transition: all 0.3s;
                padding: 4px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .pay-active {
                border-color: #00c091;
              }
            }
          }
          .pay-btn {
            position: relative;
            width: 220px;
            line-height: 40px;
            text-align: center;
            background: linear-gradient(90.64deg, #f5e4cb 1.32%, #e7b77a 108.92%);
            font-weight: 500;
            font-size: 17px;
            border-radius: 34px;
            margin: 0 auto;
            margin-top: 30px;
            cursor: pointer;
            .pay-btn-text {
              background: linear-gradient(218.83deg, #622900 22.3%, #9e6237 84.49%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .pay-btn-light {
              position: absolute;
              top: 0;
              animation: lightMove 4s linear infinite;
              img {
                width: 63px;
                height: 40px;
                display: block;
              }
            }
            @keyframes lightMove {
              0% {
                visibility: visible;
                left: -4px;
              }

              20% {
                left: 78%;
              }
              21% {
                left: 78%;
                visibility: hidden;
              }
              100% {
                left: 100%;
                visibility: hidden;
              }
            }
          }
        }
      }
      .member-benefit {
        min-height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        margin-top: 50px;
        .title {
          font-size: 30px;
          font-weight: 500;
          line-height: 30px;
          letter-spacing: 0;
          color: #000;
          margin-bottom: 40px;
        }
        .vip-yige {
          position: relative;
          display: flex;
          background-size: contain;
          background-repeat: no-repeat;
          width: 100%;
          border-radius: 15px;
          overflow: hidden;
          border: 1px solid #dae4f2;
          .welfareBg {
            position: absolute;
            top: 83px;
            left: 0;
            right: 0;
            box-shadow: 0 0 30px rgba(198, 207, 234, 0.44);
            .lineBg {
              height: 80px;
              width: 100%;
              background: #fff;
            }
            .color1 {
              background: #f6f8fc;
            }
          }
          .cotent-item-wrapper {
            .cotent-item {
              background: transparent;
              cursor: pointer;
              position: relative;
              width: 208.5px;
              border-left: 1px solid #dae4f2;
              .item-card {
                margin: 0 auto;
                width: 190px;
                height: 83px;
                background-size: cover;
                background-color: #fff;
                position: relative;
                border-bottom: 1px solid #dae4f2;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                h1 {
                  font-size: 18px;
                  font-weight: 600;
                  margin-bottom: 2px;
                }
                p {
                  font-size: 14px;
                  opacity: 0.9;
                  margin-top: 2px;
                  letter-spacing: 1px;
                  color: #475b79;
                }
                .price {
                  padding: 0 0 0 12px;
                  position: absolute;
                  left: 0;
                  bottom: 4px;
                  .free {
                    line-height: 42px;
                    color: #475b79;
                  }
                }
              }
              .first-item-card {
                background-color: #f5f8ff;
              }
              .non-vip {
                width: 208.5px;
                color: #475b79;
                background: linear-gradient(
                  45deg,
                  #e0f3fa 0%,
                  #d8f0fc 50%,
                  #b8e2f6 51%,
                  #b6dffd 100%
                ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              }
              .vip {
                width: 208.5px;
                color: #44516a;
                background: linear-gradient(
                  45deg,
                  #fcfff4 0%,
                  #e9e9ce 100%
                ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              }
              .svip {
                width: 208.5px;
                color: #475b79;
                background: linear-gradient(
                  45deg,
                  #b4e391 0%,
                  #61c419 50%,
                  #b4e391 100%
                ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              }
              .ssvip {
                width: 208.5px;
                color: #475b79;
                background: linear-gradient(
                  45deg,
                  #63b6db 0%,
                  #309dcf 100%
                ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              }
              .welfare {
                .line {
                  color: #494949;
                  font-size: 14px;
                  text-align: center;
                  height: 80px;
                  line-height: 80px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  &:nth-child(2n-1) {
                    background-color: #f5f8ff;
                  }
                  &:nth-child(2n) {
                    background-color: #edf2fb;
                  }
                  &:last-child {
                    box-sizing: border-box;
                    position: relative;
                  }
                }
                .firstLine {
                  display: flex;
                  align-items: center;
                  min-height: 70px;
                  line-height: unset;
                  justify-content: center;
                }
              }
            }
            .first-column {
              .line {
                font-weight: 600;
              }
            }
            .cotent-item-type {
              width: 188px;
              pointer-events: none;
              border: none;
            }
            p {
              font-weight: 500 !important;
            }
          }
        }
      }
    }
  }
</style>
