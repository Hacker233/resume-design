<template>
  <div class="my-comment-box">
    <template v-if="myCommentList.length">
      <div v-for="(item, index) in myCommentList" :key="index" class="comment-card-box">
        <div class="card-left">
          <div class="date">{{ formatListDate(item.createDate) }}</div>
          <p v-dompurify-html="item.content" :title="item.content" @click="toDetail(item)"></p>
          <div class="comment-likes">
            <svg-icon icon-name="icon-dianzan1" color="#a3abb1" size="16px"></svg-icon>
            <span class="number">{{ item.like }}</span>
          </div>
        </div>
        <div class="card-right" title="删除评论" @click="remove(item)">
          <svg-icon icon-name="icon-shanchu1" color="#a3abb1" size="26px"></svg-icon>
        </div>
      </div>
    </template>

    <!-- 无数据页 -->
    <template v-else>
      <div class="audit-no-data-box">
        <no-data-vue width="200px" height="200px"></no-data-vue>
      </div>
    </template>

    <!-- 分页组件 -->
    <Pagination
      v-if="total > limit"
      :limit="limit"
      :total="total"
      :current-page="currentPage"
      @handle-current-change="handleCurrentChange"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
  import { deleteOneCommentAsync, getPersonCommentPageAsync } from '@/http/api/comment';
  import { formatListDate } from '@/utils/common';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { commentType } from '@/dictionary/commentType';

  // 查询个人评论列表
  const myCommentList = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(5);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(true);
  const getPersonCommentPage = async () => {
    isShowSkeleton.value = true;
    const params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getPersonCommentPageAsync(params);
    if (data.data.status === 200) {
      myCommentList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
    }
  };
  getPersonCommentPage();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getPersonCommentPage();
  };

  // 删除一条评论
  const remove = async (item: any) => {
    if (!item.parentId) {
      ElMessageBox.confirm('该操作会删除该条评论以及旗下的所有子评论，确定继续？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let params = {
            id: item._id
          };
          const data = await deleteOneCommentAsync(params);
          if (data.data.status === 200) {
            if (total.value > 0 && (total.value - 1) % limit.value == 0) {
              page.value = page.value - 1;
            }
            getPersonCommentPage();
            ElMessage.success('删除成功');
          } else {
            ElMessage.error(data.data.message);
          }
        })
        .catch(() => {});
    } else {
      let params = {
        id: item._id
      };
      const data = await deleteOneCommentAsync(params);
      if (data.data.status === 200) {
        if (total.value > 0 && (total.value - 1) % limit.value == 0) {
          page.value = page.value - 1;
        }
        getPersonCommentPage();
        ElMessage.success('删除成功');
      } else {
        ElMessage.error(data.data.message);
      }
    }
  };

  // 跳转至评论详情
  const router = useRouter();
  const toDetail = (item: any) => {
    const path = commentType[item.comment_type].path;
    if (item.comment_type === 'resumeOnline') {
      router.push({
        path: path,
        query: {
          id: item.comment_type_id
        }
      });
    } else if (item.comment_type === 'resumeTemplate') {
      router.push({
        path: path,
        query: {
          id: item.comment_type_id
        }
      });
    } else if (item.comment_type === 'soft') {
      router.push({
        path: path,
        query: {
          sourceId: item.comment_type_id
        }
      });
    } else if (item.comment_type === 'pptTemplate') {
      router.push({
        path: path,
        query: {
          id: item.comment_type_id
        }
      });
    }
  };
</script>
<style lang="scss" scoped>
  .my-comment-box {
    .comment-card-box {
      width: 100%;
      border: 1px solid #eee;
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0px 4px 4px 2px rgb(0 37 58 / 8%);
      }
      .card-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .date {
          font-size: 12px;
          color: #a3abb1;
        }
        p {
          font-size: 14px;
          color: #333;
          height: 30px;
          line-height: 30px;
          width: 700px;
          background-color: rgba(242, 242, 242, 0.5);
          margin: 10px 0;
          border-radius: 5px;
          padding-left: 10px;
          text-align: justify;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: #00c091;
          }
        }
        .comment-likes {
          display: flex;
          align-items: center;
          color: #a3abb1;
          .svg-icon {
            margin-right: 5px;
          }
        }
      }
      .card-right {
        width: 50px;
        height: 50px;
        border: 1px solid #eee;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: rgba($color: #00c091, $alpha: 0.1);
        }
      }
    }
  }
</style>
