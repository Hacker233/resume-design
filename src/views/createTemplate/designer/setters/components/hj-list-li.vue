<template>
  <div>
    <draggable
      class="hj-list-data-box"
      :list="module.dataSource[keyValue].value"
      animation="500"
      :sort="true"
      item-key="id"
    >
      <template #item="{ element, index }">
        <div>
          <div class="list-item-box">
            <div class="list-title">
              <el-divider content-position="right">{{ module.title }}-{{ index + 1 }}</el-divider>
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
                <div v-if="module.props[key]?.config" :style="getFiledStyle(value)">
                  <component
                    :is="dataSourceCptMap[value.type]"
                    v-if="module.props[key].config"
                    v-model="value.value"
                    :label="value.label"
                    :key-value="key"
                    :module="module"
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
</script>
<style lang="scss" scoped>
  .hj-list-data-box {
    width: 100%;
    .list-item-box {
      width: 100%;
      cursor: move;
      transition: all 0.3s;
      border-radius: 10px;
      padding: 0 10px;
      margin: 0 -10px;
      &:hover {
        box-shadow: 0 1px 9px 10px rgba(0, 0, 0, 0.05);
      }
      .list-title {
        width: 100%;
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
