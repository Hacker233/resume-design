<template>
  <el-drawer
    class="switch-template-drawer"
    :model-value="drawerSwitchVisible"
    :modal="true"
    :lock-scroll="false"
    :close-on-click-modal="true"
    :direction="direction"
    :destroy-on-close="true"
    :size="400"
    @close="closeSwitchDrawer"
  >
    <template #header>
      <h1 class="title">请选择模板</h1>
    </template>
    <!-- 内容区域 -->
    <div class="drawer-content">
      <el-skeleton v-if="isShowSkeleton" :rows="15" animated />
      <template v-else>
        <div v-for="(item, index) in templateList" :key="index" class="card-box">
          <!-- 选中标记 -->
          <div v-if="route.query.id == item.ID" class="current-mark-bgc"></div>
          <div v-if="route.query.id == item.ID" class="current-mark">
            <svg-icon icon-name="icon-duigou_kuai" color="#fff" size="16px"></svg-icon>
          </div>
          <!-- 遮罩层 -->
          <div v-else class="item-masks">
            <div class="button" @click="switchTemplate(item)"> 切换模板 </div>
          </div>
          <el-image style="width: 100%; height: 100%" :src="item.previewUrl" fit="scale-down" />
        </div>
      </template>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
  import { getTemplateListAsync } from '@/http/api/resume';
  import appStore from '@/store';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  const emit = defineEmits(['closeSwitchDrawer']);
  interface IDrawer {
    drawerSwitchVisible: boolean;
  }
  withDefaults(defineProps<IDrawer>(), {
    drawerSwitchVisible: false
  });
  const direction = ref('ltr');

  // 查询模板列表
  const page = 1;
  const limit = 100;
  const templateList = ref<Array<any>>([]);
  const isShowSkeleton = ref<boolean>(true);
  const getTemplateList = async () => {
    isShowSkeleton.value = true;
    let params = {
      page: page,
      limit: limit
    };
    const data = await getTemplateListAsync(params);
    if (data.status === 200) {
      templateList.value = data.data.list;
      isShowSkeleton.value = false;
    } else {
      ElMessage.error(data.data.message);
      isShowSkeleton.value = false;
    }
  };
  getTemplateList();

  // 关闭抽屉
  const closeSwitchDrawer = () => {
    emit('closeSwitchDrawer');
  };

  // 切换模板
  const resetStoreAndLocal: any = inject('resetStoreAndLocal');
  const router = useRouter();
  const route = useRoute();
  const { setUuid } = appStore.useUuidStore;
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  const switchTemplate = async (item: { ID: any }) => {
    ElMessageBox.confirm('请确保当前简历数据已保存草稿，切换新模板后需要重新填写数据！', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const path = route.path;
        router.replace(`${path}?id=${item.ID}`);
        resetSelectModel(); // 重置选中模块
        resetStoreAndLocal(false, item.ID);
        await nextTick();
        setUuid();
        ElMessage.success('切换成功');
        emit('closeSwitchDrawer');
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .switch-template-drawer {
    .title {
      font-size: 18px;
    }
    .drawer-content {
      width: 100%;
      height: 100%;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 15px 15px 10px 15px;
      box-sizing: border-box;
      .card-box {
        width: 45%;
        box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 24%);
        transform: translateY(2%) scale(1.03);
        margin-bottom: 30px;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        .current-mark-bgc {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          right: 0;
          top: 2px;
          border: 20px solid;
          border-color: #2ddd9d #2ddd9d transparent transparent;
          z-index: 10;
        }
        // 标记当前模板
        .current-mark {
          position: absolute;
          right: 5px;
          top: 3px;
          z-index: 11;
        }
        .item-masks {
          position: absolute;
          height: 100%;
          width: 100%;
          border-radius: 5px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          opacity: 0;
          &:hover {
            opacity: 1;
            background-color: rgba(#000, 0.6);
          }
          .button {
            padding: 5px 15px;
            letter-spacing: 2px;
            color: #fff;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
            border-radius: 20px;
            background-color: #2ddd9d;
            transition: all 0.3s;
            cursor: pointer;
            user-select: none;
            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .switch-template-drawer {
    display: flex;
    flex-direction: column;
    .el-drawer__body {
      padding: 10px;
      flex: 1;
    }
  }
</style>
