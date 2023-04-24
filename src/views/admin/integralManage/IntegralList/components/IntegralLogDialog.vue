<!-- 新增简币记录弹窗 -->
<template>
  <el-dialog
    :model-value="dialogIntergalLogVisible"
    title="新增记录"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      size="default"
      label-position="left"
    >
      <el-form-item label="用户邮箱:" prop="email">
        <el-input v-model="ruleForm.email" type="email" />
      </el-form-item>
      <el-form-item label="记录原因:" prop="type">
        <el-select
          v-model="ruleForm.integralReason"
          placeholder="请选择记录原因"
          :allow-create="true"
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in reasonList"
            :key="index"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="简币数量:" prop="addValue">
        <el-input-number v-model="ruleForm.addValue" />
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
  import { addIntegralLogByAdminAsync } from '@/http/api/integral';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogIntergalLogVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogIntergalLogVisible: false
  });

  const reasonList = reactive([
    {
      value: 1,
      label: '购买99元套餐获得990简币'
    },
    {
      value: 2,
      label: '购买399元套餐获得3990简币'
    },
    {
      value: 3,
      label: '购买699元套餐获得6990简币'
    }
  ]);

  interface IPay {
    email: string;
    integralReason: string;
    addValue: number;
  }
  // 表单填写数据
  const ruleForm = reactive<IPay>({
    email: '',
    integralReason: '',
    addValue: 0
  });
  const rules = reactive<FormRules>({});

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
        let params = {
          email: ruleForm.email,
          integralReason: ruleForm.integralReason,
          addValue: ruleForm.addValue
        };
        sureLoading.value = true;
        const data = await addIntegralLogByAdminAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('添加成功');
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
