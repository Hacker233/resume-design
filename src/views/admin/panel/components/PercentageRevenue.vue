<template>
  <div class="sign-users-container">
    <div class="filter-container">
      <echarts-title title="总收入占比"></echarts-title>
      <div class="echart-filter-box">
        <div class="statistics-box">
          <el-statistic title="总收入" :value="total" :formatter="(value) => `${value}元`" />
        </div>
      </div>
    </div>
    <ECharts :options="chartOptions" width="100%" height="400px" />
  </div>
</template>

<script lang="ts" setup>
  import ECharts from './ECharts.vue';
  import { getPercentageRevenueAsync } from '@/http/api/panel';
  import moment from 'moment';
  import EchartsTitle from './EchartsTitle.vue';

  interface RevenueItem {
    name: string;
    value: number;
  }

  const dateRange = ref<string[]>([]);
  const total = ref<number>(0);
  const chartOptions = ref<any>({
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const data = params as { name: string; value: number; percent: number };
        return `收入类别：${data.name}<br/>收入：${data.value}元<br/>占比：${data.percent}%`;
      }
    },
    legend: {
      show: false,
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '收入占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}元 ({d}%)'
        },
        labelLine: {
          show: true
        },
        data: [] as RevenueItem[]
      }
    ]
  });

  const fetchChartData = async () => {
    try {
      const { data } = await getPercentageRevenueAsync();
      if (data.status === 200) {
        total.value = data.data.total;
        chartOptions.value = {
          ...chartOptions.value,
          series: [
            {
              // 由于 series 可能为 undefined 或多种类型，需要进行类型断言确保可以访问索引 0
              ...(
                chartOptions.value.series as {
                  name: string;
                  type: string;
                  radius: string[];
                  avoidLabelOverlap: boolean;
                  itemStyle: object;
                  label: object;
                  labelLine: object;
                  data: RevenueItem[];
                }[]
              )[0],
              data: data.data.items.map((item: RevenueItem) => ({
                name: item.name,
                value: item.value
              }))
            }
          ]
        };
      } else {
        ElMessage.error(data.message);
      }
    } catch (error) {
      ElMessage.error('获取收入数据失败');
      console.error('获取收入数据失败:', error);
    }
  };

  onMounted(() => {
    // 初始化默认查询当月数据
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().endOf('month').format('YYYY-MM-DD');
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
        }
      }
    }
  }
</style>
