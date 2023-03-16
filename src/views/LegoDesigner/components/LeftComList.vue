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
      <layer-manage v-show="activeTab === 2"></layer-manage>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '../types';
  import WidgetList from './WidgetList/WidgetList.vue';
  import LayerManage from './LayerManage/LayerManage.vue';

  // 默认选中tab
  const activeTab = ref<number>(1);
  const tabList = reactive<Array<any>>([
    {
      id: 1,
      iconfont: 'icon-zujian1',
      title: '组件'
    },
    {
      id: 2,
      iconfont: 'icon-023tuceng',
      title: '图层'
    }
  ]);
  // 点击tab
  const selectTab = (id: number) => {
    activeTab.value = id;
  };

  const emit = defineEmits(['addWidget']);
  // 点击添加组件
  const addWidget = (widgetItem: IWidget) => {
    emit('addWidget', widgetItem);
  };
</script>
<style lang="scss" scoped>
  .left-com-list-box {
    background-color: #fff;
    height: calc(100vh - 60px);
    width: 300px;
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
    }
  }
</style>
