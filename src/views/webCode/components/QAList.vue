<template>
  <div class="q-a-list-box">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template #title>
          <h3 class="q-title">1.能否使用任意版本的91化简产品，并在后续进行充值升级？</h3>
        </template>
        <div class="answer-box">
          <p>可以购买任意版本后续升级。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <h3 class="q-title">2.是否提供部署服务，将产品部署到服务器上？</h3>
        </template>
        <div class="answer-box">
          <p>暂时不提供部署服务，需要客户自行实施部署。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <h3 class="q-title">3.如果有第三方工具或服务商愿意支付费用，是否会考虑合作？</h3>
        </template>
        <div class="answer-box">
          <p>如果有第三方服务商愿意支付费用，可以考虑合作。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
          <h3 class="q-title">4.为什么不提供免费部署服务？</h3>
        </template>
        <div class="answer-box">
          <p>部署操作复杂，需要投入人力资源。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template #title>
          <h3 class="q-title">5.对于客户的新需求或原型，是否有合作开发的可能性？</h3>
        </template>
        <div class="answer-box">
          <p>需要先提供相应的资料，达成合作后才有可能讨论合作开发。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template #title>
          <h3 class="q-title">6.系统授权和部署的费用是多少？</h3>
        </template>
        <div class="answer-box">
          <p>系统授权费用为699元，如需帮忙部署，需要单独计费，服务器配置建议至少为2C4G。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="7">
        <template #title>
          <h3 class="q-title">7.是否可以提供长期维护服务？</h3>
        </template>
        <div class="answer-box">
          <p>可以考虑提供长期维护服务，具体费用需要根据服务内容和时间来确定。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="8">
        <template #title>
          <h3 class="q-title">8.更新系统的频率是怎样的？</h3>
        </template>
        <div class="answer-box">
          <p>更新频率不固定，根据个人时间和精力来决定，有时候频繁，有时候可能一个月都没有更新。</p>
        </div>
      </el-collapse-item>
      <el-collapse-item name="9">
        <template #title>
          <h3 class="q-title">9.是否有可能实现系统的自动更新？</h3>
        </template>
        <div class="answer-box">
          <p
            >系统更新需要手动进行，无法实现自动更新。购买源码后会通过邮箱推送最新的后台源码，按需自行更新系统。</p
          >
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
  const activeName = ref('1');
</script>
<style lang="scss" scoped>
  .q-a-list-box {
    margin: 80px 0 20px 0;
    :deep(.el-collapse-item__header) {
      height: 60px;
    }
    .q-title {
      margin-left: 10px;
      font-size: 16px;
    }
    p {
      margin-left: 10px;
      font-size: 14px;
    }
  }
</style>
