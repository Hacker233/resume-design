<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.workService.chName">
      <el-switch v-model="module.props.workService.show" />
      <icon-select-pop
        v-if="module.props.workService.iconfont"
        v-model="module.props.workService.iconfont"
      ></icon-select-pop>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  import IconSelectPop from '@/components/IconSelectPop/IconSelectPop.vue';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);
</script>
