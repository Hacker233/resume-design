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
          <h1>累计访问量</h1>
        </li>
        <li>
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
          <h1>累计注册</h1>
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
          <h1>累计制作简历</h1>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getWebAnalycDataAsync } from '@/http/api/user';
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

  const numberRef1 = ref<any>(null);
  const numberRef2 = ref<any>(null);
  const numberRef3 = ref<any>(null);
  const ulNumberRef = ref<any>(null);
  onMounted(() => {
    console.log('numberRef1', numberRef1);
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
  });
</script>
<style lang="scss" scoped>
  .data-show-box {
    width: 100%;
    min-height: 600px;
    background-color: #fff;
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
          margin: 0 40px;
          h1 {
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
              font-size: 52px;
            }
          }
        }
      }
    }
  }
</style>
