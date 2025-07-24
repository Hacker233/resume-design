<template>
  <div class="org-settled-box">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1>组织专属简历管理解决方案</h1>
        <p>为企业、学校及各类组织提供一站式简历管理平台，成员畅享全功能AI简历工具</p>
        <div class="hero-buttons">
          <button class="primary-btn" aria-label="立即入驻" @click="scrollToForm">
            立即入驻
          </button>
          <button class="secondary-btn" aria-label="了解更多" @click="toContact">了解更多</button>
        </div>
        <div class="rating">
          <span>2000+ 组织的信赖选择</span>
        </div>
      </div>
      <!-- 图片 -->
      <div class="right-img"></div>
    </section>

    <!-- 能力展示 -->
    <section class="capabilities">
      <h2>组织入驻核心优势</h2>
      <div class="capability-cards">
        <div class="capability-card">
          <div class="card-icon">👥</div>
          <h3>成员简历集中管理</h3>
          <p>统一管理组织内所有成员简历，实时更新，便捷分享，高效协作</p>
        </div>
        <div class="capability-card">
          <div class="card-icon">💎</div>
          <h3>全站功能免费使用</h3>
          <p>组织成员自动解锁所有付费功能，无需单独购买，降低使用成本</p>
        </div>
        <div class="capability-card">
          <div class="card-icon">🤖</div>
          <h3>AI简历全流程支持</h3>
          <p>AI生成、AI诊断、AI润色，智能优化简历内容，提升求职成功率</p>
        </div>
      </div>
    </section>

    <!-- 挑战应对 -->
    <section class="challenge">
      <div class="challenge-content">
        <h2 class="section-title">解决组织简历管理痛点</h2>
        <div class="challenge-list-container">
          <ul class="challenge-list">
            <li class="challenge-item">
              <el-icon class="item-icon"><WarningFilled /></el-icon>
              <span>简历格式不统一，筛选困难</span>
            </li>
            <li class="challenge-item">
              <el-icon class="item-icon"><UserFilled /></el-icon>
              <span>成员简历更新不及时，信息滞后</span>
            </li>
            <li class="challenge-item">
              <el-icon class="item-icon"><MessageBox /></el-icon>
              <span>付费工具使用成本高，难以普及</span>
            </li>
            <li class="challenge-item">
              <el-icon class="item-icon"><HelpFilled /></el-icon>
              <span>缺乏专业指导，简历质量参差不齐</span>
            </li>
          </ul>
        </div>
        <div class="challenge-cta">
          <button class="primary-btn" aria-label="立即解决这些问题" @click="scrollToForm"
            >立即解决这些问题</button
          >
        </div>
      </div>
    </section>

    <!-- 功能展示 -->
    <section class="cases">
      <div class="section-header">
        <h2>组织成员免费使用功能</h2>
        <p class="section-desc">强大工具集助力团队简历制作与管理</p>
      </div>
      <div class="case-grid">
        <div
          class="case-item cursor-card"
          :style="{ '--gradient-start': getRandomColor(), '--gradient-end': getRandomColor() }"
        >
          <div class="gradient-bg animate-gradient"></div>
          <div class="case-content">
            <el-icon class="feature-icon"><DataAnalysis /></el-icon>
            <h3>批量成员简历管理</h3>
            <p>统一管理组织内所有成员简历，实时更新</p>
          </div>
        </div>
        <div
          class="case-item cursor-card"
          :style="{ '--gradient-start': getRandomColor(), '--gradient-end': getRandomColor() }"
        >
          <div class="gradient-bg animate-gradient"></div>
          <div class="case-content">
            <el-icon class="feature-icon"><MagicStick /></el-icon>
            <h3>AI简历生成</h3>
            <p>输入基本信息，AI自动生成专业简历，节省80%时间</p>
          </div>
        </div>
        <div
          class="case-item cursor-card"
          :style="{ '--gradient-start': getRandomColor(), '--gradient-end': getRandomColor() }"
        >
          <div class="gradient-bg animate-gradient"></div>
          <div class="case-content">
            <el-icon class="feature-icon"><Star /></el-icon>
            <h3>简历质量诊断</h3>
            <p>AI智能分析简历优缺点，提供专业改进建议</p>
          </div>
        </div>
        <div
          class="case-item cursor-card"
          :style="{ '--gradient-start': getRandomColor(), '--gradient-end': getRandomColor() }"
        >
          <div class="gradient-bg animate-gradient"></div>
          <div class="case-content">
            <el-icon class="feature-icon"><EditPen /></el-icon>
            <h3>简历内容润色</h3>
            <p>AI优化语言表达，提升简历专业性和吸引力</p>
          </div>
        </div>
        <div
          class="case-item cursor-card"
          :style="{ '--gradient-start': getRandomColor(), '--gradient-end': getRandomColor() }"
        >
          <div class="gradient-bg animate-gradient"></div>
          <div class="case-content">
            <el-icon class="feature-icon"><Grid /></el-icon>
            <h3>海量模板资源</h3>
            <p>300+专业简历模板，适配不同行业和职位需求</p>
          </div>
        </div>
        <div
          class="case-item cursor-card"
          :style="{ '--gradient-start': getRandomColor(), '--gradient-end': getRandomColor() }"
        >
          <div class="gradient-bg animate-gradient"></div>
          <div class="case-content">
            <el-icon class="feature-icon"><Crop /></el-icon>
            <h3>Markdown格式导出</h3>
            <p>组织成员简历免费导出为Markdown格式</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 客户评价 -->
    <section class="testimonials">
      <h2>入驻组织的真实反馈</h2>
      <div class="testimonial-content">
        <div class="testimonial-card">
          <p
            >"作为互联网公司HR，我们每月需要处理200+份简历。组织入驻后，通过批量管理功能将筛选效率提升60%，AI诊断功能帮助我们快速识别候选人优势，团队协作功能让部门共享简历库成为可能。"
          </p>
          <div class="testimonial-author">
            <div class="author-avatar">
              <img src="@/assets/images/people.jpg" alt="李雯头像" class="avatar-img" />
            </div>
            <div class="author-info">
              <h4>李雯 HR总监</h4>
              <p>某互联网科技公司人力资源部</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p
            >"作为高校就业指导中心，我们入驻后，学生简历质量显著提升，AI工具帮助他们快速制作专业简历，就业率提高了15%。"</p
          >
          <div class="testimonial-author">
            <div class="author-avatar">
              <img src="@/assets/images/people.jpg" alt="张明头像" class="avatar-img" />
            </div>
            <div class="author-info">
              <h4>张明教授</h4>
              <p>某重点大学就业指导中心主任</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 入驻流程 -->
    <section class="process">
      <h2>简单三步，完成组织入驻</h2>
      <div class="process-steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>添加微信或填写申请信息</h3>
          <p>工作人员会根据申请信息联系您，随后沟通组织信息、细节等等</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>开通组织权限</h3>
          <p>我们将在后台为您开通组织</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>组织成员加入</h3>
          <p>后台导入成员账号，直接登录使用</p>
        </div>
      </div>
    </section>

    <!-- 联系表单 - 优化后 -->
    <section ref="contactForm" class="contact">
      <div class="contact-container">
        <div class="contact-content">
          <h2 class="contact-title">立即开启组织简历管理之旅</h2>
          <p class="contact-subtitle">请添加客服微信，提供一对一入驻</p>

          <div class="tech-form-container">
            <div class="tech-form-bg">
              <div class="tech-form-grid">
                <div class="tech-form-decoration">
                  <div class="decoration-circle circle-1"></div>
                  <div class="decoration-circle circle-2"></div>
                  <div class="decoration-line"></div>
                  <div class="tech-form-image">
                    <div class="qrcode-container">
                      <img
                        src="@/assets/images/vx.jpg"
                        alt="个人微信"
                        title="个人微信"
                        loading="lazy"
                        class="wechat-qrcode-img"
                      />
                      <div class="qrcode-decoration"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <footer-com ref="footerRef"></footer-com>

    <!-- 咨询方式弹窗 -->
    <contact-dialog
      :dialog-contact-visible="dialogContactVisible"
      :vx-qun="wxQun"
      :wx="wx"
      @cancle="cancelContact"
    ></contact-dialog>
  </div>
