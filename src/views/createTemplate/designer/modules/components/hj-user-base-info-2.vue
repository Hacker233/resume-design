<template>
  <ul :style="userBaseInfo">
    <li v-show="module.props.age.show">
      <svg-icon
        :icon-name="module.props.age.iconfont"
        :color="userBaseInfo.color"
        :size="userBaseInfo.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.age.value }}岁</span>
    </li>
    <li v-show="module.props.address.show">
      <svg-icon
        :icon-name="module.props.address.iconfont"
        :color="userBaseInfo.color"
        :size="userBaseInfo.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.address.value }}</span>
    </li>
    <li v-show="module.props.degree.show">
      <svg-icon
        :icon-name="module.props.degree.iconfont"
        :color="userBaseInfo.color"
        :size="userBaseInfo.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.degree.value }}</span>
    </li>
    <li v-show="module.props.workService.show" class="li-border">
      <svg-icon
        :icon-name="module.props.workService.iconfont"
        :color="userBaseInfo.color"
        :size="userBaseInfo.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.workService.value }}年经验</span>
    </li>
    <li v-show="module.props.phoneNumber.show">
      <svg-icon
        :icon-name="module.props.phoneNumber.iconfont"
        :color="userBaseInfo.color"
        :size="userBaseInfo.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.phoneNumber.value }}</span>
    </li>
    <li v-show="module.props.email.show">
      <svg-icon
        :icon-name="module.props.email.iconfont"
        :color="userBaseInfo.color"
        :size="userBaseInfo.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.email.value }}</span>
    </li>
  </ul>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 基础资料整体样式
  const userBaseInfo: any = useGetCustomStyle(props.module, 'userBaseInfo');
</script>
<style lang="scss" scoped>
  li {
    list-style: none;
    display: flex;
    align-items: center;
    & :first-child {
      margin-right: 10px;
    }
  }
</style>
