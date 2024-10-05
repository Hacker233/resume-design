<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.name.chName">
      <el-switch v-model="module.props.name.show" />
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
</script>
