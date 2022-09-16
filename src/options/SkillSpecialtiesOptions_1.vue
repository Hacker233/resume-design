<!-- 技能特长属性设置面板 -->
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
          <el-input v-model="modelItem.data.title" type="text" maxlength="15" show-word-limit />
        </el-form-item>
        <div v-for="(item, index) in modelItem.data.LIST" :key="index" class="skill-list">
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <el-form-item :label="`技能${index + 1}:`">
            <el-input v-model="item.skillName" type="text" maxlength="15" show-word-limit />
          </el-form-item>
          <el-form-item label="熟练度:">
            <el-select v-model="item.proficiency" class="m-2" placeholder="Select">
              <el-option
                v-for="childItem in proficiencyList"
                :key="childItem"
                :label="childItem"
                :value="childItem"
              />
            </el-select>
            <el-button
              :disabled="index === 0"
              type="danger"
              :icon="SemiSelect"
              circle
              @click="deleteSkill(index)"
            />
            <el-button
              :disabled="index !== modelItem.data.LIST.length - 1"
              type="primary"
              :icon="Plus"
              circle
              @click="addSkill"
            />
          </el-form-item>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import CommonOptions from './CommonOptions.vue';
  import { Plus, SemiSelect } from '@element-plus/icons-vue';
  import { StarFilled } from '@element-plus/icons-vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  defineOptions({ name: 'TEMPLATE2_SKILL_SPECIALTIES' });

  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();
  let activeName = ref('style');

  /**
   * 数据配置
   */
  // 删除技能
  const deleteSkill = (index: number): void => {
    modelItem.data.LIST.splice(index, 1);
  };
  // 添加技能
  const addSkill = (): void => {
    modelItem.data.LIST.push({
      skillName: 'JavaScript', // 技能名称
      proficiency: '熟悉', // 熟练度
      introduce: '熟练掌握该项技术' // 介绍
    });
  };

  // 熟练度选择
  const proficiencyList = reactive(['了解', '一般', '熟悉', '精通']);
</script>
<style lang="scss" scoped>
  .skill-list {
    .el-button {
      margin-left: 10px;
    }
  }
</style>
