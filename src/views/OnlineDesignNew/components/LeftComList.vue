<template>
  <div class="left-com-list-box">
    <div class="left-tab-box">
      <div
        v-for="item in tabList"
        :key="item.id"
        :class="['icon-box', { 'icon-active': activeTab === item.id }]"
        @click="selectTab(item.id)"
      >
        <el-tooltip
          class="left-icon-box-item"
          effect="light"
          :content="item.title"
          placement="right"
        >
          <svg-icon :icon-name="item.iconfont" color="#67c23a" size="20px"></svg-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="right-content-box">
      <!-- 组件列表 -->
      <widget-list v-show="activeTab === 1" @add-widget="addWidget"></widget-list>
      <!-- 图层管理 -->
      <layer-manage v-show="activeTab === 2" @select-widget="selectWidget"></layer-manage>
      <!-- JSON查看 -->
      <json-drawer :drawer="drawer" @close-json-drawer="closeJsonDrawer"></json-drawer>
      <!-- 背景图 -->
      <background-img v-show="activeTab === 4"></background-img>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '../types';
  import WidgetList from './WidgetList/WidgetList.vue';
  import LayerManage from './LayerManage/LayerManage.vue';
  import JsonDrawer from './JsonDrawer/JsonDrawer.vue';
  import BackgroundImg from './BackgroundImg/BackgroundImg.vue';

  // 默认选中tab
  const activeTab = ref<number>(1);
  const tabList = reactive<Array<any>>([
    {
      id: 1,
      iconfont: 'icon-zujian1',
      title: '组件'
    },
    // {
    //   id: 2,
    //   iconfont: 'icon-023tuceng',
    //   title: '图层'
    // },
    {
      id: 3,
      iconfont: 'icon-json1',
      title: 'JSON'
    },
    {
      id: 4,
      iconfont: 'icon-background',
      title: '背景图'
    }
  ]);
  // 点击tab
  const drawer = ref<boolean>(false);
  const selectTab = (id: number) => {
    // json抽屉
    if (id === 3) {
      drawer.value = true;
    } else {
      activeTab.value = id;
    }
  };
  // 关闭抽屉
  const closeJsonDrawer = () => {
    drawer.value = false;
  };

  const emit = defineEmits(['addWidget', 'selectWidget']);
  // 点击添加组件
  const addWidget = (widgetItem: IWidget) => {
    emit('addWidget', widgetItem);
  };

  // 选中组件
  const selectWidget = () => {
    emit('selectWidget');
  };
</script>
<style lang="scss" scoped>
  .left-com-list-box {
    background-color: #fff;
    height: calc(100vh);
    width: 350px;
    display: flex;
    .left-tab-box {
      width: 50px;
      height: 100%;
      border-right: 1px solid #eee;
      .icon-box {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: all 0.3s;
        user-select: none;
        &:hover {
          background-color: rgba(#67c23a, 0.1);
        }
        .svg-icon {
          &:focus {
            outline: 0;
          }
        }
      }
      .icon-active {
        background-color: rgba(#67c23a, 0.1);
      }
    }
    .right-content-box {
      flex: 1;
      min-width: 200px;
      overflow: auto;
    }
  }
</style>
