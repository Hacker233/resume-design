<template>
  <el-popover placement="bottom" :width="250" trigger="click">
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
        <component
          :is="val"
          :width="avatarDic[key].miniWidth"
          :height="avatarDic[key].miniHeight"
        ></component>
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import avatarComponents from '@/utils/registerAvatarCom';
  import { avatarDic } from '@/dictionary/avatarShapeDic';
  const emit = defineEmits(['changeShape']);
  defineProps<{
    modelItem: IMATERIALITEM; // 模块数据
  }>();

  // 头像变化
  const handleAvatarShape = (key: string | number) => {
    emit('changeShape', key);
  };

  // 返回宽度
  // const getMiniWidth = (key: string | number) => {
  //   let keyStr = key.toString();
  //   console.log('1111', key);

  //   console.log(avatarDic[keyStr].miniWidth);
  //   return avatarDic[keyStr].miniWidth;
  // };
  // // 返回高度
  // const getMiniHeight = (key: string | number) => {
  //   let keyStr = key.toString();
  //   return avatarDic[keyStr].miniHeight;
  // };
</script>
<style lang="scss" scoped>
  // 头像形状样式
  .avatar-img-box {
    cursor: pointer;
  }
  .custom-avatar-shape-box {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    flex-wrap: wrap;
    .item-box {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }
</style>
