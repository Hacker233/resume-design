<template>
  <div>
    <el-popover v-if="isUserInfo" :visible="visible" placement="top" :width="300">
      <slot name="userInfo"></slot>
      <template #reference>
        <slot></slot>
      </template>
    </el-popover>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    isUserInfo: boolean;
    visible: boolean;
  }

  defineProps<Props>();
</script>
