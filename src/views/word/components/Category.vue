<template>
  <div class="category-box">
    <div class="left">
      <div class="left-category">
        <span class="category-title">Word模板分类：</span>
        <ul>
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            :class="[{ active: currentValue === item.category_value }]"
            @click="handleSelect(item)"
          >
            {{ item.category_label }}
          </li>
        </ul>
      </div>
      <div class="left-category left-tag">
        <span class="category-title">标签分类：</span>
        <ul>
          <li
            v-for="(item, index) in tagsList"
            :key="index"
            :class="[{ 'tag-active': currentTag === item }]"
            @click="handleTagsSelect(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 右侧筛选 -->
    <div class="right">
      <div :class="['sort-box', { active: currentSort === 'time' }]" @click="handleSort('time')">
        <svg-icon
          icon-name="icon-shijian"
          class-name="juejin"
          size="20px"
          :color="currentSort === 'time' ? '#018060' : '#ccc'"
        ></svg-icon>
        <span>时间</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['getTemplateListByCate']);

  defineProps<{
    categoryList: Array<{
      category_label: string;
      category_value: string;
    }>;
    tagsList: Array<string>;
  }>();

  const currentSort = ref<string>(''); // 选中的分类
  const currentTag = ref<string>(''); // 选中的标签

  // 点击分类
  const currentValue = ref<string>('');
  const handleSelect = (item: any) => {
    currentValue.value = item.category_value;
    let queryParams = {
      category: currentValue.value,
      sort: currentSort.value,
      tag: currentTag.value
    };
    emit('getTemplateListByCate', queryParams);
  };

  // 点击标签
  const handleTagsSelect = (item: string) => {
    if (currentTag.value === item) {
      currentTag.value = '';
    } else {
      currentTag.value = item;
    }

    let queryParams = {
      category: currentValue.value,
      sort: currentSort.value,
      tag: currentTag.value
    };
    emit('getTemplateListByCate', queryParams);
  };

  const handleSort = (value: string) => {
    if (currentSort.value) {
      currentSort.value = '';
    } else {
      currentSort.value = value;
    }

    let queryParams = {
      category: currentValue.value,
      sort: currentSort.value
    };
    emit('getTemplateListByCate', queryParams);
  };
</script>
<style lang="scss" scoped>
  .category-box {
    width: 100%;
    display: flex;
    // min-height: 100px;
    background-color: #fff;
    justify-content: space-between;
    padding: 10px 12px 0 12px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 13px;
      color: #333;
      .left-category {
        display: flex;
        align-items: flex-start;
        margin: 10px 0;
        .category-title {
          margin-right: 20px;
          width: 100px;
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        ul {
          display: flex;
          li {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-right: 20px;
            transition: all 0.3s;
            border: 1px solid transparent;
            user-select: none;
            &:hover {
              color: green;
            }
          }
          .active {
            color: green;
            border-bottom: 1px solid green;
          }
        }
      }
      .left-tag {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-right: 20px;
            transition: all 0.3s;
            border: 1px solid #31eba6;
            border-radius: 20px;
            padding: 4px 6px;
            user-select: none;
            margin-bottom: 10px;
            &:hover {
              color: green;
              border-color: green;
            }
          }
          .tag-active {
            color: green;
            border-color: green;
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: flex-start;
      padding: 0 5px 0 0;
      .sort-box {
        margin-left: 10px;
        display: flex;
        align-items: center;
        color: rgb(181, 181, 181);
        cursor: pointer;
        transition: all 0.3s;
        font-size: 14px;
        user-select: none;
        span {
          margin-left: 2px;
          width: 30px;
        }
      }
      .active {
        color: #018060;
      }
    }
  }
</style>
