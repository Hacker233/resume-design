<template>
  <div class="category-box">
    <div class="left">
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="[{ active: currentValue === item.socategory_name }]"
          @click="handleSelect(item)"
        >
          <svg-icon
            v-if="!item.socategory_icon"
            icon-name="icon-danlieliebiao"
            :color="currentValue === item.socategory_name ? '#009a74' : '#000'"
            size="18px"
            class-name="catalog-icon"
          ></svg-icon>
          <svg-icon
            v-else
            :icon-name="item.socategory_icon"
            :color="currentValue === item.socategory_name ? '#009a74' : '#000'"
            size="18px"
            class-name="catalog-icon"
          ></svg-icon>
          {{ item.socategory_name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['getSoftListByCate']);

  defineProps<{
    categoryList: Array<{
      socategory_icon: string;
      socategory_name: string;
      socategory_id: string;
    }>;
  }>();

  // 点击分类
  const currentValue = ref<string>('全部');
  const handleSelect = (item: any) => {
    currentValue.value = item.socategory_name;
    if (currentValue.value === '全部') {
      emit('getSoftListByCate', '');
      return;
    }
    emit('getSoftListByCate', currentValue.value);
  };
</script>
<style lang="scss" scoped>
  .category-box {
    width: 100%;
    display: flex;
    min-height: 42px;
    justify-content: space-between;
    .left {
      ul {
        display: flex;
        li {
          list-style: none;
          padding: 0 18px;
          height: 42px;
          border-radius: 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          letter-spacing: 4px;
          margin-right: 10px;
          transition: all 0.3s;
          border: 1px solid transparent;
          user-select: none;
          &:hover {
            color: #009a74;
          }
          .catalog-icon {
            margin-right: 10px;
          }
        }
        .active {
          color: #009a74;
          border: 1px solid #2ddd9d;
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
