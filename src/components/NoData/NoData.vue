<template>
  <div class="no-data-box">
    <img src="../../assets/images/no-data.png" alt="" />
  </div>
</template>
<script setup lang="ts">
  interface INoData {
    width: string;
    height: string;
  }
  const props = withDefaults(defineProps<INoData>(), {
    width: '300px',
    height: '300px'
  });
</script>
<style lang="scss">
  .no-data-box {
    width: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: v-bind('props.width');
      height: v-bind('props.height');
    }
  }
</style>
