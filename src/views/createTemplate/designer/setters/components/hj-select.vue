<template>
  <div class="field">
    <div class="field-top">
      <span class="label">{{ module.dataSource[keyValue].label }}</span>
      <el-tooltip effect="light" content="属性配置" placement="bottom">
        <svg-icon
          ref="buttonRef"
          v-click-outside="onClickOutside"
          icon-name="icon-shezhi1"
          color="#1e2532"
          size="24px"
        />
      </el-tooltip>
    </div>
    <el-select
      v-model="module.dataSource[keyValue].value"
      size="large"
      style="width: 100%"
      :placeholder="`请选择${module.dataSource[keyValue].label}`"
    >
      <el-option
        v-for="(item, index) in selectOptions[keyValue]"
        :key="index"
        :label="item.value"
        :value="item.value"
      />
    </el-select>
  </div>

  <!-- 属性设置 -->
  <el-popover
    ref="popoverRef"
    popper-class="hj-input-popover"
    :virtual-ref="buttonRef"
    trigger="click"
    title="模块属性配置"
    virtual-triggering
  >
    <props-popover :id="module.id" :key-value="keyValue"></props-popover>
  </el-popover>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  import PropsPopover from './props-popover.vue';
  import selectOptions from '../../utils/getSelectOptions';

  import { ClickOutside as vClickOutside } from 'element-plus';

  const props = defineProps<{
    id: string;
    keyValue: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  const buttonRef = ref();
  const popoverRef = ref();
  const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.();
  };
</script>
<style lang="scss" scoped>
  .field {
    margin-bottom: 24px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .field-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        display: flex;
        font-size: 16px;
        line-height: 20px;
        color: rgb(130, 139, 162);
        margin-left: 1px;
      }
      .svg-icon {
        cursor: pointer;
        padding: 3px;
        transition: all 0.3s;
        &:hover {
          background-color: #eee;
          border-radius: 4px;
        }
      }
    }

    .el-input {
      height: 48px;
    }
  }
</style>
<style lang="scss">
  .hj-input-popover {
    width: 200px !important;
    .el-popper__arrow {
      display: none;
    }
    .el-popover__title {
      padding-bottom: 10px;
      font-size: 14px;
      border-bottom: 1px solid;
      border-color: #eee;
      margin-bottom: 5px;
    }
  }
</style>
