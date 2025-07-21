<!-- 新增或编辑管理页菜单弹窗 -->
<template>
  <el-dialog
    :model-value="dialogAddMenuVisible"
    :title="title"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
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
      <el-form-item label="菜单图标">
        <icon-select-pop
          v-if="!iconfontCheck"
          :key="ruleForm.iconfont"
          v-model="ruleForm.iconfont"
        ></icon-select-pop>
        <el-checkbox
          v-model="iconfontCheck"
          style="margin-left: 10px"
          label="无需图标"
          @change="handleChangeIconCheckbox"
        />
      </el-form-item>
      <el-form-item v-if="props.parentId" label="父级ID">
        <el-input :value="props.parentId" disabled />
      </el-form-item>
      <el-form-item label="菜单英文名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入菜单英文名" />
      </el-form-item>
      <el-form-item label="菜单中文名" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入菜单中文名" />
      </el-form-item>
      <el-form-item label="菜单路径">
        <el-input v-model="ruleForm.path" placeholder="请输入菜单路由路径" />
      </el-form-item>
      <el-form-item label="菜单权重" prop="index">
        <el-input-number v-model="ruleForm.index" :min="0" :max="1000" style="width: 100%" />
      </el-form-item>
      <el-form-item label="菜单状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择菜单状态" style="width: 100%">
          <el-option
            v-for="item in statusListOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
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
  import { addOrgAdminMenuAsync, updateOrgAdminMenuAsync } from '@/http/api/menu';
  import { FormInstance, FormRules } from 'element-plus';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogAddMenuVisible: boolean;
    row?: any;
    btnText?: string;
    title: string;
    parentId: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogAddMenuVisible: false,
    row: null,
    btnText: '新增',
    title: '新增菜单',
    parentId: ''
  });

  watch(
    () => props.row,
    (newVal) => {
      if (newVal) {
        ruleForm.iconfont = props.row.iconfont;
        ruleForm.name = props.row.name;
        ruleForm.title = props.row.title;
        ruleForm.path = props.row.path;
        ruleForm.index = props.row.index;
        ruleForm.status = props.row.status;
      }
    },
    {
      deep: true
    }
  );

  watch(
    () => props.dialogAddMenuVisible,
    async (newVal) => {
      if (newVal) {
        await nextTick();
        ruleFormRef.value.clearValidate();
      }
    }
  );

  interface IAdminMenu {
    iconfont: String; // 菜单图标
    name: String; // 菜单英文名
    title: String; // 菜单中文名
    path: String;
    index: Number;
    status: Number;
  }
  // 表单填写数据
  const ruleForm = reactive<IAdminMenu>({
    iconfont: 'icon-hezuo', // 菜单图标
    name: '', // 菜单英文名
    title: '', // 菜单中文名
    path: '',
    index: 0, // 菜单权重
    status: 1
  });
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '菜单英文名不能为空', trigger: 'change' }],
    title: [{ required: true, message: '菜单中文名不能为空', trigger: 'change' }],
    index: [{ required: true, message: '菜单权重不能为空', trigger: 'change' }],
    status: [{ required: true, message: '菜单状态不能为空', trigger: 'change' }]
  });

  // 菜单状态
  const statusListOptions = [
    {
      value: 1,
      label: '启用'
    },
    {
      value: 2,
      label: '不启用'
    }
  ];

  // 取消
  const cancle = () => {
    emit('cancle');
    resetFields();
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
            parentId: props.parentId,
            iconfont: ruleForm.iconfont,
            name: ruleForm.name,
            title: ruleForm.title,
            path: ruleForm.path,
            index: ruleForm.index,
            status: ruleForm.status
          };
          sureLoading.value = true;
          const data = await addOrgAdminMenuAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('添加成功');
            sureLoading.value = false;
            emit('updateSuccess');
            resetFields();
          } else {
            sureLoading.value = false;
            ElMessage.error(data.data.message);
          }
        } else {
          let params = {
            id: props.row._id,
            iconfont: ruleForm.iconfont,
            name: ruleForm.name,
            title: ruleForm.title,
            path: ruleForm.path,
            index: ruleForm.index,
            status: ruleForm.status
          };
          const data = await updateOrgAdminMenuAsync(params);
          if (data.data.status === 200) {
            ElMessage.success('修改成功');
            sureLoading.value = false;
            emit('updateSuccess');
            resetFields();
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

  // 是否需要图标
  const iconfontCheck = ref<boolean>(false);
  const handleChangeIconCheckbox = async (value: any) => {
    if (value) {
      ruleForm.iconfont = '';
    } else {
      ruleForm.iconfont = 'icon-hezuo';
    }
  };

  // 重置表单数据
  const resetFields = () => {
    ruleForm.iconfont = 'icon-hezuo';
    ruleForm.name = '';
    ruleForm.title = '';
    ruleForm.path = '';
    ruleForm.index = 0;
    ruleForm.status = 1;
    iconfontCheck.value = false;
    ruleFormRef.value.clearValidate();
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
