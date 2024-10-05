<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.email.chName">
      <el-switch v-model="module.props.email.show" />
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
