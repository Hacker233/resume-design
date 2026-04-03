<template>
  <div class="diagnostic-report">
    <!-- 顶部Tab栏 -->
    <div class="report-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-item"
        :class="{ active: activeTab === tab.id }"
        @click="scrollToSection(tab.id)"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-text">{{ tab.name }}</span>
      </div>
    </div>

    <!-- 总体评分 -->
    <div class="diagnostic-section" id="section-overall">
      <div class="section-header" @click="overallExpanded = !overallExpanded">
        <h3 class="section-title">📊 总体评分</h3>
        <el-button
          type="text"
          :icon="overallExpanded ? ArrowUp : ArrowDown"
          class="expand-btn"
        />
      </div>
      <div v-if="overallExpanded" class="section-content">
        <div class="overall-score">
          <div class="total-score">
            <div class="score-circle">
              <span class="score-value">{{ (diagnosticData.overallScore?.totalScore || 0).toFixed(1) }}</span>
              <span class="score-max">/ 10</span>
            </div>
            <div class="score-label">综合评分</div>
          </div>
          <div class="score-chart">
          <div ref="scoreChartRef" class="chart-container"></div>
        </div>
        
        <!-- 技能雷达图 -->
        <div class="skills-chart" style="margin-top: 32px;">
          <h4 style="margin-bottom: 16px; font-size: 1.1rem; font-weight: 700; color: #2d3748;">技能雷达分析</h4>
          <div ref="skillsChartRef" class="chart-container"></div>
        </div>
        </div>

        <!-- 总体评价 -->
        <div class="overall-evaluation">
          <h4>总体评价</h4>
          <p>{{ diagnosticData.overallScore?.overallEvaluation || '暂无总体评价' }}</p>
        </div>

        <!-- 优势与改进 -->
        <div class="strength-improvement">
          <div class="strength-areas">
            <h4>🌟 优势领域</h4>
            <div v-if="diagnosticData.overallScore.strengthAreas && diagnosticData.overallScore.strengthAreas.length > 0">
              <ul>
                <li v-for="(area, index) in diagnosticData.overallScore.strengthAreas" :key="index">{{ area }}</li>
              </ul>
            </div>
            <div v-else class="no-data">暂无优势领域信息</div>
          </div>
          <div class="improvement-areas">
            <h4>📈 改进领域</h4>
            <div
              v-if="diagnosticData.overallScore.improvementAreas && diagnosticData.overallScore.improvementAreas.length > 0">
              <ul>
                <li v-for="(area, index) in diagnosticData.overallScore.improvementAreas" :key="index">{{ area }}</li>
              </ul>
            </div>
            <div v-else class="no-data">暂无改进领域信息</div>
          </div>
        </div>

        <div class="score-table">
          <table>
            <thead>
              <tr>
                <th>诊断维度</th>
                <th>评分</th>
                <th>简要评价</th>
                <th>优先级</th>
                <th>改进方向</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in diagnosticData.overallScore?.dimensions || []" :key="index">
                <td>{{ item?.name || '-' }}</td>
                <td>
                  <div class="score-bar">
                    <div class="score-fill" :style="{ width: ((item?.score || 0) / 10 * 100) + '%' }"></div>
                    <span class="score-text">{{ item?.score || 0 }}</span>
                  </div>
                </td>
                <td>{{ item?.evaluation || '-' }}</td>
                <td>
                  <span :class="['priority-tag', item?.priority]">{{ item?.priority === 'high' ? '🔴 高' : item?.priority === 'medium' ? '🟡 中' : '🟢 低' }}</span>
                </td>
                <td>{{ item?.improvementArea || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 详细诊断 -->
    <div class="diagnostic-section" id="section-detailed">
      <div class="section-header" @click="detailedExpanded = !detailedExpanded">
        <h3 class="section-title">🧠 详细诊断</h3>
        <el-button
          type="text"
          :icon="detailedExpanded ? ArrowUp : ArrowDown"
          class="expand-btn"
        />
      </div>
      <div v-if="detailedExpanded" class="section-content">

      <!-- 图表分析 -->
      <div class="chart-analysis" style="margin-bottom: 32px;">
        <h4 style="margin-bottom: 24px; font-size: 1.2rem; font-weight: 700; color: #2d3748;">图表分析</h4>
        
        <!-- 时间线图表 -->
        <div class="timeline-chart" style="margin-bottom: 32px;">
          <h5 style="margin-bottom: 16px; font-size: 1.1rem; font-weight: 600; color: #4a5568;">时间线一致性</h5>
          <div ref="timelineChartRef" class="chart-container"></div>
        </div>
        
        <!-- 岗位匹配度图表 -->
        <div class="job-match-chart" style="margin-bottom: 32px;">
          <h5 style="margin-bottom: 16px; font-size: 1.1rem; font-weight: 600; color: #4a5568;">岗位匹配度</h5>
          <div ref="jobMatchChartRef" class="chart-container"></div>
        </div>
        
        <!-- 内容质量图表 -->
        <div class="content-chart">
          <h5 style="margin-bottom: 16px; font-size: 1.1rem; font-weight: 600; color: #4a5568;">内容质量分析</h5>
          <div ref="contentChartRef" class="chart-container"></div>
        </div>
      </div>

      <!-- 整体结构与逻辑性 -->
      <div class="diagnostic-item">
        <h4 class="item-title">1. 整体结构与逻辑性</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.structure?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        <div
          v-if="diagnosticData.detailedDiagnosis.structure.problems && diagnosticData.detailedDiagnosis.structure.problems.length > 0"
          class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.structure.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div
          v-if="diagnosticData.detailedDiagnosis.structure.analysis && diagnosticData.detailedDiagnosis.structure.analysis.length > 0"
          class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.structure.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div
          v-if="diagnosticData.detailedDiagnosis.structure.suggestions && diagnosticData.detailedDiagnosis.structure.suggestions.length > 0"
          class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.structure.suggestions" :key="index"
            class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div
          v-if="diagnosticData.detailedDiagnosis.structure.bestPractices && diagnosticData.detailedDiagnosis.structure.bestPractices.length > 0"
          class="best-practices">
          <h5>✨ 最佳实践</h5>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.structure.analysis && diagnosticData.detailedDiagnosis.structure.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.structure.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.structure.suggestions && diagnosticData.detailedDiagnosis.structure.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.structure.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.structure.bestPractices && diagnosticData.detailedDiagnosis.structure.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.structure.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 语言表达与专业性 -->
      <div class="diagnostic-item">
        <h4 class="item-title">2. 语言表达与专业性</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.language?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.language.problems && diagnosticData.detailedDiagnosis.language.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.language.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.language.analysis && diagnosticData.detailedDiagnosis.language.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.language.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.language.suggestions && diagnosticData.detailedDiagnosis.language.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.language.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.language.bestPractices && diagnosticData.detailedDiagnosis.language.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.language.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 内容完整性与信息密度 -->
      <div class="diagnostic-item">
        <h4 class="item-title">3. 内容完整性与信息密度</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.content?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.content.problems && diagnosticData.detailedDiagnosis.content.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.content.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.content.analysis && diagnosticData.detailedDiagnosis.content.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.content.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.content.suggestions && diagnosticData.detailedDiagnosis.content.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.content.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.content.bestPractices && diagnosticData.detailedDiagnosis.content.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.content.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 时间线一致性 -->
      <div class="diagnostic-item">
        <h4 class="item-title">4. 时间线一致性</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.timeline?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.timeline.problems && diagnosticData.detailedDiagnosis.timeline.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.timeline.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.timeline.analysis && diagnosticData.detailedDiagnosis.timeline.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.timeline.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.timeline.suggestions && diagnosticData.detailedDiagnosis.timeline.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.timeline.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.timeline.bestPractices && diagnosticData.detailedDiagnosis.timeline.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.timeline.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 岗位匹配度分析 -->
      <div class="diagnostic-item">
        <h4 class="item-title">5. 岗位匹配度分析</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.jobMatch?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        
        <!-- 匹配技能分析 -->
        <div v-if="(diagnosticData.detailedDiagnosis.jobMatch.matchingSkills && diagnosticData.detailedDiagnosis.jobMatch.matchingSkills.length > 0) || (diagnosticData.detailedDiagnosis.jobMatch.missingSkills && diagnosticData.detailedDiagnosis.jobMatch.missingSkills.length > 0)" class="skill-match-analysis">
          <div v-if="diagnosticData.detailedDiagnosis.jobMatch.matchingSkills && diagnosticData.detailedDiagnosis.jobMatch.matchingSkills.length > 0" class="matching-skills">
            <h5>✅ 匹配的技能</h5>
            <ul>
              <li v-for="(skill, index) in diagnosticData.detailedDiagnosis.jobMatch.matchingSkills" :key="index">{{ skill }}</li>
            </ul>
          </div>
          <div v-if="diagnosticData.detailedDiagnosis.jobMatch.missingSkills && diagnosticData.detailedDiagnosis.jobMatch.missingSkills.length > 0" class="missing-skills">
            <h5>❌ 缺失的技能</h5>
            <ul>
              <li v-for="(skill, index) in diagnosticData.detailedDiagnosis.jobMatch.missingSkills" :key="index">{{ skill }}</li>
            </ul>
          </div>
        </div>
        
        <div v-if="diagnosticData.detailedDiagnosis.jobMatch.problems && diagnosticData.detailedDiagnosis.jobMatch.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.jobMatch.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.jobMatch.analysis && diagnosticData.detailedDiagnosis.jobMatch.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.jobMatch.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.jobMatch.suggestions && diagnosticData.detailedDiagnosis.jobMatch.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.jobMatch.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.jobMatch.bestPractices && diagnosticData.detailedDiagnosis.jobMatch.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.jobMatch.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 技能体系完整性 -->
      <div class="diagnostic-item">
        <h4 class="item-title">6. 技能体系完整性</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.skills?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        
        <!-- 技能分类 -->
        <div v-if="diagnosticData.detailedDiagnosis.skills.skillBreakdown" class="skill-breakdown">
          <div v-if="diagnosticData.detailedDiagnosis.skills.skillBreakdown.technical && diagnosticData.detailedDiagnosis.skills.skillBreakdown.technical.length > 0" class="skill-category">
            <h5>🔧 技术技能</h5>
            <ul>
              <li v-for="(skill, index) in diagnosticData.detailedDiagnosis.skills.skillBreakdown.technical" :key="index">{{ skill }}</li>
            </ul>
          </div>
          <div v-if="diagnosticData.detailedDiagnosis.skills.skillBreakdown.soft && diagnosticData.detailedDiagnosis.skills.skillBreakdown.soft.length > 0" class="skill-category">
            <h5>🤝 软技能</h5>
            <ul>
              <li v-for="(skill, index) in diagnosticData.detailedDiagnosis.skills.skillBreakdown.soft" :key="index">{{ skill }}</li>
            </ul>
          </div>
          <div v-if="diagnosticData.detailedDiagnosis.skills.skillBreakdown.industry && diagnosticData.detailedDiagnosis.skills.skillBreakdown.industry.length > 0" class="skill-category">
            <h5>🏢 行业技能</h5>
            <ul>
              <li v-for="(skill, index) in diagnosticData.detailedDiagnosis.skills.skillBreakdown.industry" :key="index">{{ skill }}</li>
            </ul>
          </div>
        </div>
        
        <div v-if="diagnosticData.detailedDiagnosis.skills.problems && diagnosticData.detailedDiagnosis.skills.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.skills.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.skills.analysis && diagnosticData.detailedDiagnosis.skills.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.skills.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.skills.suggestions && diagnosticData.detailedDiagnosis.skills.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.skills.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.skills.bestPractices && diagnosticData.detailedDiagnosis.skills.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.skills.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 简历格式与排版 -->
      <div class="diagnostic-item">
        <h4 class="item-title">7. 简历格式与排版</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.format?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.format.problems && diagnosticData.detailedDiagnosis.format.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.format.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.format.analysis && diagnosticData.detailedDiagnosis.format.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.format.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.format.suggestions && diagnosticData.detailedDiagnosis.format.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.format.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.format.bestPractices && diagnosticData.detailedDiagnosis.format.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.format.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>

      <!-- 个人品牌与独特性 -->
      <div class="diagnostic-item">
        <h4 class="item-title">8. 个人品牌与独特性</h4>
        <div class="item-score">
          <span class="score">{{ diagnosticData.detailedDiagnosis.personalBrand?.score || 0 }}</span>
          <span class="score-label">/ 10</span>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.personalBrand.problems && diagnosticData.detailedDiagnosis.personalBrand.problems.length > 0" class="problems">
          <h5>⚠️ 问题描述</h5>
          <ul>
            <li v-for="(problem, index) in diagnosticData.detailedDiagnosis.personalBrand.problems" :key="index">{{ problem }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.personalBrand.analysis && diagnosticData.detailedDiagnosis.personalBrand.analysis.length > 0" class="analysis">
          <h5>🔍 分析依据</h5>
          <ul>
            <li v-for="(item, index) in diagnosticData.detailedDiagnosis.personalBrand.analysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.personalBrand.suggestions && diagnosticData.detailedDiagnosis.personalBrand.suggestions.length > 0" class="suggestions">
          <h5>✅ 优化建议</h5>
          <div v-for="(suggestion, index) in diagnosticData.detailedDiagnosis.personalBrand.suggestions" :key="index" class="suggestion-item">
            <div v-if="suggestion.original" class="original"><strong>原句：</strong>{{ suggestion.original }}</div>
            <div class="issue"><strong>问题：</strong>{{ suggestion.issue }}</div>
            <div class="suggestion"><strong>建议：</strong>{{ suggestion.suggestion }}</div>
            <div v-if="suggestion.template" class="template"><strong>模板：</strong>{{ suggestion.template }}</div>
            <div class="suggestion-meta">
              <span class="difficulty" :class="suggestion.difficulty">{{ suggestion.difficulty === 'easy' ? '🟢 简单' : suggestion.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}</span>
              <span class="estimated-time">⏱️ {{ suggestion.estimatedTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="diagnosticData.detailedDiagnosis.personalBrand.bestPractices && diagnosticData.detailedDiagnosis.personalBrand.bestPractices.length > 0" class="best-practices">
          <h5>✨ 最佳实践</h5>
          <ul>
            <li v-for="(practice, index) in diagnosticData.detailedDiagnosis.personalBrand.bestPractices" :key="index">{{ practice }}</li>
          </ul>
        </div>
      </div>
      </div>
    </div>

    <!-- 优先级优化清单 -->
    <div class="diagnostic-section" id="section-priority">
      <div class="section-header" @click="priorityExpanded = !priorityExpanded">
        <h3 class="section-title">🎯 优先级优化清单</h3>
        <el-button
          type="text"
          :icon="priorityExpanded ? ArrowUp : ArrowDown"
          class="expand-btn"
        />
      </div>
      <div v-if="priorityExpanded" class="section-content">
      <div class="priority-list">
        <div class="priority-item high">
          <h4>🔴 立即修改（高优先级）</h4>
          <div v-if="diagnosticData.priorityList.high && diagnosticData.priorityList.high.length > 0">
            <div v-for="(item, index) in diagnosticData.priorityList.high" :key="index" class="priority-task">
              <div class="task-title">{{ item.task }}</div>
              <div class="task-meta">
                <span class="task-reason"><strong>优先原因：</strong>{{ item.reason }}</span>
                <span class="task-impact"><strong>预期影响：</strong>{{ item.impact }}</span>
                <div class="task-info">
                  <span class="task-difficulty" :class="item.difficulty">
                    {{ item.difficulty === 'easy' ? '🟢 简单' : item.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}
                  </span>
                  <span class="task-time">⏱️ {{ item.estimatedTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无高优先级任务</div>
        </div>
        <div class="priority-item medium">
          <h4>🟡 后续优化（中优先级）</h4>
          <div v-if="diagnosticData.priorityList.medium && diagnosticData.priorityList.medium.length > 0">
            <div v-for="(item, index) in diagnosticData.priorityList.medium" :key="index" class="priority-task">
              <div class="task-title">{{ item.task }}</div>
              <div class="task-meta">
                <span class="task-reason"><strong>优先原因：</strong>{{ item.reason }}</span>
                <span class="task-impact"><strong>预期影响：</strong>{{ item.impact }}</span>
                <div class="task-info">
                  <span class="task-difficulty" :class="item.difficulty">
                    {{ item.difficulty === 'easy' ? '🟢 简单' : item.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}
                  </span>
                  <span class="task-time">⏱️ {{ item.estimatedTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无中优先级任务</div>
        </div>
        <div class="priority-item low">
          <h4>🟢 持续改进（低优先级）</h4>
          <div v-if="diagnosticData.priorityList.low && diagnosticData.priorityList.low.length > 0">
            <div v-for="(item, index) in diagnosticData.priorityList.low" :key="index" class="priority-task">
              <div class="task-title">{{ item.task }}</div>
              <div class="task-meta">
                <span class="task-reason"><strong>优先原因：</strong>{{ item.reason }}</span>
                <span class="task-impact"><strong>预期影响：</strong>{{ item.impact }}</span>
                <div class="task-info">
                  <span class="task-difficulty" :class="item.difficulty">
                    {{ item.difficulty === 'easy' ? '🟢 简单' : item.difficulty === 'medium' ? '🟡 中等' : '🔴 困难' }}
                  </span>
                  <span class="task-time">⏱️ {{ item.estimatedTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无低优先级任务</div>
        </div>
      </div>
      </div>
    </div>

    <!-- 行业关键词建议 -->
    <div class="diagnostic-section" id="section-keywords">
      <div class="section-header" @click="keywordsExpanded = !keywordsExpanded">
        <h3 class="section-title">💡 行业关键词建议</h3>
        <el-button
          type="text"
          :icon="keywordsExpanded ? ArrowUp : ArrowDown"
          class="expand-btn"
        />
      </div>
      <div v-if="keywordsExpanded" class="section-content">
      <div class="keywords-chart">
        <div ref="keywordsChartRef" class="chart-container"></div>
      </div>
      <div class="keywords-container">
        <div class="keyword-category">
          <h4>技术/专业技能关键词</h4>
          <div v-if="diagnosticData.keywords.technical && diagnosticData.keywords.technical.length > 0">
            <div v-for="(item, index) in diagnosticData.keywords.technical" :key="index" class="keyword-item">
              <div class="keyword-header">
                <span class="keyword">{{ item.keyword }}</span>
                <span class="frequency" :class="item.frequency">
                  {{ item.frequency === 'high' ? '🔴 高频' : item.frequency === 'medium' ? '🟡 中频' : '🟢 低频' }}
                </span>
              </div>
              <div class="keyword-scenario"><strong>使用场景：</strong>{{ item.scenario }}</div>
              <div v-if="item.examples && item.examples.length > 0" class="keyword-examples">
                <strong>使用示例：</strong>
                <ul>
                  <li v-for="(example, idx) in item.examples" :key="idx">{{ example }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无技术/专业技能关键词</div>
        </div>
        <div class="keyword-category">
          <h4>软技能关键词</h4>
          <div v-if="diagnosticData.keywords.softSkills && diagnosticData.keywords.softSkills.length > 0">
            <div v-for="(item, index) in diagnosticData.keywords.softSkills" :key="index" class="keyword-item">
              <div class="keyword-header">
                <span class="keyword">{{ item.keyword }}</span>
                <span class="frequency" :class="item.frequency">
                  {{ item.frequency === 'high' ? '🔴 高频' : item.frequency === 'medium' ? '🟡 中频' : '🟢 低频' }}
                </span>
              </div>
              <div class="keyword-scenario"><strong>使用场景：</strong>{{ item.scenario }}</div>
              <div v-if="item.examples && item.examples.length > 0" class="keyword-examples">
                <strong>使用示例：</strong>
                <ul>
                  <li v-for="(example, idx) in item.examples" :key="idx">{{ example }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无软技能关键词</div>
        </div>
        <div class="keyword-category">
          <h4>行业特定关键词</h4>
          <div v-if="diagnosticData.keywords.industry && diagnosticData.keywords.industry.length > 0">
            <div v-for="(item, index) in diagnosticData.keywords.industry" :key="index" class="keyword-item">
              <div class="keyword-header">
                <span class="keyword">{{ item.keyword }}</span>
                <span class="frequency" :class="item.frequency">
                  {{ item.frequency === 'high' ? '🔴 高频' : item.frequency === 'medium' ? '🟡 中频' : '🟢 低频' }}
                </span>
              </div>
              <div class="keyword-scenario"><strong>使用场景：</strong>{{ item.scenario }}</div>
              <div v-if="item.examples && item.examples.length > 0" class="keyword-examples">
                <strong>使用示例：</strong>
                <ul>
                  <li v-for="(example, idx) in item.examples" :key="idx">{{ example }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无行业特定关键词</div>
        </div>
        <div class="keyword-category">
          <h4>成果导向关键词</h4>
          <div v-if="diagnosticData.keywords.results && diagnosticData.keywords.results.length > 0">
            <div v-for="(item, index) in diagnosticData.keywords.results" :key="index" class="keyword-item">
              <div class="keyword-header">
                <span class="keyword">{{ item.keyword }}</span>
                <span class="frequency" :class="item.frequency">
                  {{ item.frequency === 'high' ? '🔴 高频' : item.frequency === 'medium' ? '🟡 中频' : '🟢 低频' }}
                </span>
              </div>
              <div class="keyword-scenario"><strong>使用场景：</strong>{{ item.scenario }}</div>
              <div v-if="item.examples && item.examples.length > 0" class="keyword-examples">
                <strong>使用示例：</strong>
                <ul>
                  <li v-for="(example, idx) in item.examples" :key="idx">{{ example }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="no-data">暂无成果导向关键词</div>
        </div>
        <div class="keyword-tips">
          <h4>关键词使用建议</h4>
          <div v-if="diagnosticData.keywords.usageTips && diagnosticData.keywords.usageTips.length > 0">
            <ul>
              <li v-for="(tip, index) in diagnosticData.keywords.usageTips" :key="index">{{ tip }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无关键词使用建议</div>
        </div>
        <div v-if="diagnosticData.keywords.combinationTips && diagnosticData.keywords.combinationTips.length > 0" class="keyword-tips">
          <h4>关键词组合使用建议</h4>
          <ul>
            <li v-for="(tip, index) in diagnosticData.keywords.combinationTips" :key="index">{{ tip }}</li>
          </ul>
        </div>
      </div>
      </div>
    </div>

    <!-- 行业特定建议 -->
    <div v-if="diagnosticData.industrySpecific" class="diagnostic-section" id="section-industry">
      <div class="section-header" @click="industryExpanded = !industryExpanded">
        <h3 class="section-title">🏢 行业特定建议</h3>
        <el-button
          type="text"
          :icon="industryExpanded ? ArrowUp : ArrowDown"
          class="expand-btn"
        />
      </div>
      <div v-if="industryExpanded" class="section-content">
      <div class="industry-specific">
        <div class="industry-info">
          <h4>目标行业：{{ diagnosticData.industrySpecific.industry || '未指定' }}</h4>
        </div>
        <div class="industry-section">
          <h5>📈 行业趋势</h5>
          <div class="industry-trend-chart">
            <div ref="industryTrendChartRef" class="chart-container"></div>
          </div>
          <div v-if="diagnosticData.industrySpecific.trends && diagnosticData.industrySpecific.trends.length > 0">
            <ul>
              <li v-for="(trend, index) in diagnosticData.industrySpecific.trends" :key="index">{{ trend }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无行业趋势信息</div>
        </div>
        <div class="industry-section">
          <h5>📋 行业特定要求</h5>
          <div v-if="diagnosticData.industrySpecific.requirements && diagnosticData.industrySpecific.requirements.length > 0">
            <ul>
              <li v-for="(requirement, index) in diagnosticData.industrySpecific.requirements" :key="index">{{ requirement }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无行业特定要求信息</div>
        </div>
        <div class="industry-section">
          <h5>💡 行业特定建议</h5>
          <div v-if="diagnosticData.industrySpecific.recommendations && diagnosticData.industrySpecific.recommendations.length > 0">
            <ul>
              <li v-for="(recommendation, index) in diagnosticData.industrySpecific.recommendations" :key="index">{{ recommendation }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无行业特定建议信息</div>
        </div>
      </div>
      </div>
    </div>

    <!-- 简历投递建议 -->
    <div v-if="diagnosticData.applicationTips" class="diagnostic-section" id="section-application">
      <div class="section-header" @click="applicationExpanded = !applicationExpanded">
        <h3 class="section-title">📤 简历投递建议</h3>
        <el-button
          type="text"
          :icon="applicationExpanded ? ArrowUp : ArrowDown"
          class="expand-btn"
        />
      </div>
      <div v-if="applicationExpanded" class="section-content">
      <div class="application-tips">
        <div class="tips-section">
          <h5>📄 格式建议</h5>
          <div v-if="diagnosticData.applicationTips.formatting && diagnosticData.applicationTips.formatting.length > 0">
            <ul>
              <li v-for="(tip, index) in diagnosticData.applicationTips.formatting" :key="index">{{ tip }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无格式建议</div>
        </div>
        <div class="tips-section">
          <h5>🎯 定制建议</h5>
          <div v-if="diagnosticData.applicationTips.customization && diagnosticData.applicationTips.customization.length > 0">
            <ul>
              <li v-for="(tip, index) in diagnosticData.applicationTips.customization" :key="index">{{ tip }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无定制建议</div>
        </div>
        <div class="tips-section">
          <h5>🚀 投递建议</h5>
          <div v-if="diagnosticData.applicationTips.submission && diagnosticData.applicationTips.submission.length > 0">
            <ul>
              <li v-for="(tip, index) in diagnosticData.applicationTips.submission" :key="index">{{ tip }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无投递建议</div>
        </div>
        <div class="tips-section">
          <h5>📞 跟进建议</h5>
          <div v-if="diagnosticData.applicationTips.followUp && diagnosticData.applicationTips.followUp.length > 0">
            <ul>
              <li v-for="(tip, index) in diagnosticData.applicationTips.followUp" :key="index">{{ tip }}</li>
            </ul>
          </div>
          <div v-else class="no-data">暂无跟进建议</div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue';

// Props
const props = defineProps({
  diagnosticData: {
    type: Object,
    required: true
  }
});

// 展开/折叠状态
const overallExpanded = ref(true);
const detailedExpanded = ref(true);
const priorityExpanded = ref(true);
const keywordsExpanded = ref(true);
const industryExpanded = ref(true);
const applicationExpanded = ref(true);

// 顶部Tab栏
const activeTab = ref('section-overall');
const tabs = [
  { id: 'section-overall', name: '总体评分', icon: '📊' },
  { id: 'section-detailed', name: '详细诊断', icon: '🧠' },
  { id: 'section-priority', name: '优先级优化', icon: '🎯' },
  { id: 'section-keywords', name: '关键词建议', icon: '💡' },
  { id: 'section-industry', name: '行业洞察', icon: '🏢' },
  { id: 'section-application', name: '投递建议', icon: '📄' }
];

// 滚动到指定部分
const scrollToSection = (sectionId: string) => {
  activeTab.value = sectionId;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Chart refs
const scoreChartRef = ref<HTMLElement | null>(null);
const skillsChartRef = ref<HTMLElement | null>(null);
const timelineChartRef = ref<HTMLElement | null>(null);
const jobMatchChartRef = ref<HTMLElement | null>(null);
const contentChartRef = ref<HTMLElement | null>(null);
const industryTrendChartRef = ref<HTMLElement | null>(null);
const keywordsChartRef = ref<HTMLElement | null>(null);

// Chart instances
let scoreChart: echarts.ECharts | null = null;
let skillsChart: echarts.ECharts | null = null;
let timelineChart: echarts.ECharts | null = null;
let jobMatchChart: echarts.ECharts | null = null;
let contentChart: echarts.ECharts | null = null;
let industryTrendChart: echarts.ECharts | null = null;
let keywordsChart: echarts.ECharts | null = null;

// 监听详细诊断展开状态，展开时初始化图表
watch(detailedExpanded, (newVal) => {
  if (newVal) {
    nextTick(() => {
      setTimeout(() => {
        initTimelineChart();
        initJobMatchChart();
        initContentChart();
      }, 100);
    });
  }
});

// 监听关键词建议展开状态，展开时初始化图表
watch(keywordsExpanded, (newVal) => {
  if (newVal) {
    nextTick(() => {
      setTimeout(() => {
        initKeywordsChart();
      }, 100);
    });
  }
});

// 监听行业特定建议展开状态，展开时初始化图表
watch(industryExpanded, (newVal) => {
  if (newVal) {
    nextTick(() => {
      setTimeout(() => {
        initIndustryTrendChart();
      }, 100);
    });
  }
});

// 初始化评分图表
const initScoreChart = () => {
  if (!scoreChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = scoreChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initScoreChart, 100);
    return;
  }

  // 销毁旧图表
  if (scoreChart) {
    scoreChart.dispose();
  }

  // 创建新图表
  scoreChart = echarts.init(container);
  
  const dimensions = props.diagnosticData.overallScore?.dimensions || [];
  const data = dimensions.map(item => ({
    name: item?.name || '',
    score: item?.score || 0
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 2
    },
    series: [{
      name: '评分',
      type: 'bar',
      data: data.map(item => item.score),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#667eea' },
          { offset: 1, color: '#764ba2' }
        ])
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}'
      }
    }]
  };

  scoreChart.setOption(option);
};

// 初始化技能雷达图
const initSkillsRadarChart = () => {
  if (!skillsChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = skillsChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initSkillsRadarChart, 100);
    return;
  }

  // 销毁旧图表
  if (skillsChart) {
    skillsChart.dispose();
  }

  // 创建新图表
  skillsChart = echarts.init(container);

  // 准备技能数据
  const skillsData = [
    {
      name: '技术技能',
      score: props.diagnosticData?.detailedDiagnosis?.skills?.score || 0
    },
    {
      name: '专业知识',
      score: props.diagnosticData?.detailedDiagnosis?.language?.score || 0
    },
    {
      name: '工作经验',
      score: props.diagnosticData?.detailedDiagnosis?.content?.score || 0
    },
    {
      name: '项目经历',
      score: props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0
    },
    {
      name: '教育背景',
      score: props.diagnosticData?.detailedDiagnosis?.timeline?.score || 0
    },
    {
      name: '软技能',
      score: ((props.diagnosticData?.detailedDiagnosis?.structure?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.language?.score || 0)) / 2
    }
  ];

  const option = {
    tooltip: {
      trigger: 'item'
    },
    radar: {
      indicator: skillsData.map(item => ({
        name: item.name,
        max: 10
      })),
      shape: 'circle',
      splitNumber: 5,
      axisName: {
        color: '#333'
      },
      splitLine: {
        lineStyle: {
          color: ['rgba(102, 126, 234, 0.1)', 'rgba(102, 126, 234, 0.2)', 'rgba(102, 126, 234, 0.3)', 'rgba(102, 126, 234, 0.4)', 'rgba(102, 126, 234, 0.5)']
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(102, 126, 234, 0.05)', 'rgba(102, 126, 234, 0.1)', 'rgba(102, 126, 234, 0.15)', 'rgba(102, 126, 234, 0.2)', 'rgba(102, 126, 234, 0.25)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(102, 126, 234, 0.5)'
        }
      }
    },
    series: [{
      name: '技能评分',
      type: 'radar',
      data: [{
        value: skillsData.map(item => item.score),
        name: '技能水平',
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            { offset: 0, color: 'rgba(102, 126, 234, 0.7)' },
            { offset: 1, color: 'rgba(118, 75, 162, 0.3)' }
          ])
        },
        lineStyle: {
          color: '#667eea',
          width: 2
        },
        itemStyle: {
          color: '#667eea'
        }
      }]
    }]
  };

  skillsChart.setOption(option);
};

// 初始化时间线图表
const initTimelineChart = () => {
  if (!timelineChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = timelineChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initTimelineChart, 100);
    return;
  }

  // 销毁旧图表
  if (timelineChart) {
    timelineChart.dispose();
  }

  // 创建新图表
  timelineChart = echarts.init(container);

  // 模拟时间线数据
  const timelineData = [
    {
      name: '教育背景',
      consistency: props.diagnosticData?.detailedDiagnosis?.timeline?.score || 0,
      description: '教育经历时间线'
    },
    {
      name: '工作经验',
      consistency: ((props.diagnosticData?.detailedDiagnosis?.timeline?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.content?.score || 0)) / 2,
      description: '工作经历时间线'
    },
    {
      name: '项目经历',
      consistency: ((props.diagnosticData?.detailedDiagnosis?.timeline?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0)) / 2,
      description: '项目经历时间线'
    }
  ];

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params: any) {
        const data = params[0];
        return `${data.name}<br/>${data.seriesName}: ${data.value.toFixed(1)}/10`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: timelineData.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 0,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      interval: 2,
      name: '一致性评分'
    },
    series: [{
      name: '时间线一致性',
      type: 'bar',
      data: timelineData.map(item => item.consistency),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#10b981' },
          { offset: 1, color: '#059669' }
        ])
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}'
      },
      markLine: {
        data: [{
          type: 'average',
          name: '平均值',
          label: {
            formatter: '平均值: {c}'
          }
        }]
      }
    }]
  };

  timelineChart.setOption(option);
};

// 初始化岗位匹配度图表
const initJobMatchChart = () => {
  if (!jobMatchChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = jobMatchChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initJobMatchChart, 100);
    return;
  }

  // 销毁旧图表
  if (jobMatchChart) {
    jobMatchChart.dispose();
  }

  // 创建新图表
  jobMatchChart = echarts.init(container);

  // 模拟岗位匹配度数据
  const jobMatchData = [
    {
      name: '技能匹配',
      value: ((props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.skills?.score || 0)) / 2
    },
    {
      name: '经验匹配',
      value: ((props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.content?.score || 0)) / 2
    },
    {
      name: '教育匹配',
      value: ((props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.timeline?.score || 0)) / 2
    },
    {
      name: '语言匹配',
      value: ((props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.language?.score || 0)) / 2
    }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}/10'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: jobMatchData.map(item => item.name)
    },
    series: [{
      name: '岗位匹配度',
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: jobMatchData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  jobMatchChart.setOption(option);
};

// 初始化内容质量图表
const initContentChart = () => {
  if (!contentChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = contentChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initContentChart, 100);
    return;
  }

  // 销毁旧图表
  if (contentChart) {
    contentChart.dispose();
  }

  // 创建新图表
  contentChart = echarts.init(container);

  const contentData = [
    {
      name: '内容完整性',
      value: props.diagnosticData?.detailedDiagnosis?.content?.score || 0
    },
    {
      name: '信息密度',
      value: ((props.diagnosticData?.detailedDiagnosis?.content?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.structure?.score || 0)) / 2
    },
    {
      name: '量化程度',
      value: props.diagnosticData?.detailedDiagnosis?.language?.score || 0
    },
    {
      name: '项目背景',
      value: ((props.diagnosticData?.detailedDiagnosis?.content?.score || 0) + (props.diagnosticData?.detailedDiagnosis?.jobMatch?.score || 0)) / 2
    }
  ];

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: contentData.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      max: 10
    },
    series: [{
      name: '内容质量',
      type: 'bar',
      data: contentData.map(item => item.value),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#667eea' },
          { offset: 1, color: '#764ba2' }
        ])
      }
    }]
  };

  contentChart.setOption(option);
};

// 初始化行业趋势图表
const initIndustryTrendChart = () => {
  if (!industryTrendChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = industryTrendChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initIndustryTrendChart, 100);
    return;
  }

  // 销毁旧图表
  if (industryTrendChart) {
    industryTrendChart.dispose();
  }

  // 创建新图表
  industryTrendChart = echarts.init(container);

  // 模拟行业趋势数据
  const trendData = [
    { year: '2021', value: 65 },
    { year: '2022', value: 72 },
    { year: '2023', value: 78 },
    { year: '2024', value: 85 },
    { year: '2025', value: 90 }
  ];

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trendData.map(item => item.year)
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: [{
      name: '行业匹配度趋势',
      type: 'line',
      stack: 'Total',
      data: trendData.map(item => item.value),
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
          { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
        ])
      },
      lineStyle: {
        color: '#667eea',
        width: 3
      },
      itemStyle: {
        color: '#667eea'
      }
    }]
  };

  industryTrendChart.setOption(option);
};

// 初始化关键词分布图表
const initKeywordsChart = () => {
  if (!keywordsChartRef.value || !props.diagnosticData) return;

  // 确保DOM元素存在且有尺寸
  const container = keywordsChartRef.value;
  if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
    setTimeout(initKeywordsChart, 100);
    return;
  }

  // 销毁旧图表
  if (keywordsChart) {
    keywordsChart.dispose();
  }

  // 创建新图表
  keywordsChart = echarts.init(container);

  // 模拟关键词分布数据
  const keywordsData = [
    { name: '技术关键词', value: 15 },
    { name: '软技能关键词', value: 10 },
    { name: '行业关键词', value: 12 },
    { name: '成果关键词', value: 8 }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: keywordsData.map(item => item.name)
    },
    series: [{
      name: '关键词分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: keywordsData,
      color: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
    }]
  };

  keywordsChart.setOption(option);
};

