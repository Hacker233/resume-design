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
      <!-- <template #list-title>全部评论</template> -->
    </u-comment>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { CommentApi, ConfigApi } from 'undraw-ui';
  import emoji from './emoji';
  import { addCommentAsync, getCommentListAsync } from '@/http/api/comment';
  import { formatListDate, showtime } from '@/utils/common';
  import appStore from '@/store';

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
      likeIds: userInfo.likeCommentIds[props.commentType]
    },
    emoji: emoji,
    comments: []
  });

  // 查询评论列表
  const getCommentList = async () => {
    let params = {
      commentTypeId: props.commentTypeId,
      commentType: props.commentType
    };
    const data = await getCommentListAsync(params);
    if (data.data.status === 200) {
      config.comments = formatComment(data.data.data);
      console.log('config.comments', config.comments);
    } else {
      ElMessage.error(data.message);
    }
  };
  getCommentList();

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
      commentType: 'resumeTemplate'
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
      console.log('comment', comment);
      finish(comment);
      ElMessage.success('评论发表成功');
    } else {
      ElMessage.error(data.message);
    }
  };

  // 删除评论
  const remove = (id: number, finish: () => void) => {
    setTimeout(() => {
      finish();
      alert(`删除成功: ${id}`);
    }, 200);
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
  const like = (id: number, finish: () => void) => {
    console.log(id);
    setTimeout(() => {
      finish();
    }, 200);
  };

  // 格式化评论数据
  const formatComment = (data: Array<any>) => {
    for (let index = 0; index < data.length; index++) {
      const createTime = showtime(formatListDate(data[index].createDate));
      console.log(' data[index]', data[index]);

      data[index] = {
        id: data[index]._id,
        parentId: data[index].parentId,
        uid: data[index].uid,
        username: data[index].username,
        avatar: data[index].avatar,
        level: data[index].level,
        link: data[index].link,
        address: data[index].address,
        content: data[index].content,
        like: data[index].like_users.length,
        createTime: createTime,
        commentTypeId: data[index].comment_type_id,
        commentType: data[index].comment_type,
        reply: data[index].reply
      };

      if (data[index].reply && data[index].reply.list.length) {
        let childComment = formatComment(data[index].reply.list);
        data[index].reply.total = childComment.length;
        data[index].reply.list = childComment;
      } else {
        data[index].reply = null;
      }
    }
    return data;
  };

  // config.comments = [
  //   {
  //     id: '1',
  //     parentId: null,
  //     uid: '1',
  //     username: '落🤍尘',
  //     avatar:
  //       'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
  //     level: 6,
  //     link: '/1',
  //     address: '来自上海',
  //     content:
  //       '缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]',
  //     like: 2,
  //     createTime: '1分钟前'
  //   },
  //   {
  //     id: '2',
  //     parentId: null,
  //     uid: '2',
  //     username: '悟二空',
  //     avatar:
  //       'https://static.juzicon.com/user/avatar-bf22291e-ea5c-4280-850d-88bc288fcf5d-220408002256-ZBQQ.jpeg',
  //     level: 1,
  //     link: '/2',
  //     address: '来自苏州',
  //     content: '知道在学校为什么感觉这么困吗？因为学校，是梦开始的地方。[脱单doge]',
  //     like: 11,
  //     createTime: '1天前',
  //     reply: {
  //       total: 2,
  //       list: [
  //         {
  //           id: '21',
  //           parentId: '2',
  //           uid: '3',
  //           username: '别扰我清梦*ぁ',
  //           avatar:
  //             'https://static.juzicon.com/user/avatar-8b6206c1-b28f-4636-8952-d8d9edec975d-191001105631-MDTM.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
  //           level: 5,
  //           link: '/21',
  //           address: '来自重庆',
  //           content: '说的对，所以，综上所述，上课睡觉不怪我呀💤',
  //           like: 3,
  //           createTime: '1分钟前'
  //         },
  //         {
  //           id: '22',
  //           parentId: '2',
  //           uid: '4',
  //           username: 'Blizzard',
  //           avatar:
  //             'https://static.juzicon.com/user/avatar-3cb86a0c-08e7-4305-9ac6-34e0cf4937cc-180320123405-BCV6.jpg?x-oss-process=image/resize,m_fill,w_100,h_100',
  //           level: 3,
  //           link: '/22',
  //           content:
  //             '回复 <span style="color: blue;"">@别扰我清梦*ぁ:</span> 看完打了一个哈切。。。会传染。。。[委屈]',
  //           address: '来自广州',
  //           like: 9,
  //           createTime: '1天前'
  //         }
  //       ]
  //     }
  //   }
  // ];
</script>
<style lang="scss" scoped>
  .comment-view {
    width: 820px;
    margin: 30px auto;
    position: relative;
  }
</style>
