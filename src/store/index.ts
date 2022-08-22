import { initResetFun } from '@/utils/storeTools';
import { useLoadingStore } from './loading';
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume';
import { useUuidStore } from './uuid';

export interface IAppStore {
  useLoadingStore: ReturnType<typeof useLoadingStore>;
  useUuidStore: ReturnType<typeof useUuidStore>;
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>;
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.useLoadingStore = useLoadingStore();
  appStore.useUuidStore = useUuidStore();
  appStore.useSelectMaterialStore = useSelectMaterialStore();
  appStore.useResumeJsonNewStore = useResumeJsonNewStore();
  // 重写reset方法
  initResetFun(appStore);
};
export default appStore;
