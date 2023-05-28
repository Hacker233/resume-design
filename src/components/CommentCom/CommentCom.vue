<template>
  <!-- 评论组件 -->
  <div :key="refreshUuid" class="comment-view">
    <u-comment
      :config="config"
      :show-size="2"
      :is-login="isLogin"
      @submit="submit"
      @like="like"
      @remove="remove"
      @report="report"
    >
      <!-- 未登录展示 -->
      <template v-if="!isLogin" #is-not-login>
        <div class="login-content-box" @click="openLoginDialog">
          <p>请先登录</p>
        </div>
      </template>
      <template v-if="config.comments.length" #list-title
        >全部评论（{{ initCommentList.length }}）</template
      >
      <template v-else #list-title>
        <div class="comment-no-data-box">
          <no-data-vue width="200px" height="200px"></no-data-vue>
          <p>快来添加一条评论吧~~</p>
        </div>
      </template>
    </u-comment>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { CommentApi, ConfigApi } from '@/components/packages/index';
  import emoji from './emoji';
  import LoginDialog from '@/components/LoginDialog/LoginDialog';
  import {
    addCommentAsync,
    cancleLikeCommentAsync,
    deleteOneCommentAsync,
    getCommentListAsync,
    getUserLikeCommentIdsAsync,
    liseCommentAsync
  } from '@/http/api/comment';
  import { formatListDate, showtime } from '@/utils/common';
  import appStore from '@/store';
  import { cloneDeep } from 'lodash';
  import NoDataVue from '../NoData/NoData.vue';
  import { storeToRefs } from 'pinia';
  import { addIntegralLogAsync } from '@/http/api/integral';
  import { Most_Integral } from '@/config/integral';

  interface IComment {
    commentType: string;
    commentTypeId: string;
    width: string;
  }
  const props = withDefaults(defineProps<IComment>(), {
    commentType: '',
    commentTypeId: '',
    width: '820px'
  });

  // 处理登录情况
  const config = reactive<ConfigApi>({
    user: {
      id: '',
      username: '',
      avatar: '',
      likeIds: []
    },
    emoji: emoji,
    comments: []
  });
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const isLogin = computed(() => {
    let token = appStore.useTokenStore.token;
    if (token) {
      const { userInfo } = appStore.useUserInfoStore;
      config.user = {
        id: userInfo._id,
        username: userInfo.name,
        avatar: userInfo.photos.profilePic.url,
        likeIds: []
      };
      return true;
    } else {
      return false;
    }
  });

  // 打开登录弹窗
  const openLoginDialog = () => {
    LoginDialog(true);
  };

  // 查询评论列表
  const initCommentList = ref<Array<any>>([]); // 出事评论列表
  const getCommentList = async () => {
    let params = {
      commentTypeId: props.commentTypeId,
      commentType: props.commentType
    };
    const data = await getCommentListAsync(params);
    if (data.status === 200) {
      initCommentList.value = data.data;
      config.comments = formatComment(data.data);
      console.log('config.comments', config.comments);
    } else {
      ElMessage.error(data.message);
    }
  };
  getCommentList();

  // 查询用户点赞ids
  const getUserLikeCommentIds = async () => {
    const params = {
      commentType: props.commentType,
      commentTypeId: props.commentTypeId
    };
    const data = await getUserLikeCommentIdsAsync(params);
    if (data.data.status === 200) {
      config.user.likeIds = data.data.data.like_comment_ids || [];
    } else {
      ElMessage.error(data.data.message);
    }
  };
  if (isLogin.value) {
    getUserLikeCommentIds();
  }

  // 提交评论事件
  const submit = async (
    content: string,
    parentId: string,
    finish: (comment: CommentApi) => void,
    closeLoading: () => void
  ) => {
    console.log('评论提交parentId', parentId);
    const searchRegExp = /&nbsp;/gi;
    const replaceWith = '';
    let contentFilter = content.replace(searchRegExp, replaceWith);
    if (!contentFilter.trim()) {
      ElMessage.error('请输入有效评论，营造良好社区氛围！');
      closeLoading();
      return;
    }
    // 添加评论
    const params = {
      parentId: parentId,
      link: '',
      content: content,
      reply: null,
      commentTypeId: props.commentTypeId,
      commentType: props.commentType
    };
    const data = await addCommentAsync(params);
    if (data.data.status === 200) {
      const createTime = showtime(formatListDate(data.data.data.createDate));
      let comment: CommentApi = {
        id: data.data.data._id,
        parentId: data.data.data.parentId,
        uid: data.data.data.uid,
        username: data.data.data.username,
        avatar: data.data.data.avatar,
        level: data.data.data.level,
        link: data.data.data.link,
        address: data.data.data.address,
        content: data.data.data.content,
        like: 0,
        createTime: createTime,
        reply: null
      };
      finish(comment);
      getCommentList();
      ElMessage.success('评论发表成功');
      // 评论得简币
      const integralInfo = appStore.useUserInfoStore.userIntegralInfo.todayGetIntegralTotal;
      if (integralInfo && integralInfo < Most_Integral) {
        toAttendance(data.data.data._id);
      }
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 删除评论
  const remove = async (id: number, finish: () => void) => {
    let params = {
      id: id
    };
    const data = await deleteOneCommentAsync(params);
    if (data.data.status === 200) {
      finish();
      getCommentList();
      ElMessage.success('删除成功');
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 评论添加简币
  const toAttendance = async (id: string) => {
    let params = {
      integralAddType: '2', // 添加简币类型
      integralAddGoodsId: id
    };
    const data = await addIntegralLogAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('评论成功！简币+1！');
      // 更新用户简币信息
      appStore.useUserInfoStore.getUserIntegralTotal();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  //举报用户
  const report = (id: number, finish: () => void) => {
    console.log(id);
    setTimeout(() => {
      finish();
      alert(`举报成功: ${id}`);
    }, 200);
  };

  // 点赞按钮事件
  const like = async (id: string, finish: () => void) => {
    const isLike = (config.user.likeIds as Array<string>).indexOf(id) > -1 ? true : false;
    if (!isLike) {
      const params = {
        id: id, // 评论id
        commetnTypeId: props.commentTypeId, // 评论类型id
        commentType: props.commentType
      };
      const data = await liseCommentAsync(params);
      if (data.data.status === 200) {
        finish();
        getUserLikeCommentIds(); // 更新点赞ids
        ElMessage.success('点赞成功');
      } else {
        ElMessage.error(data.data.message);
      }
    } else {
      const params = {
        id: id, // 评论id
        commetnTypeId: props.commentTypeId, // 评论类型id
        commentType: props.commentType
      };
      const data = await cancleLikeCommentAsync(params);
      if (data.data.status === 200) {
        finish();
        getUserLikeCommentIds(); // 更新点赞ids
        ElMessage.success('取消点赞成功');
      } else {
        ElMessage.error(data.data.message);
      }
    }
  };

  // 格式化评论数据
  const formatComment = (data: Array<any>) => {
    let filterData = cloneDeep(data);
    // 处理时间
    filterData = data.map((item: any) => {
      const temp = {
        id: item._id,
        parentId: item.parentId,
        uid: item.uid,
        username: item.username,
        avatar: item.avatar,
        level: item.level,
        link: item.link,
        address: item.address,
        content: item.content,
        like: 0,
        like_users: item.like_users,
        createTime: showtime(formatListDate(item.createDate))
      };
      return temp;
    });

    // 筛选出一级评论
    const parentCommentList = filterData.filter((item: any) => {
      if (!item.parentId) {
        item.reply = {
          total: 0,
          list: []
        };
        item.like = item.like_users.length;
        return item;
      }
    });

    // 筛选出子评论
    const childCommentList = filterData.filter((item: any) => {
      if (item.parentId) {
        item.like = item.like_users.length;
        return item;
      }
    });

    console.log('一级评论', parentCommentList);
    console.log('子评论', childCommentList);
    for (let i = 0; i < childCommentList.length; i++) {
      const parentId = childCommentList[i].parentId;
      for (let j = 0; j < parentCommentList.length; j++) {
        const id = parentCommentList[j].id;
        if (parentId === id) {
          parentCommentList[j].reply.list.push(childCommentList[i]);
          parentCommentList[j].reply.total = parentCommentList[j].reply.list.length;
          break;
        }
      }
    }

    console.log('最终结果', parentCommentList);

    return parentCommentList;
  };
</script>
<style lang="scss" scoped>
  .comment-view {
    width: v-bind('props.width');
    margin: 40px auto;
    position: relative;
    .login-content-box {
      width: 100%;
      height: 100px;
      background-color: rgba($color: #eee, $alpha: 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      cursor: pointer;
      border-radius: 10px;
      p {
        color: #028e6b;
        font-size: 16px;
        letter-spacing: 2px;
        transition: all 0.3s;
        &:hover {
          color: #06b78b;
        }
      }
    }
    .comment-no-data-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      :deep(.no-data-box) {
        min-height: 100px;
      }
      p {
        font-size: 14px;
        color: rgb(116, 114, 114);
      }
    }

    :deep(svg) {
      max-width: 100px;
    }
  }
</style>
