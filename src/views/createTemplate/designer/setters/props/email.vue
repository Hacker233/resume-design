<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.email.chName">
      <el-switch v-model="module.props.email.show" />
      <icon-select-pop
        v-if="module.props.email.iconfont"
        v-model="module.props.email.iconfont"
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
