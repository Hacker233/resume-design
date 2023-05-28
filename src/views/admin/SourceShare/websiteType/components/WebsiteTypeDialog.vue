<!-- 新增或编辑软件资源弹窗弹窗 -->
<template>
  <el-dialog
    :model-value="dialogCategoryVisible"
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
      label-width="100px"
      size="default"
      label-position="left"
      @submit.prevent
    >
      <el-form-item label="类型名称：" prop="websiteTypeName">
        <el-input v-model="ruleForm.websiteTypeName" />
      </el-form-item>
      <el-form-item label="类型排序：" prop="websiteTypeSort">
        <el-input-number v-model="ruleForm.websiteTypeSort" :min="1" :max="100" />
      </el-form-item>
      <el-form-item label="是否可见：" prop="websiteTypeShow">
        <el-select
          v-model="ruleForm.websiteTypeShow"
          placeholder="请选择"
          size="default"
          style="width: 100%"
        >
          <el-option
            v-for="item in websiteTypeShowList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型图标：" prop="websiteTypeIcon">
        <icon-select-pop v-model="ruleForm.websiteTypeIcon"></icon-select-pop>
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
  import { addWebsiteTypeAsync, updateWebsiteTypeAsync } from '@/http/api/websiteShare';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogCategoryVisible: boolean;
    row?: any;
    btnText?: string;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogCategoryVisible: false,
    row: null,
    btnText: '新增',
    title: '新增类型'
  });

  // 是否可见列表
  const websiteTypeShowList = [
    {
      label: '可见',
      value: 1
    },
    {
      label: '不可见',
      value: 0
    }
  ];

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.websiteTypeName = props.row.website_type_name;
        ruleForm.websiteTypeIcon = props.row.website_type_icon;
        ruleForm.websiteTypeSort = props.row.website_type_sort;
        ruleForm.websiteTypeShow = props.row.website_type_show || 1;
      }
    },
    {
      deep: true
    }
  );

  interface ICategory {
    websiteTypeName: string;
    websiteTypeIcon: string;
    websiteTypeSort: number;
    websiteTypeShow: number;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    websiteTypeName: '',
    websiteTypeIcon: 'icon-biaodanbiaoqian',
    websiteTypeSort: 1,
    websiteTypeShow: 1
  });
  const rules = reactive<FormRules>({
    websiteTypeName: [{ required: true, message: '类型名不能为空', trigger: 'change' }],
    websiteTypeIcon: [{ required: true, message: '图标不能为空', trigger: 'change' }],
    websiteTypeSort: [{ required: true, message: '类型排序不能为空', trigger: 'change' }]
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
        // 新增
        if (props.btnText === '新增') {
          let params = {
            websiteTypeName: ruleForm.websiteTypeName,
            websiteTypeIcon: ruleForm.websiteTypeIcon,
            websiteTypeSort: ruleForm.websiteTypeSort,
            websiteTypeShow: ruleForm.websiteTypeShow
          };
          sureLoading.value = true;
          const data = await addWebsiteTypeAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('添加成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            ruleForm.websiteTypeIcon = 'icon-hezuo';
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            websiteTypeId: props.row._id,
            websiteTypeName: ruleForm.websiteTypeName,
            websiteTypeIcon: ruleForm.websiteTypeIcon,
            websiteTypeSort: ruleForm.websiteTypeSort,
            websiteTypeShow: ruleForm.websiteTypeShow
          };
          const data = await updateWebsiteTypeAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            ruleForm.websiteTypeIcon = 'icon-hezuo';
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

  // 弹窗打开回调
  const handleOpen = () => {
    if (props.btnText === '新增') {
      ruleFormRef.value.resetFields();
    }
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
