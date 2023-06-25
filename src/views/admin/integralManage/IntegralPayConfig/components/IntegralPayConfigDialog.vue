<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    :model-value="dialogPayVisible"
    :title="title"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="110px"
      size="default"
      label-position="left"
    >
      <el-form-item label="消费简币类型:" prop="integralPayType">
        <el-input v-model="ruleForm.integralPayType" placeholder="消费标识位，如“1”" />
      </el-form-item>
      <el-form-item label="消费简币名称:" prop="integralPayName">
        <el-input v-model="ruleForm.integralPayName" placeholder="消费标题，如“评论”" />
      </el-form-item>
      <el-form-item label="消费简币简述:" prop="integralPayDesc">
        <el-input v-model="ruleForm.integralPayDesc" />
      </el-form-item>
      <el-form-item label="消费简币数量:" prop="integralPayNum">
        <el-input-number v-model="ruleForm.integralPayNum" :min="-10000" :max="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" :loading="sureLoading" @click="submit(ruleFormRef)">{{
          btnText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { addIntegralPayConfigAsync, updateIntegralPayConfigAsync } from '@/http/api/integral';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogPayVisible: boolean;
    row: any;
    btnText: string;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogPayVisible: false,
    row: null,
    btnText: '添加',
    title: '新增配置'
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.integralPayType = props.row.integral_pay_type;
        ruleForm.integralPayName = props.row.integral_pay_name;
        ruleForm.integralPayNum = props.row.integral_pay_num;
        ruleForm.integralPayDesc = props.row.integral_pay_desc;
      }
    },
    {
      deep: true
    }
  );

  interface IIntegralPayConfig {
    integralPayType: string;
    integralPayName: string;
    integralPayNum: number;
    integralPayDesc: string;
  }
  // 表单填写数据
  const ruleForm = reactive<IIntegralPayConfig>({
    integralPayType: '', // 消费简币类型
    integralPayName: '', // 消费简币名称
    integralPayNum: -1, // 消费简币数量
    integralPayDesc: '' // 消费简币简述
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
        // 添加
        if (props.btnText === '添加') {
          let params = {
            integralPayType: ruleForm.integralPayType,
            integralPayName: ruleForm.integralPayName,
            integralPayNum: ruleForm.integralPayNum,
            integralPayDesc: ruleForm.integralPayDesc
          };
          sureLoading.value = true;
          const data = await addIntegralPayConfigAsync(params);
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
          let params = {
            integralPayConfigId: props.row._id,
            integralPayType: ruleForm.integralPayType,
            integralPayName: ruleForm.integralPayName,
            integralPayNum: ruleForm.integralPayNum,
            integralPayDesc: ruleForm.integralPayDesc
          };
          const data = await updateIntegralPayConfigAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
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
