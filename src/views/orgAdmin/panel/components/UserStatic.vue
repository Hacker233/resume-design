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
        <h1>{{ panelData.unValidEmail }}</h1>
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
    unValidEmail: number;
    usersTotal: number;
    validEmail: number;
  }
  const panelData = reactive<IUserPanel>({
    income: 0,
    todayUsers: 0,
    unValidEmail: 0,
    usersTotal: 0,
    validEmail: 0
  });
  const getUserPanel = async () => {
    const data = await getUserPanelAsync();
    if (data.data.status === 200) {
      panelData.income = data.data.data.income;
      panelData.todayUsers = data.data.data.todayUsers;
      panelData.unValidEmail = data.data.data.unValidEmail;
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
    gap: 20px;
    padding: 20px;
    .add-user-box {
      border-radius: 12px;
      overflow: hidden;
      height: 180px;
      width: calc(25% - 15px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      }
      .left {
        width: 20%;
        background: linear-gradient(135deg, #6b8e23, #556b2f);
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
        background: #fff;
        h1 {
          font-size: 32px;
          margin-bottom: 12px;
          color: #2c3e50;
          font-weight: 600;
        }
        p {
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
</style>
