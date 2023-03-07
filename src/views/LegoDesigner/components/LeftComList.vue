<template>
  <div class="left-com-list-box">
    <div v-for="(item, index) in WIDGET_CONFIG_LIST" :key="index" class="com-list-box">
      <el-collapse>
        <el-collapse-item :title="item.title" :name="item.title">
          <div
            style="width: 100px; height: 100px; background-color: aquamarine"
            draggable="true"
          ></div>
          <draggable
            class="dragArea list-group"
            :list="item.list"
            item-key="id"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element }">
              <div
                class="widget-item"
                :style="{ width: element.screenShot.width, height: element.screenShot.height }"
                >123
                <el-image :src="element.screenShot.src" lazy />
              </div>
            </template>
          </draggable>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { WIDGET_CONFIG_LIST } from '../schema/widgetConfig';
  import draggable from 'vuedraggable';

  //拖拽开始的事件
  const onStart = (data: any) => {
    console.log('开始拖拽', data);
  };

  //拖拽结束的事件
  const onEnd = () => {
    console.log('结束拖拽');
  };
</script>
<style lang="scss" scoped>
  .left-com-list-box {
    background-color: #fff;
    height: calc(100vh - 60px);
    width: 300px;
    .com-list-box {
      :deep(.el-collapse) {
        .el-collapse-item__header {
          padding: 0 15px;
        }
        .el-collapse-item__content {
          padding: 15px;
        }
        .widget-item {
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          border-radius: 2px;
          cursor: move;
          transition: all 0.3s;
          background-color: green;
          &:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 4px;
          }
        }
      }
    }
  }
</style>
