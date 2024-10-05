<template>
  <div class="avatar-1-box" :style="customCss">
    <el-image
      v-if="module?.dataSource.avatar"
      :style="elImageStyle"
      :src="module.dataSource.avatar"
    />
    <img v-else :src="defaultImg" style="width: 100%; height: 100%" alt="touxiang" srcset="" />
  </div>
</template>
<script lang="ts" setup>
  import defaultAvatar from '@/assets/images/people.jpg';
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';

  const props = defineProps<{
    module: IModule;
    customCss: any;
  }>();

  const defaultImg = defaultAvatar;

  // 返回el-img样式
  const elImageStyle = computed(() => {
    return {
      width: '115px',
      height: '115px',
      borderRadius: `${props.customCss?.value?.borderRadius}px` || '0px'
    };
  });
</script>
