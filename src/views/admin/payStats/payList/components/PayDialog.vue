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
      label-width="80px"
      size="default"
      label-position="left"
    >
      <el-form-item label="用户邮箱:" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="付费类型:" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择付费类型">
          <el-option
            v-for="(item, index) in payList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付费金额:" prop="money">
        <el-input-number v-model="ruleForm.money" :min="1" :max="1000000" />
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
  import { usePayTypeList } from '@/hooks/usePayTypeList';
  import { paystatsAddAsync, paystatsUpdateAsync } from '@/http/api/pay';
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
    title: '新增用户'
  });

  const payList = usePayTypeList();

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.email = props.row.email;
        ruleForm.type = props.row.type;
        ruleForm.money = props.row.money;
      }
    },
    {
      deep: true
    }
  );

  interface IPay {
    email: string;
    type: string;
    money: number;
  }
  // 表单填写数据
  const ruleForm = reactive<IPay>({
    email: '',
    type: 'codePay',
    money: 0
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
            email: ruleForm.email,
            type: ruleForm.type,
            money: ruleForm.money
          };
          sureLoading.value = true;
          const data = await paystatsAddAsync(params);
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
            id: props.row._id,
            email: ruleForm.email,
            type: ruleForm.type,
            money: ruleForm.money
          };
          const data = await paystatsUpdateAsync(params);
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
