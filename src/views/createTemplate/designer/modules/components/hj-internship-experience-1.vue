<template>
  <div :style="internshipExperienceBox">
    <!-- title列表 -->
    <ul class="title-list-box" :style="internshipExperienceList">
      <li v-if="module.props.date.show" class="time">
        <span>{{ formatDate(dataSourceItem.date.value) }}</span>
      </li>
      <li v-if="module.props.companyName.show">
        <span>{{ dataSourceItem.companyName.value }}</span>
      </li>
      <li v-if="module.props.posts.show">
        <span>{{ dataSourceItem.posts.value }}</span>
      </li>
    </ul>
    <!-- 实习内容 -->
    <div :style="jobContentBox" class="job-content-box">
      <p
        v-if="module.props.contentTtile.show"
        v-dompurify-html="dataSourceItem.contentTtile.value"
        :style="contentTtile"
      ></p>
      <ul
        v-if="module.props.jobContent.show"
        class="job-content-ul"
        :style="internshipExperienceUl"
      >
        <li
          v-for="(contentItem, index) in dataSourceItem.jobContent.value"
          :key="index"
          v-dompurify-html="contentItem.content.value"
          :class="[{ 'odd-li': isOddLi(index + 1) }]"
          :style="internshipExperienceLi"
          class="mb-li"
        ></li>
      </ul>
    </div>
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

  // 实习经验信息整体样式
  const internshipExperienceBox = useGetCustomStyle(props.module, 'internshipExperienceBox');

  // 实习经验标题列表整体样式
  const internshipExperienceList = useGetCustomStyle(props.module, 'internshipExperienceList');

  // 实习经验实习内容整体样式
  const jobContentBox = useGetCustomStyle(props.module, 'jobContentBox');

  // 实习内容小标题样式
  const contentTtile = useGetCustomStyle(props.module, 'contentTtile');

  // 实习经验内容列表整体样式
  const internshipExperienceUl = useGetCustomStyle(props.module, 'internshipExperienceUl');

  // 实习内容单个列表样式
  const internshipExperienceLi = useGetCustomStyle(props.module, 'internshipExperienceLi');

  // 实习内容列表是否需要奇数列设置右边距
  const isOddLi = (index: number) => {
    if (internshipExperienceLi.value.width?.indexOf('%') > -1) {
      if (Number(internshipExperienceLi.value.width.split('%')[0]) > 50 || index % 2 == 0) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };
</script>
<style lang="scss" scoped>
  .title-list-box {
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
  .job-content-ul {
    .odd-li {
      padding-right: 25px;
    }
    .mb-li {
      :deep(ul li) {
        list-style: disc;
      }
    }
  }
</style>
