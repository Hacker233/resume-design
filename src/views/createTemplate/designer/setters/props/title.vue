tem<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.title.chName">
      <el-switch v-model="module.props.title.show" />
      <icon-select-pop
        v-if="module.props.title.iconfont"
        v-model="module.props.title.iconfont"
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
