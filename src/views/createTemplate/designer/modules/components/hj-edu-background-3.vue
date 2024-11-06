<template>
  <div :style="eduBackgroundBox">
    <ul :style="eduBackgroundList">
      <li v-if="module.props.date.show" class="time">
        <span>{{ formatDate(dataSourceItem.date.value) }}</span>
      </li>
      <ul :style="eduBackgroundRightList" class="right">
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
    </ul>
    <!-- 主修课程 -->
    <p
      v-if="module.props.majorCourse.show"
      v-dompurify-html="dataSourceItem.majorCourse.value"
      :style="majorCourse"
    >
    </p>
  </div>
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

  // 教育信息整体样式
  const eduBackgroundBox = useGetCustomStyle(props.module, 'eduBackgroundBox');

  // 教育列表右侧整体样式
  const eduBackgroundRightList = useGetCustomStyle(props.module, 'eduBackgroundRightList');

  // 求职意向列表整体样式
  const eduBackgroundList = useGetCustomStyle(props.module, 'eduBackgroundList');

  // 主修课程整体样式
  const majorCourse = useGetCustomStyle(props.module, 'majorCourse');
</script>
<style lang="scss" scoped>
  .time {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    min-width: 133px;
  }
  .right {
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
  }
</style>
