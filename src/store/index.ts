// import { createPinia } from 'pinia';
import { useLoadingStore } from './loading';
import { useResumeJsonStore, useResumeModelStore } from './resume';
import { useUuidStore } from './uuid';

// const store = createPinia();
// export default store;

export interface IAppStore {
  useLoadingStore: ReturnType<typeof useLoadingStore>;
  useResumeJsonStore: ReturnType<typeof useResumeJsonStore>;
  useResumeModelStore: ReturnType<typeof useResumeModelStore>;
  useUuidStore: ReturnType<typeof useUuidStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.useLoadingStore = useLoadingStore();
  appStore.useResumeJsonStore = useResumeJsonStore();
  appStore.useResumeModelStore = useResumeModelStore();
  appStore.useUuidStore = useUuidStore();
};
