<template>
  <div ref="sponsorRef" class="sponsor-box-wraper">
    <introduce-title-vue
      title="成为赞助者"
      subtitle="由于服务器资源昂贵，网站暂无收费项目，急需大家的支持！"
      title-color="#000"
      subtitle-color="#7f8b96"
    ></introduce-title-vue>
    <div class="sponsor-content-box">
      <div v-if="!sponsorList.length" class="top">
        <img src="../../../assets/images/sponsor.svg" alt="" />
      </div>
      <div v-else class="sponsor-list-box">
        <ul>
          <li v-for="(item, index) in sponsorList" :key="index" @click="toSponsor(item)">
            <div class="img-box">
              <img :src="item.logo_url" alt="" />
            </div>
            <div class="name-box">
              <p>{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="button" @click="openSponsorDialog"> 成为赞助者 </div>
      </div>
    </div>

    <!-- 赞助弹窗 -->
    <el-dialog
      :model-value="dialogVisible"
      class="sponsor-dialog-wrapper"
      title="请填写赞助信息"
      width="840px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <c-scrollbar trigger="hover" style="height: 500px">
        <div class="dialog-content-box">
          <div class="left">
            <!-- <img src="../../../assets/images/sponsor_exam.png" alt="" /> -->
            <img class="vx" src="../../../assets/images/vx-pay1.jpg" alt="" />
            <img class="vx" src="../../../assets/images/vx-pay2.jpg" alt="" />
            <img class="vx" src="../../../assets/images/vx-pay3.jpg" alt="" />
            <img class="zfb" src="../../../assets/images/vx-pay4.jpg" alt="" />
          </div>
          <div class="right">
            <!-- 表单填写 -->
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              size="default"
              label-width="120px"
              class="demo-ruleForm"
              status-icon
            >
              <el-form-item label="个人或企业名:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="该名称将展示在赞助栏" />
              </el-form-item>
              <el-form-item label="电子邮箱:">
                <el-input
                  v-model="ruleForm.email"
                  type="email"
                  placeholder="个人或者企业的电子邮箱"
                />
              </el-form-item>
              <el-form-item label="联系微信:">
                <el-input v-model="ruleForm.vx" placeholder="便于联系的个人或企业微信" />
              </el-form-item>
              <el-form-item label="跳转链接:">
                <el-input v-model="ruleForm.link" placeholder="点击赞助卡片需跳转的链接" />
              </el-form-item>
              <el-form-item label="上传logo:">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadAddress()"
                  :headers="{ Authorization: appStore.useTokenStore.token }"
                  :show-file-list="false"
                  :on-success="handleLogoSuccess"
                  :before-upload="beforeLogoUpload"
                >
                  <img v-if="ruleForm.logo_url" :src="ruleForm.logo_url" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="上传支付凭证:">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadAddress()"
                  :headers="{ Authorization: appStore.useTokenStore.token }"
                  :show-file-list="false"
                  :on-success="handlePaySuccess"
                  :before-upload="beforePayUpload"
                >
                  <img v-if="ruleForm.sponsor_img" :src="ruleForm.sponsor_img" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-form>

            <p class="tips">
              温馨提示：为了能够更好的将您的宣传信息展示在首页，还请尽量正确填写您的信息哦，后台审核通过后，我们这边将会相关信息展示在首页！
            </p>
          </div>
        </div>
      </c-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" :loading="isAddLoading" @click="confirm(ruleFormRef)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import CONFIG from '@/config';
  import { FormInstance, FormRules, UploadProps } from 'element-plus';
  import IntroduceTitleVue from './IntroduceTitle.vue';
  import appStore from '@/store';
  import { getSponsorListAsync, sponsorAddAsync } from '@/http/api/sponsor';

  // 出现在可视区
  const sponsorRef = ref<any>(null);
  const scrollIntoView = () => {
    sponsorRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/logo';
  };

  // 赞助列表
  const sponsorList = ref<any>([]);
  const getSponsorList = async () => {
    const data = await getSponsorListAsync();
    if (data.status === 200) {
      sponsorList.value = data.data.filter((item: any) => item.vaild);
    } else {
      ElMessage.error(data.message);
    }
  };
  getSponsorList();

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    email: '',
    link: '',
    vx: '',
    logo_url: '',
    name: '',
    sponsor_img: ''
  });
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '请填写个人或企业名', trigger: 'change' }]
  });

  // 打开赞助弹窗
  const dialogVisible = ref<boolean>(false);
  const openSponsorDialog = () => {
    dialogVisible.value = true;
  };

  // 取消
  const cancle = () => {
    dialogVisible.value = false;
  };

  // 确定
  const isAddLoading = ref<boolean>(false);
  const confirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        isAddLoading.value = true;
        const data = await sponsorAddAsync(ruleForm);
        if (data.status === 200) {
          ElMessage.success('感谢您的赞助，正在审核中');
          dialogVisible.value = false;
          formEl.resetFields();
          isAddLoading.value = false;
        } else {
          ElMessage.success(data.message);
          isAddLoading.value = false;
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 上传logo
  const handleLogoSuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.logo_url = response.data.data.fileUrl;
  };

  const beforeLogoUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('logo不能大于5M');
      return false;
    }
    return true;
  };

  // 上传支付凭证
  const handlePaySuccess: UploadProps['onSuccess'] = (response) => {
    ruleForm.sponsor_img = response.data.data.fileUrl;
  };

  const beforePayUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('logo不能大于5M');
      return false;
    }
    return true;
  };

  // 跳转至赞助列表页
  const toSponsor = (item: any) => {
    window.open(item.link);
  };

  defineExpose({
    scrollIntoView
  });
</script>
<style lang="scss" scoped>
  .sponsor-box-wraper {
    // min-height: 50vh;
    .sponsor-content-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      min-height: 10vh;
      .top {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 20vw;
        }
      }
      .sponsor-list-box {
        display: flex;
        align-items: center;
        ul {
          display: flex;
          li {
            width: 150px;
            height: 180px;
            list-style: none;
            box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
            margin: 12px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            transition: 0.15s all ease-in-out;
            border-radius: 8px;
            &:hover {
              transform: scale(1.1);
            }
            .img-box {
              width: 100%;
              height: 70%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 80%;
              }
            }
            .name-box {
              width: 100%;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              p {
                color: #03a9f4;
                font-size: 20px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                padding: 0 5px;
              }
            }
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 150px;
        .button {
          width: 160px;
          height: 52px;
          line-height: 52px;
          background-color: #00c090;
          text-align: center;
          color: #fff;
          font-size: 16px;
          border-radius: 52px;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -moz-transition: all 0.2s;
          -ms-transition: all 0.2s;
          transition: all 0.2s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
  .dialog-content-box {
    display: flex;
    .left {
      width: 430px;
      display: flex;
      justify-content: space-between;
      align-items: space-between;
      flex-wrap: wrap;
      border-right: 1px solid #eee;
      padding-right: 20px;
      & :nth-child(1) {
        margin-bottom: 10px;
      }
      .vx {
        width: 200px;
        height: 260px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 25px;
      }
      .zfb {
        width: 200px;
        height: 260px;
        box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 25px;
      }
    }
    .right {
      flex: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tips {
        line-height: 1.5;
        padding: 0 20px;
        margin-top: 10px;
        color: green;
        font-size: 14px;
      }
      .avatar-uploader {
        border: 2px dashed #ccc;
      }
      .avatar-uploader .avatar {
        width: 150px;
        height: 150px;
        display: block;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        width: 150px;
        height: 150px;
      }

      .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        text-align: center;
      }
    }
  }
</style>