</template>

<script setup lang="ts">
  import FooterCom from '@/components/FooterCom/FooterCom.vue';
  import {
    DataAnalysis,
    MagicStick,
    Star,
    EditPen,
    Grid,
    Crop,
    WarningFilled,
    HelpFilled,
    MessageBox,
    UserFilled
  } from '@element-plus/icons-vue';
  import ContactDialog from './components/ContactDialog.vue';

  // 添加表单区域的ref
  const contactForm = ref<HTMLElement>();
  // 平滑滚动到表单的函数
  const scrollToForm = () => {
    window.open(
      'https://rcn4fxyyyvih.feishu.cn/share/base/form/shrcn6tKs1GsRqJeIHwmceslUNP',
      '_blank'
    );
    // if (contactForm.value) {
    //   contactForm.value.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start'
    //   });

    //   // 添加轻微的动画效果
    //   setTimeout(() => {
    //     contactForm.value?.classList.add('highlight-form');
    //     setTimeout(() => {
    //       contactForm.value?.classList.remove('highlight-form');
    //     }, 1000);
    //   }, 500);
    // }
  };

  // 生成随机渐变颜色
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 60;
    const lightness = Math.floor(Math.random() * 20) + 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // 获取微信群
  const wxQun = ref('');
  const wx = ref('');
  const footerRef = ref<any>(null);

  // 打开立即咨询弹窗
  const dialogContactVisible = ref(false);
  const toContact = () => {
    footerRef.value.vxQunList.forEach((element: any) => {
      if (element.name === '用户交流群') {
        wxQun.value = element.qr_code;
      }
      if (element.name === '添加微信') {
        wx.value = element.qr_code;
      }
    });
    dialogContactVisible.value = true;
  };
  const cancelContact = () => {
    dialogContactVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  .resume-service-top-bgc {
    width: 100%;
    height: 600px;
    background: #fff;
    position: absolute;
    top: 65px;
    background-image: url('@/assets/images/home/home-bg.png');
    background-size: 100% 100%;
  }
  /* 动态背景样式 */
  .dynamic-bg {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(135deg, v-bind(getRandomColor()), v-bind(getRandomColor()));
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(0, 0, 0, 0.1) 100%
      );
    }

    &.hero-bg {
      background: linear-gradient(135deg, #3498db, #2ecc71);
    }

    &.challenge-bg {
      background: linear-gradient(135deg, #9b59b6, #3498db);
    }

    &.map-bg {
      background: linear-gradient(135deg, #f1c40f, #e67e22);
    }

    &.avatar-bg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e74c3c, #f39c12);
    }

    &.form-image-bg {
      background: linear-gradient(135deg, #1abc9c, #16a085);
    }
  }

  /* 添加高亮动画 */
  .contact {
    transition: all 0.5s ease;

    &.highlight-form {
      animation: highlight 1s ease;
    }
  }

  @keyframes highlight {
    0% {
      box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
    }
    50% {
      box-shadow: 0 0 0 20px rgba(52, 152, 219, 0.2);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
    }
  }

  /* 英雄区域样式 */
  .hero {
    display: flex;
    align-items: center;
    height: 460px;
    padding: 0 5%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    gap: 3rem;

    .right-img {
      width: 600px;
      height: 600px;
      background-image: url('@/assets/images/resumeService/right-top.png');
      background-size: cover;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      padding: 3rem 5%;
    }

    .hero-content {
      flex: 1;

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #2c3e50;

        @media (max-width: 480px) {
          font-size: 1.8rem;
        }
      }

      p {
        font-size: 1.1rem;
        color: #666;
        margin-bottom: 2rem;
      }

      .hero-buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        @media (max-width: 480px) {
          flex-direction: column;
        }
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .stars {
          color: #f1c40f;
          font-size: 1.2rem;
        }
      }
    }
  }

  /* 按钮样式 */
  .primary-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    will-change: transform;

    &:hover {
      background-color: #c0392b;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.3);
    }
  }

  .secondary-btn {
    background-color: transparent;
    color: #333;
    border: 2px solid #333;
    padding: 0.8rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #333;
      color: white;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(51, 51, 51, 0.3);
    }
  }

  /* 能力展示样式 */
  .capabilities {
    padding: 5rem 5%;
    text-align: center;

    h2 {
      font-size: 2rem;
      margin-bottom: 3rem;
      color: #2c3e50;
    }

    .capability-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .capability-card {
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;
      will-change: transform;

      &:hover {
        transform: translateY(-5px);
      }

      .card-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #3498db;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #666;
        line-height: 1.6;
      }
    }
  }

  .challenge {
    padding: 60px 0; // 增加上下内边距
    background-color: #f8fafc; // 添加浅色背景区分区块

    .challenge-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-title {
      font-size: 2rem;
      color: #1e293b;
      text-align: center;
      margin-bottom: 40px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 4px;
        background-color: #3b82f6;
        margin: 16px auto 0;
        border-radius: 2px;
      }
    }

    .challenge-list-container {
      max-width: 800px;
      margin: 0 auto 32px;
    }

    .challenge-list {
      list-style: none;
      padding: 0;
    }

    .challenge-item {
      display: flex;
      align-items: flex-start;
      padding: 16px 20px;
      margin-bottom: 16px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .item-icon {
        color: #3b82f6;
        font-size: 20px;
        margin-right: 16px;
        margin-top: 2px;
        flex-shrink: 0;
      }

      span {
        color: #475569;
        line-height: 1.6;
        font-size: 16px;
      }
    }

    .challenge-cta {
      text-align: center;
      margin-top: 40px;
    }

    // 响应式调整
    @media (max-width: 768px) {
      padding: 40px 0;

      .section-title {
        font-size: 1.75rem;
      }

      .challenge-item {
        padding: 12px 16px;

        span {
          font-size: 15px;
        }
      }
    }
  }

  /* 案例展示样式 */
  .cases {
    padding: 80px 0;
    background-color: #f9fafb;

    .section-header {
      text-align: center;
      margin-bottom: 40px;

      h2 {
        font-size: 28px;
        color: #1d2129;
        margin-bottom: 12px;
      }

      .section-desc {
        font-size: 16px;
        color: #4e5969;
        max-width: 700px;
        margin: 0 auto;
      }
    }

    .case-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 0 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .case-item {
      position: relative;
      height: 300px;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
      color: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      flex: 1 1 300px;
      will-change: transform;

      .gradient-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        z-index: 0;
      }

      .case-content {
        position: relative;
        z-index: 1;

        .feature-icon {
          font-size: 32px;
          margin-bottom: 16px;
          opacity: 0.9;
        }

        h3 {
          font-size: 20px;
          margin-bottom: 12px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        p {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.5;
        }
      }
    }
  }

  /* 动画效果 */
  .animate-gradient {
    animation: gradientFlow 8s ease infinite;
    background-size: 400% 400%;
  }

  @keyframes gradientFlow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .cursor-card {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);

      .case-content {
        transform: scale(1.03);
        transition: transform 0.3s ease;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150%;
      height: 150%;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.6s ease;
      z-index: 1;
      border-radius: inherit;
    }

    &:hover:before {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  /* 客户评价样式 */
  .testimonials {
    padding: 5rem 5%;
    background-color: #f8f9fa;

    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
      color: #2c3e50;
    }

    .testimonial-content {
      display: flex;
      gap: 3rem;
      align-items: center;

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .testimonial-card {
      flex: 1;
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

      p {
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        color: #555;
        font-style: italic;
      }

      .testimonial-author {
        display: flex;
        align-items: center;
        gap: 1rem;

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .author-info {
          h4 {
            font-size: 1.1rem;
            color: #2c3e50;
            margin: 5px 0;
          }

          p {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0;
            font-style: normal;
          }
        }
      }
    }
  }

  /* 入驻流程样式 */
  .process {
    padding: 5rem 5%;
    text-align: center;
    background-color: #f8f9fa;

    h2 {
      font-size: 2rem;
      margin-bottom: 3rem;
      color: #2c3e50;
    }

    .process-steps {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 2rem;
      }
    }

    .step {
      flex: 1;
      min-width: 250px;
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;
      will-change: transform;

      &:hover {
        transform: translateY(-5px);
      }

      .step-number {
        width: 50px;
        height: 50px;
        background-color: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 auto 1rem;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: #2c3e50;
      }

      p {
        color: #666;
        line-height: 1.6;
      }
    }
  }

  /* 科技感联系表单样式 */
  .contact {
    padding: 5rem 5%;
    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 20% 30%, rgba(46, 204, 113, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(52, 152, 219, 0.1) 0%, transparent 50%);
      z-index: 0;
    }

    .contact-container {
      position: relative;
      z-index: 1;
      // max-width: 1200px;
      max-width: 500px;
      margin: 0 auto;
    }

    .contact-content {
      text-align: center;
      margin-bottom: 3rem;

      .contact-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        background: linear-gradient(90deg, #fff, #3498db);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 700;

        @media (max-width: 768px) {
          font-size: 2rem;
        }
      }

      .contact-subtitle {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        max-width: 600px;
        margin: 0 auto;
        margin-bottom: 20px;
      }
    }

    .tech-form-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;

      .tech-form-bg {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        position: relative;
        will-change: transform;

        &::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(52, 152, 219, 0.1),
            rgba(46, 204, 113, 0.1),
            rgba(155, 89, 182, 0.1)
          );
          transform: rotate(30deg);
          z-index: 0;
        }
      }

      .tech-form-grid {
        display: flex;
        align-items: center;
        min-height: 500px;
        position: relative;
        z-index: 1;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }

      .tech-form-card {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media (max-width: 768px) {
          padding: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;

          .tech-label {
            display: block;
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          :deep(.el-form-item__content) {
            line-height: normal;
          }

          .tech-input {
            :deep(.el-input__wrapper) {
              background: rgba(255, 255, 255, 0.1);
              border: none;
              border-radius: 8px;
              box-shadow: none;
              padding: 0.8rem 1rem;
              transition: all 0.3s ease;

              .el-input__inner {
                color: white;
                &::placeholder {
                  color: rgba(255, 255, 255, 0.5);
                }
              }

              &:focus-within {
                box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3) !important;
                background: rgba(255, 255, 255, 0.15);
              }
            }

            &:hover :deep(.el-input__wrapper) {
              background: rgba(255, 255, 255, 0.15);
            }
          }
        }

        .tech-submit-btn {
          margin-top: 2rem;
          background: linear-gradient(90deg, #3498db, #2ecc71);
          border: none;
          border-radius: 50px;
          padding: 1rem 2rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          will-change: transform;
          min-width: 200px;

          .btn-text {
            position: relative;
            z-index: 2;
          }

          .btn-icon {
            margin-left: 0.5rem;
            position: relative;
            z-index: 2;
            transition: transform 0.3s;
          }

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #2ecc71, #3498db);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1;
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

            .btn-icon {
              transform: translateX(5px);
            }

            &::before {
              opacity: 1;
            }
          }

          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
          }
        }
      }

      .tech-form-decoration {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        width: 100%;

        @media (max-width: 768px) {
          display: none;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);

          &.circle-1 {
            width: 150px;
            height: 150px;
            top: 20%;
            left: 20%;
            animation: pulse 6s infinite alternate;
          }

          &.circle-2 {
            width: 100px;
            height: 100px;
            bottom: 15%;
            right: 15%;
            animation: pulse 4s infinite alternate-reverse;
          }
        }

        .decoration-line {
          position: absolute;
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          top: 50%;
          left: 10%;
        }

        .tech-form-image {
          position: relative;
          z-index: 2;
          width: 80%;
          height: 80%;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: perspective(1000px) rotateY(-5deg);
          transition: transform 0.5s;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;

          &:hover {
            transform: perspective(1000px) rotateY(0deg);
          }
        }
        .qrcode-container {
          position: relative;
        }

        .wechat-qrcode-img {
          width: 100%;
          max-width: 220px;
          height: auto;
          border-radius: 12px;
          border: 4px solid #ffffff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
          z-index: 2;
          position: relative;
        }

        .wechat-qrcode-img:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .qrcode-decoration {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
          border-radius: 12px;
          top: 8px;
          left: 8px;
          z-index: 1;
        }

        // 响应式调整
        @media (max-width: 768px) {
          .wechat-qrcode-img {
            max-width: 180px;
            border-width: 3px;
          }

          .qrcode-decoration {
            top: 6px;
            left: 6px;
          }
        }
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    100% {
      transform: scale(1.1);
      opacity: 0.5;
    }
  }

  /* 页脚样式 */
  .footer {
    padding: 3rem 5%;
    background-color: #2c3e50;
    color: white;
    text-align: center;

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 1.5rem;

      a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: white;
        }
      }
    }

    .copyright {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.9rem;
    }
  }
</style>
