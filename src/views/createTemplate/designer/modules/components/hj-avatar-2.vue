<template>
  <div class="avatar-1-box" :style="avatar">
    <el-image
      v-if="module?.dataSource.avatar"
      :style="elImageStyle"
      :src="module.dataSource.avatar"
    />
    <img
      v-else
      :src="defaultImg"
      style="width: 100%; height: 100%; border-radius: 50%"
      alt="touxiang"
      srcset=""
    />
  </div>
</template>
<script lang="ts" setup>
  import defaultAvatar from '@/assets/images/people.jpg';
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  const defaultImg = defaultAvatar;

  // 头像
  const avatar = useGetCustomStyle(props.module, 'avatar');

  // 返回el-img样式
  const elImageStyle = computed(() => {
    return {
      width: '115px',
      height: '115px',
      borderRadius: '50%'
    };
  });
</script>
