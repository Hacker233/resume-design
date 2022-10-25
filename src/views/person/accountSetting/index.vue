<template>
  <div class="account-setting-box">
    <ul>
      <li>
        <div class="left">
          <span class="label">邮箱</span>
          <span class="email">{{ form.email }}</span>
        </div>
        <div class="right">
          <el-tag v-if="form.auth.email.valid" type="success" class="mx-1" effect="dark">
            已验证
          </el-tag>
          <el-tag v-else type="error" class="mx-1" effect="dark"> 未验证 </el-tag>
        </div>
      </li>
      <li>
        <div class="left">
          <span class="label">密码</span>
          <span class="email">********</span>
        </div>
        <div class="right">
          <el-button type="text" @click="handleModify">修改密码</el-button>
        </div>
      </li>
    </ul>
  </div>

  <!-- 修改密码弹窗 -->
  <modify-pass-dialog-vue :dialog-visible="dialogVisible" @cancle="cancle"></modify-pass-dialog-vue>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import ModifyPassDialogVue from './components/ModifyPassDialog.vue';

  const form = reactive(appStore.useUserInfoStore.userInfo);

  // 修改密码弹窗
  const dialogVisible = ref<boolean>(false);
  const handleModify = () => {
    dialogVisible.value = true;
  };
  const cancle = () => {
    dialogVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  .account-setting-box {
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        height: 50px;
        align-items: center;
        .left {
          font-size: 14px;
          display: flex;
          .label {
            width: 50px;
          }
        }
        .right {
          .el-button {
            padding: 0;
          }
        }
      }
    }
  }
</style>
