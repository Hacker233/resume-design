<template>
  <div :class="['title', { 'collapse-center': !status }]">
    <el-tooltip class="box-item" effect="dark" :content="tooltipTitle">
      <div ref="switchRef" class="unfold-collapse-box" @click="unfoldOrCollapse">
        <svg-icon icon-name="icon-shouqi" color="#00c091" size="24px"></svg-icon>
      </div>
    </el-tooltip>
    <h1>{{ title }}</h1>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  interface ITitle {
    title?: string;
  }
  withDefaults(defineProps<ITitle>(), {
    title: '模块选择'
  });
  const emit = defineEmits(['unfoldOrCollapse']);
  const tooltipTitle = ref<string>('展开，放至最大宽度');

  // 展开或收起
  const status = ref<boolean>(true);
  const switchRef = ref<any>(null);
  const unfoldOrCollapse = () => {
    if (status.value) {
      tooltipTitle.value = '收起，收至最小宽度';
      status.value = false;
      switchRef.value.style.transform = 'rotate(180deg)';
    } else {
      tooltipTitle.value = '展开，放至最大宽度';
      status.value = true;
      switchRef.value.style.transform = 'rotate(0deg)';
    }
    emit('unfoldOrCollapse', status.value);
  };
</script>
<style lang="scss" scoped>
  .title {
    height: 60px;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 12px;
    box-sizing: border-box;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 8%);
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #eee;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }

    h1 {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      letter-spacing: 3px;
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
    }
    .unfold-collapse-box {
      cursor: pointer;
      transition: all 0.3s;
      position: absolute;
      left: 10px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .collapse-center {
    justify-content: center;
  }
</style>
