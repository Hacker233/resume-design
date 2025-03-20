<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    class="apply-links-dialog"
    :model-value="dialogApplyLinksVisible"
    title="友情链接申请"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div class="apply-links-dialog-content">
      <div class="apply-links-dialog-content-title">
        <p
          ><span>申请注意：</span>
          请确保您的网站内容健康，不涉及违法内容，否则我们有权拒绝您的申请。</p
        >
        <p
          ><span>申请前提：</span>
          申请友情链接前，请确保您的网站已添加本网站为友情链接，否则不允于审核！</p
        >
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="default"
        label-position="left"
      >
        <el-form-item label="网站名称:" prop="name">
          <el-input
            v-model="ruleForm.name"
            :maxlength="8"
            placeholder="请填写网站名称，不超过8个字"
          />
        </el-form-item>
        <el-form-item label="友情链接:" prop="link">
          <el-input v-model="ruleForm.link" placeholder="请以'https://maobucv.com'格式填写链接" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >申请</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { applyLinksAsync } from '@/http/api/website';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogApplyLinksVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogApplyLinksVisible: false
  });

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

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<any>(null);
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
        const data = await applyLinksAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('申请成功，等待审核！');
          sureLoading.value = false;
          emit('updateSuccess');
          ruleFormRef.value.resetFields();
        } else {
          sureLoading.value = false;
          ElMessage.error(data.data.message);
        }
      } else {
        sureLoading.value = false;
        console.log('error submit!', fields);
      }
    });
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
<style lang="scss">
  .apply-links-dialog {
    .apply-links-dialog-content {
      .apply-links-dialog-content-title {
        line-height: 1.5;
        letter-spacing: 1px;
        text-align: justify;
        font-size: 13px;
        span {
          color: red;
          font-weight: 600;
        }
        p {
          &:nth-child(1) {
            margin-bottom: 10px;
          }
          &:nth-child(2) {
            margin-bottom: 30px;
          }
        }
      }
    }
  }
</style>
