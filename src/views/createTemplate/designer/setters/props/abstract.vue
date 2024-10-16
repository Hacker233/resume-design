<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.abstract.chName">
      <el-switch v-model="module.props.abstract.show" />
      <icon-select-pop
        v-if="module.props.abstract.iconfont"
        v-model="module.props.abstract.iconfont"
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
