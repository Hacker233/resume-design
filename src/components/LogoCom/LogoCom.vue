<template>
  <div id="logo" class="logo" @click="toHome">
    <img
      src="@/assets/images/logo-maobu.png"
      alt="猫步简历 - 专业简历制作平台"
      title="猫步简历 - 打造完美简历"
    />
  </div>
</template>
<script lang="ts" setup>
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
  }
</style>
