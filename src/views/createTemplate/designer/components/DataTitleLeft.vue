<template>
  <div class="title-left">
    <h1 v-show="!showInput" class="title">
      {{ module.title }}
    </h1>
    <el-input
      v-show="showInput"
      ref="titleIpf"
      v-model="module.title"
      size="large"
      style="width: 200px"
      @blur="blurTitle"
    ></el-input>
    <el-tooltip effect="light" content="编辑标题" placement="bottom">
      <svg-icon
        v-show="!showInput"
        icon-name="icon-tubiao_bianji"
        color="#1e2532"
        size="22px"
        @click="toggleEdit"
      ></svg-icon>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
  import { useGetSelectedModule } from '../hooks/useGetSelectedModule';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  // 是否展示输入框
  const showInput = ref<boolean>(false);

  // 输入框失去焦点
  const titleIpf = ref<any>(null);
  const blurTitle = () => {
    showInput.value = false;
  };

  // 输入框宽度
  const toggleEdit = () => {
    showInput.value = true;
    titleIpf.value.focus();
  };
</script>
<style lang="scss" scoped>
  .title-left {
    display: flex;
    align-items: center;
    .title {
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: '#1e2532';
      margin-right: 10px;
    }
    .svg-icon {
      cursor: pointer;
      padding: 3px;
      transition: all 0.3s;
      &:hover {
        background-color: #eee;
        border-radius: 4px;
      }
    }
  }
</style>
