<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="标记样式">
      <el-radio-group v-model="module.css.listStyle">
        <el-radio label="none">无</el-radio>
        <el-radio label="disc"
          ><li :style="{ listStyle: 'disc', marginLeft: '20px' }"></li
        ></el-radio>
        <el-radio label="auto"
          ><li :style="{ listStyle: 'auto', marginLeft: '20px' }"></li>
        </el-radio>
        <el-radio label="circle"
          ><li :style="{ listStyle: 'circle', marginLeft: '20px' }"></li
        ></el-radio>
        <el-radio label="cjk-ideographic"
          ><li :style="{ listStyle: 'cjk-ideographic', marginLeft: '30px' }"></li>
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
  }>();

  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
<style lang="scss" scoped>
  .height-editor-box {
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
        display: flex;
      }
    }
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
