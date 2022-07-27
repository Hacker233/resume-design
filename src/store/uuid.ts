import { getUuid } from '@/utils/common';
import { defineStore } from 'pinia';

export const useUuidStore = defineStore('uuidStore', {
  state: () => {
    return {
      refreshUuid: getUuid()
    };
  },
  actions: {
    setUuid() {
      this.refreshUuid = getUuid();
    }
  }
});
