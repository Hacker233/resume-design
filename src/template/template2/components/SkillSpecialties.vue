<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <div class="skill-title">
      <svg-icon iconName="icon-techang" color="#fff" size="26px"></svg-icon>
      <h1>技能特长</h1>
    </div>
    <!-- 技能特长 -->
    <ul>
      <template v-for="item in modelData.LIST">
        <li>
          <p>{{ item.skillName }}</p>
          <el-slider
            v-model="item.proficiency"
            :step="4"
            size="small"
            :format-tooltip="formatTooltip"
          />
        </li>
      </template>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { ISKILLSPECIALTIES } from '@/types/model';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
  }>();

  // 熟练度
  const formatTooltip = (value: number) => {
    if (value <= 25) {
      return '一般';
    } else if (value <= 50) {
      return '掌握';
    } else if (value <= 75) {
      return '熟练';
    } else {
      return '精通';
    }
  };
</script>
<style lang="less" scoped>
  .skill-specialties {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    .skill-title {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 18px;
      h1 {
        font-size: 20px;
        color: #fff;
        margin: 0 0 0 10px;
      }
    }

    ul {
      display: flex;
      width: 100%;
      flex-direction: column;
      li {
        height: 44px;
        margin-bottom: 20px;
        list-style: none;
        p {
          padding: 0 0 6px 4px;
          color: v-bind('modelData.style.textColor');
          font-size: v-bind('modelData.style.textFontSize');
          font-weight: v-bind('modelData.style.textFontWeight');
        }
        :deep(.el-slider) {
          .el-slider__bar {
            background-color: #4487c6;
            border-radius: 0;
          }
          .el-slider__button {
            width: 10px;
            height: 10px;
            background-color: #4487c6;
            border: none;
          }
          .el-slider__runway {
            border-radius: 0;
          }
        }
      }
    }
  }
</style>
