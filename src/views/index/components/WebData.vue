<!-- 网站数据展示 -->
<template>
  <!-- 网站数据展示 -->
  <div class="data-show-box">
    <introduce-title-vue
      title="网站统计"
      subtitle="从网站开放以来服务用户的相关数据"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="list-box">
      <ul ref="ulNumberRef">
        <li>
          <svg-icon
            icon-name="icon-fangwenliang"
            class-name="juejin"
            size="70px"
            color="#00c090"
          ></svg-icon>
          <p>
            <count-to
              ref="numberRef3"
              class="number"
              :start-val="0"
              :end-val="webData.trafficnumber"
              separator=","
              :duration="4000"
            ></count-to>
            <span>次</span>
          </p>
          <h3>累计访问量</h3>
        </li>
        <li v-config:open_sign>
          <svg-icon
            icon-name="icon-renwu-ren"
            class-name="juejin"
            size="70px"
            color="#00c090"
          ></svg-icon>
          <p>
            <count-to
              ref="numberRef1"
              class="number"
              :start-val="0"
              :end-val="webData.usernumber"
              :duration="4000"
              separator=","
            ></count-to>
            <span>人</span>
          </p>
          <h3>累计注册</h3>
        </li>
        <li>
          <svg-icon
            icon-name="icon-caogaoxiang"
            class-name="juejin"
            size="70px"
            color="#00c090"
          ></svg-icon>
          <p>
            <count-to
              ref="numberRef2"
              class="number"
              :start-val="0"
              :end-val="webData.resumenumber"
              :duration="4000"
              separator=","
            ></count-to>
            <span>份</span>
          </p>
          <h3>累计制作简历</h3>
        </li>
        <li class="online-count-item">
          <svg-icon
            icon-name="icon-qunzuduoren"
            class-name="juejin"
            size="70px"
            color="#00c090"
          ></svg-icon>
          <p>
            <span class="number online-number" :class="{ 'number-changed': isNumberChanged }">{{ onlineCount }}</span>
            <span>人</span>
          </p>
          <h3>实时在线人数</h3>
          <p class="last-updated">最后更新: {{ lastUpdatedTime }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted, onUnmounted } from 'vue';
  import { useIntersectionObserver } from '@vueuse/core';
  import { getWebAnalycDataAsync } from '@/http/api/user';
  import { getOnlineUsersCountAsync, sendHeartbeatAsync } from '@/http/api/website';
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import { CountTo } from 'vue3-count-to';
  interface IWebData {
    usernumber: undefined | number;
    resumenumber: undefined | number;
    trafficnumber: undefined | number;
  }
  // 获取网站分析数据
  let webData = reactive<IWebData>({
    usernumber: 0,
    resumenumber: 0,
    trafficnumber: 0
  });
  const getWebAnalycData = async () => {
    const data = await getWebAnalycDataAsync();
    if (data.status === 200) {
      webData.usernumber = data.data.usernumber;
      webData.resumenumber = data.data.resumenumber;
      webData.trafficnumber = data.data.trafficnumber;
    } else {
      ElMessage.error(data.message);
    }
  };
  getWebAnalycData();

  // 在线人数
  const onlineCount = ref(0);
  const isNumberChanged = ref(false);
  const lastUpdatedTime = ref('');
  const heartbeatInterval: any = ref(null);
  const userId = ref(Math.random().toString(36).substring(2, 15)); // 生成随机用户ID

  // 更新最后更新时间
  const updateLastUpdatedTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    lastUpdatedTime.value = `${hours}:${minutes}:${seconds}`;
  };

  // 获取在线人数
  const getOnlineCount = async () => {
    try {
      const data = await getOnlineUsersCountAsync();
      if (data.status === 200) {
        const newCount = data.data.count;
        // 检查数字是否变化
        if (newCount !== onlineCount.value) {
          isNumberChanged.value = true;
          // 1秒后移除变化效果
          setTimeout(() => {
            isNumberChanged.value = false;
          }, 1000);
        }
        onlineCount.value = newCount;
        updateLastUpdatedTime();
      }
    } catch (error) {
      console.error('获取在线人数失败:', error);
    }
  };

  // 发送心跳
  const sendHeartbeat = async () => {
    try {
      await sendHeartbeatAsync(userId.value);
    } catch (error) {
      console.error('发送心跳失败:', error);
    }
  };

  const numberRef1 = ref<any>(null);
  const numberRef2 = ref<any>(null);
  const numberRef3 = ref<any>(null);
  const ulNumberRef = ref<any>(null);
  onMounted(() => {
    const { stop } = useIntersectionObserver(
      ulNumberRef.value,
      // isIntersecting 是否进入可视区域，true是进入 false是移出
      // observerElement 被观察的dom
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          numberRef1.value.start();
          numberRef2.value.start();
          numberRef3.value.start();
          stop();
        }
      }
    );

    // 初始获取在线人数
    getOnlineCount();
    // 每30秒获取一次在线人数
    setInterval(getOnlineCount, 30000);
    // 每45秒发送一次心跳
    heartbeatInterval.value = setInterval(sendHeartbeat, 45000);
  });

  // 组件卸载时
  onUnmounted(() => {
    if (heartbeatInterval.value) {
      clearInterval(heartbeatInterval.value);
    }
  });
</script>
<style lang="scss" scoped>
  .data-show-box {
    width: 100%;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    .list-box {
      flex: 1;
      ul {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 40px;
        li {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          width: 224px;
          height: 270px;
          background: #ffffff;
          box-shadow: 0 4px 6px 5px rgb(0 0 0 / 5%);
          border-radius: 4px;
          h3 {
            font-size: 18px;
            letter-spacing: 1px;
            font-weight: 500;
          }
          p {
            background-clip: text;
            background-image: url('@/assets/images/font-bgc.png');
            -webkit-background-clip: text;
            color: transparent;
            letter-spacing: 2px;
            font-weight: 600;
            span {
              font-size: 20px;
              margin-left: 3px;
            }
            .number {
              font-size: 40px;
            }
          }

          // 实时在线人数特有样式
          &.online-count-item {
            // 添加边框效果
            border: 2px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(to right, #00c090, #00a884);
            animation: borderPulse 2s infinite;

            .online-number {
              // 数字变化动画
              transition: all 0.5s ease;

              &.number-changed {
                animation: numberChange 1s ease;
                text-shadow: 0 0 10px #00c090, 0 0 20px #00c090;
              }
            }

            .last-updated {
              font-size: 12px;
              color: #7f8b96;
              background-clip: none;
              background-image: none;
              -webkit-background-clip: none;
              color: #7f8b96;
              margin-top: 5px;
            }
          }
        }
      }
    }
  }

  // 边框脉冲动画
  @keyframes borderPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 192, 144, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 192, 144, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 192, 144, 0);
    }
  }

  // 数字变化动画
  @keyframes numberChange {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
