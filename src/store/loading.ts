import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref<boolean>(false);
  function changLoading(status: boolean) {
    isLoading.value = status;
  }

  return {
    isLoading,
    changLoading
  };
});
