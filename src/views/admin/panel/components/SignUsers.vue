<template>
  <div class="sign-users-container">
    <div class="filter-container">
      <div class="statistics-box">
        <el-statistic title="总注册人数" :value="totalUsers" />
        <el-statistic class="ml-4" title="当前范围" :value="currentRangeUsers" />
      </div>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        size="normal"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        :disabled-date="disableFutureDates"
        @change="handleDateChange"
      />
    </div>
    <ECharts :options="chartOptions" width="100%" height="400px" />
  </div>
</template>

<script lang="ts" setup>
  import ECharts from './ECharts.vue';
  import { getSignUsersByDateAsync } from '@/http/api/panel';
  import moment from 'moment';

  const dateRange = ref<any>([]);
  const totalUsers = ref(0);
  const currentRangeUsers = ref(0);
  const chartOptions = ref({
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {
      trigger: 'axis'
    }
  });

  const disableFutureDates = (time: Date) => {
    return time.getTime() > Date.now();
  };

  const handleDateChange = () => {
    fetchChartData();
  };

  const fetchChartData = async () => {
    const params = {
      startDate: dateRange.value[0],
      endDate: dateRange.value[1]
    };
    const data = await getSignUsersByDateAsync(params);
    if (data.data.status === 200) {
      totalUsers.value = data.data.data.totalAllUsers;
      currentRangeUsers.value = data.data.data.total;
      chartOptions.value = {
        ...chartOptions.value,
        xAxis: {
          type: 'category',
          data: data.data.data.items.map((item: any) => item.name)
        },
        series: [
          {
            data: data.data.data.items.map((item: any) => item.value),
            type: 'line',
            smooth: true
          }
        ]
      };
    } else {
      ElMessage.error(data.data.message); // 显示错误信息
    }
  };

  onMounted(() => {
    // 初始化默认查询最近7天数据
    const end = moment().format('YYYY-MM-DD');
    const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
    // 问题可能是 dateRange 初始化为空数组，导致类型推断为 never[]，这里重新定义 dateRange 类型为 string[]
    dateRange.value = [start, end];
    fetchChartData();
  });
</script>

<style scoped>
  .sign-users-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .filter-container {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .statistics-box {
        display: flex;
        align-items: center;

        .ml-4 {
          margin-left: 16px;
        }
      }

      .el-date-editor {
        width: 280px;

        .el-range-separator {
          width: auto;
        }
      }
    }
  }
</style>
