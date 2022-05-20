<template>
  <div class="footer-box">
    <ul>
      <li>
        <svg-icon iconName="icon-bilibili-copy"></svg-icon>
        <a
          href="https://space.bilibili.com/493520625?spm_id_from=333.1007.0.0"
          target="_blank"
          rel="noopener noreferrer"
          >小猪课堂</a
        >
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .footer-box {
    width: 100%;
    height: 100px;
    background-color: #242529;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      li {
        list-style: none;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgb(236, 235, 235);
        a {
          color: inherit;
          text-decoration: none;
          letter-spacing: 2px;
          transition: all 0.3s;
          margin-left: 10px;
          &:hover {
            color: green;
          }
        }
      }
    }
  }
</style>
