<template>
  <job-intention-com-vue :modelData="modelData"></job-intention-com-vue>
</template>
<script lang="ts" setup>
  import JobIntentionComVue from '@/components/ModelComs/JobIntentionCom.vue';
  import { IJOBINTENTION } from '@/interface/model';
  defineProps<{
    modelData: IJOBINTENTION;
  }>();
</script>
