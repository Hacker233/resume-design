<template>
  <div class="not-found">
    <div class="container">
      <h1>404</h1>
      <p>我的天啦~ 你来到了未知领域！</p>
      <router-link to="/" class="home-button">我要回家</router-link>
    </div>
    <div class="background-circles">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
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
    position: relative;
    overflow: hidden;
  }

  .container {
    text-align: center;
    z-index: 1;
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

  .background-circles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 123, 255, 0.1);
    animation: float 10s infinite ease-in-out;
  }

  .circle1 {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .circle2 {
    width: 150px;
    height: 150px;
    top: 60%;
    left: 30%;
    animation-delay: 2s;
  }

  .circle3 {
    width: 200px;
    height: 200px;
    top: 40%;
    left: 70%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
</style>
