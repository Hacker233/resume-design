import { initResetFun } from '@/utils/storeTools';
import { useLoadingStore } from './loading';
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume';
import { useUuidStore } from './uuid';
import { useTokenStore } from './token';
import { useUserInfoStore } from './user';
import { useRefreshStore } from './refresh';
import { useLegoJsonStore, useLegoSelectWidgetStore, useUndoAndRedoStore } from './lego';
import {
  useOnlineDesignNewJsonStore,
  useOnlineDesignNewSelectWidgetStore,
  useOnlineDesignNewUndoAndRedoStore
} from './onlineDesign';
import { useIndexMenuStore } from './menu';
import { useWebsiteConfigStore } from './websiteConfig';
import { useMembershipStore } from './membership';

export interface IAppStore {
  useLoadingStore: ReturnType<typeof useLoadingStore>;
  useUuidStore: ReturnType<typeof useUuidStore>;
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>;
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>;
  useTokenStore: ReturnType<typeof useTokenStore>;
  useUserInfoStore: ReturnType<typeof useUserInfoStore>;
  useRefreshStore: ReturnType<typeof useRefreshStore>;
  useLegoJsonStore: ReturnType<typeof useLegoJsonStore>;
  useLegoSelectWidgetStore: ReturnType<typeof useLegoSelectWidgetStore>;
  useUndoAndRedoStore: ReturnType<typeof useUndoAndRedoStore>;
  useIndexMenuStore: ReturnType<typeof useIndexMenuStore>;
  useWebsiteConfigStore: ReturnType<typeof useWebsiteConfigStore>;
  useMembershipStore: ReturnType<typeof useMembershipStore>;
  // 新版在线制作设计页面
  useOnlineDesignNewJsonStore: ReturnType<typeof useOnlineDesignNewJsonStore>;
  useOnlineDesignNewSelectWidgetStore: ReturnType<typeof useOnlineDesignNewSelectWidgetStore>;
  useOnlineDesignNewUndoAndRedoStore: ReturnType<typeof useOnlineDesignNewUndoAndRedoStore>;
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
  appStore.useLegoSelectWidgetStore = useLegoSelectWidgetStore();
  appStore.useUndoAndRedoStore = useUndoAndRedoStore();
  appStore.useIndexMenuStore = useIndexMenuStore();
  appStore.useWebsiteConfigStore = useWebsiteConfigStore();
  appStore.useMembershipStore = useMembershipStore();
  // 新版在线制作设计页面
  appStore.useOnlineDesignNewJsonStore = useOnlineDesignNewJsonStore();
  appStore.useOnlineDesignNewSelectWidgetStore = useOnlineDesignNewSelectWidgetStore();
  appStore.useOnlineDesignNewUndoAndRedoStore = useOnlineDesignNewUndoAndRedoStore();
  // 重写reset方法
  initResetFun(appStore);
};
export default appStore;
