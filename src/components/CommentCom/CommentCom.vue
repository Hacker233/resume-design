<template>
  <!-- 评论组件 -->
  <div class="comment-view">
    <u-comment
      :config="config"
      :show-size="2"
      @submit="submit"
      @like="like"
      @remove="remove"
      @report="report"
    >
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
  import { CommentApi, ConfigApi } from 'undraw-ui';
  import emoji from './emoji';
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
  import NoDataVue from '@/components/NoData/NoData.vue';

  interface IComment {
    commentType: string;
    commentTypeId: string;
  }
  const props = withDefaults(defineProps<IComment>(), {
    commentType: '',
    commentTypeId: ''
  });

  const { userInfo } = appStore.useUserInfoStore;
  const config = reactive<ConfigApi>({
    user: {
      id: userInfo._id,
      username: userInfo.name,
      avatar: userInfo.photos.profilePic.url,
      likeIds: []
    },
    emoji: emoji,
    comments: []
  });

  // 查询评论列表
  const initCommentList = ref<Array<any>>([]); // 出事评论列表
  const getCommentList = async () => {
    let params = {
      commentTypeId: props.commentTypeId,
      commentType: props.commentType
    };
    const data = await getCommentListAsync(params);
    if (data.data.status === 200) {
      initCommentList.value = data.data.data;
      config.comments = formatComment(data.data.data);
      console.log('config.comments', config.comments);
    } else {
      ElMessage.error(data.data.message);
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
  getUserLikeCommentIds();

  // 提交评论事件
  const submit = async (
    content: string,
    parentId: string,
    finish: (comment: CommentApi) => void
  ) => {
    console.log('评论提交parentId', parentId);

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
    width: 820px;
    margin: 40px auto;
    position: relative;
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
  }
</style>
