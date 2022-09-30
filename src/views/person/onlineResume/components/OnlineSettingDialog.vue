<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogOnlineVisible"
    title="在线简历设置"
    width="650px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="是否公开：">
        <el-switch v-model="ruleForm.isOnline" />
      </el-form-item>
      <el-form-item label="公开链接：" prop="onlineLink">
        <el-input
          v-model.trim="ruleForm.onlineLink"
          :maxlength="50"
          show-word-limit
          placeholder="自定义后缀"
          :disabled="!ruleForm.isOnline"
        >
          <template #prepend>{{ onlineUrl }}</template>
        </el-input>
        <div class="copy-link-icon" title="复制公开链接" @click="copyLink">
          <svg-icon icon-name="icon-fuzhi2" class="iconfont" color="#00c091" size="20px"></svg-icon>
        </div>
      </el-form-item>
      <el-form-item label="分享二维码：">
        <div class="qr-code-item">
          <qr-code-vue
            ref="canvasDomRef"
            :value="onlineUrl + ruleForm.onlineLink"
            :size="160"
            foreground="#00c091"
          ></qr-code-vue>
          <div class="download-icon-box" @click="downLoadQRcode">
            <el-tooltip class="box-item" effect="dark" content="下载分享二维码">
              <svg-icon
                icon-name="icon-xiazai"
                class="iconfont"
                color="#00c091"
                size="20px"
              ></svg-icon>
            </el-tooltip>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { updateOnlineResumeAsync } from '@/http/api/userResume';
  import { FormInstance, FormRules } from 'element-plus';
  import useClipboard from 'vue-clipboard3';
  import QrCodeVue from '@/components/QrCode/QrCode.vue';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogOnlineVisible: boolean;
    row: any;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogOnlineVisible: false,
    row: null
  });

  // 公开链接前缀
  const onlineUrl = ref<string>(`${location.origin}/online/`);

  interface IOnline {
    isOnline: boolean;
    onlineLink: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IOnline>({
    isOnline: props.row.IS_ONLINE,
    onlineLink: props.row.ONLINE_LINK
  });
  const rules = reactive<FormRules>({
    onlineLink: [{ required: true, message: '后缀不能为空', trigger: 'change' }]
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 点击复制公开链接
  const { toClipboard } = useClipboard();
  const copyLink = async () => {
    try {
      await toClipboard(onlineUrl.value + ruleForm.onlineLink);
      ElMessage.success('复制成功');
    } catch (e: any) {
      ElMessage.error(e);
    }
  };

  // 下载二维码
  const canvasDomRef = ref<any>(null);
  const downLoadQRcode = (): void => {
    canvasDomRef.value.downLoadQRcode();
  };

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const ruleFormRef = ref<FormInstance>();
  const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        let params = {
          ID: props.row.ID,
          isOnline: ruleForm.isOnline,
          onlineLink: ruleForm.onlineLink
        };
        sureLoading.value = true;
        const data = await updateOnlineResumeAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('设置成功');
          sureLoading.value = false;
          emit('updateSuccess');
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
  :deep(.el-input-group__prepend) {
    padding: 0 5px;
  }
  :deep(.el-form-item__content) {
    display: flex;
    .el-input-group {
      flex: 1;
    }
  }
  .qr-code-item {
    display: flex;
    align-items: flex-end;
    .download-icon-box {
      margin-left: 20px;
      cursor: pointer;
    }
  }

  .copy-link-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-left: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
  }
</style>
