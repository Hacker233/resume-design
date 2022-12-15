<template>
  <div class="logo" @click="toHome">
    <!-- <svg-icon
      icon-name="icon-huojian"
      class-name="bilibili"
      :color="iconColor"
      size="25px"
    ></svg-icon>
    <span>91化简</span> -->
    <img src="@/assets/images/91huajian-caise.svg" />
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
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    img {
      width: 120px;
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
