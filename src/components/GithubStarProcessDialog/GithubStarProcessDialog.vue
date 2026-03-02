<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogGithubStarProcessVisible"
    title="Github Star 获取简币操作流程"
    width="800px"
    :show-close="false"
    :close-on-click-modal="true"
    append-to-body
    class="github-star-process-dialog-box"
    @close="handleClose"
  >
    <div v-viewer class="process-content-box">
      <div class="step-item">
        <div class="step-number">1</div>
        <div class="step-content">
          <p class="step-title">前往猫步简历的 Github 官网</p>
          <p class="step-desc"
            >访问我们的开源项目仓库：<a
              href="https://github.com/Hacker233/resume-design"
              target="_blank"
              class="github-link"
              >https://github.com/Hacker233/resume-design</a
            ></p
          >
          <p class="step-note">如无法访问，请尝试更换网络或使用加速工具</p>
          <div class="step-image-box">
            <img
              src="https://maobucv.com:9000/resume/templatePreview/github.png"
              alt="Github官网"
              class="step-image"
            />
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-number">2</div>
        <div class="step-content">
          <p class="step-title">点击右上角 Star</p>
          <p class="step-desc">在项目页面右上角点击 Star 按钮</p>
          <p class="step-note">如未登录 Github，请先登录账号</p>
          <div class="step-image-box">
            <img
              src="https://maobucv.com:9000/resume/templatePreview/star.png"
              alt="点击Star"
              class="step-image"
            />
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-number">3</div>
        <div class="step-content">
          <p class="step-title">截图保存并发送</p>
          <p class="step-desc"
            >截图保存您的 <span class="highlight">Star 操作界面</span>，添加微信：<span
              class="highlight"
              >LHQfighting</span
            >（备注：猫步简历），发送<span class="highlight">截图</span>和您的<span
              class="highlight"
              >注册邮箱</span
            ></p
          >
          <div class="step-image-box">
            <img :src="wx" alt="微信二维码" class="step-image qrcode" />
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-number">4</div>
        <div class="step-content">
          <p class="step-title">等待发放简币</p>
          <p class="step-desc">小编核实后会为您发放简币奖励</p>
          <p class="step-note">耐心等待，小编看到消息会第一时间去处理</p>
          <div class="step-image-box">
            <img
              src="https://maobucv.com:9000/resume/templatePreview/chatstar.png"
              alt="等待发放简币"
              class="step-image"
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
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogGithubStarProcessVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogGithubStarProcessVisible: false
  });

  const wx = ref<string>('');

  // 获取微信列表
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

  // 监听弹窗显示状态
  watch(
    () => props.dialogGithubStarProcessVisible,
    (newVal) => {
      if (newVal && !wx.value) {
        getVXQunListUnauth();
      }
    }
  );

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const submit = () => {
    emit('cancle');
  };

  // 关闭弹窗
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
  .github-star-process-dialog-box {
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
    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
      border-radius: 8px;
      border-left: 4px solid #667eea;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .step-desc {
      font-size: 14px;
      color: #606266;
      margin: 0 0 12px 0;
      line-height: 1.6;
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
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border: 1px solid #e4e7ed;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    .step-image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.02);
      }
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
