<template>
  <div :style="campusExperienceBox">
    <ul :style="campusExperienceList">
      <li v-if="module.props.date.show" class="time">
        <span>{{ formatDate(dataSourceItem.date.value) }}</span>
      </li>
      <ul :style="campusExperienceRightList" class="right">
        <li v-if="module.props.campusBriefly.show">
          <span>{{ dataSourceItem.campusBriefly.value }}</span>
        </li>
        <li v-if="module.props.campusDuty.show">
          <span>{{ dataSourceItem.campusDuty.value }}</span>
        </li>
      </ul>
    </ul>
    <!-- 经历内容 -->
    <p
      v-if="module.props.campusContent.show"
      v-dompurify-html="dataSourceItem.campusContent.value"
      :style="campusContent"
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

  // 校园经历整体样式
  const campusExperienceBox = useGetCustomStyle(props.module, 'campusExperienceBox');

  // 教育列表右侧整体样式
  const campusExperienceRightList = useGetCustomStyle(props.module, 'campusExperienceRightList');

  // 校园经历标题列表整体样式
  const campusExperienceList = useGetCustomStyle(props.module, 'campusExperienceList');

  // 经历内容样式
  const campusContent = useGetCustomStyle(props.module, 'campusContent');
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
