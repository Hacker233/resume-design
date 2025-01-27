<template>
  <div class="not-found">
    <div class="container">
      <h1>404</h1>
      <p>天啦! 你访问了一个不存在的页面！</p>
      <router-link to="/" class="home-button">回首页</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFoundPage'
  };
</script>

<style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    font-family: Arial, sans-serif;
  }

  .container {
    text-align: center;
  }

  .container h1 {
    font-size: 10rem;
    color: #333;
    margin-bottom: 20px;
  }

  .container p {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 40px;
  }

  .home-button {
    display: inline-block;
    padding: 15px 30px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #007bff;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .home-button:hover {
    background-color: #0056b3;
  }
</style>
