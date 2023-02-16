<template>
  <div class="publish-pop-box">
    <el-button ref="buttonRef" v-click-outside="onClickOutside" type="primary" size="default"
      >发布文章</el-button
    >

    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
      placement="bottom"
      popper-class="publish-article-popover"
    >
      <div class="popover-box">
        <!-- 标题 -->
        <div class="publish-title">
          <h1>发布文章</h1>
        </div>
        <!-- 表单 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="90"
          class="publist-form-ruleForm"
          size="default"
          status-icon
          label-position="right"
          @submit.enter.prevent
        >
          <el-form-item label="文章分类:">
            <el-tag
              v-for="(item, index) of categoryList"
              :key="index"
              size="default"
              :hit="false"
              :class="[
                'category-tag',
                {
                  'category-tag-active': ruleForm.category === item.name
                }
              ]"
              @click="chooseCatefory(item.name)"
              >{{ item.name }}</el-tag
            >
          </el-form-item>

          <el-form-item label="添加标签:">
            <el-tag
              v-for="tag in ruleForm.dynamicTags"
              :key="tag"
              class="tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <!-- 标签数目超过3个则不允许添加 -->
            <template v-if="ruleForm.dynamicTags.length < 3">
              <el-input
                v-if="inputVisible"
                ref="saveTagInput"
                v-model="inputValue"
                class="input-new-tag"
                :maxlength="10"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput"
                >添加标签</el-button
              >
            </template>
          </el-form-item>

          <el-form-item label="访问权限:">
            <el-radio-group v-model="ruleForm.isNeedAuth" class="ml-4">
              <el-radio
                v-for="(item, index) in options"
                :key="index"
                :label="item.value"
                size="default"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="文章封面:">
            <el-upload
              class="avatar-uploader"
              :action="uploadAddress()"
              :headers="{ Authorization: appStore.useTokenStore.token }"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>

          <el-form-item label="文章摘要:">
            <el-input
              v-model="ruleForm.abstract"
              show-word-limit
              :maxlength="150"
              :rows="5"
              type="textarea"
              placeholder="请输入文章摘要"
            />
          </el-form-item>

          <el-form-item>
            <div class="footer-bottom-box">
              <el-button size="default" @click="closePopover">取消</el-button>
              <el-button size="default" type="primary" @click="submitForm(ruleFormRef)"
                >确认发布</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
  import CONFIG from '@/config';
  import { articleAddAsync, getArticleCategoryListAsync } from '@/http/api/article';
  import appStore from '@/store';
  import {
    ClickOutside as vClickOutside,
    FormInstance,
    FormRules,
    UploadProps
  } from 'element-plus';
  const buttonRef = ref();
  const popoverRef = ref<any>(null);
  const ruleFormRef = ref<FormInstance>();
  const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.();
  };

  const props = defineProps<{
    valueHtml: string; // html内容
    title: string; // 文章标题
    editor: any; // 编辑器实例
  }>();

  // 是否需要权限下拉选项
  const options = [
    {
      value: false,
      label: '所有人均可访问'
    },
    {
      value: true,
      label: '需要购买源码'
    }
  ];

  // 取消弹窗
  const closePopover = () => {
    popoverRef.value.hide();
  };

  // 表单数据
  const ruleForm = reactive({
    category: '', // 分类
    abstract: '', // 摘要
    imageUrl: '', // 封面图
    dynamicTags: [] as Array<string>, // 标签
    isNeedAuth: false
  });

  // 校验规则
  const rules = reactive<FormRules>({
    category: [{ required: true, message: '请选择分类', trigger: 'change' }],
    dynamicTags: [{ required: true, message: '请添加标签', trigger: 'change' }]
  });

  // 获取文章分类列表
  const categoryList = ref<any>([]);
  const getArticleCategoryList = async () => {
    const data = await getArticleCategoryListAsync();
    if (data.data.status === 200) {
      categoryList.value = data.data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getArticleCategoryList();

  // 选择分类
  const chooseCatefory = (item: string) => {
    ruleForm.category = item;
  };

  // 删除标签
  const handleClose = (tag: string) => {
    ruleForm.dynamicTags.splice(ruleForm.dynamicTags.indexOf(tag), 1);
  };

  // 标签输入框中的值
  const inputValue = ref<string>('');
  // 是否展示标签输入框
  const inputVisible = ref<boolean>(false);

  const handleInputConfirm = () => {
    let tempInputValue = inputValue.value;
    if (tempInputValue) {
      ruleForm.dynamicTags.push(tempInputValue);
    }
    inputVisible.value = false;
    inputValue.value = '';
  };

  // 展示输入框
  const saveTagInput = ref<any>(null);
  const showInput = async () => {
    inputVisible.value = true;
    await nextTick();
    saveTagInput.value.focus();
  };

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/article';
  };

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.imageUrl = response.data.data.fileUrl;
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('预览图不能大于10M');
      return false;
    }
    return true;
  };

  // 确认发布
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        // 文章标题不能为空
        if (!props.title) {
          ElMessage.warning('文章标题不能为空');
          return;
        }
        // 文章分类不能为空
        if (!ruleForm.category) {
          ElMessage.warning('请选择文章分类');
          return;
        }
        // 文章标签不能为空
        if (!ruleForm.dynamicTags.length) {
          ElMessage.warning('请选择文章所属标签');
          return;
        }
        // 文章摘要不能为空
        if (!ruleForm.abstract) {
          ElMessage.warning('文章摘要不能为空');
          return;
        }
        // 文章内容不饿能为空
        if (!props.editor.getText()) {
          ElMessage.warning('文章内容不能为空');
          return;
        }
        publishArticle();
        popoverRef.value.hide();
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 发布文章
  const publishArticle = async () => {
    const params = {
      title: props.title,
      content: props.valueHtml,
      valueText: props.editor.getText(),
      ...ruleForm
    };
    const data = await articleAddAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('文章发布成功');
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>

<style lang="scss" scoped>
  .publish-pop-box {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
<style lang="scss">
  .publish-article-popover {
    width: 500px !important;
    min-height: 400px;
    background-color: #fff;
    .popover-box {
      width: 100%;
      .publish-title {
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        h1 {
          font-size: 16px;
        }
      }
      .publist-form-ruleForm {
        padding: 15px 0 0 0;
        .category-tag {
          margin-right: 10px;
          user-select: none;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: green;
            color: #fff;
          }
        }
        .category-tag-active {
          background-color: green;
          color: #fff;
        }
        .input-new-tag {
          width: 90px;
          vertical-align: bottom;
        }
        .tags {
          margin-right: 10px;
        }
        .avatar-uploader .avatar {
          width: 260px;
          height: 165px;
          display: block;
        }
        .avatar-uploader .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
          width: 260px;
          height: 165px;
        }

        .avatar-uploader .el-upload:hover {
          border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
          font-size: 48px;
          color: #8c939d;
          width: 260px;
          height: 165px;
          text-align: center;
        }

        .footer-bottom-box {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-content: center;
          margin-top: 10px;
          .el-button {
            width: 100px;
          }
        }
      }
    }
  }
</style>
