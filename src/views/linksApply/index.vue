<template>
  <div class="links-apply">
    <div class="friend-link-page">
      <div class="header">
        <h1>友情链接申请</h1>
        <p class="subtitle">与更多优质网站建立联系</p>
      </div>

      <div class="content-container">
        <div class="notice-section">
          <div class="notice-card">
            <div class="notice-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div class="notice-content">
              <h3>申请须知</h3>
              <ul>
                <li>请确保您的网站内容健康，不涉及违法内容</li>
                <li>申请前请确保您的网站已添加本网站为友情链接</li>
                <li>审核通常需要1-3个工作日</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="form-section">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-position="top"
            class="friend-link-form"
          >
            <el-form-item label="网站名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                :maxlength="8"
                placeholder="请输入您的网站名称（不超过8个字）"
                size="large"
              />
              <div class="form-tip">简洁明了的名称更容易通过审核</div>
            </el-form-item>

            <el-form-item label="网站链接" prop="link">
              <el-input
                v-model="ruleForm.link"
                placeholder="请输入完整的网站链接，如：https://example.com"
                size="large"
              />
              <div class="form-tip">请确保链接可正常访问</div>
            </el-form-item>

            <div class="form-actions">
              <el-button
                class="submit-btn"
                type="primary"
                size="large"
                :loading="sureLoading"
                @click="submit(ruleFormRef)"
              >
                提交申请
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script lang="ts" setup>
  import { applyLinksAsync } from '@/http/api/website';
  import { FormInstance, FormRules } from 'element-plus';
  import { ref, reactive } from 'vue';
  import FooterCom from '@/components/FooterCom/FooterCom.vue';

  const emit = defineEmits(['updateSuccess']);

  interface IPay {
    name: string;
    link: string;
  }

  // 表单填写数据
  const ruleForm = reactive<IPay>({
    name: '',
    link: ''
  });

  const rules = reactive<FormRules>({
    name: [{ required: true, message: '网站名称不能为空！', trigger: 'change' }],
    link: [{ required: true, message: '友情链接不能为空！', trigger: 'change' }]
  });

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance | null>(null);

  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    await formEl.validate(async (valid, fields) => {
      if (valid) {
        // 添加
        let params = {
          name: ruleForm.name,
          link: ruleForm.link
        };
        sureLoading.value = true;

        try {
          const data = await applyLinksAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('申请成功，等待审核！');
            emit('updateSuccess');
            formEl.resetFields();
          } else {
            ElMessage.error(data.data.message);
          }
        } catch (error) {
          ElMessage.error('提交失败，请稍后重试');
        } finally {
          sureLoading.value = false;
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>

<style lang="scss" scoped>
  .links-apply {
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: column;
    overflow: auto;

    .friend-link-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
        Arial, sans-serif;
      color: #333;
      flex: 1;
      .header {
        text-align: center;
        margin-bottom: 40px;

        h1 {
          font-size: 2.5rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #7f8c8d;
        }
      }

      .content-container {
        display: flex;
        gap: 40px;
        margin-bottom: 60px;

        @media (max-width: 768px) {
          flex-direction: column;
        }
      }

      .notice-section {
        flex: 1;

        .notice-card {
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          gap: 20px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

          .notice-icon {
            svg {
              color: #3498db;
              width: 30px;
              height: 30px;
            }
          }

          .notice-content {
            h3 {
              font-size: 1.3rem;
              margin-bottom: 15px;
              color: #2c3e50;
            }

            ul {
              padding-left: 20px;
              color: #555;

              li {
                margin-bottom: 10px;
                line-height: 1.6;
              }
            }
          }
        }
      }

      .form-section {
        flex: 1;

        .friend-link-form {
          background-color: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

          :deep(.el-form-item__label) {
            font-weight: 500;
            font-size: 1rem;
            margin-bottom: 8px;
            color: #2c3e50;
          }

          .form-tip {
            font-size: 0.85rem;
            color: #95a5a6;
            margin-top: 6px;
          }

          .form-actions {
            margin-top: 30px;
            text-align: center;

            .submit-btn {
              width: 100%;
              padding: 12px;
              font-size: 1rem;
            }
          }
        }
      }

      .footer {
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        color: #95a5a6;
        font-size: 0.9rem;
      }
    }
    :deep(.el-form-item__content) {
      flex-wrap: wrap !important;
    }
  }
</style>
