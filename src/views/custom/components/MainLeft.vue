<template>
  <div class="main-left-box"> 
    <div class="com-item" v-for="item of components">
      {{item.cptName}}
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    components: Object;
  }>();
</script>
<style lang="scss" scoped>
  .main-left-box {
    width: 300px;
    background-color: #fff;
    .com-item {
      width: 150px;
      height: 150px;
      background-color: #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;
    }
  }
</style>
