<template>
  <div class="sign-users-container">
    <div class="filter-container">
      <!-- 模块标题 -->
      <echarts-title title="支付宝收入统计"></echarts-title>
      <div class="echart-filter-box">
        <div class="statistics-box">
          <el-statistic
            class="ml-4"
            title="当前范围收入"
            :value="currentRangeUsers"
            :formatter="(value) => `${value}元`"
          />
        </div>
        <div class="date-box">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            size="default"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            :disabled-date="disableFutureDates"
            :shortcuts="shortcuts"
            @change="handleDateChange"
          />
        </div>
      </div>
    </div>
    <ECharts :options="chartOptions" width="100%" height="400px" />
  </div>
</template>

<script lang="ts" setup>
  import ECharts from './ECharts.vue';
  import { getOrgAliIncomeByDateAsync } from '@/http/api/panel';
  import moment from 'moment';
  import EchartsTitle from './EchartsTitle.vue';
  import { DATE_SHORTCUTS } from './utils/dateShortcuts';

  const dateRange = ref<any>([]);

  const shortcuts = DATE_SHORTCUTS;
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
      trigger: 'axis',
      formatter: (params: any) => {
        return `收入日期：${params[0].name}<br/>收入金额：${params[0].value}元`;
      }
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
    const data = await getOrgAliIncomeByDateAsync(params);
    if (data.data.status === 200) {
      currentRangeUsers.value = data.data.data.total;
      chartOptions.value = {
        ...chartOptions.value,
        xAxis: {
          type: 'category',
          data: data.data.data.items.map((item: any) => item.date)
        },
        series: [
          {
            data: data.data.data.items.map((item: any) => item.total),
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
    // 初始化默认查询当月数据
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().endOf('month').format('YYYY-MM-DD');
    // 问题可能是 dateRange 初始化为空数组，导致类型推断为 never[]，这里重新定义 dateRange 类型为 string[]
    dateRange.value = [start, end];
    fetchChartData();
  });
</script>

<style lang="scss" scoped>
  .sign-users-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .filter-container {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      .echart-filter-box {
        display: flex;
        align-items: center;
        .statistics-box {
          display: flex;
          align-items: center;
          flex: 1;

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
  }
</style>
