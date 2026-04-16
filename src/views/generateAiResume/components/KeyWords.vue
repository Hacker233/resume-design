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
            :label="index + '年经验'"
            :value="index"
          >
            <span class="cyber-label">{{ index }}年</span>
          </el-option>
        </el-select>
      </el-form-item>
      
      <!-- 选填项折叠区域 -->
      <div class="optional-section">
        <div 
          @click="toggleOptional" 
          class="toggle-button"
        >
          <span class="button-text">{{ isOptionalExpanded ? '收起选填项' : '展开选填项' }}</span>
          <el-icon class="arrow-icon" v-if="!isOptionalExpanded">
            <ArrowDown />
          </el-icon>
          <el-icon class="arrow-icon" v-else>
            <ArrowUp />
          </el-icon>
        </div>
        
        <div v-if="isOptionalExpanded" class="optional-content">
          <!-- 总字数限制提示 -->
          <div class="word-count-hint" :class="{ 'warning': totalWordCount > MAX_TOTAL_WORDS * 0.8 }">
            总字数：{{ totalWordCount }}/{{ MAX_TOTAL_WORDS }}
            <span v-if="totalWordCount > MAX_TOTAL_WORDS" class="warning-text">（已超过限制，请适当减少内容）</span>
          </div>
          <el-form-item label="所学专业" prop="major">
            <template #label>
              <span class="cyber-label">所学专业（选填）</span>
            </template>
            <el-input
              v-model="ruleForm.major"
              :maxlength="50"
              show-word-limit
              class="cyber-input"
              placeholder="请输入您的专业背景，如：计算机科学与技术"
            />
          </el-form-item>
          
          <el-form-item label="核心技能" prop="skills">
            <template #label>
              <span class="cyber-label">核心技能（选填）</span>
            </template>
            <el-input
              v-model="ruleForm.skills"
              type="textarea"
              :rows="3"
              :maxlength="200"
              show-word-limit
              class="cyber-textarea"
              placeholder="请输入您的专业技能、技术栈等，如：JavaScript、React、Node.js"
            />
          </el-form-item>
          
          <el-form-item label="项目经验" prop="projectExperience">
            <template #label>
              <span class="cyber-label">项目经验（选填）</span>
            </template>
            <el-input
              v-model="ruleForm.projectExperience"
              type="textarea"
              :rows="3"
              :maxlength="300"
              show-word-limit
              class="cyber-textarea"
              placeholder="请简要描述您的主要项目经验，如：参与开发企业级管理系统，负责前端开发"
            />
          </el-form-item>
          
          <el-form-item label="其他补充" prop="otherInfo">
            <template #label>
              <span class="cyber-label">其他补充（选填）</span>
            </template>
            <el-input
              v-model="ruleForm.otherInfo"
              type="textarea"
              :rows="2"
              :maxlength="150"
              show-word-limit
              class="cyber-textarea"
              placeholder="请输入其他需要补充的信息"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { FormInstance, FormRules, ElIcon } from 'element-plus';
  import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

  interface RuleForm {
    name: string;
    intendedPositions: string;
    workService: number | null;
    major: string;
    skills: string;
    projectExperience: string;
    otherInfo: string;
  }

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<RuleForm>({
    name: '',
    intendedPositions: '',
    workService: null,
    major: '',
    skills: '',
    projectExperience: '',
    otherInfo: ''
  });

  // 选填项展开状态
  const isOptionalExpanded = ref(false);

  // 切换选填项展开/收起
  const toggleOptional = () => {
    isOptionalExpanded.value = !isOptionalExpanded.value;
  };

  const rules = reactive<FormRules<RuleForm>>({
    name: [{ required: true, message: '请输入您的姓名', trigger: 'blur' }],
    intendedPositions: [{ required: true, message: '请输入您的意向岗位', trigger: 'blur' }],
    workService: [{ required: true, message: '请选择您的工作年限', trigger: 'change' }]
  });

  // 计算属性：合并所有选填字段为otherKeywords
  const otherKeywords = computed(() => {
    const parts = [];
    if (ruleForm.major) parts.push(`专业：${ruleForm.major}`);
    if (ruleForm.skills) parts.push(`技能：${ruleForm.skills}`);
    if (ruleForm.projectExperience) parts.push(`项目经验：${ruleForm.projectExperience}`);
    if (ruleForm.otherInfo) parts.push(`其他：${ruleForm.otherInfo}`);
    return parts.join('；');
  });

  // 计算属性：总字数
  const totalWordCount = computed(() => {
    return otherKeywords.value.length;
  });

  // 最大总字数限制
  const MAX_TOTAL_WORDS = 600;

  defineExpose({
    ruleForm: computed(() => ({
      name: ruleForm.name,
      intendedPositions: ruleForm.intendedPositions,
      workService: ruleForm.workService,
      otherKeywords: otherKeywords.value
    })),
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
      pointer-events: none;
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

    :deep(.el-input__count) {
      background: transparent;
      color: #8f66d6;
      border-radius: 0 8px 8px 0;
      font-family: 'Roboto Mono', monospace;
      font-size: 12px;
    }
    :deep(.el-input__count-inner) {
      background: transparent;
      color: #8f66d6;
      border-radius: 0 8px 8px 0;
      font-family: 'Roboto Mono', monospace;
      font-size: 12px;
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
      
      :deep(.el-textarea__count) {
        background: transparent;
        color: #8f66d6;
        border-radius: 0 0 8px 8px;
        font-family: 'Roboto Mono', monospace;
        font-size: 12px;
        margin-top: -4px;
      }
    }
  }

  // 选填项折叠区域样式
  .optional-section {
    margin-top: 1.5rem;
    
    .toggle-button {
      width: 100%;
      margin-bottom: 1rem;
      background: rgba(143, 102, 214, 0.1);
      border: 1px solid rgba(143, 102, 214, 0.3);
      border-radius: 4px;
      color: #8f66d6;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      
      &:hover {
        background: rgba(143, 102, 214, 0.2);
        border-color: #8f66d6;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(143, 102, 214, 0.2);
      }
      
      .button-text {
        margin-right: 8px;
      }
      
      .arrow-icon {
        font-size: 16px;
        transition: transform 0.3s ease;
      }
    }
    
    .optional-content {
      animation: slideDown 0.3s ease-out;
    }
  }

  // 展开动画
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  // 字数限制提示样式
  .word-count-hint {
    margin-bottom: 1rem;
    padding: 8px 12px;
    background: rgba(143, 102, 214, 0.05);
    border-radius: 4px;
    font-size: 14px;
    color: #2d264b;
    text-align: right;
    
    &.warning {
      background: rgba(255, 193, 7, 0.1);
      border-left: 4px solid #ffc107;
    }
    
    .warning-text {
      color: #dc3545;
      font-weight: 500;
    }
  }
  
  // 边框动画
  @keyframes borderGlow {

    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.7;
    }
  }
</style>
