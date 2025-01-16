<template>
  <el-popover
    popper-class="component-type-select-pop-box"
    :teleported="teleported"
    :width="150"
    trigger="click"
  >
    <template #reference>
      <div class="icon-popper-box">
        <el-tooltip effect="light" content="填写框类型切换" placement="bottom">
          <svg-icon icon-name="icon-ruanjianguanli" color="#74a274" size="20px"></svg-icon>
        </el-tooltip>
      </div>
    </template>
    <div class="component-type-select">
      <div
        v-for="(item, index) in cptSwitchList(type)"
        :key="index"
        class="icon-list-item"
        @click="handleComponentType(item)"
      >
        <div class="component-item">{{ item.label }}</div>
      </div>
    </div>
  </el-popover>
</template>
<script lang="ts" setup>
  import { cptSwitchList } from '../setters/components/index';

  interface IIcon {
    content: any;
    type?: any;
    teleported?: boolean;
  }
  const props = withDefaults(defineProps<IIcon>(), {
    content: '',
    type: '',
    teleported: true
  });

  const emit = defineEmits(['update:modelValue', 'change', 'editorSwitch']);

  const type = ref<any>(props.type);

  watch(
    () => type.value,
    (newVal, oldVal) => {
      console.log(newVal, oldVal);
      if (oldVal === 'editor') {
        let contentValue = '';
        const parser = new DOMParser();
        const doc = parser.parseFromString(props.content.value, 'text/html');
        contentValue = doc.body.textContent || ''; // 获取纯文本内容
        emit('editorSwitch', contentValue);
      }
      emit('update:modelValue', type.value);
      emit('change', type.value);
    }
  );

  // 选中图标
  const handleComponentType = (item: any) => {
    console.log('切换类型', props.content, item.value);
    type.value = item.value;
  };
</script>
<style lang="scss">
  .icon-popper-box {
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 2px 2px;
    margin: 0 3px;
    transition: all 0.3s;
    margin-right: 8px;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: #ccc, $alpha: 0.2);
    }
  }

  .component-type-select-pop-box {
    padding: 5px !important;
    .component-type-select {
      width: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      .icon-list-item {
        display: flex;
        align-items: center;
        padding: 15px 10px;
        transition: all 0.3s;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
      }
    }
  }
</style>
