<template>
  <el-drawer
    :model-value="visible"
    @update:model-value="(value) => emit('update:visible', value)"
    direction="rtl"
    size="60%"
    :destroy-on-close="true"
    @close="handleClose"
    :modal-append-to-body="true"
    :append-to-body="true"
    class="diagnostic-drawer-content-body"
  >
    <template #title>
      <div class="drawer-title">
        <span>简历诊断报告</span>
        <div class="drawer-actions">
          <el-button type="primary" @click="exportAsImage" :loading="exportLoading">
            <el-icon><svg viewBox="0 0 24 24" width="16" height="16"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg></el-icon>
            导出为长图
          </el-button>
        </div>
      </div>
    </template>
    <div class="diagnostic-drawer-content">
      <diagnostic-report
        ref="reportRef"
        v-if="parsedDiagnosticData"
        :diagnostic-data="parsedDiagnosticData"
      ></diagnostic-report>
      <div v-else class="loading-placeholder">
        <el-empty description="诊断报告加载失败" />
        <div class="wechat-contact">
          <el-divider content-position="center">联系客服</el-divider>
          <div class="wechat-info">
            <el-icon class="wechat-icon"><ChatLineSquare /></el-icon>
            <p class="wechat-text">报告解析失败，请添加客服微信处理</p>
            <div class="wechat-qrcode" v-if="wechatQrCode">
              <img :src="wechatQrCode" alt="微信二维码" class="qrcode-image" />
              <p class="qrcode-hint">扫码添加客服微信</p>
            </div>
            <p class="wechat-code">
              微信：<span class="code" @click="copyWechatId('LHQfighting')">LHQfighting</span>
              <el-button
                type="primary"
                size="small"
                plain
                @click="copyWechatId('LHQfighting')"
              >
                复制
              </el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop :right="40" :bottom="40" :visibility-height="300" target=".diagnostic-drawer-content" />
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ChatLineSquare, Check } from '@element-plus/icons-vue';
import { getVXQunListUnauthAsync } from '@/http/api/website';
import DiagnosticReport from '@/views/AiDiagnosticCV/components/DiagnosticReport.vue';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  diagnosticData: {
    type: [Object, String],
    default: null
  }
});

// Emits
const emit = defineEmits(['update:visible', 'close']);

// 微信二维码
const wechatQrCode = ref('');

// 导出状态
const exportLoading = ref(false);

// 报告组件引用
const reportRef = ref<InstanceType<typeof DiagnosticReport> | null>(null);

// 清理JSON字符串中的前缀
const cleanJsonString = (str: string): string => {
  // 移除 json\n 前缀
  let cleaned = str.replace(/^json\s*/i, '').trim();
  // 移除代码块标记
  cleaned = cleaned.replace(/^```json\s*/g, "").replace(/\s*```$/g, "").trim();
  cleaned = cleaned.replace(/^```+|```+$/g, "").trim();
  // 移除所有控制字符
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, "");
  return cleaned;
};

// 解析诊断数据
const parsedDiagnosticData = computed(() => {
  if (!props.diagnosticData) return null;
  
  try {
    // 如果是字符串，尝试解析为JSON
    if (typeof props.diagnosticData === 'string') {
      const cleaned = cleanJsonString(props.diagnosticData);
      console.log('[诊断报告] 清理后内容长度:', cleaned.length);
      console.log('[诊断报告] 内容前200字符:', cleaned.substring(0, 200));
      return JSON.parse(cleaned);
    }
    return props.diagnosticData;
  } catch (error) {
    console.error('解析诊断报告失败:', error);
    return null;
  }
});

// 处理关闭事件
const handleClose = () => {
  emit('update:visible', false);
  emit('close');
};

// 复制微信ID
const copyWechatId = (wechatId: string) => {
  navigator.clipboard.writeText(wechatId).then(() => {
    ElMessage.success('复制成功');
  }).catch(() => {
    ElMessage.error('复制失败');
  });
};

// 获取微信二维码
const getWechatQrCode = async () => {
  try {
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      const wechatItem = data.data.find((item: any) => item.name === '添加微信');
      if (wechatItem) {
        wechatQrCode.value = wechatItem.qr_code;
      }
    }
  } catch (error) {
    console.error('获取微信二维码失败:', error);
  }
};

