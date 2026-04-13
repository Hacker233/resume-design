<!-- 小红书分享获取简币操作流程弹窗 -->
<template>
  <el-dialog
    :model-value="dialogXiaohongshuShareVisible"
    title="小红书分享获取简币操作流程"
    width="880px"
    :show-close="false"
    :close-on-click-modal="true"
    append-to-body
    class="process-dialog-box"
    @close="handleClose"
  >
    <div v-viewer class="process-content-box">
      <div class="step-item step-item-horizontal">
        <div class="step-number">1</div>
        <div class="step-content">
          <p class="step-title">复制文案以及保存图片</p>
          <p class="step-desc">复制下方文案到剪贴板，并保存配图到相册</p>
          <div class="step-content-horizontal">
            <div class="step-left">
              <div class="copy-text-box">
                <p class="copy-text">
                  一款开源免费的AI简历神器——猫步简历！✨<br /><br />
                  智能AI简历助你拿下一揽子offer：<br /><br />
                  ➤ 简历智能生成：仅需几句话即可生成专业简历。<br />
                  ➤ 简历智能体检：获得一份超全面的简历体检报告。<br />
                  ➤ 多语种切换：一键生成外语简历。<br />
                  ➤ 超高清PDF导出：导出专业级PDF简历，无需格式问题。<br /><br />
                  所有简历永久云端保存，海量免费模板可选。📄<br />
                  诚荐给求职或换工作的朋友！<br /><br />
                  官网： https://maobucv.com
                </p>
                <el-button type="primary" size="small" @click="copyText">复制文案</el-button>
              </div>
            </div>
            <div class="step-right">
              <div class="step-images-container">
                <el-carousel :interval="3000" height="295px">
                  <el-carousel-item>
                    <div class="step-image-box">
                      <img
                        src="https://maobucv.com:9000/resume/templatePreview/xhs-home.png"
                        alt="小红书配图1"
                        class="step-image"
                      />
                    </div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div class="step-image-box">
                      <img
                        src="https://maobucv.com:9000/resume/templatePreview/xhs-design.png"
                        alt="小红书配图2"
                        class="step-image"
                      />
                    </div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div class="step-image-box">
                      <img
                        src="https://maobucv.com:9000/resume/templatePreview/xhs-report.png"
                        alt="小红书配图3"
                        class="step-image"
                      />
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <el-button type="primary" size="small" @click="downloadImages" class="download-btn"
                >一键下载三张图片</el-button
              >
            </div>
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-number">2</div>
        <div class="step-content">
          <p class="step-title">发布小红书</p>
          <p class="step-desc">粘贴文案和图片，设置公开权限，并保持30分钟</p>
          <p class="step-note">注意：必须设置为公开可见，否则无法领取简币</p>
          <div class="step-image-box">
            <img
              src="https://maobucv.com:9000/resume/templatePreview/xhs-screen.jpg"
              alt="发布小红书"
              class="step-image step-image-small"
            />
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-number">3</div>
        <div class="step-content">
          <p class="step-title">添加小编微信</p>
          <p class="step-desc">扫描下方二维码添加小编微信，备注：猫步简历</p>
          <div class="step-image-box">
            <img :src="wx" alt="微信二维码" class="step-image qrcode" />
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-number">4</div>
        <div class="step-content">
          <p class="step-title">发送截图等待发放简币</p>
          <p class="step-desc"
            >发送小红书<span class="highlight">截图</span>和您的<span class="highlight"
              >注册邮箱</span
            >给小编</p
          >
          <p class="step-note">耐心等待，小编核实后会为您发放简币奖励</p>
          <div class="step-image-box">
            <img
              src="https://maobucv.com:9000/resume/templatePreview/xhs-jb.png"
              alt="等待发放简币"
              class="step-image step-image-small"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button style="margin-left: 15px" type="primary" :loading="sureLoading" @click="submit"
          >我已知晓</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogXiaohongshuShareVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogXiaohongshuShareVisible: false
  });

  const wx = ref<string>('');

  const shareText = `一款开源免费的AI简历神器——猫步简历！✨

 智能AI简历助你拿下一揽子offer：
 
 ➤ 简历智能生成：仅需几句话即可生成专业简历。
 ➤ 简历智能体检：获得一份超全面的简历体检报告。
 ➤ 多语种切换：一键生成外语简历。
 ➤ 超高清PDF导出：导出专业级PDF简历，无需格式问题。
 
 所有简历永久云端保存，海量免费模板可选。📄 
 诚荐给求职或换工作的朋友！ 
 
 官网： https://maobucv.com`;

  const copyText = () => {
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        ElMessage.success('文案已复制到剪贴板');
      })
      .catch(() => {
        ElMessage.error('复制失败，请手动复制');
      });
  };

  const downloadImages = async () => {
    const images = [
      {
        url: 'https://maobucv.com:9000/resume/templatePreview/xhs-home.png',
        name: '小红书配图1.png'
      },
      {
        url: 'https://maobucv.com:9000/resume/templatePreview/xhs-design.png',
        name: '小红书配图2.png'
      },
      {
        url: 'https://maobucv.com:9000/resume/templatePreview/xhs-report.png',
        name: '小红书配图3.png'
      }
    ];
    
    try {
      for (const image of images) {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = image.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        // 为了避免浏览器阻止连续下载，添加小延迟
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      ElMessage.success('三张图片下载已开始');
    } catch (error) {
      ElMessage.error('下载失败，请手动保存图片');
    }
  };

  const getVXQunListUnauth = async () => {
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      const wechatItem = data.data.find((item: any) => item.name === '添加微信');
      if (wechatItem) {
        wx.value = wechatItem.qr_code;
      }
    } else {
      ElMessage.error(data.data.message);
    }
  };

  watch(
    () => props.dialogXiaohongshuShareVisible,
    (newVal) => {
      if (newVal && !wx.value) {
        getVXQunListUnauth();
      }
    }
  );

  const sureLoading = ref<boolean>(false);
  const submit = () => {
    emit('cancle');
  };

  const handleClose = () => {
    emit('cancle');
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
<style lang="scss">
  .process-dialog-box {
    .el-dialog__footer {
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
    .process-content-box {
      max-height: 60vh;
      overflow-y: auto;
      padding: 10px 20px 10px 0;
      margin-right: -10px;
    }
    .step-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .step-item-horizontal {
      .step-number {
        align-self: flex-start;
      }
    }
    .step-content-horizontal {
      display: flex;
      gap: 20px;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    .step-left {
      flex: 0 0 45%;
      min-width: 0;
    }
    .step-right {
      flex: 0 0 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
    }
    
    @media (max-width: 900px) {
      .step-content-horizontal {
        flex-direction: column;
      }
      
      .step-left,
      .step-right {
        flex: 0 0 100%;
      }
    }
    
    .step-images-container {
      width: 100%;
      
      .el-carousel {
        width: 100%;
        
        .el-carousel__item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          transform: none !important;
        }
        
        .el-carousel__indicators {
          bottom: 10px;
        }
        
        .el-carousel__button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(102, 126, 234, 0.5);
          
          &.is-active {
            background-color: #667eea;
            width: 24px;
            border-radius: 4px;
          }
        }
      }
    }
    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      flex-shrink: 0;
      margin-right: 16px;
      margin-top: 8px;
    }
    .step-content {
      flex: 1;
    }
    .step-title {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 8px 0;
      line-height: 1.5;
      letter-spacing: 0.3px;
      padding: 10px 16px;
      background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
      border-radius: 8px;
      border-left: 4px solid #ff6b6b;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .step-desc {
      font-size: 14px;
      color: #606266;
      margin: 0 0 12px 0;
      line-height: 1.6;
    }
    .copy-text-box {
      background-color: #f5f7fa;
      border: 1px solid #dcdfe6;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .copy-text {
      font-size: 14px;
      color: #303133;
      line-height: 1.6;
      margin: 0 0 10px 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .copy-text-box .el-button {
      width: 100%;
    }
    .download-btn {
      margin-top: 10px;
      width: 100%;
    }
    .step-note {
      font-size: 13px;
      color: #e6a23c;
      margin: 0 0 12px 0;
      line-height: 1.5;
      padding: 6px 10px;
      background-color: #fdf6ec;
      border-radius: 4px;
      border-left: 3px solid #e6a23c;
    }
    .highlight {
      color: #409eff;
      font-weight: 600;
    }
    .github-link {
      color: #409eff;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
      &:hover {
        color: #66b1ff;
        text-decoration: underline;
      }
    }
    .step-image-box {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border: 1px solid #e4e7ed;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
    .step-image {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.02);
      }
    }
    .step-image-small {
      max-width: 300px;
      max-height: 400px;
      object-fit: contain;
    }
    .step-image.qrcode {
      max-width: 200px;
      margin: 0 auto;
      border: 1px solid #eaeaea;
      border-radius: 6px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
    .step-image-placeholder {
      width: 100%;
      height: 180px;
      background-color: #f5f7fa;
      border: 2px dashed #dcdfe6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
      font-size: 14px;
      transition: all 0.3s;
      &:hover {
        border-color: #409eff;
        background-color: #ecf5ff;
        color: #409eff;
      }
    }
  }
</style>