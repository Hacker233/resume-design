<template>
  <ul :style="eduBackgroundList">
    <li v-if="module.props.date.show">
      <span>{{ formatDate(dataSourceItem.date.value) }}</span>
    </li>
    <li v-if="module.props.schoolName.show">
      <span>{{ dataSourceItem.schoolName.value }}</span>
    </li>
    <li v-if="module.props.specialized.show">
      <span>{{ dataSourceItem.specialized.value }}</span>
    </li>
    <li v-if="module.props.degree.show">
      <span>{{ dataSourceItem.degree.value }}</span>
    </li>
  </ul>
  <!-- 主修课程 -->
  <p
    v-if="module.props.majorCourse.show"
    v-dompurify-html="dataSourceItem.majorCourse.value"
    :style="majorCourse"
  >
  </p>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  import { formatDate } from '@/utils/common';

  const props = defineProps<{
    module: IModule;
    dataSourceItem: any;
    dataSourceIndex: number;
  }>();

  // 求职意向列表整体样式
  const eduBackgroundList = useGetCustomStyle(props.module, 'eduBackgroundList');

  // 主修课程整体样式
  const majorCourse = useGetCustomStyle(props.module, 'majorCourse');
</script>
<style lang="scss" scoped>
  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex: 1;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
</style>
