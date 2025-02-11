<template>
  <div class="price-table-box">
    <el-table
      class="template-list-table"
      :data="tableData"
      style="width: 100%"
      size="large"
      highlight-current-row
      :header-cell-style="{ background: '#2ddd9d' }"
      border
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.width"
      >
        <template #default="props">
          <span v-if="typeof props.row[column.prop] !== 'number'">{{
            props.row[column.prop]
          }}</span>
          <el-button
            v-else
            size="default"
            type="primary"
            @click="handleButtonClick(column.prop, props.row.price)"
            >{{ column.buttonText }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 购买弹窗 -->
    <el-dialog v-model="dialogVisible" class="pay-dialog-wrapper" width="500px" destroy-on-close>
      <div class="pay-img-box">
        <img :src="imgSrc" alt="购买" />
      </div>
      <div class="pay-tips">
        <p>支付成功后，添加作者微信，凭支付记录获取相关权限！</p>
        <p class="vx">作者微信：LHQfighting（备注“猫步简历”）</p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  const columns = reactive([
    { prop: 'rights', label: '权益对比', align: 'left', width: '300' },
    { prop: 'free', label: '免费', align: 'right', width: '100', buttonText: '立即获取' },
    { prop: 'CNY99', label: '99元', align: 'right', buttonText: '立即获取' },
    { prop: 'CNY399', label: '399元', align: 'right', buttonText: '立即获取' },
    { prop: 'CNY699', label: '699元', align: 'right', buttonText: '立即获取' }
  ]);

  const tableData = reactive([
    {
      rights: '开放微信交流群',
      free: '✓',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '个人用户可用于商业应用开发',
      free: '✓',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '前端最新源码',
      free: '✓',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '公司用户可用于商业应用开发',
      free: 'X',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '简历模板数据',
      free: 'X',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '产品部署开发等文档',
      free: 'X',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '赠送上千套简历word模板',
      free: 'X',
      CNY99: '✓',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '后端最新源码',
      free: 'X',
      CNY99: '（更新至2023年2月）✓',
      CNY399: '（更新至2023年5月）✓',
      CNY699: '✓'
    },
    {
      rights: '一对一技术咨询',
      free: 'X',
      CNY99: 'X',
      CNY399: '✓',
      CNY699: '✓'
    },
    {
      rights: '功能对比',
      free: 'X',
      CNY99: '（暂无积分管理等功能）X',
      CNY399: '（具备积分管理等功能，以及完善的管理后台）√',
      CNY699: '（功能和猫步简历官网保持一致）√'
    },
    {
      rights: '后端代码持续更新',
      free: 'X',
      CNY99: 'X',
      CNY399: 'X',
      CNY699: '（邮件推送源码）✓'
    },
    {
      rights: '产品升级维护',
      free: 'X',
      CNY99: 'X',
      CNY399: 'X',
      CNY699: '（持续更新维护）✓'
    },
    {
      rights: 'bug修复服务',
      free: 'X',
      CNY99: 'X',
      CNY399: 'X',
      CNY699: '（存量bug修复）✓'
    },
    {
      rights: '知识星球',
      free: 'X',
      CNY99: 'X',
      CNY399: 'X',
      CNY699: '（问题解答社区）✓'
    },
    {
      rights: '二次开发咨询服务',
      free: 'X',
      CNY99: 'X',
      CNY399: 'X',
      CNY699: '✓'
    },
    {
      rights: '',
      price: 0,
      free: 0,
      CNY99: 99,
      CNY399: 399,
      CNY699: 699
    }
  ]);

  const dialogVisible = ref<boolean>(false);
  const imgSrc = ref<string>('https://maobucv.com:9000/resume/logo/vx-pay1.jpg');

  const handleButtonClick = (prop: string, price: number) => {
    if (prop === 'free') {
      window.open('https://github.com/Hacker233/resume-design', '_blank');
    } else {
      switch (price) {
        case 99:
          imgSrc.value = 'https://maobucv.com:9000/resume/logo/vx-pay1.jpg';
          break;
        case 399:
          imgSrc.value = 'https://maobucv.com:9000/resume/logo/vx-pay399.jpg';
          break;
        case 699:
          imgSrc.value = 'https://maobucv.com:9000/resume/logo/zsxq.jpg';
          break;
        default:
          return;
      }
      dialogVisible.value = true;
    }
  };
</script>

<style lang="scss" scoped>
  .price-table-box {
    margin: 80px auto;
    width: 1000px;
    display: flex;
    justify-content: center;
  }
  :deep(.el-table) {
    thead {
      color: #333;
      font-weight: 800;
      font-size: 16px;
      height: 70px;
    }
  }
  .pay-img-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 300px;
      height: 420px;
      border-radius: 5px;
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 10%);
    }
  }
  .pay-tips {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      line-height: 2;
    }
    .vx {
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>
