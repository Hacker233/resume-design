<template>
  <div class="user-statistic-box">
    <!-- 新增用户数 -->
    <div class="add-user-box">
      <div class="left">
        <svg-icon
          icon-name="icon-renwu-ren"
          class-name="juejin"
          size="60px"
          color="#fff"
        ></svg-icon>
      </div>
      <div class="right">
        <h1>{{ panelData.usersTotal }}</h1>
        <p>总用户数</p>
      </div>
    </div>
    <div class="add-user-box">
      <div class="left">
        <svg-icon
          icon-name="icon-xinzengyonghu"
          class-name="juejin"
          size="60px"
          color="#fff"
        ></svg-icon>
      </div>
      <div class="right">
        <h1>{{ panelData.todayUsers }}</h1>
        <p>今日新增用户数</p>
      </div>
    </div>
    <div class="add-user-box">
      <div class="left">
        <svg-icon
          icon-name="icon-yanzhengyanzhengma"
          class-name="juejin"
          size="60px"
          color="#fff"
        ></svg-icon>
      </div>
      <div class="right">
        <h1>{{ panelData.unVaildEamil }}</h1>
        <p>未验证邮箱总数</p>
      </div>
    </div>
    <div class="add-user-box">
      <div class="left">
        <svg-icon
          icon-name="icon-yanzhengyanzhengma"
          class-name="juejin"
          size="60px"
          color="#fff"
        ></svg-icon>
      </div>
      <div class="right">
        <h1>{{ panelData.validEmail }}</h1>
        <p>已验证验证邮箱总数</p>
      </div>
    </div>
    <div class="add-user-box">
      <div class="left">
        <svg-icon
          icon-name="icon-nianduxinchou"
          class-name="juejin"
          size="60px"
          color="#fff"
        ></svg-icon>
      </div>
      <div class="right">
        <h1>{{ panelData.income.toFixed(2) }}元</h1>
        <p>总收入</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getUserPanelAsync } from '@/http/api/panel';

  interface IUserPanel {
    income: number;
    todayUsers: number;
    unVaildEamil: number;
    usersTotal: number;
    validEmail: number;
  }
  const panelData = reactive<IUserPanel>({
    income: 0,
    todayUsers: 0,
    unVaildEamil: 0,
    usersTotal: 0,
    validEmail: 0
  });
  const getUserPanel = async () => {
    const data = await getUserPanelAsync();
    if (data.data.status === 200) {
      panelData.income = data.data.data.income;
      panelData.todayUsers = data.data.data.todayUsers;
      panelData.unVaildEamil = data.data.data.unVaildEamil;
      panelData.usersTotal = data.data.data.usersTotal;
      panelData.validEmail = data.data.data.validEmail;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getUserPanel();
</script>
<style lang="scss" scoped>
  .user-statistic-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .add-user-box {
      border-radius: 8px;
      overflow: hidden;
      height: 150px;
      width: 24%;
      box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
      display: flex;
      margin-bottom: 30px;
      .left {
        width: 20%;
        background-color: rgb(105, 143, 105);
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;
      }
      .right {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1 {
          font-size: 30px;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
</style>
