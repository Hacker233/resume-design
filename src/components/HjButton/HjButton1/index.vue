<template>
  <button class="custom-btn btn-9"
    ><span>{{ text }}</span></button
  >
</template>
<script setup lang="ts">
  interface IBgcColor {
    text?: string;
  }
  withDefaults(defineProps<IBgcColor>(), {
    text: ''
  });
</script>
<style lang="scss" scoped>
  .custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 40px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    // box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    //   4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  .btn-9 {
    border: none;
    transition: all 0.3s ease;
    overflow: hidden;
    span {
      font-size: 14px;
      letter-spacing: 3px;
    }
  }
  .btn-9:after {
    position: absolute;
    content: ' ';
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1fd1f9;
    background-image: linear-gradient(300deg, #1fd1f9 0%, #1a45a0 50%);
    transition: all 0.3s ease;
  }
  .btn-9:hover {
    background: transparent;
    // box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    //   inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5), inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    color: #fff;
  }
  .btn-9:hover:after {
    -webkit-transform: scale(2) rotate(180deg);
    transform: scale(2) rotate(180deg);
    // box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5), -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    //   inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5), inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  }
</style>
