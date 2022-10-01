<template>
  <div class="logo" @click="toHome">
    <svg-icon
      icon-name="icon-huojian"
      class-name="bilibili"
      :color="iconColor"
      size="25px"
    ></svg-icon>
    <span>91化简</span>
  </div>
</template>
<script lang="ts" setup>
  interface IBgcColor {
    fontColor?: string;
    iconColor?: string;
  }
  withDefaults(defineProps<IBgcColor>(), {
    fontColor: '#74a274',
    iconColor: '#74a274'
  });
  const router = useRouter();
  const toHome = () => {
    router.push('/');
  };
</script>
<style lang="scss" scoped>
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    img {
      width: 80px;
      height: 80px;
    }
    span {
      letter-spacing: 2px;
      font-size: 22px;
      font-weight: 600;
      font-family: monospace;
      color: v-bind('fontColor');
      margin-left: 10px;
    }
  }
</style>
