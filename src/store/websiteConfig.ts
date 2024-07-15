import { getWebsiteConfigAsync } from '@/http/api/websiteConfig';
import { defineStore } from 'pinia';

export const useWebsiteConfigStore = defineStore('websiteConfig', () => {
  const websiteConfig = reactive<{
    open_sign: boolean;
    open_comment: boolean;
    open_person_in: boolean;
    open_get_source_code: boolean;
    open_sign_in: boolean;
    open_business: boolean;
    website_title: string;
  }>({
    open_sign: true,
    open_comment: true,
    open_person_in: true,
    open_get_source_code: true,
    open_sign_in: true,
    open_business: true,
    website_title: '91化简-一款免费开源的简历制作神器'
  });

  function saveWebsiteConfig(websiteConfigData: any) {
    websiteConfig.open_comment = websiteConfigData.open_comment;
    websiteConfig.open_sign = websiteConfigData.open_sign;
    websiteConfig.open_person_in = websiteConfigData.open_person_in;
    websiteConfig.open_get_source_code = websiteConfigData.open_get_source_code;
    websiteConfig.open_sign_in = websiteConfigData.open_sign_in;
    websiteConfig.open_business = websiteConfigData.open_business;
    websiteConfig.website_title = websiteConfigData.website_title;
    document.title = websiteConfig.website_title;
  }
  // 查询网站配置信息
  async function getWebsiteConfig() {
    const data = await getWebsiteConfigAsync();
    if (data.status === 200) {
      saveWebsiteConfig(data.data);
    } else {
      ElMessage.error(data.message);
    }
  }
  return {
    getWebsiteConfig,
    websiteConfig
  };
});
