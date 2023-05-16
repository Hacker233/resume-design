<template>
  <ul class="category-list-ul">
    <li
      v-for="(item, index) in websiteCategoryList"
      :key="index"
      :class="[{ 'is-active': item._id === currentCategoryId }]"
      @click="handleCategory(item)"
    >
      {{ item.website_category }}
    </li>
  </ul>
</template>
<script lang="ts" setup>
  const emits = defineEmits(['changeCategory']);

  defineProps<{
    websiteCategoryList: Array<{
      website_category: string;
      website_category_icon: string;
      _id: string;
    }>;
  }>();

  // 点击分类
  const currentCategoryId = ref<string>('');
  const handleCategory = (item: { _id: string }) => {
    currentCategoryId.value = item._id;
    emits('changeCategory', currentCategoryId.value);
  };
</script>
<style lang="scss" scoped>
  .category-list-ul {
    display: flex;
    flex-direction: column;
    width: 80px;
    padding: 0 5px;
    li {
      cursor: pointer;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      font-size: 14px;
      position: relative;
      &::after {
        content: '';
        height: 4px;
        overflow: hidden;
        display: block;
        bottom: 0;
        position: absolute;
        width: 20px;
        background: #009a74;
        transform: scaleX(0);
        transition: all 0.5s;
      }
    }

    .is-active {
      position: relative;
      color: #009a74;
      &::after {
        content: '';
        height: 4px;
        overflow: hidden;
        display: block;
        bottom: 0;
        position: absolute;
        width: 20px;
        background: #009a74;
        transform: scaleX(1);
      }
    }

    li:hover::after {
      transform: scaleX(1);
      color: #009a74;
    }
  }
</style>
