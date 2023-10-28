<template>
  <div class="right-card-box">
    <!-- 标签 -->
    <div class="tags-box">
      <com-title title="标签"></com-title>
      <div class="tags-list-box">
        <span v-for="(item, index) in content.pan_source_tags" :key="index" class="tag">{{
          item
        }}</span>
      </div>
    </div>

    <!-- 下载 -->
    <div class="download-box">
      <com-title title="立即获取"></com-title>
      <div class="button-list-box">
        <div
          v-for="(item, index) in content.pan_source_download"
          :key="index"
          class="button"
          @click="toDownload(item.name)"
        >
          <div v-if="!isPay" class="how-much"
            >{{ Math.abs(content.pan_source_price) || '' }}
            <img width="20" src="@/assets/images/jianB.png" alt="简币"
          /></div>
          {{ item.name }}
          <span v-if="item.pass">{{ `(提取码:${item.pass})` }}</span>
        </div>
      </div>
    </div>
    <!-- 添加微信群 -->
    <div class="download-box">
      <com-title title="微信交流群"></com-title>
      <div v-viewer class="vx-box">
        <template v-if="vxQunList.length">
          <img
            v-for="(item, index) in vxQunList"
            :key="index"
            :src="item.qr_code"
            :alt="item.name"
            srcset=""
          />
        </template>
      </div>
    </div>
    <!-- 添加微信 -->
    <div class="download-box">
      <com-title title="添加微信入群"></com-title>
      <div v-viewer class="vx-box">
        <p>备注【加群】</p>
        <img src="@/assets/images/vx.jpg" alt="微信" />
      </div>
    </div>

    <!-- QQ群 -->
    <div class="download-box">
      <com-title title="QQ交流群"></com-title>
      <div class="qq-box">
        <p>①群：976432879（已满）</p>
        <p>②群：947841579</p>
      </div>
    </div>

    <!-- 获取简币弹窗 -->
    <get-integral-dialog
      :dialog-get-integral-visible="dialogGetIntegralVisible"
      @cancle="cancleDialog"
    ></get-integral-dialog>
  </div>
</template>
<script lang="ts" setup>
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import appStore from '@/store';
  import { ElMessageBox } from 'element-plus';
  import ComTitle from './ComTitle.vue';
  import 'element-plus/es/components/message-box/style/index';
  import { useUserIsPayGoods } from '@/hooks/useUsrIsPayGoods';
  import { softDownloadUrl } from '@/http/api/softShare';
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  const props = defineProps<{
    content: any;
  }>();

  const { id } = useRoute().query;

  // 打开获取简币弹窗
  const dialogGetIntegralVisible = ref<boolean>(false);
  const openGetDialog = () => {
    dialogGetIntegralVisible.value = true;
  };

  // 关闭弹窗
  const cancleDialog = () => {
    dialogGetIntegralVisible.value = false;
  };

  // 查询微信微信群列表
  const vxQunList = ref<any>([]);
  const getVXQunListUnauth = async () => {
    vxQunList.value = [];
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      data.data.map((item: { name: string }) => {
        if (item.name === '软件分享微信群聊') {
          vxQunList.value.push(item);
        }
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getVXQunListUnauth();

  // 查询用户是否消费过该资源
  const isPay = ref<any>(false);
  onMounted(async () => {
    isPay.value = await useUserIsPayGoods(id);
  });

  // 点击下载
  const router = useRouter();
  const toDownload = async (name: string) => {
    const token = localStorage.getItem('token'); // 判断是否登录
    const userInfo = localStorage.getItem('userInfo');
    if (!token) {
      LoginDialog(true, '', async () => {
        isPay.value = await useUserIsPayGoods(id);
      });
    } else {
      // 判断邮箱是否验证
      const emailVerify = JSON.parse(userInfo as string).auth.email.valid;
      if (emailVerify) {
        // 判断用户是否支付过
        if (isPay.value) {
          downloadTemplate(name);
        } else {
          // 判断当前用户简币是否充足
          const userIntegralTotal = appStore.useUserInfoStore.userIntegralInfo.integralTotal;
          if (userIntegralTotal < Math.abs(props.content.pan_source_price)) {
            ElMessage.warning('您的简币数量不足！');
            openGetDialog();
            return;
          } else {
            const desc = `确定消费${props.content.pan_source_price}简币下载当前软件？只需一次支付，即可多次下载！`;
            ElMessageBox.confirm(desc, '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(async () => {
                downloadTemplate(name);
              })
              .catch(() => {});
          }
        }
      } else {
        router.push({
          path: '/emailVerify',
          query: {
            email: JSON.parse(userInfo as string).email
          }
        });
      }
    }
  };

  // 下载文件
  const downloadTemplate = async (name: string) => {
    const data = await softDownloadUrl(id);
    if (data.data.status === 200) {
      ElMessage.success('即将开始下载');
      data.data.data.source_download.forEach(
        (item: { name: string; link: string | URL | undefined }) => {
          if (item.name === name) {
            window.open(item.link, '_blank');
          }
        }
      );
      isPay.value = await useUserIsPayGoods(id); // 更新用户是否支付过的状态
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
<style lang="scss" scoped>
  .right-card-box {
    width: 350px;
    min-height: 400px;
    .tags-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      margin-bottom: 30px;
      .tags-list-box {
        height: 60px;
        align-items: center;
        display: flex;
        .tag {
          padding: 5px 10px;
          background-color: #00c090;
          text-align: center;
          color: #fff;
          font-size: 14px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
          letter-spacing: 2px;
        }
      }
    }
    .download-box {
      background-color: #fff;
      border-radius: 10px;
      padding: 0 20px 20px 20px;
      margin-bottom: 30px;
      .button-list-box {
        display: flex;
        flex-direction: column;
        padding: 20px 0 0 0;
        .button {
          width: 100%;
          height: 38px;
          margin-right: 20px;
          margin-bottom: 20px;
          line-height: 38px;
          text-align: center;
          letter-spacing: 2px;
          color: #fff;
          font-size: 14px;
          background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
          background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
          background-color: #2ddd9d;
          -webkit-transition: all 0.3s;
          -moz-transition: all 0.3s;
          -ms-transition: all 0.3s;
          -o-transition: all 0.3s;
          transition: all 0.3s;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            opacity: 0.8;
          }
          .how-much {
            display: flex;
            align-items: center;
            margin-right: 5px;
            img {
              margin: 0 5px;
            }
          }
        }
      }

      .vx-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
          font-size: 16px;
          margin: 15px;
          letter-spacing: 2px;
          font-weight: 600;
        }
        img {
          max-width: 80%;
          height: 100%;
          cursor: pointer;
        }
      }

      .qq-box {
        padding: 10px 0;
        p {
          margin: 10px 0;
          font-size: 14px;
          color: #333;
          letter-spacing: 1px;
        }
      }
    }
  }
</style>
