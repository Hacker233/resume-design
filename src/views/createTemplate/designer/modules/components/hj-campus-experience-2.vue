<template>
  <div :style="campusExperienceBox">
    <ul :style="campusExperienceList">
      <li v-if="module.props.date.show">
        <span>{{ formatDate(dataSourceItem.date.value) }}</span>
      </li>
      <li v-if="module.props.campusBriefly.show">
        <span>{{ dataSourceItem.campusBriefly.value }}</span>
      </li>
    </ul>
    <!-- 主要职责 -->
    <p
      v-if="module.props.campusDuty.show"
      v-dompurify-html="dataSourceItem.campusDuty.value"
      :style="campusDuty"
    ></p>
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

  // 校园经历标题列表整体样式
  const campusExperienceList = useGetCustomStyle(props.module, 'campusExperienceList');

  // 经历内容样式
  const campusContent = useGetCustomStyle(props.module, 'campusContent');

  // 获取主要职责样式
  const campusDuty = useGetCustomStyle(props.module, 'campusDuty');
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
