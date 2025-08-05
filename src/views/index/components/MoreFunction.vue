<template>
  <div class="more-function-outer">
    <canvas ref="bubbleCanvas" class="bubble-canvas"></canvas>
    <div class="more-function-inner">
      <div
        class="function-card"
        role="button"
        tabindex="0"
        @click="navigateTo('/generateAiResume')"
        @keyup.enter="navigateTo('/generateAiResume')"
      >
        <div class="icon-container">
          <DocumentAdd class="function-icon" />
          <div class="icon-glow"></div>
        </div>
        <h3 class="function-title">AI智能简历生成</h3>
        <p class="function-desc">一键生成专业简历</p>
      </div>

      <div
        class="function-card"
        role="button"
        tabindex="0"
        @click="navigateTo('/aiDiagnosticCV')"
        @keyup.enter="navigateTo('/aiDiagnosticCV')"
      >
        <div class="icon-container">
          <DataAnalysis class="function-icon" />
          <div class="icon-glow"></div>
        </div>
        <h3 class="function-title">AI简历诊断</h3>
        <p class="function-desc">智能分析优化简历</p>
      </div>

      <div
        class="function-card"
        role="button"
        tabindex="0"
        @click="navigateTo('/webcode')"
        @keyup.enter="navigateTo('/webcode')"
      >
        <div class="icon-container">
          <Box class="function-icon" />
          <div class="icon-glow"></div>
        </div>
        <h3 class="function-title">私有化部署网站</h3>
        <p class="function-desc">企业级定制部署方案</p>
      </div>

      <!-- 新增卡片 -->
      <div
        class="function-card"
        role="button"
        tabindex="0"
        @click="navigateTo('/orgSettled')"
        @keyup.enter="navigateTo('/orgSettled')"
      >
        <div class="icon-container">
          <OfficeBuilding class="function-icon" />
          <div class="icon-glow"></div>
        </div>
        <h3 class="function-title">组织/学校/企业入驻</h3>
        <p class="function-desc">专属定制合作方案</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import { DocumentAdd, DataAnalysis, OfficeBuilding, Box } from '@element-plus/icons-vue';

  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const bubbleCanvas = ref<HTMLCanvasElement | null>(null);

  let animationId: number;
  let ctx: CanvasRenderingContext2D | null = null;
  let bubbles: Bubble[] = [];

  class Bubble {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    opacity: number;

    constructor(width: number, height: number) {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.radius = 10 + Math.random() * 20;
      this.speedY = 0.3 + Math.random() * 0.7;
      this.opacity = 0.1 + Math.random() * 0.15;
    }

    update(height: number) {
      this.y -= this.speedY;
      if (this.y + this.radius < 0) {
        this.y = height + this.radius;
        this.x = Math.random() * window.innerWidth;
        this.radius = 10 + Math.random() * 20;
        this.speedY = 0.3 + Math.random() * 0.7;
        this.opacity = 0.1 + Math.random() * 0.15;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        this.radius * 0.3,
        this.x,
        this.y,
        this.radius
      );
      gradient.addColorStop(0, `rgba(200, 230, 255, ${this.opacity})`);
      gradient.addColorStop(1, 'rgba(200, 230, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initBubbles = (width: number, height: number) => {
    bubbles = [];
    const count = Math.floor(width / 30);
    for (let i = 0; i < count; i++) {
      bubbles.push(new Bubble(width, height));
    }
  };

  const animate = () => {
    if (!ctx || !bubbleCanvas.value) return;
    const width = bubbleCanvas.value.width;
    const height = bubbleCanvas.value.height;
    ctx.clearRect(0, 0, width, height);

    bubbles.forEach((bubble) => {
      bubble.update(height);
      bubble.draw(ctx);
    });

    animationId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    if (!bubbleCanvas.value) return;
    bubbleCanvas.value.width = window.innerWidth;
    bubbleCanvas.value.height = 320;
    ctx = bubbleCanvas.value.getContext('2d');

    if (ctx) {
      initBubbles(bubbleCanvas.value.width, bubbleCanvas.value.height);
      animate();
    }

    window.addEventListener('resize', () => {
      if (!bubbleCanvas.value) return;
      bubbleCanvas.value.width = window.innerWidth;
      bubbleCanvas.value.height = 320;
      if (ctx && bubbleCanvas.value) {
        initBubbles(bubbleCanvas.value.width, bubbleCanvas.value.height);
      }
    });
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
  });
</script>

<style lang="scss" scoped>
  .more-function-outer {
    position: relative;
    width: 100%;
    height: 320px;
    background: #f0f8ff;
    overflow: hidden;
    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  .bubble-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 320px;
    z-index: 0;
    pointer-events: none;
  }

  .more-function-inner {
    position: relative;
    width: 100%;
    max-width: 1300px;
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: nowrap;
    z-index: 1;
  }

  .function-card {
    position: relative;
    flex: 1 1 300px;
    max-width: 320px;
    padding: 36px 24px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    color: #222;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-10px) scale(1.05);
      box-shadow: 0 16px 40px rgba(64, 150, 255, 0.25);
    }

    &:active {
      transform: translateY(-4px) scale(0.98);
      box-shadow: 0 8px 20px rgba(64, 150, 255, 0.15);
    }

    &:focus-visible {
      outline: 3px solid #4096ff;
      outline-offset: 4px;
    }
  }

  .icon-container {
    position: relative;
    width: 72px;
    height: 72px;
    margin: 0 auto 22px auto;
    border-radius: 50%;
    background: linear-gradient(145deg, #56ccf2, #2f80ed);
    box-shadow: 0 8px 16px #56ccf2aa, inset 0 0 8px #2f80edcc;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    .icon-glow {
      position: absolute;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      filter: blur(24px);
      background: #56ccf2cc;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.4;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .function-card:hover & {
      transform: scale(1.15);
    }
    .function-card:hover & .icon-glow {
      opacity: 0.7;
    }
  }

  .function-icon {
    width: 38px;
    height: 38px;
    color: white;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.2));
  }

  .function-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: 0.04em;
  }

  .function-desc {
    font-size: 15px;
    line-height: 1.6;
    color: #555;
    margin: 0;
  }
</style>
