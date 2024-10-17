<template>
  <ul :style="jobIntentionList">
    <!-- 求职类型 -->
    <li v-show="module.props.jobSearchType.show">
      <svg-icon
        :icon-name="module.props.jobSearchType.iconfont"
        :color="jobIntentionList.color"
        :size="jobIntentionList.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.jobSearchType.value }}</span>
    </li>
    <!-- 意向岗位 -->
    <li v-show="module.props.intendedPositions.show">
      <svg-icon
        :icon-name="module.props.intendedPositions.iconfont"
        :color="jobIntentionList.color"
        :size="jobIntentionList.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.intendedPositions.value }}</span>
    </li>
    <!-- 意向城市 -->
    <li v-show="module.props.intendedCity.show">
      <svg-icon
        :icon-name="module.props.intendedCity.iconfont"
        :color="jobIntentionList.color"
        :size="jobIntentionList.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.intendedCity.value }}</span>
    </li>
    <!-- 期望薪资 -->
    <li v-show="module.props.expectSalary.show">
      <svg-icon
        :icon-name="module.props.expectSalary.iconfont"
        :color="jobIntentionList.color"
        :size="jobIntentionList.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.expectSalary.value }}</span>
    </li>
    <!-- 求职状态 -->
    <li v-show="module.props.jobStatus.show">
      <svg-icon
        :icon-name="module.props.jobStatus.iconfont"
        :color="jobIntentionList.color"
        :size="jobIntentionList.fontSize"
      ></svg-icon>
      <span>{{ module.dataSource.jobStatus.value }}</span>
    </li>
  </ul>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: IModule;
  }>();

  // 求职意向列表整体样式
  const jobIntentionList: any = useGetCustomStyle(props.module, 'jobIntentionList');
</script>
<style lang="scss" scoped>
  li {
    list-style: none;
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
</style>
