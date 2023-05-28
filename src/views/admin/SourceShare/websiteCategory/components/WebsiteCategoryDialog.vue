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
      @keydown.enter="submit(ruleFormRef)"
    >
      <el-form-item label="网站类型:" prop="socategoryName">
        <el-select
          v-model="ruleForm.websiteTypeId"
          placeholder="请选择所属类型"
          size="default"
          style="width: 100%"
          @change="handleSelectChange"
        >
          <el-option
            v-for="item in typeList"
            :key="item._id"
            :label="item.website_type_name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称：" prop="websiteCategory">
        <el-input v-model="ruleForm.websiteCategory" />
      </el-form-item>
      <el-form-item label="类型排序：" prop="websiteCategorySort">
        <el-input-number v-model="ruleForm.websiteCategorySort" :min="1" :max="100" />
      </el-form-item>
      <el-form-item label="分类图标：" prop="websiteCategoryIcon">
        <icon-select-pop v-model="ruleForm.websiteCategoryIcon"></icon-select-pop>
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
  import { addWebsiteCategoryAsync, updateWebsiteCategoryAsync } from '@/http/api/websiteShare';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogCategoryVisible: boolean;
    row?: any;
    typeList: any;
    btnText?: string;
    title: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogCategoryVisible: false,
    row: null,
    typeList: [],
    btnText: '新增',
    title: '新增分类'
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.websiteTypeName = props.row.website_type_name;
        ruleForm.websiteTypeId = props.row.website_type_id;
        ruleForm.websiteCategory = props.row.website_category;
        ruleForm.websiteCategoryIcon = props.row.website_category_icon;
        ruleForm.websiteCategorySort = props.row.website_category_sort;
      }
    },
    {
      deep: true
    }
  );

  interface ICategory {
    websiteTypeName: string;
    websiteTypeId: string;
    websiteCategory: string;
    websiteCategoryIcon: string;
    websiteCategorySort: number;
  }
  // 表单填写数据
  const ruleForm = reactive<ICategory>({
    websiteTypeName: '',
    websiteTypeId: '',
    websiteCategory: '',
    websiteCategoryIcon: 'icon-hezuo',
    websiteCategorySort: 1
  });
  const rules = reactive<FormRules>({
    websiteCategory: [{ required: true, message: '分类名不能为空', trigger: 'change' }],
    websiteCategoryIcon: [{ required: true, message: '图标不能为空', trigger: 'change' }]
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 类型选择变化
  const handleSelectChange = (id: string) => {
    props.typeList.forEach((item: { _id: string; website_type_name: string }) => {
      if (item._id === id) {
        ruleForm.websiteTypeName = item.website_type_name;
      }
    });
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
            websiteTypeId: ruleForm.websiteTypeId,
            websiteCategory: ruleForm.websiteCategory,
            websiteCategoryIcon: ruleForm.websiteCategoryIcon,
            websiteCategorySort: ruleForm.websiteCategorySort
          };
          sureLoading.value = true;
          const data = await addWebsiteCategoryAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('添加成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            ruleForm.websiteCategoryIcon = 'icon-hezuo';
            ruleForm.websiteTypeId = '';
            ruleForm.websiteCategory = '';
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            websiteCategoryId: props.row._id,
            websiteTypeName: ruleForm.websiteTypeName,
            websiteTypeId: ruleForm.websiteTypeId,
            websiteCategory: ruleForm.websiteCategory,
            websiteCategoryIcon: ruleForm.websiteCategoryIcon,
            websiteCategorySort: ruleForm.websiteCategorySort
          };
          const data = await updateWebsiteCategoryAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            ruleFormRef.value.resetFields();
            ruleForm.websiteCategoryIcon = 'icon-hezuo';
            ruleForm.websiteTypeId = '';
            ruleForm.websiteCategory = '';
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