// 处理窗口 resize 事件
const handleResize = () => {
  if (scoreChart) scoreChart.resize();
  if (skillsChart) skillsChart.resize();
  if (timelineChart) timelineChart.resize();
  if (jobMatchChart) jobMatchChart.resize();
  if (contentChart) contentChart.resize();
  if (industryTrendChart) industryTrendChart.resize();
  if (keywordsChart) keywordsChart.resize();
};

// 生命周期钩子
onMounted(() => {
  // 初始化总体评分部分的图表（始终可见）
  nextTick(() => {
    initScoreChart();
    initSkillsRadarChart();
    
    // 如果默认展开，初始化其他图表
    if (detailedExpanded.value) {
      initTimelineChart();
      initJobMatchChart();
      initContentChart();
    }
    if (keywordsExpanded.value) {
      initKeywordsChart();
    }
    if (industryExpanded.value) {
      initIndustryTrendChart();
    }
  });

  // 监听窗口 resize 事件
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // 销毁图表实例
  if (scoreChart) scoreChart.dispose();
  if (skillsChart) skillsChart.dispose();
  if (timelineChart) timelineChart.dispose();
  if (jobMatchChart) jobMatchChart.dispose();
  if (contentChart) contentChart.dispose();
  if (industryTrendChart) industryTrendChart.dispose();
  if (keywordsChart) keywordsChart.dispose();

  // 移除事件监听
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
  /* 顶部Tab栏 */
  .report-tabs {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    margin-bottom: 32px;
    padding: 16px 0;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    background: #ffffff;
    z-index: 100;
  }

  .tab-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;

    &:hover {
      background: #e2e8f0;
    }

    &.active {
      background: #64748b;
      color: white;
      border-color: #64748b;
    }
  }

  .tab-icon {
    font-size: 16px;
  }

  .tab-text {
    font-size: 14px;
    font-weight: 500;
  }

  .diagnostic-report {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    line-height: 1.6;
  }

  /* 诊断部分 */
  .diagnostic-section {
    margin-bottom: 30px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(102, 126, 234, 0.15);
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
    }
  }

  /* 部分标题 */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
    border-bottom: 1px solid rgba(102, 126, 234, 0.15);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
      background: linear-gradient(135deg, #f0f4ff 0%, #e6ebff 100%);
      transform: translateY(-1px);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
    }
  }

  .section-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .expand-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    padding: 6px;

    &:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      transform: scale(1.1);
    }
  }

  /* 部分内容 */
  .section-content {
    padding: 24px;
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);

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
  }

  /* 总体评分 */
  .overall-score {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 32px;
  }

  .total-score {
    text-align: center;
    align-self: center;
  }

  .score-circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
    }
  }

  .score-value {
    font-size: 3rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .score-max {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 4px;
  }

  .score-label {
    margin-top: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .score-chart {
    flex: 1;
    min-width: 400px;
  }

  .skills-chart {
    flex: 1;
    min-width: 400px;
    margin-top: 32px !important;
  }

  .chart-container {
    width: 100%;
    height: 320px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.1);
  }

  /* 图表分析区域 */
  .chart-analysis {
    margin-bottom: 32px;
  }

  .timeline-chart,
  .job-match-chart,
  .content-chart {
    margin-bottom: 32px;
  }

  .timeline-chart .chart-container,
  .job-match-chart .chart-container,
  .content-chart .chart-container {
    height: 300px;
  }

  /* 响应式调整 */
  @media (max-width: 1024px) {
    .overall-score {
      flex-direction: column;
      align-items: center;
    }

    .score-chart,
    .skills-chart {
      width: 100%;
      min-width: 300px;
    }

    .chart-container {
      height: 280px;
    }
  }

  @media (max-width: 768px) {
    .chart-container {
      height: 250px;
    }
  }

  /* 总体评价 */
  .overall-evaluation {
    margin-bottom: 32px;
    padding: 20px;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    border-left: 4px solid #667eea;
  }

  .overall-evaluation h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 16px;
  }

  .overall-evaluation p {
    font-size: 1.05rem;
    color: #4a5568;
    line-height: 1.7;
  }

  /* 优势与改进 */
  .strength-improvement {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
  }

  .strength-areas,
  .improvement-areas {
    flex: 1;
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .strength-areas h4,
  .improvement-areas h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .strength-areas ul,
  .improvement-areas ul {
    padding-left: 20px;
  }

  .strength-areas li,
  .improvement-areas li {
    margin-bottom: 10px;
    font-size: 1rem;
    color: #4a5568;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  /* 评分表格 */
  .score-table {
    margin-top: 32px;
    overflow-x: auto;
  }

  .score-table table {
    min-width: 600px;
    width: 100%;
    border-collapse: collapse;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.95);
  }

  .score-table th,
  .score-table td {
    padding: 16px 20px;
    text-align: left;
    border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    white-space: nowrap;
  }

  .score-table th {
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
    font-weight: 700;
    color: #2d3748;
    font-size: 0.95rem;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .score-table tr {
    transition: background 0.3s ease;

    &:hover {
      background: rgba(102, 126, 234, 0.05);
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  .score-bar {
    position: relative;
    height: 28px;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .score-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 14px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .score-text {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .priority-tag {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .priority-tag.high {
    background: rgba(245, 101, 101, 0.15);
    color: #f56565;

    &:hover {
      background: rgba(245, 101, 101, 0.25);
    }
  }

  .priority-tag.medium {
    background: rgba(246, 150, 33, 0.15);
    color: #ed8936;

    &:hover {
      background: rgba(246, 150, 33, 0.25);
    }
  }

  .priority-tag.low {
    background: rgba(56, 161, 105, 0.15);
    color: #38a169;

    &:hover {
      background: rgba(56, 161, 105, 0.25);
    }
  }

  /* 详细诊断 */
  .diagnostic-item {
    margin-bottom: 32px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
      transform: translateY(-2px);
    }
  }

  .item-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .item-score {
    display: flex;
    align-items: baseline;
    margin-bottom: 20px;
  }

  .item-score .score {
    font-size: 2rem;
    font-weight: 800;
    color: #667eea;
    text-shadow: 0 1px 3px rgba(102, 126, 234, 0.3);
  }

  .item-score .score-label {
    font-size: 1.1rem;
    color: #718096;
    margin-left: 12px;
  }

  .problems,
  .analysis,
  .suggestions,
  .best-practices {
    margin-bottom: 24px;
  }

  .problems h5,
  .analysis h5,
  .suggestions h5,
  .best-practices h5 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .problems ul,
  .analysis ul,
  .best-practices ul {
    padding-left: 20px;
  }

  .problems li,
  .analysis li,
  .best-practices li {
    margin-bottom: 10px;
    font-size: 1rem;
    color: #4a5568;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  .suggestion-item {
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    border-left: 4px solid #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
      transform: translateX(4px);
    }
  }

  .suggestion-item .original,
  .suggestion-item .issue,
  .suggestion-item .suggestion,
  .suggestion-item .template {
    margin-bottom: 12px;
    font-size: 1rem;
    line-height: 1.6;
  }

  .suggestion-item .original {
    font-style: italic;
    color: #718096;
  }

  .suggestion-item .suggestion {
    font-weight: 500;
    color: #2d3748;
  }

  .suggestion-meta {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(102, 126, 234, 0.1);
  }

  .difficulty {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .difficulty.easy {
    background: rgba(56, 161, 105, 0.15);
    color: #38a169;

    &:hover {
      background: rgba(56, 161, 105, 0.25);
    }
  }

  .difficulty.medium {
    background: rgba(246, 150, 33, 0.15);
    color: #ed8936;

    &:hover {
      background: rgba(246, 150, 33, 0.25);
    }
  }

  .difficulty.hard {
    background: rgba(245, 101, 101, 0.15);
    color: #f56565;

    &:hover {
      background: rgba(245, 101, 101, 0.25);
    }
  }

  .estimated-time {
    font-size: 0.85rem;
    color: #718096;
  }

  /* 技能匹配分析 */
  .skill-match-analysis {
    margin-bottom: 24px;
    display: flex;
    gap: 20px;
  }

  .matching-skills,
  .missing-skills {
    flex: 1;
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.1);
  }

  .matching-skills h5,
  .missing-skills h5 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 16px;
  }

  .matching-skills ul,
  .missing-skills ul {
    padding-left: 20px;
  }

  .matching-skills li,
  .missing-skills li {
    margin-bottom: 10px;
    font-size: 1rem;
    color: #4a5568;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  /* 技能分类 */
  .skill-breakdown {
    margin-bottom: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .skill-category {
    flex: 1 1 250px;
    min-width: 250px;
  }

  .skill-category {
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .skill-category h5 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .skill-category ul {
    padding-left: 20px;
  }

  .skill-category li {
    margin-bottom: 10px;
    font-size: 1rem;
    color: #4a5568;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  /* 优先级优化清单 */
  .priority-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .priority-item {
    padding: 24px;
    border-radius: 16px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }
  }

  .priority-item.high {
    background: rgba(245, 101, 101, 0.08);
    border-left: 4px solid #f56565;
  }

  .priority-item.medium {
    background: rgba(246, 150, 33, 0.08);
    border-left: 4px solid #ed8936;
  }

  .priority-item.low {
    background: rgba(56, 161, 105, 0.08);
    border-left: 4px solid #38a169;
  }

  .priority-item h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .priority-task {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid rgba(102, 126, 234, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
      transform: translateX(4px);
    }
  }

  .task-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 16px;
  }

  .task-meta {
    font-size: 0.95rem;
    color: #4a5568;
  }

  .task-reason,
  .task-impact {
    display: block;
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .task-info {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(102, 126, 234, 0.1);
  }

  .task-difficulty {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .task-difficulty.easy {
    background: rgba(56, 161, 105, 0.15);
    color: #38a169;

    &:hover {
      background: rgba(56, 161, 105, 0.25);
    }
  }

  .task-difficulty.medium {
    background: rgba(246, 150, 33, 0.15);
    color: #ed8936;

    &:hover {
      background: rgba(246, 150, 33, 0.25);
    }
  }

  .task-difficulty.hard {
    background: rgba(245, 101, 101, 0.15);
    color: #f56565;

    &:hover {
      background: rgba(245, 101, 101, 0.25);
    }
  }

  .task-time {
    font-size: 0.85rem;
    color: #718096;
  }

  /* 行业关键词建议 */
  .keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 32px;
  }
  
  .keyword-category {
    flex: 1 1 320px;
    min-width: 320px;
  }

  .keyword-category {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
      transform: translateY(-2px);
    }
  }

  .keyword-category h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .keyword-item {
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    border-left: 4px solid #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
      transform: translateX(4px);
    }
  }

  .keyword-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .keyword {
    font-size: 1.05rem;
    font-weight: 600;
    color: #2d3748;
  }

  .frequency {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .frequency.high {
    background: rgba(245, 101, 101, 0.15);
    color: #f56565;

    &:hover {
      background: rgba(245, 101, 101, 0.25);
    }
  }

  .frequency.medium {
    background: rgba(246, 150, 33, 0.15);
    color: #ed8936;

    &:hover {
      background: rgba(246, 150, 33, 0.25);
    }
  }

  .frequency.low {
    background: rgba(56, 161, 105, 0.15);
    color: #38a169;

    &:hover {
      background: rgba(56, 161, 105, 0.25);
    }
  }

  .keyword-scenario {
    font-size: 0.95rem;
    color: #4a5568;
    margin-bottom: 16px;
    line-height: 1.6;
  }

  .keyword-examples {
    font-size: 0.95rem;
    color: #4a5568;
  }

  .keyword-examples ul {
    padding-left: 20px;
    margin-top: 12px;
  }

  .keyword-examples li {
    margin-bottom: 8px;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  .keyword-tips {
    background: rgba(102, 126, 234, 0.05);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .keyword-tips h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .keyword-tips ul {
    padding-left: 20px;
  }

  .keyword-tips li {
    margin-bottom: 12px;
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  /* 行业特定建议 */
  .industry-specific {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .industry-info h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .industry-section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
      transform: translateY(-2px);
    }
  }

  .industry-section h5 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .industry-section ul {
    padding-left: 20px;
  }

  .industry-section li {
    margin-bottom: 12px;
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  .industry-trend-chart {
    margin-bottom: 24px;
  }

  /* 简历投递建议 */
  .application-tips {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  
  .tips-section {
    flex: 1 1 280px;
    min-width: 280px;
  }

  .tips-section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(102, 126, 234, 0.15);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
      transform: translateY(-2px);
    }
  }

  .tips-section h5 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .tips-section ul {
    padding-left: 20px;
  }

  .tips-section li {
    margin-bottom: 12px;
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
    position: relative;

    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }

  /* 无数据状态 */
  .no-data {
    color: #718096;
    font-style: italic;
    text-align: center;
    padding: 24px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    border: 1px dashed rgba(102, 126, 234, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .overall-score {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 30px;
    }

    .strength-improvement {
      flex-direction: column;
      gap: 20px;
    }

    .skill-match-analysis {
      flex-direction: column;
      gap: 20px;
    }

    .skill-breakdown {
      grid-template-columns: 1fr;
    }

    .keywords-container {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .application-tips {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .chart-container {
      height: 280px;
    }

    .section-content {
      padding: 20px;
    }

    .diagnostic-item {
      padding: 20px;
    }

    .score-table th,
    .score-table td {
      padding: 12px 16px;
      font-size: 0.9rem;
    }

    .score-circle {
      width: 120px;
      height: 120px;
    }

    .score-value {
      font-size: 2.5rem;
    }
  }

  /* 滚动条样式 */
  .diagnostic-report {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(102, 126, 234, 0.1);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
      }
    }
}
</style>