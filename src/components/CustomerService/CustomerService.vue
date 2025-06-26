<template>
  <div class="customer-service">
    <el-popover popper-class="customer-service-box-popover" placement="left" trigger="click">
      <template #reference>
        <div class="box-icon">
          <svg-icon icon-name="icon-kefu" color="#fff" size="24px"></svg-icon>
        </div>
      </template>
      <div v-viewer class="customer-service-box-content">
        <p>如果您在使用过程中有任何问题，请及时联系我！也可加入交流群进行反馈！</p>
        <div class="qrcode-container">
          <div
            v-for="(item, index) in vxQunList.filter((item: any) => item.name !== '关注公众号')"
            :key="index"
            class="add-wechat"
          >
            <img
              :src="item.qr_code"
              :alt="`${item.name} 二维码`"
              :title="`扫描二维码添加 ${item.name}`"
              loading="lazy"
            />
            <h5>{{ item.name }}</h5>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
  import { getVXQunListUnauthAsync } from '@/http/api/website';

  // 查询微信微信群列表
  const vxQunList = ref<any>([]);
  const getVXQunListUnauth = async () => {
    vxQunList.value = [];
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      vxQunList.value = data.data;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getVXQunListUnauth();
</script>
<style lang="scss" scoped>
  .customer-service {
    position: fixed;
    right: 6px;
    bottom: 150px;
    z-index: 9999;
    cursor: move;
    user-select: none;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
  .customer-service {
    .box-icon {
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 50%;
      background: linear-gradient(135deg, #7ab1f0, #5a9ae6);
      position: relative;
      box-shadow: 0 4px 12px rgba(122, 177, 240, 0.3);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.03);
        box-shadow: 0 6px 16px rgba(122, 177, 240, 0.4);
      }
    }
  }
</style>
<style lang="scss">
  .customer-service-box-popover {
    width: 320px !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
    .customer-service-box-content {
      color: #333;
      font-size: 14px;
      line-height: 1.6;

      p {
        margin-bottom: 16px;
        color: #2cbd99;
        font-weight: 500;
        text-align: center;
      }
      .qrcode-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .add-wechat {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 12px;

        img {
          width: 120px;
          height: 120px;
          margin-bottom: 8px;
          border: 1px solid #eee;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            transform: scale(1.03);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          }
        }

        h5 {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #2cbd99;
        }
      }
    }
  }
</style>
