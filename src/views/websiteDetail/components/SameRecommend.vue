<template>
  <div class="same-recommend-box">
    <div class="title">
      <svg-icon
        icon-name="icon-remenzixun"
        class-name="icon"
        color="#282a2d"
        size="18px"
      ></svg-icon>
      <h3>同类热门</h3>
    </div>
    <div class="website-list">
      <a
        v-for="(item, index) in websiteList"
        :key="index"
        class="card-box"
        :href="item.website_link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="img-box">
          <img :src="item.website_icon" alt="图标" />
        </div>
        <div class="title-box" :title="item.website_title">
          <span class="title">{{ item.website_title }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    websiteList: any;
  }>();
</script>
<style lang="scss" scoped>
  .same-recommend-box {
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    padding: 0 20px 0 20px;
    .title {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      color: #282a2d;
      .icon {
        margin-right: 10px;
      }
      h3 {
        font-size: 16px;
        letter-spacing: 2px;
      }
    }
    .website-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 10px 0;
      .card-box {
        width: 48%;
        height: 40px;
        display: flex;
        align-items: center;
        background: #f1f3f6;
        box-shadow: unset;
        border: 1px solid #f1f3f6;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 5px 10px;
        user-select: none;
        transition: all 0.3s;
        cursor: pointer;
        text-decoration: none; /* 去除默认的下划线 */
        outline: none;
        &:hover {
          border: 1px solid #00c090;
        }
        .img-box {
          width: 25px;
          height: 25px;
          background: rgba(128, 128, 128, 0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 10px;
          img {
            max-width: 100%;
          }
        }

        .title-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          flex: 1;
          .title {
            display: block;
            font-size: 13px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
    }
  }
</style>
