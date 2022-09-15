<template>
  <div class="category-box">
    <div class="left">
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

  // 点击分类
  const currentValue = ref<string>('');
  const handleSelect = (item: any) => {
    currentValue.value = item.category_value;
    emit('getTemplateListByCate', currentValue.value);
  };
</script>
<style lang="scss" scoped>
  .category-box {
    width: 100%;
    display: flex;
    min-height: 42px;
    .left {
      ul {
        display: flex;
        li {
          list-style: none;
          padding: 0 25px;
          height: 42px;
          border-radius: 20px;
          font-size: 14px;
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
            color: #009a74;
          }
        }
        .active {
          color: #009a74;
          border: 1px solid #2ddd9d;
        }
      }
    }
  }
</style>
