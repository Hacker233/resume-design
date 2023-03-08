import { initResetFun } from '@/utils/storeTools';
import { useLoadingStore } from './loading';
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume';
import { useUuidStore } from './uuid';
import { useTokenStore } from './token';
import { useUserInfoStore } from './user';
import { useRefreshStore } from './refresh';
import { useLegoJsonStore } from './lego';

export interface IAppStore {
  useLoadingStore: ReturnType<typeof useLoadingStore>;
  useUuidStore: ReturnType<typeof useUuidStore>;
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>;
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>;
  useTokenStore: ReturnType<typeof useTokenStore>;
  useUserInfoStore: ReturnType<typeof useUserInfoStore>;
  useRefreshStore: ReturnType<typeof useRefreshStore>;
  useLegoJsonStore: ReturnType<typeof useLegoJsonStore>;
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
  appStore.useTokenStore = useTokenStore();
  appStore.useUserInfoStore = useUserInfoStore();
  appStore.useRefreshStore = useRefreshStore();
  appStore.useLegoJsonStore = useLegoJsonStore();
  // 重写reset方法
  initResetFun(appStore);
};
export default appStore;
