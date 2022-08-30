<template>
  <nav class="nav-box">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" srcset="" @click="toHome" />
      <span @click="toHome">化简</span>
    </div>
    <div class="nav-center">
      <p v-show="!isShowIpt">
        {{ resumeJsonNewStore.TITLE }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        v-show="isShowIpt"
        ref="titleIpf"
        v-model="resumeJsonNewStore.TITLE"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
      />
    </div>
    <div class="nav-right">
      <el-tooltip class="box-item" effect="dark" content="导出为PDF" placement="bottom">
        <div class="icon-box" @click="generateReport">
          <svg-icon icon-name="icon-pdf" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导出为JSON数据" placement="bottom">
        <div class="icon-box" @click="exportJSON">
          <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
    </div>
  </nav>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
import { getUuid } from '@/utils/common';
import FileSaver from 'file-saver';
  import { storeToRefs } from 'pinia';

  const emit = defineEmits(['generateReport']);
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  // 跳转到首页
  const router = useRouter();
  const toHome = () => {
    router.push({
      path: '/'
    });
  };

  // 导出为pdf
  const generateReport = () => {
    emit('generateReport');
  };

  // 导出为JSON
  const route = useRoute();
  const { name } = route.query; // 模板id和模板名称
  const exportJSON = () => {
    resumeJsonNewStore.value.NAME = name as string;
    resumeJsonNewStore.value.ID = getUuid();
    const data = JSON.stringify(resumeJsonNewStore.value, null, 4);
    const blob = new Blob([data], { type: '' });
    FileSaver.saveAs(blob, resumeJsonNewStore.value.TITLE + '.json');
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
</script>
<style lang="scss" scoped>
  .nav-box {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    padding: 0 30px;
    box-sizing: border-box;
    .nav-left {
      width: 300px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 60px;
        height: 60px;
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
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
