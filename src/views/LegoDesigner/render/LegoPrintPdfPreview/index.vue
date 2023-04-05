<template>
  <div :key="refreshUuid" class="lego-preview-pdf-box">
    <preview-html></preview-html>
  </div>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import PreviewHtml from './components/PreviewHtml.vue';
  import appStore from '@/store';
  import { getLegoUserResumeByIdAsync } from '@/http/api/lego';

  const { setUuid } = appStore.useUuidStore;
  const { changeHJSchemaJsonData } = appStore.useLegoJsonStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);

  // 获取url参数
  const route = useRoute();
  const { token, id } = route.query; // 模板id和模板名称

  // 初始化模板数据
  const getLegoTemplateData = async () => {
    if (token && id) {
      localStorage.setItem('token', token as string);
      const params = {
        id: id
      };
      const data = await getLegoUserResumeByIdAsync(params);
      if (data.data.status === 200) {
        changeHJSchemaJsonData(data.data.data.lego_json);
      } else {
        ElMessage.error(data.data.message);
      }
      setUuid();
    }
  };
  getLegoTemplateData();
</script>
<style lang="scss" scoped></style>
