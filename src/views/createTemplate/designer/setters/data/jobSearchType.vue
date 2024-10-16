<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="求职类型:">
      <el-select v-model="module.dataSource.jobSearchType" placeholder="请选择求职类型">
        <el-option
          v-for="(item, index) in jobSearchTypeList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  const jobSearchTypeList: Array<string> = reactive(['全职', '兼职', '实习']);
</script>
<style lang="scss" scoped>
  .height-editor-box {
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
        display: flex;
        .el-select {
          flex: 1;
        }
      }
    }
  }
</style>
