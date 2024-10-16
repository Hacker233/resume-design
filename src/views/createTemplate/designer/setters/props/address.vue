<template>
  <div class="height-editor-box">
    <el-form-item size="default" :label="module.props.address.chName">
      <el-switch v-model="module.props.address.show" />
      <icon-select-pop
        v-if="module.props.address.iconfont"
        v-model="module.props.address.iconfont"
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
