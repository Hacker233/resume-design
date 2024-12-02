<template>
  <div class="my-resume-box">
    <!-- 简历列表 -->
    <div v-if="!isShowSkeleton" class="resume-list">
      <template v-for="(item, index) in templateList" :key="index">
        <resume-card :card-data="item" type="old" @delete="deleteUserResume"> </resume-card>
      </template>
      <!-- 无数据页 -->
      <no-data-vue v-if="!templateList.length"></no-data-vue>
    </div>
    <el-skeleton v-else :rows="8" animated />

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
  import ResumeCard from '../components/ResumeCard.vue';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { deleteUserResumeAsync, getUserResumeListAsync } from '@/http/api/resume';
  import NoDataVue from '@/components/NoData/NoData.vue';

  // 获取用户简历列表
  const templateList = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(true);
  const getUserResumeList = async () => {
    isShowSkeleton.value = true;
    const params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getUserResumeListAsync(params);
    if (data.data.status === 200) {
      templateList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
    }
  };
  getUserResumeList();

  // 点击删除简历
  const deleteUserResume = async (id: string) => {
    const data = await deleteUserResumeAsync(id);
    if (data.data.status === 200) {
      ElMessage.success('删除成功！');
      page.value = 1;
      currentPage.value = 1;
      getUserResumeList();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserResumeList();
  };
</script>
<style lang="scss" scoped>
  .my-resume-box {
    display: flex;
    flex-direction: column;
    .resume-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & :last-child:nth-child(3n - 1) {
        margin-right: calc(260px + 15px);
      }
    }
  }
</style>
