<template>
  <div class="background-2 design">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
  .background-2 {
    background: url(../../assets/images/resumeBackground/bg-1.jpg) repeat-y;
    box-sizing: border-box;
    :deep(.content-box) {
      .dragArea {
        border-radius: 6px;
        box-shadow: 0 0 0 1px #ccc;
        background-color: rgba(#fff, 0.9);
        min-height: 1100px !important;
        margin: 30px;
        min-width: 760px !important;
        width: 760px !important;
      }
    }
  }
</style>
