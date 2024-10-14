<template>
  <div class="icon-editor-box">
    <el-form-item label="模块图标:">
      <el-popover popper-class="icon-editor-pop-box" :width="400" trigger="click">
        <template #reference>
          <div class="icon-editor-icon-box">
            <svg-icon
              :icon-name="module?.props.moduleTitleIcon"
              color="#74a274"
              size="22px"
            ></svg-icon>
          </div>
        </template>
        <div class="icon-select-box">
          <div
            v-for="(item, index) in iconfontList.glyphs"
            :key="index"
            class="icon-list-item"
            @click="handleIcon(item)"
          >
            <svg-icon :icon-name="'icon-' + item.font_class" color="#74a274" size="20px"></svg-icon>
          </div>
        </div>
      </el-popover>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useGetSelectedModule } from '../../hooks/useGetSelectedModule';
  import { iconfontList } from '../utils/iconfont';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的module
  const module = useGetSelectedModule(props.id);

  // 选中图标
  const handleIcon = (item: { font_class: string }) => {
    module.props.moduleTitleIcon = 'icon-' + item.font_class;
  };
</script>
<style lang="scss">
  .icon-editor-icon-box {
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 5px;
    padding: 0 10px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: #ccc, $alpha: 0.2);
    }
  }

  .icon-editor-pop-box {
    .icon-select-box {
      width: 100%;
      height: 500px;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .icon-list-item {
        display: flex;
        align-items: center;
        height: 30px;
        border-radius: 5px;
        padding: 0 10px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
      }
    }
  }
</style>