// 导出为长图
const exportAsImage = async () => {
  exportLoading.value = true;
  try {
    // 1. 获取相关 DOM
    const reportContainer = document.querySelector('.diagnostic-report') as HTMLElement;
    // 抽屉实际滚动的那个容器
    const scrollContainer = document.querySelector('.diagnostic-drawer-content') as HTMLElement;
    let drawerEl = document.querySelector('.el-drawer') as HTMLElement;

    if (!reportContainer || !scrollContainer) throw new Error('找不到必要的容器');

    // --- A. 强制滚动到顶部 ---
    // 必须在调整宽度前滚动，否则计算高度可能出错
    scrollContainer.scrollTop = 0;
    // 给一点时间让滚动完成
    await new Promise(resolve => setTimeout(resolve, 100));

    // --- B. 记录并调整状态 ---
    const originalDrawerWidth = drawerEl?.style?.width;
    const originalReportWidth = reportContainer.style.width;
    const chartContainers = reportContainer.querySelectorAll('.chart-container');
    const originalChartStyles: { width: string; height: string; minHeight: string }[] = [];

    const TARGET_WIDTH = 1300;
    if (drawerEl) {
      drawerEl.style.setProperty('width', `${TARGET_WIDTH}px`, 'important');
    }
    
    // 强制报告内容铺满，消除潜在的 padding/margin 导致的空白
    reportContainer.style.width = `${TARGET_WIDTH}px`;
    reportContainer.style.minWidth = `${TARGET_WIDTH}px`;
    reportContainer.style.maxWidth = 'none';

    chartContainers.forEach((container) => {
      const el = container as HTMLElement;
      originalChartStyles.push({
        width: el.style.width,
        height: el.style.height,
        minHeight: el.style.minHeight
      });
      el.style.width = '100%';
      el.style.height = (el.offsetHeight || 400) + 'px';
      el.style.minHeight = 'unset';
    });

    // --- C. 重绘图表 ---
    if (reportRef.value && reportRef.value.resizeAllCharts) {
      await reportRef.value.resizeAllCharts();
    }
    // 增加等待时间，确保 ECharts 动画渲染完成
    await new Promise(resolve => setTimeout(resolve, 800));

    // --- D. 精准截图 ---
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      // 关键：明确指定截图的宽高，不要让它自动探测
      width: TARGET_WIDTH,
      height: reportContainer.scrollHeight,
      // 关键：windowWidth 必须等于 TARGET_WIDTH，否则会出现右侧空白
      windowWidth: TARGET_WIDTH,
      windowHeight: reportContainer.scrollHeight,
      scrollY: 0,
      scrollX: 0,
      x: 0,
      y: 0,
      logging: false
    });

    // --- E. 恢复现场 ---
    if (drawerEl && originalDrawerWidth) {
      drawerEl.style.width = originalDrawerWidth;
    }
    reportContainer.style.width = originalReportWidth;
    reportContainer.style.minWidth = '';
    
    chartContainers.forEach((container, index) => {
      const el = container as HTMLElement;
      el.style.width = originalChartStyles[index].width;
      el.style.height = originalChartStyles[index].height;
      el.style.minHeight = originalChartStyles[index].minHeight;
    });

    if (reportRef.value && reportRef.value.resizeAllCharts) {
      reportRef.value.resizeAllCharts();
    }

    // --- F. 保存 ---
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `简历诊断报告_${new Date().getTime()}.png`);
      }
    });

  } catch (error) {
    console.error('导出失败:', error);
    ElMessage.error('导出失败');
  } finally {
    exportLoading.value = false;
  }
};

// 生命周期钩子
onMounted(() => {
  getWechatQrCode();
});
</script>

<style lang="scss">
.diagnostic-drawer-content-body {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 12px 20px;
    .el-drawer__title {
      font-size: 16px;
      font-weight: 600;
    }
    .el-drawer__close-btn {
      font-size: 18px;
    }
  }
  
  .drawer-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
    .drawer-actions {
      display: flex;
      gap: 10px;
      
      .el-button {
        font-size: 14px;
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }
  .el-drawer__body {
    padding: 15px 5px 0 15px;
  }
  .diagnostic-drawer-content {
    padding-right: 5px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .loading-placeholder {
    text-align: center;
    padding: 40px 20px;
  }

  .wechat-contact {
    margin-top: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .wechat-info {
    text-align: center;
  }

  .wechat-icon {
    font-size: 48px;
    color: #07C160;
    margin-bottom: 16px;
  }

  .wechat-text {
    margin-bottom: 20px;
    color: #666;
  }

  .wechat-qrcode {
    margin-bottom: 20px;
  }

  .qrcode-image {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .qrcode-hint {
    margin-top: 8px;
    font-size: 12px;
    color: #999;
  }

  .wechat-code {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;
  }

  .code {
    font-weight: 600;
    color: #333;
    cursor: pointer;
  }

  .code:hover {
    color: #4096ff;
  }
}
</style>