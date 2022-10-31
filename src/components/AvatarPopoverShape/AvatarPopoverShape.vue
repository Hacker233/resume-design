<template>
  <el-popover placement="bottom" :width="200" trigger="click">
    <template #reference>
      <div class="avatar-img-box">
        <img
          v-if="!modelItem.data.avatarShape"
          src="@/assets/images/default-avatar.png"
          alt="头像形状选择"
          srcset=""
        />
        <component
          :is="avatarComponents[modelItem.data.avatarShape]"
          v-else
          width="75px"
          height="75px"
        ></component>
      </div>
    </template>
    <!-- 内容区域 -->
    <div class="custom-avatar-shape-box">
      <div
        v-for="(val, key, index) in avatarComponents"
        :key="index"
        class="item-box"
        @click="handleAvatarShape(key)"
      >
        <component :is="val" width="80px" height="80px"></component>
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import avatarComponents from '@/utils/registerAvatarCom';
  const emit = defineEmits(['changeShape']);
  defineProps<{
    modelItem: IMATERIALITEM; // 模块数据
  }>();

  const handleAvatarShape = (key: string | number) => {
    emit('changeShape', key);
  };
</script>
<style lang="scss" scoped>
  // 头像形状样式
  .avatar-img-box {
    cursor: pointer;
  }
  .custom-avatar-shape-box {
    display: flex;
    cursor: pointer;
  }
</style>
