<template>
  <div class="panel-box">
    <!-- 注册人数统计 -->
    <sign-users-vue></sign-users-vue>
    <!-- 每日签到人数统计 -->
    <attendance-number></attendance-number>
    <!-- 总收入占比统计 -->
    <percentage-revenue></percentage-revenue>
    <!-- 日收入统计 -->
    <income-statistics></income-statistics>
    <!-- 易支付收入统计 -->
    <wx-income></wx-income>
    <!-- 支付宝收入统计 -->
    <alipay-income></alipay-income>
    <!-- 用户统计区域 -->
    <!-- <user-static-vue></user-static-vue> -->
  </div>
</template>
<script lang="ts" setup>
  // import UserStaticVue from './components/UserStatic.vue';
  import SignUsersVue from './components/SignUsers.vue';
  import PercentageRevenue from './components/PercentageRevenue.vue';
  import IncomeStatistics from './components/IncomeStatistics.vue';
  import WxIncome from './components/WxIncome.vue';
  import AlipayIncome from './components/AlipayIncome.vue';
  import AttendanceNumber from './components/AttendanceNumber.vue';
</script>
<style lang="scss" scoped>
  .panel-box {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    > * {
      flex: 1 1 calc(50% - 10px);
      min-width: 400px;
    }
  }
</style>
