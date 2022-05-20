<template>
  <div class="index-box" ref="indexRef" @scroll="handleScroll">
    <!-- 导航栏 -->
    <nav-bar :bgColor="navColor" :fontColor="fontColor" :icon-color="iconColor"></nav-bar>
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <project-introduce></project-introduce>
    </div>
    <!-- 模板选择 -->
    <template-select></template-select>

    <!-- footer -->
    <footer-com></footer-com>
  </div>
</template>
<script setup lang="ts">
  import NavBar from '@/components/NavBar/NavBar.vue';
  import ProjectIntroduce from './components/ProjectIntroduce.vue';
  import TemplateSelect from './components/TemplateSelect.vue';
  import FooterCom from '@/components/FooterCom/FooterCom.vue';
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
</script>
<style lang="less" scoped>
  .index-box {
    position: relative;
    z-index: 0;
  }
</style>
