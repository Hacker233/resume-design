<template>
  <div class="my-resume-container">
    <my-resume-new></my-resume-new>
  </div>
</template>

<script lang="ts" setup>
  import MyResumeNew from './myResumeNew/index.vue';
</script>

<style lang="scss" scoped>
  .my-resume-container {
    padding: 0;
    
    .resume-header {
      margin-bottom: 30px;
      
      .resume-title {
        font-size: 24px;
        font-weight: 700;
        color: #333;
        margin-bottom: 8px;
      }
      
      .resume-subtitle {
        font-size: 14px;
        color: #666;
      }
    }
  }
  
  @media (max-width: 768px) {
    .my-resume-container {
      padding: 15px;
      
      .resume-header {
        margin-bottom: 20px;
        
        .resume-title {
          font-size: 20px;
        }
      }
    }
  }
</style>

