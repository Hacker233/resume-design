<!-- 作品列表属性设置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input type="text" v-model="modelItem.data.title" maxlength="15" show-word-limit />
        </el-form-item>
        <div class="works-list" v-for="(item, index) in modelItem.data.LIST">
          <p>
            <span>作品{{ index + 1 }}</span>
            <el-button
              :disabled="index === 0"
              type="danger"
              :icon="Delete"
              circle
              @click="deleteWorks(index)"
            />
          </p>
          <el-form-item label="作品名称">
            <el-input type="text" v-model="item.worksName" maxlength="35" show-word-limit />
          </el-form-item>
          <el-form-item label="作品链接">
            <el-input type="text" v-model="item.worksLink" maxlength="235" show-word-limit />
          </el-form-item>
        </div>
        <div class="addOrdelet">
          <el-button type="primary" @click="addWorks">添加作品</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import CommonOptions from './CommonOptions.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  import { Delete } from '@element-plus/icons-vue';
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();
  let activeName = ref('style');

  /**
   * 数据配置
   */
  // 删除作品
  const deleteWorks = (index: number): void => {
    modelItem.data.LIST.splice(index, 1);
  };
  // 添加技能
  const addWorks = (): void => {
    modelItem.data.LIST.push({
      worksName: '作品名称',
      worksLink: 'https://www.baidu.com',
      worksIntroduce: '这是一个千万级作品'
    });
  };
</script>
<script lang="ts">
  export default {
    name: 'WORKS_DISPLAY_OPTIONS'
  };
</script>
<style lang="scss" scoped>
  .works-list {
    p {
      display: flex;
      justify-content: center;
      height: 50px;
      align-items: center;
      margin-bottom: 10px;
      span {
        margin-right: 10px;
      }
    }
    .el-button {
      margin-left: 10px;
    }
  }
</style>
