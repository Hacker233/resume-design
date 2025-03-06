<template>
  <el-dialog
    :model-value="dialogPayVisible"
    :title="title"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    @open="handleOpen"
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
        <el-input
          v-model="ruleForm.integralPayType"
          placeholder="消费标识位，如“1”"
          :disabled="isPayTypeDisabled"
        />
      </el-form-item>
      <el-form-item label="消费简币名称:" prop="integralPayName">
        <el-input v-model="ruleForm.integralPayName" placeholder="消费标题，如“评论”" />
      </el-form-item>
      <el-form-item label="消费简币简述:" prop="integralPayDesc">
        <el-input v-model="ruleForm.integralPayDesc" placeholder="请输入消费简币描述" />
      </el-form-item>
      <el-form-item label="消费简币数量:" prop="integralPayNum">
        <el-input-number v-model="ruleForm.integralPayNum" :min="-10000" :max="0" />
      </el-form-item>
      <el-form-item label="AI模型:" prop="integralPayModel">
        <el-select
          v-model="ruleForm.integralPayModel"
          placeholder="请选择AI模型"
          multiple
          collapse-tags
        >
          <el-option
            v-for="item in modelList"
            :key="item._id"
            :label="item.model_name"
            :value="item.model_name"
          >
            <span style="float: left">{{ item.model_name }}</span>
            <span v-if="item.model_is_free" style="float: right; color: #67c23a; font-size: 12px">
              (免费)
            </span>
            <span v-else style="float: right; color: #f56c6c; font-size: 12px"> (付费) </span>
          </el-option>
        </el-select>
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
  import { aiModelListAsync } from '@/http/api/ai';
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
        ruleForm.integralPayNum = Number(props.row.integral_pay_num);
        ruleForm.integralPayDesc = props.row.integral_pay_desc;
        ruleForm.integralPayModel = props.row.integral_pay_model || []; // 直接使用数组
      }
    },
    {
      deep: true
    }
  );

  // 获取模型列表
  const modelList = ref<any[]>([]); // 模型列表
  const getAiModelList = async () => {
    try {
      const params = { page: 1, limit: 100 };
      const response = await aiModelListAsync(params);
      if (response.data.status === 200) {
        modelList.value = response.data.data.list;
        console.log('modelList', modelList);
      } else {
        ElMessage.error(response.data.message);
      }
    } catch (error) {
      ElMessage.error('获取模型列表失败');
    }
  };

  // 弹窗打开
  const handleOpen = () => {
    getAiModelList();
  };

  // 消费配置输入框是否可编辑
  const isPayTypeDisabled = computed(() => {
    return props.row ? true : false;
  });

  interface IIntegralPayConfig {
    integralPayType: string;
    integralPayName: string;
    integralPayNum: number;
    integralPayDesc: string;
    integralPayModel: string[]; // 使用数组类型
  }
  // 表单填写数据
  const ruleForm = reactive<IIntegralPayConfig>({
    integralPayType: '', // 消费简币类型
    integralPayName: '', // 消费简币名称
    integralPayNum: -1, // 消费简币数量
    integralPayDesc: '', // 消费简币简述
    integralPayModel: [] // AI模型（多选）
  });
  const rules = reactive<FormRules>({});

  // 取消
  const cancle = () => {
    ruleFormRef.value.resetFields();
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
            integralPayDesc: ruleForm.integralPayDesc,
            integralPayModel: ruleForm.integralPayModel // 直接传递数组
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
            integralPayDesc: ruleForm.integralPayDesc,
            integralPayModel: ruleForm.integralPayModel // 直接传递数组
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
