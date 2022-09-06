<template>
  <div ref="indexRef" class="index-box" @scroll="handleScroll">
    <!-- 导航栏 -->
    <nav-bar :bg-color="navColor" :font-color="fontColor" :icon-color="iconColor"></nav-bar>
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <project-introduce @free-make="freeMake" @custom-template="customTemple"></project-introduce>
    </div>
    <!-- 模板选择 -->
    <template-select ref="templeTef"></template-select>
    <!-- 自定义模板 -->
    <custom-template-vue ref="customTempleRef"></custom-template-vue>

    <!-- footer -->
    <footer-com></footer-com>

    <!-- 回到顶部 -->
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
          user-select: none;
          border-radius: 50%;
          font-size: 14px;
        "
      >
        UP
      </div>
    </el-backtop>

    <!-- 联系我 -->
    <call-me></call-me>
  </div>
</template>
<script setup lang="ts">
  import NavBar from '@/components/NavBar/NavBar.vue';
  import ProjectIntroduce from './components/ProjectIntroduce.vue';
  import TemplateSelect from './components/TemplateSelect.vue';
  import CustomTemplateVue from './components/CustomTemplate.vue';
  import FooterCom from '@/components/FooterCom/FooterCom.vue';
  import CallMe from './components/CallMe.vue'
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { throttle } from 'lodash';

  // 监听元素滚动
  onMounted(() => {
    window.addEventListener('scroll', throttleHandle);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', throttleHandle);
  });

  // 页面滚动改变导航栏样式
  const throttleHandle = throttle(() => {
    handleScroll();
  }, 300);
  const navColor = ref<string>('');
  const fontColor = ref<string>('#fff');
  const iconColor = ref<string>('#fff');
  const handleScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      navColor.value = '#fff';
      fontColor.value = 'green';
      iconColor.value = 'green';
    } else {
      navColor.value = '';
      iconColor.value = '#fff';
      fontColor.value = '#fff';
    }
  };

  // 点击免费制作
  const templeTef = ref<any>(null);
  const freeMake = () => {
    templeTef.value.scrollIntoView();
  };

  // 点击自定义模板
  const customTempleRef = ref<any>(null);
  const customTemple = () => {
    customTempleRef.value.scrollIntoView();
  };
</script>
<style lang="scss" scoped>
  .index-box {
    position: relative;
    z-index: 0;
  }
</style>
