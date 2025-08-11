<template>
  <resume-detail-nav-bar v-if="isPrerender"></resume-detail-nav-bar>
  <nav-bar v-else bg-color="#fff" font-color="green" position="sticky" icon-color="green"></nav-bar>
  <div class="sitemap">
    <header>
      <h1>猫步简历全站导航</h1>
      <p class="description">快速找到您需要的简历制作服务和模板下载</p>
    </header>

    <!-- 网站页面部分 -->
    <div class="sitemap-section">
      <h2>网站页面</h2>
      <div class="link-grid">
        <div v-for="(link, index) in sitePages" :key="index" class="link-item">
          <a
            :href="link.url"
            target="_blank"
            :title="`猫步简历 - ${link.title}`"
            class="link-text"
            >{{ link.title }}</a
          >
        </div>
      </div>
    </div>

    <!-- 在线制作简历模板部分 -->
    <div class="sitemap-section">
      <h2>在线制作简历模板</h2>
      <div class="link-grid">
        <div v-for="template in templates" :key="template.id" class="link-item">
          <a
            :href="`https://maobucv.com/template/${template.page}`"
            target="_blank"
            :title="`猫步简历模板 - ${template.title}`"
            class="link-text"
            >{{ template.title }}</a
          >
        </div>
      </div>
    </div>

    <!-- Word简历模板下载部分 -->
    <div class="sitemap-section">
      <h2>Word简历模板下载</h2>
      <div class="link-grid">
        <div v-for="(link, index) in wordTemplates" :key="index" class="link-item">
          <a
            :href="`https://maobucv.com/wordPreview/${link.id}`"
            target="_blank"
            :title="`Word简历模板下载 - ${link.title}`"
            class="link-text"
            >{{ link.title }}</a
          >
        </div>
      </div>
    </div>

    <!-- PPT模板下载部分 -->
    <div class="sitemap-section">
      <h2>PPT模板下载</h2>
      <div class="link-grid">
        <div v-for="(link, index) in pptTemplates" :key="index" class="link-item">
          <a
            :href="`https://maobucv.com/pptPreview/${link.id}`"
            target="_blank"
            :title="`PPT模板下载 - ${link.title}`"
            class="link-text"
            >{{ link.title }}</a
          >
        </div>
      </div>
    </div>
  </div>
  <footer-com></footer-com>
</template>

<script setup lang="ts">
  import templatesJSON from '@/static/templates';
  import wordsJSON from '@/static/words';
  import pptJSON from '@/static/ppt';

  import { useHead } from '@vueuse/head';

  useHead({
    title: '猫步简历 - 全站导航',
    meta: [
      {
        name: 'description',
        content: '猫步简历全站导航页面，提供简历制作、Word模板下载、PPT模板下载等服务的快速访问入口'
      },
      { name: 'keywords', content: '简历制作,简历模板,Word简历,PPT模板,在线简历制作,简历下载' }
    ]
  });

  // 网站页面链接数据
  const sitePages = ref([
    { title: '首页', url: 'https://maobucv.com/' },
    { title: '简历定制服务', url: 'https://maobucv.com/resumeService' },
    { title: '在线制作模版列表', url: 'https://maobucv.com/resume' },
    { title: 'AI简历智能生成', url: 'https://maobucv.com/generateAiResume' },
    { title: 'AI简历智能诊断', url: 'https://maobucv.com/aiDiagnosticCV' },
    { title: 'word简历模版列表', url: 'https://maobucv.com/word' },
    { title: 'ppt模版列表', url: 'https://maobucv.com/ppt' },
    { title: '整站部署方案', url: 'https://maobucv.com/webcode' },
    { title: '组织入驻', url: 'https://maobucv.com/orgSettled' },
    { title: '项目文档', url: 'https://maobucv.com/deployDoc' },
    { title: '会员开通', url: 'https://maobucv.com/membership' },
    { title: '友链申请', url: 'https://maobucv.com/linksApply' }
  ]);

  // Word简历模板数据
  const wordTemplates = ref(wordsJSON);

  // PPT模板数据
  const pptTemplates = ref(pptJSON);

  // 在线制作模板数据（保持不变）
  const templates = ref(templatesJSON);

  // 是否预渲染
  const isPrerender = computed(() => {
    if (import.meta.env.MODE === 'development') {
      return false;
    } else {
      const mode = ref(import.meta.env.VITE_BUILD_MODE || 'spa');
      if (mode.value === 'spa') {
        return false;
      } else {
        return true;
      }
    }
  });
</script>
<style lang="scss" scoped>
  .sitemap {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    padding: 20px;
    background-color: #f9f9f9;
    margin: 30px auto;

    header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;

      h1 {
        color: #2c3e50;
        font-size: 2.2em;
        margin-bottom: 10px;
      }

      .description {
        color: #7f8c8d;
        font-size: 1.1em;
      }
    }

    .sitemap-section {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
      margin-bottom: 30px;

      h2 {
        color: #3498db;
        font-size: 1.5em;
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 15px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 5px;
          height: 70%;
          width: 4px;
          background: #3498db;
          border-radius: 2px;
        }
      }

      .link-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }

      .link-item {
        margin-bottom: 8px;
        min-width: 0; /* 关键：解决flex布局中的溢出问题 */

        a {
          color: #2c3e50;
          text-decoration: none;
          transition: all 0.2s;
          display: block;
          padding: 8px 10px;
          border-radius: 4px;
          background-color: #f5f9fc;
          border-left: 3px solid #e1f0fa;
          white-space: nowrap; /* 防止文本换行 */
          overflow: hidden; /* 隐藏超出容器的内容 */
          text-overflow: ellipsis;

          &:hover {
            color: #fff;
            background-color: #3498db;
            border-left-color: #2c80b5;
            transform: translateY(-2px);
            box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
          }

          &.link-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .sitemap {
      padding: 15px;

      .sitemap-section {
        padding: 15px;

        .link-grid {
          grid-template-columns: 1fr;
        }

        h2 {
          font-size: 1.3em;
        }
      }
    }
  }
</style>
