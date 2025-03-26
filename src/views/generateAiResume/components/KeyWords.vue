<template>
  <div class="ai-form-container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      label-position="top"
      class="cyber-form"
      size="large"
      status-icon
    >
      <!-- 添加了动态科技边框 -->
      <div class="cyber-border"></div>

      <el-form-item label="姓名" prop="name">
        <template #label>
          <span class="cyber-label">姓名（必填）</span>
        </template>
        <el-input
          v-model="ruleForm.name"
          :maxlength="10"
          class="cyber-input"
          placeholder="个人姓名为必填内容"
        />
      </el-form-item>
      <el-form-item label="意向岗位" prop="intendedPositions">
        <template #label>
          <span class="cyber-label">意向岗位（必填）</span>
        </template>
        <el-input
          v-model="ruleForm.intendedPositions"
          :maxlength="20"
          class="cyber-input"
          placeholder="意向岗位为必填内容"
        />
      </el-form-item>
      <el-form-item label="工作年限" prop="workService">
        <template #label>
          <span class="cyber-label">工作年限（必填）</span>
        </template>
        <el-select v-model="ruleForm.workService" class="cyber-select" placeholder="请选择工作年限">
          <el-option
            v-for="(item, index) in 20"
            :key="index"
            :label="item + '年经验'"
            :value="item"
          >
            <span class="cyber-label">{{ item }}年</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他关键词" prop="otherKeywords">
        <template #label>
          <span class="cyber-label">其他关键词（选填）</span>
        </template>
        <el-input
          v-model="ruleForm.otherKeywords"
          type="textarea"
          :rows="4"
          class="cyber-textarea"
          placeholder="请输入其他相关关键词，列入所学专业、技能特长、工作经验等等，可以详细描述"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { FormInstance, FormRules } from 'element-plus';

  interface RuleForm {
    name: string;
    intendedPositions: string;
    workService: number | null;
    otherKeywords: string;
  }

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<RuleForm>({
    name: '',
    intendedPositions: '',
    workService: null,
    otherKeywords: ''
  });

  const rules = reactive<FormRules<RuleForm>>({
    name: [{ required: true, message: '请输入您的姓名', trigger: 'blur' }],
    intendedPositions: [{ required: true, message: '请输入您的意向岗位', trigger: 'blur' }],
    workService: [{ required: true, message: '请选择您的工作年限', trigger: 'change' }]
  });

  defineExpose({
    ruleForm,
    ruleFormRef
  });
</script>

<style lang="scss" scoped>
  .ai-form-container {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 2rem;
    width: 60%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(143, 102, 214, 0.1) 0%,
      rgba(255, 255, 255, 0) 60%
    );
  }

  .cyber-form {
    width: 100%;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
    box-shadow: 0 0 20px rgba(143, 102, 214, 0.15), inset 0 0 15px rgba(143, 102, 214, 0.1);

    .cyber-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-radius: 16px;
      background: linear-gradient(45deg, #8f66d6, #5a4ff3) border-box;
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      animation: borderGlow 2s infinite alternate;
    }

    :deep(.el-form-item) {
      margin-bottom: 2rem;
      .el-form-item__label {
        display: flex;
        justify-content: flex-start;
        font-size: 16px;
        margin: 0;
      }
    }

    .cyber-label {
      display: block;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #2d264b;
      letter-spacing: 1px;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      font-size: 0.9em;
      opacity: 0.8;
    }

    .cyber-input {
      :deep(.el-input__wrapper) {
        background: rgba(240, 235, 255, 0.3);
        border-radius: 8px;
        box-shadow: 0 0 0 1px rgba(143, 102, 214, 0.3), 0 4px 20px rgba(143, 102, 214, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          box-shadow: 0 0 0 2px rgba(143, 102, 214, 0.5), 0 6px 25px rgba(143, 102, 214, 0.15);
        }

        &.is-focus {
          box-shadow: 0 0 0 2px #8f66d6, 0 8px 30px rgba(143, 102, 214, 0.2);
        }
      }

      :deep(.el-input__inner) {
        font-family: 'Roboto Mono', monospace;
        color: #2d264b;
        letter-spacing: 0.5px;
      }
    }

    .cyber-select {
      width: 100%;
      :deep(.el-input__wrapper) {
        background: rgba(240, 235, 255, 0.3);
        border-radius: 8px;
        box-shadow: 0 0 0 1px rgba(143, 102, 214, 0.3), 0 4px 20px rgba(143, 102, 214, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          box-shadow: 0 0 0 2px rgba(143, 102, 214, 0.5), 0 6px 25px rgba(143, 102, 214, 0.15);
        }

        &.is-focus {
          box-shadow: 0 0 0 2px #8f66d6, 0 8px 30px rgba(143, 102, 214, 0.2);
        }
      }

      :deep(.el-input__inner) {
        font-family: 'Roboto Mono', monospace;
        color: #2d264b;
        letter-spacing: 0.5px;
      }
    }

    .cyber-textarea {
      :deep(.el-textarea__inner) {
        background: rgba(240, 235, 255, 0.3);
        border-radius: 8px;
        box-shadow: 0 0 0 1px rgba(143, 102, 214, 0.3), 0 4px 20px rgba(143, 102, 214, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Roboto Mono', monospace;
        color: #2d264b;
        letter-spacing: 0.5px;

        &:focus {
          box-shadow: 0 0 0 2px #8f66d6, 0 8px 30px rgba(143, 102, 214, 0.2);
        }
      }
    }
  }

  @keyframes borderGlow {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.7;
    }
  }
</style>
