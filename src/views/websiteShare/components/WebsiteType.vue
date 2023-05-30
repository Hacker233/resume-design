<template>
  <div class="website-type-list-box">
    <div class="left">
      <ul>
        <li
          v-for="(item, index) in websiteTypeList"
          :key="index"
          :class="[{ active: currentValue === item.website_type_name }]"
          @click="handleSelect(item)"
        >
          <svg-icon
            v-if="!item.website_type_icon"
            icon-name="icon-danlieliebiao"
            :color="currentValue === item.website_type_name ? '#009a74' : '#000'"
            size="18px"
            class-name="catalog-icon"
          ></svg-icon>
          <svg-icon
            v-else
            :icon-name="item.website_type_icon"
            :color="currentValue === item.website_type_name ? '#009a74' : '#000'"
            size="18px"
            class-name="catalog-icon"
          ></svg-icon>
          <span>{{ item.website_type_name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['getWebsiteCategoryListByType', 'getWebsiteListByType']);

  defineProps<{
    websiteTypeList: Array<{
      website_type_icon: string;
      website_type_name: string;
      website_type_id: string;
    }>;
  }>();

  // 点击类型
  const { weisiteTypeName } = useRoute().query;
  const currentValue = ref<string>(''); // 默认选中类型
  if (weisiteTypeName) {
    currentValue.value = weisiteTypeName as string;
  } else {
    currentValue.value = '影视视频';
  }

  // 点击类型
  const router = useRouter();
  const handleSelect = (item: any) => {
    currentValue.value = item.website_type_name;
    emit('getWebsiteListByType', currentValue.value);
    emit('getWebsiteCategoryListByType', currentValue.value);
    router.replace({
      path: '/website',
      query: {
        weisiteTypeName: currentValue.value
      }
    });
  };

  // 根据类型查询网站分类
  emit('getWebsiteCategoryListByType', currentValue.value);

  // 根据网站类型查询网站列表
  emit('getWebsiteListByType', currentValue.value);
</script>
<style lang="scss" scoped>
  .website-type-list-box {
    width: 100%;
    display: flex;
    min-height: 42px;
    justify-content: space-between;
    .left {
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        li {
          list-style: none;
          width: 85%;
          height: 42px;
          border-radius: 20px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          letter-spacing: 4px;
          transition: all 0.3s;
          border: 1px solid transparent;
          user-select: none;
          margin-bottom: 10px;
          &:hover {
            color: #009a74;
            border: 1px solid #03d7a2;
          }
          .catalog-icon {
            margin-right: 10px;
          }
          span {
            min-width: 72px;
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
