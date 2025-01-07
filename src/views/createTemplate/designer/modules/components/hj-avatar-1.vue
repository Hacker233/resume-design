<template>
  <div class="avatar-1-box" :style="avatar">
    <el-image
      v-if="module?.dataSource.avatar.value"
      :fit="avatar.objectFit"
      :style="elImageStyle"
      :src="module.dataSource.avatar.value"
    />
    <img v-else :src="defaultImg" style="width: 100%; height: 100%" alt="touxiang" srcset="" />
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
      width: '100%',
      height: '100%',
      borderTopLeftRadius: avatar?.value.borderTopLeftRadius,
      borderTopRightRadius: avatar?.value.borderTopRightRadius,
      borderBottomLeftRadius: avatar?.value.borderBottomLeftRadius,
      borderBottomRightRadius: avatar?.value.borderBottomRightRadius
    };
  });
</script>
