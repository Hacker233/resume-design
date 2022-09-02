import { getUuid } from '@/utils/common';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRefreshStore = defineStore('refreshStore', () => {
  const refreshUuid = ref<string>(getUuid());
  function setUuid() {
    refreshUuid.value = getUuid();
  }
  return {
    refreshUuid,
    setUuid
  };
});
