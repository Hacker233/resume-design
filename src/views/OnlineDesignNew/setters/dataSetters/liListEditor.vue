<template>
  <div class="li-text-editor-box">
    <el-form-item label="列表内容:">
      <div v-for="(item, index) in widgetItem.dataSource.liList" :key="index" class="list-item">
        <el-input
          :model-value="item"
          type="textarea"
          :rows="4"
          @input="handleInput($event, index)"
        />
        <div class="edit-btn">
          <el-button
            :disabled="widgetItem.dataSource.liList.length === 1"
            type="danger"
            :icon="SemiSelect"
            circle
            @click="deleteContent(index)"
          />
          <el-button type="primary" :icon="Plus" circle @click="addContent(index)" />
        </div>
      </div>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';
  import { SemiSelect, Plus } from '@element-plus/icons-vue';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);

  // 输入框中的值发生改变
  const handleInput = (value: string, index: number) => {
    widgetItem.dataSource['liList'][index] = value;
  };

  // 删除一条
  const deleteContent = (index: number) => {
    widgetItem.dataSource['liList'].splice(index, 1);
  };

  // 添加一条
  const addContent = (index: number) => {
    widgetItem.dataSource['liList'].push(widgetItem.dataSource['liList'][index]);
    console.log('最新的widgetItem', widgetItem);
  };
</script>
<style lang="scss" scoped>
  .li-text-editor-box {
    .list-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .edit-btn {
        display: flex;
        margin-left: 10px;
      }
    }
  }
</style>
