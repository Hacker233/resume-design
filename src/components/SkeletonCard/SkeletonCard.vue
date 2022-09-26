<template>
  <div class="skeleton-custom-box">
    <el-skeleton style="width: 300px" animated :throttle="500">
      <template #template>
        <el-skeleton-item variant="image" style="width: 300px; height: 400px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 100%" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<style lang="scss" scoped>
  .skeleton-custom-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    border-radius: 5px;
    overflow: hidden;
    width: 300px;
    height: 440px;
    flex-basis: fit-content;
  }
</style>
