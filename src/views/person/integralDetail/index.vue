<template>
  <div class="my-integral-box">
    <el-tabs v-model="activeName" class="integral-tabs" @tab-change="handleChange">
      <el-tab-pane label="我的简币" name="myIntegral">
        <div class="my-integral-info-box">
          <div class="integral-card">
            <div class="card-header">
              <h3 class="card-title">我的简币</h3>
              <div class="card-subtitle">您的资产余额</div>
            </div>
            <div class="card-body">
              <div class="integral-amount">
                <span class="amount-value">{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal }}</span>
                <span class="amount-unit"><img width="24" src="@/assets/images/jianB.png" alt="简币" /></span>
              </div>
              <div class="action-buttons">
                <el-button type="primary" @click="openGetDialog" class="action-button get-integral">
                  <svg-icon icon-name="icon-jiahao" size="16px" color="#fff" />
                  获取简币
                </el-button>
              </div>
            </div>
          </div>
          
          <!-- 邀请注册 -->
          <div v-config:open_invite_register class="invitation-card">
            <div class="invitation-header">
              <h4 class="invitation-title">邀请有奖</h4>
              <p class="invitation-desc">邀请好友注册，双方都能获得简币奖励</p>
            </div>
            <div class="invitation-action">
              <el-button type="info" @click="openInvitationDialog" class="invitation-button">
                <svg-icon icon-name="icon-yaoqing" size="16px" color="#fff" />
                立即邀请
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="购买简币" name="buyIntegral">
        <div class="buy-integral-container">
          <buy-integral></buy-integral>
        </div>
      </el-tab-pane>
      <el-tab-pane label="简币记录" name="integralLog">
        <div v-if="!isShowSkeleton">
          <div v-if="integralList.length" class="integral-log-box">
            <div class="log-header">
              <h4 class="log-title">简币交易记录</h4>
              <p class="log-subtitle">最近的交易活动</p>
            </div>
            <div class="log-list">
              <div v-for="(item, index) in integralList" :key="index" class="log-item">
                <div class="log-item-left">
                  <span class="log-time">{{ formatListDate(item.createDate) }}</span>
                  <span class="log-reason">{{ item.integral_reason }}</span>
                </div>
                <div 
                  :class="[
                    'log-value',
                    { 'add-integral': item.integral_value > 0 },
                    { 'sub-integral': item.integral_value < 0 }
                  ]"
                >
                  <span class="value-text">{{ getFormatIntegral(item.integral_value) }}</span>
                  <span class="value-icon"><img src="@/assets/images/jianB.png" alt="" /></span>
                </div>
              </div>
            </div>
          </div>

          <!-- 无数据页 -->
          <template v-else>
            <div class="audit-no-data-box">
              <no-data-vue width="200px" height="200px"></no-data-vue>
              <p class="no-data-text">暂无交易记录</p>
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
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orderList">
        <div class="order-list-container">
          <order-list></order-list>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 如何获取简币弹窗 -->
    <!-- <get-integral-dialog
      :dialog-get-integral-visible="dialogGetIntegralVisible"
      @cancle="cancleDialog"
    ></get-integral-dialog> -->

    <!-- 警告弹窗 -->
    <pay-integral-dialog
      :dialog-get-integral-visible="dialogGetIntegralVisible"
      title="如何获取简币"
      @cancle="cancleDialog"
      @confirm="cancleDialog"
    ></pay-integral-dialog>

    <!-- 邀请用户弹窗 -->
    <invitation-dialog
      :dialog-invitation-visible="dialogInvitationVisible"
      @cancle="cancleInvitationDialog"
    ></invitation-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { getUserIntegralLogsAsync } from '@/http/api/integral';
  import appStore from '@/store';
  import { formatListDate } from '@/utils/common';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import BuyIntegral from '@/components/BuyIntegral/BuyIntegral.vue';
  import OrderList from './components/OrderList.vue';

  const activeName = ref('myIntegral');
  const handleChange = () => {};

  // 查询用户简币信息
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const { token } = appStore.useTokenStore;
  if (token) {
    getUserIntegralTotal();
  }

  // 查询用户简币记录
  const integralList = ref<Array<any>>([]);
  const page = ref<number>(1);
  const limit = ref<number>(8);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(true);
  const getUserIntegralLogs = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getUserIntegralLogsAsync(params);
    if (data.data.status === 200) {
      integralList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
      ElMessage.error(data.data.message);
    }
  };
  getUserIntegralLogs();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserIntegralLogs();
  };

  // 返回格式化后的简币展示
  const getFormatIntegral = (value: number) => {
    if (value > 0) {
      return '+' + value;
    } else {
      return value;
    }
  };

  // 打开获取简币弹窗
  const dialogGetIntegralVisible = ref<boolean>(false);
  const openGetDialog = () => {
    dialogGetIntegralVisible.value = true;
  };

  // 关闭弹窗
  const cancleDialog = () => {
    dialogGetIntegralVisible.value = false;
  };

  // 打开邀请注册弹窗
  const dialogInvitationVisible = ref<boolean>(false);
  const openInvitationDialog = () => {
    dialogInvitationVisible.value = true;
  };

  // 关闭邀请注册弹窗
  const cancleInvitationDialog = () => {
    dialogInvitationVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  .my-integral-box {
    padding: 20px;
    
    .integral-tabs {
      :deep(.el-tabs__content) {
        padding: 20px 0;
      }
      
      :deep(.el-tabs__header) {
        margin-bottom: 20px;
        
        .el-tabs__item {
          font-size: 16px;
          font-weight: 500;
          padding: 0 20px;
          
          &.is-active {
            color: #667eea;
          }
        }
        
        .el-tabs__active-bar {
          background-color: #667eea;
          height: 3px;
        }
      }
    }
    
    .my-integral-info-box {
      display: flex;
      flex-direction: column;
      gap: 20px;
      
      .integral-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        padding: 30px;
        color: white;
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
        }
        
        .card-header {
          margin-bottom: 20px;
          
          .card-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
          }
          
          .card-subtitle {
            font-size: 14px;
            opacity: 0.9;
          }
        }
        
        .card-body {
          .integral-amount {
            display: flex;
            align-items: baseline;
            gap: 10px;
            margin-bottom: 30px;
            
            .amount-value {
              font-size: 48px;
              font-weight: 700;
              line-height: 1;
            }
            
            .amount-unit {
              img {
                vertical-align: middle;
              }
            }
          }
          
          .action-buttons {
            display: flex;
            gap: 12px;
            
            .action-button {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 14px 32px;
              border-radius: 8px;
              font-weight: 600;
              transition: all 0.3s ease;
              
              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
              }
              
              &.get-integral {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.3);
                
                &:hover {
                  background: rgba(255, 255, 255, 0.3);
                }
              }
            }
          }
        }
      }
      
      .invitation-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .invitation-header {
          margin-bottom: 20px;
          
          .invitation-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
          }
          
          .invitation-desc {
            font-size: 14px;
            color: #666;
            line-height: 1.4;
          }
        }
        
        .invitation-action {
          .invitation-button {
            width: 100%;
            padding: 12px 0;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
        }
      }
    }
    
    .buy-integral-container,
    .order-list-container {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      border: 1px solid #f0f0f0;
    }
    
    .integral-log-box {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      border: 1px solid #f0f0f0;
      
      .log-header {
        margin-bottom: 20px;
        
        .log-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        
        .log-subtitle {
          font-size: 14px;
          color: #666;
        }
      }
      
      .log-list {
        .log-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          
          &:last-child {
            border-bottom: none;
          }
          
          &:hover {
            background-color: #f9fafb;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 8px;
          }
          
          .log-item-left {
            flex: 1;
            
            .log-time {
              display: block;
              font-size: 12px;
              color: #999;
              margin-bottom: 4px;
            }
            
            .log-reason {
              font-size: 14px;
              color: #333;
              font-weight: 500;
            }
          }
          
          .log-value {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            
            .value-text {
              font-size: 16px;
            }
            
            .value-icon {
              img {
                width: 20px;
              }
            }
            
            &.add-integral {
              color: #67c23a;
            }
            
            &.sub-integral {
              color: #f56c6c;
            }
          }
        }
      }
    }
    
    .audit-no-data-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 0;
      
      .no-data-text {
        margin-top: 16px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  
  @media (max-width: 768px) {
    .my-integral-box {
      padding: 15px;
      
      .my-integral-info-box {
        .integral-card {
          padding: 20px;
          
          .card-body {
            .integral-amount {
              .amount-value {
                font-size: 36px;
              }
            }
            
            .action-buttons {
              flex-direction: column;
            }
          }
        }
        
        .invitation-card {
          padding: 20px;
        }
      }
      
      .buy-integral-container,
      .order-list-container,
      .integral-log-box {
        padding: 20px;
      }
    }
  }
</style>
