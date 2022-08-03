<!-- 物料测试组件 -->
<template>
  <div class="test-box"> 测试组件 </div>
</template>
<script lang="ts" setup></script>

<script lang="ts">
  export default {
    keyId: '', // 组件id
    cptName: 'TEST_BOX', // 组件名
    cptTitle: '', // 组件名
    cptX: 0, // 组件x坐标
    cptY: 0, // 组件y坐标
    cptZ: 0, // 组件z坐标
    cptHeight: '', // 组件高度
    cptWidth: '' // 组件宽度
  };
</script>
<style lang="scss" scoped>
  .test-box {
    width: 100px;
    height: 100px;
    background-color: #ccc;
  }
</style>
