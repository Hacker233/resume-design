<template>
  <div class="left-card">
    <!-- 用户信息区域 -->
    <div class="user-info-section">
      <!-- 头像 -->
      <div class="avatar-container">
        <div class="avatar-wrapper" :class="{ 'vip-avatar': appStore.useMembershipStore.membershipInfo.hasMembership && appStore.useMembershipStore.membershipInfo.daysRemaining > 0 }">
          <el-upload
            class="avatar-uploader"
            :action="uploadAddress()"
            :headers="{ Authorization: appStore.useTokenStore.token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
            v-if="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
            :src="appStore.useUserInfoStore.userInfo.photos.profilePic.url"
            class="avatar"
          />
          <el-avatar v-else :size="80" class="default-avatar">
            {{ appStore.useUserInfoStore.userInfo.name.split('')[0] }}
          </el-avatar>
            <!-- 相机图标 -->
            <div class="camera-overlay">
              <svg-icon icon-name="icon-xiangji1" class="camera-icon" color="#fff" size="16px"></svg-icon>
            </div>
          </el-upload>
          <!-- VIP徽章 -->
          <div v-if="appStore.useMembershipStore.membershipInfo.hasMembership && appStore.useMembershipStore.membershipInfo.daysRemaining > 0" class="vip-badge">
            <img 
              src="@/assets/images/membership.svg" 
              alt="会员" 
              title="会员" 
              width="16" 
            />
            <span>{{ appStore.useMembershipStore.membershipInfo.type === 'lifetime' ? '永久' : 'VIP' }}</span>
          </div>
        </div>
        
        <!-- 用户信息 -->
        <div class="user-details">
          <h3 class="user-name">{{ appStore.useUserInfoStore.userInfo.name }}</h3>
          <p class="user-surname">{{ appStore.useUserInfoStore.userInfo.surname || '未设置个性签名' }}</p>
          <div v-if="appStore.useMembershipStore.membershipInfo.hasMembership && appStore.useMembershipStore.membershipInfo.daysRemaining > 0" class="membership-status">
            <span class="membership-level">{{ appStore.useMembershipStore.membershipInfo.type === 'lifetime' ? '永久会员' : '会员' }}</span>
            <span v-if="appStore.useMembershipStore.membershipInfo.type !== 'lifetime'" class="membership-days">剩余{{ appStore.useMembershipStore.membershipInfo.daysRemaining }}天</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 菜单 -->
    <PersonMenuVue />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import CONFIG from '@/config';
  import { updateUserAvatarAsync } from '@/http/api/user';
  import appStore from '@/store';
  import { UploadProps } from 'element-plus';
  import PersonMenuVue from './PersonMenu.vue';

  // 上传文件地址
  const uploadAddress = () => {
    return CONFIG.serverAddress + '/huajian/upload/file/avatar';
  };

  // 获取用户信息方法
  const { getAndUpdateUserInfo } = appStore.useUserInfoStore;

  // 上传加载状态
  const uploadLoading = ref(false);

  const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
    uploadLoading.value = true;
    try {
      appStore.useUserInfoStore.userInfo.photos.profilePic.url = response.data.data.fileUrl;
      let params = {
        avatar: response.data.data.fileUrl
      };
      const data = await updateUserAvatarAsync(params);
      if (data.data.status === 200) {
        ElMessage.success('更新成功');
        // 更新用户信息
        getAndUpdateUserInfo();
      } else {
        ElMessage.error(data.data.message);
      }
    } catch (error) {
      ElMessage.error('上传失败，请重试');
      console.error('上传头像失败:', error);
    } finally {
      uploadLoading.value = false;
    }
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('头像大小不能大于5M');
      return false;
    }
    return true;
  };
</script>
<style lang="scss" scoped>
  .left-card {
    width: 320px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    flex-shrink: 0;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .user-info-section {
      padding: 30px 20px;
      border-bottom: 1px solid #f0f0f0;

      .avatar-container {
          text-align: center;
          position: relative;

          .avatar-wrapper {
            display: inline-block;
            position: relative;
            margin-bottom: 20px;

            &.vip-avatar {
              animation: vipPulse 2s infinite;

              .avatar,
              .default-avatar {
                border: 3px solid #ffd700;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
              }
            }

            .vip-badge {
              position: absolute;
              top: -10px;
              right: -10px;
              background: linear-gradient(135deg, #ffd700, #ffed4e);
              color: #333;
              border-radius: 12px;
              padding: 4px 8px;
              font-size: 12px;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 4px;
              box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
              animation: slideIn 0.5s ease;
            }

            .avatar-uploader {
              display: inline-block;
              position: relative;
              height: 80px;
              width: 80px;

              .avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid #f0f0f0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                &:hover {
                  transform: scale(1.05);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
              }

              .default-avatar {
                width: 80px;
                height: 80px;
                font-size: 28px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: 3px solid #f0f0f0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;

                &:hover {
                  transform: scale(1.05);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
              }

              .camera-overlay {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid white;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                  transform: scale(1.1);
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                }
              }
            }
          }

          .user-details {
            .user-name {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #333;
              transition: color 0.3s ease;
            }

            .user-surname {
              font-size: 14px;
              color: #666;
              line-height: 1.4;
              transition: color 0.3s ease;
              margin-bottom: 12px;
            }

            .membership-status {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
              margin-top: 8px;

              .membership-level {
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: #333;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
              }

              .membership-days {
                font-size: 11px;
                color: #999;
                margin-top: 2px;
              }
            }
          }
        }

        @keyframes vipPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
    }
  }

  @media (max-width: 1240px) {
    .left-card {
      width: 100%;
      max-width: 400px;
    }
  }

  @media (max-width: 768px) {
    .left-card {
      width: 100%;
      max-width: 100%;

      .user-info-section {
        padding: 20px 15px;

        .avatar-container {
          .avatar-uploader {
            margin-bottom: 15px;

            .avatar,
            .default-avatar {
              width: 70px;
              height: 70px;
              font-size: 24px;
            }

            .camera-overlay {
              width: 24px;
              height: 24px;

              svg {
                size: 14px;
              }
            }
          }

          .user-details {
            .user-name {
              font-size: 16px;
            }

            .user-surname {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
</style>
