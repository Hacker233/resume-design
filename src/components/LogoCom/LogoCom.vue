<template>
  <div class="logo" @click="toHome">
    <!-- <svg-icon
      icon-name="icon-huojian"
      class-name="bilibili"
      :color="iconColor"
      size="25px"
    ></svg-icon>
    <span>猫步简历</span> -->
    <img src="@/assets/images/logo-maobu.png" />
  </div>
</template>
<script lang="ts" setup>
  interface IBgcColor {
    fontColor?: string;
    iconColor?: string;
  }
  withDefaults(defineProps<IBgcColor>(), {
    fontColor: '#74a274',
    iconColor: ''
  });

  const router = useRouter();
  const toHome = () => {
    router.push('/');
  };
</script>
<style lang="scss" scoped>
  .logo {
    height: 80%;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    img {
      height: 100%;
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
