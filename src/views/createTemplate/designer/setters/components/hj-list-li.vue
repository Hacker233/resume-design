<template>
  <div class="hj-list-li-box">
    <div class="field-top">
      <div class="label-left">
        <span class="label">{{ dataObj.label }}</span>
        <slot name="label-left"></slot>
      </div>
      <slot name="label-right"></slot>
    </div>
    <div class="field-bottom">
      <draggable
        class="hj-list-data-box"
        :list="dataObj.value"
        animation="500"
        :sort="true"
        item-key="id"
        handle=".move-icon"
      >
        <template #item="{ element, index }">
          <div>
            <div class="list-item-box">
              <!-- 模块数据填写区域 -->
              <div class="module-list-content-box">
                <el-tooltip effect="light" content="拖拽换序" placement="bottom">
                  <svg-icon
                    class="move-icon"
                    icon-name="icon-tuozhuai3"
                    color="#1e2532"
                    size="20px"
                  ></svg-icon>
                </el-tooltip>
                <!-- 数据填写组件 -->
                <template v-for="(value, key, dataIndex) in element" :key="dataIndex">
                  <div class="data-item" :style="getFiledStyle(value)">
                    <component
                      :is="dataSourceCptMap[value.type]"
                      v-model="value.value"
                      :show-top="false"
                      :label="value.label"
                      :key-value="key"
                      :module-id="id"
                    >
                    </component>
                  </div>
                </template>
                <!-- AI组件 -->
                <template v-for="(value, key, dataIndex) in element" :key="dataIndex">
                  <ai-button v-model="value.value" :module-id="id"></ai-button>
                </template>
                <!-- 组件类型切换 -->
                <template v-for="(value, key, dataIndex) in element" :key="dataIndex">
                  <component-type-pop
                    v-model="value.type"
                    :content="value"
                    :type="value.type"
                    @editor-switch="handleEditorSwitch($event, value)"
                  ></component-type-pop>
                </template>
                <!-- 删除图标 -->
                <el-tooltip effect="light" content="删除该项" placement="bottom">
                  <el-button
                    size="small"
                    :disabled="dataObj.value.length === 1"
                    type="danger"
                    :icon="Delete"
                    circle
                    @click="deleteItem(index)"
                  />
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </draggable>

      <div class="add-bottom">
        <div class="add-list" @click="addItem">
          <svg-icon icon-name="icon-zengjiatianjiajiahao" color="#059e05" size="16px"></svg-icon>
          <span>新增一项</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import dataSourceCptMap from './index';
  import { cloneDeep } from 'lodash';
  import draggable from 'vuedraggable';
  import { Delete } from '@element-plus/icons-vue';
  import ComponentTypePop from '../../components/ComponentTypePop.vue';
  import AiButton from '../../components/AiButton.vue';

  const emit = defineEmits(['update:modelValue']);

  const props = defineProps<{
    modelValue: {};
    keyValue: string | number;
    id: string;
  }>();

  // 添加一个可响应的 dataObj，并监听 modelValue 的变化
  const dataObj = ref<any>(props.modelValue);

  watch(
    () => props.modelValue,
    (newVal) => {
      dataObj.value = newVal;
    },
    {
      deep: true
    }
  );

  // 监听 inputValue 变化，触发 update:modelValue
  watch(
    dataObj.value,
    (newValue) => {
      emit('update:modelValue', newValue);
    },
    {
      deep: true
    }
  );

  // 返回数据填写组件样式
  const getFiledStyle = (value: any) => {
    return {
      width: value?.props?.width
    };
  };

  // 新增一项
  const addItem = () => {
    const data = cloneDeep(dataObj.value.value[0]);
    data.content.value = '请填写内容';
    dataObj.value.value.push(data);
  };

  // 删除一项
  const deleteItem = (index: number) => {
    dataObj.value.value.splice(index, 1);
  };

  // 如果是富文本组件切换至其他组件
  const handleEditorSwitch = (value: string, item: any) => {
    console.log('富文本组件切换至其他组件', value, item);
    item.value = value;
  };
</script>
<style lang="scss" scoped>
  .hj-list-li-box {
    .field-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .label-left {
        display: flex;
        align-items: center;
        .label {
          display: flex;
          font-size: 16px;
          line-height: 20px;
          color: rgb(130, 139, 162);
          margin-left: 1px;
        }
      }
    }
    .field-bottom {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      .hj-list-data-box {
        width: 100%;
        .list-item-box {
          width: 100%;
          transition: all 0.3s;
          border-radius: 6px;
          &:hover {
            box-shadow: 0 1px 9px 10px rgba(0, 0, 0, 0.05);
          }
          .list-title {
            width: 100%;
          }
          .module-list-content-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin: 5px 0;
            padding: 5px 10px 5px 0;
            .field {
              margin-bottom: 0;
            }
            .data-item {
              flex: 1;
              margin: 0 10px 0 5px;
              .field {
                height: auto;
              }
            }
            .svg-icon {
              cursor: pointer;
              padding: 3px;
              transition: all 0.3s;
              margin-left: 8px;
              &:hover {
                background-color: #eee;
                border-radius: 4px;
              }
            }
            :deep(.ai-button-1) {
              margin-left: 0;
            }
            .move-icon {
              cursor: move;
            }
          }
          .list-title {
            display: flex;
            align-items: center;
            :deep(.el-divider__text) {
              font-weight: 600;
            }
            .el-button {
              margin-left: 15px;
            }
          }
        }
      }
      .add-bottom {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        .add-list {
          display: inline-block;
          cursor: pointer;
          padding: 10px 10px;
          border-radius: 5px;
          transition: all 0.3s;
          margin-bottom: 5px;
          &:hover {
            background: rgba($color: #000000, $alpha: 0.04);
            opacity: 0.9;
          }
          span {
            margin-left: 10px;
            font-size: 14px;
            color: #059e05;
          }
        }
      }
    }
  }
</style>
