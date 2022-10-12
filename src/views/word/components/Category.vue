<template>
  <div class="category-box">
    <div class="left">
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
  }>();

  const currentSort = ref<string>('');

  // 点击分类
  const currentValue = ref<string>('');
  const handleSelect = (item: any) => {
    currentValue.value = item.category_value;
    let queryParams = {
      category: currentValue.value,
      sort: currentSort.value
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
    padding: 20px 12px;
    .left {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #333;
      .category-title {
        margin-right: 20px;
      }
      ul {
        display: flex;
        li {
          list-style: none;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          letter-spacing: 4px;
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
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
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
        }
      }
      .active {
        color: #018060;
      }
    }
  }
</style>
