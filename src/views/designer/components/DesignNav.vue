<template>
  <nav class="nav-box">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" srcset="" @click="toHome" />
      <span @click="toHome">化简</span>
    </div>
    <div class="nav-center">
      <span class="draft-tips">{{ draftTips }}</span>
      <p v-show="!isShowIpt">
        {{ resumeJsonStore.TITLE }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        ref="titleIpf"
        v-show="isShowIpt"
        v-model="resumeJsonStore.TITLE"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
      />
    </div>
    <div class="nav-right">
      <el-tooltip class="box-item" effect="dark" content="保存草稿" placement="bottom">
        <div class="icon-box" @click="saveDraft">
          <svg-icon iconName="icon-caogaoxiang1" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导出为PDF" placement="bottom">
        <div class="icon-box" @click="generateReport">
          <svg-icon iconName="icon-pdf" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导出为JSON数据" placement="bottom">
        <div class="icon-box" @click="exportJSON">
          <svg-icon iconName="icon-xiazai" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导入JSON数据" placement="bottom">
        <div class="icon-box" @click="importJson">
          <svg-icon iconName="icon-yunduanshangchuan" color="#fff" size="19px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="重置所有设置" placement="bottom">
        <div class="icon-box" @click="reset">
          <svg-icon iconName="icon-zhongzhi" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
    </div>
  </nav>

  <!-- 上传json代码编辑器 -->
  <import-json-dialog
    :dialogVisible="dialogVisible"
    @cancle="cancleJsonDialog"
  ></import-json-dialog>
</template>
<script lang="ts" setup>
  import { useResumeJsonStore } from '@/store/resume';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import FileSaver from 'file-saver';
  import moment from 'moment';
  import { storeToRefs } from 'pinia';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import ImportJsonDialog from '@/components/ImportJsonDialog/ImportJsonDialog.vue';
  import { debounce } from 'lodash';
  let { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // store里的模板数据
  const emit = defineEmits(['generateReport', 'reset', 'saveDataToLocal']);

  // 跳转到首页
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: '/'
    });
  };

  // 更改标题
  const titleIpf = ref<any>(null);
  const isShowIpt = ref<boolean>(false);
  const changeTitle = () => {
    isShowIpt.value = true;
    titleIpf.value.focus();
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };

  // 保存数据到本地
  let draftTips = ref<string>('');
  const saveDataToLocal = () => {
    let key = resumeJsonStore.value.ID; // 当前模板的id
    let saveData: { [key: string]: object } = {}; // 需要保存的数据
    let localData = localStorage.getItem('resumeDraft'); // 本地缓存数据
    if (localData) {
      saveData = JSON.parse(localData);
      saveData[key] = resumeJsonStore.value;
    } else {
      saveData[key] = resumeJsonStore.value;
    }
    localStorage.setItem('resumeDraft', JSON.stringify(saveData));
    const date = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
    draftTips.value = `已自动保存草稿  ${date}`;
  };

  // 保存草稿
  const saveDraft = () => {
    saveDataToLocal();
    ElMessage({
      message: '保存草稿成功!',
      type: 'success',
      center: true
    });
  };

  // 自动保存草稿
  const debounced = debounce(() => {
    saveDataToLocal();
  }, 1000);
  watch(
    resumeJsonStore.value, // JSON数据发生变化，则保存草稿
    () => {
      debounced();
    },
    {
      deep: true
    }
  );

  // 导出JSON
  const exportJSON = () => {
    const data = JSON.stringify(resumeJsonStore.value);
    const blob = new Blob([data], { type: '' });
    FileSaver.saveAs(blob, resumeJsonStore.value.TITLE + '.json');
  };

  // 导出pdf
  const generateReport = () => {
    emit('generateReport');
  };

  // 重置
  const reset = () => {
    ElMessageBox.confirm('此操作会重置简历至初始状态，是否继续?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        emit('reset');
        draftTips.value = ``;
      })
      .catch(() => {});
  };

  // 上传JSON弹窗
  const dialogVisible = ref<boolean>(false);
  const importJson = () => {
    dialogVisible.value = true;
  };

  // 取消上传JSON
  const cancleJsonDialog = () => {
    dialogVisible.value = false;
  };
</script>
<style lang="less" scopeds>
  .nav-box {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    z-index: 20;
    .nav-left {
      width: 300px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 60px;
        height: 60px;
        margin-left: 30px;
        cursor: pointer;
      }
      span {
        letter-spacing: 4px;
        font-size: 22px;
        font-weight: 600;
        font-family: cursive;
        color: green;
        cursor: pointer;
      }
    }
    .nav-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .draft-tips {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        font-size: 10px;
        color: #999999;
      }
      p {
        display: flex;
        align-items: center;
        font-size: 16px;
        .el-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .el-input {
        width: 200px;
      }
    }
    .nav-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      .el-button {
        margin-right: 20px;
        margin-left: 0;
      }
      .icon-box {
        width: 35px;
        height: 35px;
        background-color: #74a274;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 15px;
        transition: all 0.3s;
        &:hover {
          background-color: rgba(0, 192, 145, 0.8);
        }
      }
    }
  }
</style>
