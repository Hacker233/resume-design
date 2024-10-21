<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props[keyValue].chName">
      <el-switch v-model="module.props[keyValue].show" style="margin-right: 10px" />
      <icon-select-pop
        v-if="module.props[keyValue].iconfont"
        v-model="module.props[keyValue].iconfont"
      ></icon-select-pop>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  import IconSelectPop from '@/components/IconSelectPop/IconSelectPop.vue';

  const props = defineProps<{
    id: string;
    keyValue: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);
</script>
