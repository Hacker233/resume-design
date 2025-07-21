<template>
  <div class="logo" @click="toHome">
    <img
      src="@/assets/images/logo-maobu.png"
      alt="猫步简历 - 专业简历制作平台"
      title="猫步简历 - 打造完美简历"
    />
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
      height: 100px;
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
