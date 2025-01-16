<template>
  <div>
    <draggable
      class="hj-list-data-box"
      :list="module.dataSource[keyValue].value"
      animation="500"
      :sort="true"
      item-key="id"
      handle=".move-icon"
    >
      <template #item="{ element, index }">
        <div>
          <div class="list-item-box">
            <div class="list-title">
              <el-divider content-position="right">{{ module.title }}-{{ index + 1 }}</el-divider>
              <el-tooltip effect="light" content="拖拽换序" placement="bottom">
                <svg-icon
                  class="move-icon"
                  icon-name="icon-tuozhuai"
                  color="#1e2532"
                  size="26px"
                ></svg-icon>
              </el-tooltip>
              <el-tooltip effect="light" content="删除该项" placement="bottom">
                <el-button
                  :disabled="module.dataSource[keyValue].value.length === 1"
                  type="danger"
                  :icon="Delete"
                  circle
                  @click="deleteItem(index)"
                />
              </el-tooltip>
            </div>
            <!-- 模块数据填写区域 -->
            <div class="module-list-content-box">
              <!-- 数据填写组件 -->
              <template v-for="(value, key, dataIndex) in element" :key="dataIndex">
                <!-- 列表组件 -->
                <template v-if="value.type === 'listLi'">
                  <div :style="getFiledStyle(value)">
                    <hj-list-li :id="id" v-model="element[key]" :key-value="key">
                      <!-- 组件图标 -->
                      <template #label-left>
                        <icon-select-pop
                          v-if="module.props[key].iconfont"
                          v-model="module.props[key].iconfont"
                          size="18px"
                        ></icon-select-pop>
                      </template>
                      <!-- 组件开关 -->
                      <template #label-right>
                        <div class="field-label-right-box">
                          <el-switch
                            v-model="module.props[key].show"
                            :disabled="!module.props[key].config"
                          />
                        </div>
                      </template>
                    </hj-list-li>
                  </div>
                </template>
                <!-- 非列表组件 -->
                <template v-else>
                  <div v-if="module.props[key]?.config" :style="getFiledStyle(value)">
                    <component
                      :is="dataSourceCptMap[value.type]"
                      v-if="module.props[key].config"
                      v-model="value.value"
                      :label="value.label"
                      :key-value="key"
                      :module="module"
                      :module-id="id"
                      :disabled="!module.props[key].config"
                    >
                      <!-- 组件图标 -->
                      <template #label-left>
                        <icon-select-pop
                          v-if="module.props[key].iconfont"
                          v-model="module.props[key].iconfont"
                          size="18px"
                        ></icon-select-pop>
                      </template>
                      <!-- 组件类型切换 -->
                      <template #component-switch>
                        <component-type-pop
                          v-model="value.type"
                          :content="value"
                          :type="value.type"
                          @editor-switch="handleEditorSwitch($event, value)"
                        ></component-type-pop>
                      </template>
                      <!-- 组件开关 -->
                      <template #label-right>
                        <div class="field-label-right-box">
                          <el-switch
                            v-model="module.props[key].show"
                            :disabled="!module.props[key].config"
                          />
                        </div>
                      </template>
                    </component>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <div class="add-list" @click="addItem">
      <svg-icon icon-name="icon-zengjiatianjiajiahao" color="#059e05" size="16px"></svg-icon>
      <span>新增一项</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  import dataSourceCptMap from './index';
  import IconSelectPop from '@/components/IconSelectPop/IconSelectPop.vue';
  import commonDataSource from '../../schema/commonDataSource';
  import { cloneDeep } from 'lodash';
  import draggable from 'vuedraggable';
  import { Delete } from '@element-plus/icons-vue';
  import hjListLi from './hj-list-li.vue';
  import ComponentTypePop from '../../components/ComponentTypePop.vue';

  const props = defineProps<{
    id: string;
    keyValue: string | number;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  // 返回数据填写组件样式
  const getFiledStyle = (value: any) => {
    return {
      width: value.props.width
    };
  };

  // 新增一项
  const addItem = () => {
    const data = commonDataSource[module.category][props.keyValue];
    if (Array.isArray(data.value) && data.value.length) {
      const addData = cloneDeep(data.value[0]);
      module.dataSource[props.keyValue].value.push(addData);
    }
  };

  // 删除一项
  const deleteItem = (index: number) => {
    module.dataSource[props.keyValue].value.splice(index, 1);
  };

  // 如果是富文本组件切换至其他组件
  const handleEditorSwitch = (value: string, item: any) => {
    console.log('富文本组件切换至其他组件', value, item);
    item.value = value;
  };
</script>
<style lang="scss" scoped>
  .hj-list-data-box {
    width: 100%;
    .list-item-box {
      width: 100%;
      transition: all 0.3s;
      border-radius: 10px;
      padding: 0 5px;
      margin-top: 10px;
      &:hover {
        box-shadow: 0 1px 4px 6px rgba(0, 0, 0, 0.05);
      }
      .list-title {
        width: 100%;
        .svg-icon {
          cursor: pointer;
          padding: 3px;
          transition: all 0.3s;
          margin-left: 15px;
          &:hover {
            background-color: #eee;
            border-radius: 4px;
          }
        }
        .move-icon {
          cursor: move;
        }
      }
      .module-list-content-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
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
</style>
