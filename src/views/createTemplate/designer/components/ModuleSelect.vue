<!-- 模块选择 -->
<template>
  <div class="module-select">
    <div class="left-title" @click="selectNone">
      <span>模块</span>
      <span>选择</span>
    </div>
    <c-scrollbar trigger="hover" style="height: calc(100vh - 110px)">
      <ul>
        <li
          v-for="(val, key, index) in MATERIAL_JSON"
          :key="index"
          :class="[{ active: currentKey === key }]"
          @click="selectModel(val, key as string)"
        >
          <svg-icon :icon-name="modelOfIcon[key]" color="#2cbd99" size="25px"></svg-icon>
          <p>{{ modelOfTitle[key] }}</p>
        </li>
      </ul>
    </c-scrollbar>
  </div>
</template>
<script setup lang="ts">
  import { MATERIAL_JSON } from '@/schema/materialList';
  import modelOfTitle from '@/dictionary/modelOfTitle';
  import modelOfIcon from '@/dictionary/modelOfIcon';
  import modelCategory from '@/dictionary/modelOfTitle';

  // 点击模块选择
  const currentKey = ref<string>('');
  const currentTitle = ref<string>('物料组件');
  let cptList = ref<Array<any>>([]);
  const selectModel = (val: Array<any>, key: string) => {
    currentTitle.value = modelCategory[key];
    currentKey.value = key;
    cptList.value = val;
    console.log('cptList', cptList);
  };

  // 重置模块
  const selectNone = () => {
    currentKey.value = '';
  };
</script>
<style lang="scss" scoped>
  .module-select {
    width: 75px;
    border-right: 1px solid #eee;
    .left-title {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      color: #2cbd99;
      box-sizing: border-box;
      user-select: none;
      cursor: pointer;
      span {
        font-size: 17px;
        font-weight: 600;
        font-family: cursive;
      }
    }
    ul {
      width: 100%;
      height: calc(100vh - 110px);
      li {
        list-style: none;
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: all 0.3s;
        user-select: none;
        &:hover {
          background-color: rgba(#2cbd99, 0.2);
        }
        p {
          font-size: 12px;
          color: #2cbd99;
          transform: scale(0.9);
        }
      }
      .active {
        background-color: rgba(#2cbd99, 0.2);
      }
    }
  }
</style>
