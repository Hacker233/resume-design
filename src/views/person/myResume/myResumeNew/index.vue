<template>
  <div class="my-resume-new">
    <div v-if="!isShowSkeleton">
      <div v-if="legoCreateList.length" class="create-list-box">
        <template v-for="(item, index) in legoCreateList" :key="index">
          <resume-card
            :card-data="item"
            type="new"
            @to-design="toDesign"
            @delete="deleteUserCreate"
          >
          </resume-card>
        </template>
      </div>

      <!-- 无数据页 -->
      <template v-else>
        <div class="audit-no-data-box">
          <no-data-vue width="200px" height="200px"></no-data-vue>
        </div>
      </template>
    </div>
    <el-skeleton v-else :rows="5" animated />

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
  import NoDataVue from '@/components/NoData/NoData.vue';
  import { deleteUserResumeAsync, getMyResumeListAsync } from '@/http/api/createTemplate';

  // 查询个人简历列表
  const legoCreateList = ref<Array<any>>([]);
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(true);
  const getUserTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getMyResumeListAsync(params);
    if (data.data.status === 200) {
      legoCreateList.value = data.data.data.list;
      legoCreateList.value.map((item: any) => {
        item.previewUrl = item.template_cover;
      });
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
      ElMessage.error(data.data.message);
    }
  };
  getUserTemplateList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserTemplateList();
  };

  // 点击删除创作
  const deleteUserCreate = async (id: string) => {
    let params = {
      id: id
    };
    const data = await deleteUserResumeAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('删除成功');
      getUserTemplateList();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 去设计
  const toDesign = () => {};
</script>
<style lang="scss" scoped>
  .my-resume-new {
    .create-list-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & :last-child:nth-child(3n - 1) {
        margin-right: calc(260px + 15px);
      }
    }
  }
</style>
