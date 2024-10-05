<template>
  <ul :style="style">
    <li v-show="module.props.age.show" class="li-border">{{ module.dataSource.age }}岁</li>
    <li v-show="module.props.address.show" class="li-border">{{ module.dataSource.address }}</li>
    <li v-show="module.props.degree.show" class="li-border">{{ module.dataSource.degree }}</li>
    <li v-show="module.props.workService.show" class="li-border"
      >{{ module.dataSource.workService }}年经验</li
    >
    <li v-show="module.props.phoneNumber.show" class="li-border">{{
      module.dataSource.phoneNumber
    }}</li>
    <li v-show="module.props.email.show">{{ module.dataSource.email }}</li>
  </ul>
</template>
<script lang="ts" setup>
  import { IModule } from '@/views/createTemplate/types/IHJNewSchema';

  const props = defineProps<{
    module: IModule;
    style: any;
  }>();

  const borderColor = computed(() => {
    return props.style?.color || '#b4b4b4';
  });
</script>
<style lang="scss" scoped>
  li {
    list-style: none;
    margin-right: 20px;
    padding-right: 12px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .li-border {
    border-right: 2px solid v-bind('borderColor');
    opacity: 0.8;
  }
</style>
