<template>
  <el-dialog
    class="attendance-dialog"
    :model-value="dialogAttendanceVisible"
    width="900px"
    :show-close="false"
    :close-on-click-modal="true"
    append-to-body
    @open="handleOpen"
    @close="handleClose"
    :before-close="handleClose"
  >
    <div class="attendance-dialog-content-box">
      <!-- 左侧日历区域 -->
      <div class="calendar-section">
        <!-- 自定义日历头部 -->
        <div class="calendar-header">
          <h3 class="calendar-title">{{ currentDateStr }}</h3>
          <div class="calendar-actions">
            <el-button 
              size="small" 
              @click="selectDate('prev-month')"
              class="calendar-btn"
            >
              <ArrowLeft />
              上月
            </el-button>
            <el-button 
              size="small" 
              @click="selectDate('today')"
              class="calendar-btn today-btn"
            >
              本月
            </el-button>
            <el-button 
              size="small" 
              @click="selectDate('next-month')"
              class="calendar-btn"
            >
              下月
              <ArrowRight />
            </el-button>
          </div>
        </div>
        <!-- 日历主体 -->
        <el-calendar ref="calendar" v-model="currentDate" :disabled-date="disableFutureDates">
          <template #date-cell="{ data }">
            <div
              class="date-cell"
              :class="{
                'future-date': disableFutureDates(new Date(data.day)),
                'other-month': !moment(data.day).isSame(currentDate, 'month'),
                'signed-date': !isLoading && getSignStatus(data.day),
                'today-date': moment(data.day).isSame(moment(), 'day')
              }"
              @click="handleDateCellClick(data.day)"
            >
              <div class="text">{{ data.day.split('-').pop() }}</div>
              <div v-if="!isLoading && getSignStatus(data.day)" class="signed-status">
                <img
                  width="20"
                  src="@/assets/images/jianB.png"
                  alt="简币"
                  title="简币 - 您的专属虚拟货币"
                />
                <span class="status-text">已签</span>
                <span class="reward-text">+{{ calculateSignReward(data.day) }}</span>
              </div>
              <div
                v-else-if="!isLoading && isCurrentMonthAndPastOrToday(data.day)"
                class="unsigned-status"
              >
                <svg-icon
                  icon-name="icon-weiqiandao"
                  class-name="sign-icon"
                  color="rgba(0, 0, 0, 0.3)"
                  size="18px"
                />
                <span class="status-text">未签</span>
              </div>
              <div
                v-else-if="!isLoading && disableFutureDates(new Date(data.day))"
                class="future-reward"
              >
                <img
                  width="16"
                  src="@/assets/images/jianB.png"
                  alt="简币"
                  title="简币 - 您的专属虚拟货币"
                />
                <span class="reward-text">+{{ calculateSignReward(data.day) }}</span>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
      
      <!-- 右侧签到区域 -->
      <div class="attendance-area">
        <!-- 签到按钮 -->
        <div class="sign-section">
          <el-tooltip
            content="今天您已经签过到啦~"
            :disabled="!appStore.useUserInfoStore.userIntegralInfo.isattendance"
            placement="top"
          >
            <el-button
              class="sign-btn"
              type="primary"
              :disabled="appStore.useUserInfoStore.userIntegralInfo.isattendance"
              @click="signIn"
              :class="{ 'signed': appStore.useUserInfoStore.userIntegralInfo.isattendance }"
            >
              <img
                width="22"
                src="@/assets/images/jianB.png"
                alt="简币"
                title="简币 - 您的专属虚拟货币"
              />
              <span class="tips">{{
                appStore.useUserInfoStore.userIntegralInfo.isattendance ? '已签到' : '签到'
              }}</span>
            </el-button>
          </el-tooltip>
        </div>
        
        <!-- 日期显示 -->
        <div class="date-display" style="display: none;">
          <div class="date-info">
            <span class="current-day">{{ currentDay }}</span>
            <div class="date-details">
              <span class="date">{{ currentDateStr }}</span>
              <span class="weekday">{{ currentWeekday }}</span>
            </div>
          </div>
        </div>
        
        <!-- 今日寄语 -->
        <div class="fortune-cookie">
          <div class="fortune-header">
            <el-icon><Star /></el-icon>
            <span>今日寄语</span>
          </div>
          <p class="fortune-text" @click="copyFortuneCookie">{{ fortuneCookie }}</p>
        </div>
        
        <!-- 连续签到 -->
        <div class="streak-info" v-if="continuousStreak > 0">
          <div class="streak-header">
            <el-icon><Timer /></el-icon>
            <span>连续签到</span>
          </div>
          <div class="streak-content">
            <div class="streak-value">{{ continuousStreak }} 天</div>
            <div class="streak-reward">
              <img width="16" src="@/assets/images/jianB.png" alt="简币" />
              <span>+{{ calculateTotalStreakCoins }} 简币</span>
            </div>
            <div class="streak-next-reward" v-if="nextRewardInfo">
              <span class="next-reward-text">再签到 {{ nextRewardInfo.daysLeft }} 天获得</span>
              <span class="next-reward-amount">+{{ nextRewardInfo.reward }} <img width="12" src="@/assets/images/jianB.png" alt="简币" /></span>
            </div>
          </div>
        </div>
        
        <!-- 签到规则（Popover显示） -->
        <div class="sign-rules-popover">
          <el-popover
            placement="right"
            :width="300"
            trigger="click"
            popper-class="attendance-rules-popover"
          >
            <template #reference>
              <div class="rules-trigger">
                <el-icon><InfoFilled /></el-icon>
                <span>签到规则</span>
              </div>
            </template>
            <div class="popover-content">
              <h4 class="popover-title">签到奖励规则</h4>
              <ul class="rules-list">
                <li class="rule-item">
                  <span class="rule-dot"></span>
                  <span class="rule-text">每日签到获得 <strong>1 <img width="14" src="@/assets/images/jianB.png" alt="简币" /></strong></span>
                </li>
                <li class="rule-item">
                  <span class="rule-dot"></span>
                  <span class="rule-text">连续签到 <strong>第7天</strong> 获得 <strong>5 <img width="14" src="@/assets/images/jianB.png" alt="简币" /></strong></span>
                </li>
                <li class="rule-item">
                  <span class="rule-dot"></span>
                  <span class="rule-text">累计签到 <strong>30天</strong> 获得 <strong>10 <img width="14" src="@/assets/images/jianB.png" alt="简币" /></strong></span>
                </li>
                <li class="rule-item">
                  <span class="rule-dot"></span>
                  <span class="rule-text">累计签到 <strong>100天</strong> 获得 <strong>20 <img width="14" src="@/assets/images/jianB.png" alt="简币" /></strong></span>
                </li>
                <li class="rule-item">
                  <span class="rule-dot"></span>
                  <span class="rule-text">累计签到 <strong>365天</strong> 获得 <strong>50 <img width="14" src="@/assets/images/jianB.png" alt="简币" /></strong></span>
                </li>
              </ul>
            </div>
          </el-popover>
        </div>
        
        <!-- logo宣传 -->
        <div class="logo-qrcode">
          <div class="left">
            <logo-com class="logo" />
            <p>扫描二维码加入交流群</p>
          </div>
          <div v-viewer class="logo-box">
            <img 
              class="wx-qun" 
              :src="wxQun" 
              alt="微信交流群" 
              title="微信交流群" 
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { addIntegralLogAsync, getMonthAttendanceListAsync } from '@/http/api/integral';
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  import appStore from '@/store';
  import { CalendarDateType, CalendarInstance } from 'element-plus';
  import { ArrowLeft, ArrowRight, Star, Timer, InfoFilled, ArrowDown } from '@element-plus/icons-vue';
  import moment from 'moment';

  const emit = defineEmits(['close', 'success']);

  interface TDialog {
    dialogAttendanceVisible: boolean;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogAttendanceVisible: false
  });

  const currentDate = ref(new Date());
  const calendar = ref<CalendarInstance>();
  const attendanceData = ref<Array<{ date: string; isSigned: boolean }>>([]);
  const fortuneCookie = ref<string | null>(null);
  const currentDay = ref('');
  const currentDateStr = ref('');
  const currentWeekday = ref('');
  const continuousStreak = ref(0);
  


  // 切换月份时获取数据
  const selectDate = async (val: string) => {
    if (!calendar.value) return;

    // 根据操作类型更新currentDate
    if (val === 'prev-month') {
      currentDate.value = moment(currentDate.value).subtract(1, 'month').startOf('month').toDate();
    } else if (val === 'today') {
      currentDate.value = new Date();
    } else if (val === 'next-month') {
      currentDate.value = moment(currentDate.value).add(1, 'month').startOf('month').toDate();
    }

    // 更新日期显示
    updateCurrentDateDisplay();
    
    // 获取新月份的签到数据
    await fetchAttendanceData();
  };

  // 判断签到状态
  const getSignStatus = (date: string) => {
    return attendanceData.value.some((item) => item.date === date && item.isSigned);
  };

  // 获取签到数据
  const isLoading = ref(false);

  const fetchAttendanceData = async () => {
    isLoading.value = true;
    console.log('获取签到数据', moment(currentDate.value).format('YYYY-MM'));
    const { token } = appStore.useTokenStore;
    if (token) {
      const params = {
        currentDate: moment(currentDate.value).format('YYYY-MM')
      };
      const data = await getMonthAttendanceListAsync(params);
      isLoading.value = false;

      if (data.data.status === 200) {
        attendanceData.value = data.data.data.calendar;
        fortuneCookie.value = data.data.data.luckyText;
        // 只在首次加载时计算连续签到天数，切换月份时保持不变
        if (continuousStreak.value === 0) {
          calculateContinuousStreak();
        }
      } else {
        ElMessage.error(data.data.message);
      }
    }
  };

  // 获取微信群
  const wxQun = ref('');
  const vxQunList = ref<any>([]);
  // 打开立即咨询弹窗
  const toContact = async () => {
    // 查询微信微信群列表
    const data = await getVXQunListUnauthAsync();
    if (data.status === 200) {
      vxQunList.value = data.data;
      vxQunList.value.forEach((element: any) => {
        if (element.name === '用户交流群') {
          wxQun.value = element.qr_code;
        }
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 打开签到弹窗
  const handleOpen = async () => {
    updateCurrentDateDisplay();
    await fetchAttendanceData();
    toContact();
  };

  // 关闭签到弹窗
  const handleClose = () => {
    emit('close');
  };

  // 更新当前日期显示
  const updateCurrentDateDisplay = () => {
    // 显示当前选中月份的完整月份和年份
    currentDateStr.value = moment(currentDate.value).format('YYYY年MM月');
    // 显示今天的日期和星期
    currentDay.value = moment().format('DD');
    currentWeekday.value = moment().format('dddd');
  };

  // 计算连续签到天数
  const calculateContinuousStreak = () => {
    let streak = 0;
    let current = moment();
    
    while (true) {
      const dateStr = current.format('YYYY-MM-DD');
      const isSigned = attendanceData.value.some(item => item.date === dateStr && item.isSigned);
      
      if (isSigned) {
        streak++;
        current = current.subtract(1, 'day');
      } else {
        break;
      }
    }
    
    continuousStreak.value = streak;
  };
  
  // 计算连续签到总简币
  const calculateTotalStreakCoins = computed(() => {
    const streak = continuousStreak.value;
    let totalCoins = 0;
    
    // 计算基础签到奖励（每天1简币）
    totalCoins += streak;
    
    // 计算连续签到第7天的额外奖励（每7天额外4简币，因为第7天本身已经算在基础奖励里了）
    const sevenDayBonus = Math.floor(streak / 7) * 4;
    totalCoins += sevenDayBonus;
    
    // 计算累计签到特殊天数的额外奖励
    if (streak >= 365) {
      totalCoins += 50;
    } else if (streak >= 100) {
      totalCoins += 20;
    } else if (streak >= 30) {
      totalCoins += 10;
    }
    
    return totalCoins;
  });
  
  // 计算某一天的签到奖励
  const calculateSignReward = (date) => {
    const targetDate = moment(date);
    const today = moment();
    
    // 计算从今天开始的连续签到天数
    let streak = continuousStreak.value;
    let current = today.clone();
    
    if (targetDate.isBefore(today, 'day')) {
      // 计算过去日期的签到天数
      const daysDiff = today.diff(targetDate, 'days');
      streak = Math.max(0, streak - daysDiff);
    } else {
      // 计算未来日期的签到天数
      while (current.isBefore(targetDate, 'day')) {
        streak++;
        current.add(1, 'day');
      }
    }
    
    // 连续签到第7天获得5积分
    if (streak % 7 === 0 && streak > 0) {
      return 5;
    }
    
    // 累计签到特殊天数获得对应积分
    if (streak === 30) {
      return 10;
    } else if (streak === 100) {
      return 20;
    } else if (streak === 365) {
      return 50;
    }
    
    // 其他情况获得1积分
    return 1;
  };
  
  // 计算下一次奖励信息
  const nextRewardInfo = computed(() => {
    const currentStreak = continuousStreak.value;
    
    // 计算下一次连续签到7天的奖励
    const next7DayStreak = Math.floor(currentStreak / 7) * 7 + 7;
    const daysTo7Day = next7DayStreak - currentStreak;
    
    // 计算下一次累计签到特殊天数的奖励
    let nextSpecialStreak = null;
    let specialReward = 0;
    
    if (currentStreak < 30) {
      nextSpecialStreak = 30;
      specialReward = 10;
    } else if (currentStreak < 100) {
      nextSpecialStreak = 100;
      specialReward = 20;
    } else if (currentStreak < 365) {
      nextSpecialStreak = 365;
      specialReward = 50;
    }
    
    // 比较哪个奖励更近
    if (nextSpecialStreak) {
      const daysToSpecial = nextSpecialStreak - currentStreak;
      if (daysTo7Day < daysToSpecial) {
        return {
          daysLeft: daysTo7Day,
          reward: 5
        };
      } else {
        return {
          daysLeft: daysToSpecial,
          reward: specialReward
        };
      }
    } else {
      // 已经超过365天，只考虑7天周期奖励
      return {
        daysLeft: daysTo7Day,
        reward: 5
      };
    }
  });

  watch(
    () => props.dialogAttendanceVisible,
    (newVal) => {
      if (newVal) {
        handleOpen();
      } else {
        emit('close');
      }
    },
    {
      deep: true,
      immediate: true
    }
  );

  // 签到功能
  const signIn = async () => {
    let params = {
      integralAddType: '1'
    };
    const data = await addIntegralLogAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('签到成功！简币+1！');
      fetchAttendanceData();
      // 更新用户简币信息
      appStore.useUserInfoStore.getUserIntegralTotal();
      emit('success');
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 禁用未来日期
  const disableFutureDates = (time: Date) => {
    return time > new Date();
  };

  // 判断是否为过去或今天
  const isCurrentMonthAndPastOrToday = (date: string) => {
    const momentDate = moment(date);
    return (
      momentDate.isSame(currentDate.value, 'month') && momentDate.isSameOrBefore(moment(), 'day')
    );
  };
  
  // 复制文本到剪贴板
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      ElMessage.success('复制成功！');
    } catch (err) {
      console.error('复制失败:', err);
      ElMessage.error('复制失败，请手动复制');
    }
  };
  
  // 复制今日寄语
  const copyFortuneCookie = () => {
    if (fortuneCookie.value) {
      copyText(fortuneCookie.value);
    }
  };
  
  // 处理日期卡片点击
  const handleDateCellClick = (date) => {
    const targetDate = moment(date);
    const today = moment();
    
    // 如果是过去的日期且未签到，提示补签卡暂未开放
    if (targetDate.isBefore(today, 'day') && !getSignStatus(date)) {
      ElMessage.info('补签卡暂未开放');
    }
  };
</script>

<style lang="scss" scoped>
  .attendance-dialog-content-box {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    height: 614px;
    width: 900px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  // 左侧日历区域
  .calendar-section {
    flex: 1;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    
    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  .el-calendar {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    
    :deep(.el-calendar__header) {
      display: none;
    }
    
    :deep(.el-calendar__body) {
      padding: 12px !important;
      
      .el-calendar-table {
        width: 100%;
        table-layout: fixed;
        
        thead {
          th {
            padding: 8px 0;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            width: 14.28%; /* 7天 */
          }
        }
        
        tbody {
          tr {
            height: 95px;
          }
          
          td {
            padding: 2px 0;
            text-align: center;
            width: 14.28%; /* 7天 */
          }
        }
      }
    }
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    min-height: 60px;
    box-sizing: border-box;
    
    .calendar-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      flex-shrink: 0;
    }
    
    .calendar-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      
      .calendar-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: #ffffff;
        border-radius: 6px;
        transition: all 0.3s ease;
        padding: 6px 12px;
        white-space: nowrap;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.4);
        }
      }
      
      .today-btn {
        background: rgba(255, 255, 255, 0.3);
        font-weight: 500;
      }
    }
  }

  .date-cell {
    position: relative;
    width: 100%;
    height: 80px;
    padding: 4px;
    border-radius: 8px;
    background: rgba(245, 245, 245, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
    margin: 0 2px;
    cursor: pointer;

    &.future-date {
      background: rgba(245, 245, 245, 0.7);
      .text {
        color: #999 !important;
      }
      .unsigned-status {
        opacity: 0.4;
      }
      cursor: default;
    }
    
    &.other-month {
      background: rgba(245, 245, 245, 0.3);
      .text {
        color: #ccc !important;
        font-size: 13px;
      }
      .unsigned-status {
        opacity: 0.3;
        
        .status-text {
          color: #ccc;
        }
        
        .sign-icon {
          color: #ccc;
        }
      }
      .signed-status {
        opacity: 0.3;
        
        .status-text {
          color: #ccc;
        }
        
        .reward-text {
          color: #ccc;
        }
      }
      .future-reward {
        opacity: 0.3;
        
        .reward-text {
          color: #ccc;
        }
      }
      cursor: default;
      
      &:hover {
        transform: none;
        box-shadow: none;
        background: rgba(245, 245, 245, 0.3);
        
        .text {
          color: #ccc !important;
          font-size: 13px;
        }
      }
    }
    
    &.signed-date {
      background: rgba(64, 158, 255, 0.15);
      border: 1px solid rgba(64, 158, 255, 0.3);
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
      cursor: default;
    }
    
    &.today-date {
      background: rgba(64, 158, 255, 0.2);
      border: 2px solid #409eff;
      box-shadow: 0 2px 10px rgba(64, 158, 255, 0.2);
    }

    .text {
      font-size: 15px;
      color: #606266;
      text-align: center;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .signed-status,
    .unsigned-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .status-text {
      font-size: 11px;
      line-height: 1;
      font-weight: 500;
    }

    .signed-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      
      .status-text {
        color: #409eff;
        font-weight: 600;
        font-size: 11px;
      }
      
      .reward-text {
        font-size: 11px;
        font-weight: 600;
        color: #67c23a;
        text-shadow: 0 1px 2px rgba(103, 194, 58, 0.3);
      }
    }

    .unsigned-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      
      .status-text {
        color: rgba(0, 0, 0, 0.4);
        font-size: 11px;
      }
    }

    .future-reward {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      opacity: 0.7;
      
      img {
        width: 16px;
        height: 16px;
        margin-bottom: 2px;
        filter: brightness(0.8);
      }
      
      .reward-text {
        font-size: 11px;
        font-weight: 600;
        color: #67c23a;
        text-shadow: 0 1px 2px rgba(103, 194, 58, 0.3);
      }
    }

    .sign-icon,
    img {
      margin-bottom: 2px;
      width: 16px;
      height: 16px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      background: rgba(255, 255, 255, 0.8);
      
      .text {
        color: #333333;
        font-weight: 600;
        font-size: 16px;
      }

      .unsigned-status {
        opacity: 0.9;
        
        .status-text {
          color: #67c23a;
        }
        
        .sign-icon {
          color: #67c23a;
        }
      }
    }
  }

  // 右侧签到区域
  .attendance-area {
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  
  // 签到按钮区域
  .sign-section {
    display: flex;
    justify-content: center;
    
    .sign-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 64px;
      border-radius: 14px;
      font-size: 19px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 6px 24px rgba(102, 126, 234, 0.45);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 2px;
      border: none;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.6s;
      }
      
      &:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 8px 32px rgba(102, 126, 234, 0.55);
        
        &::before {
          left: 100%;
        }
      }
      
      &:disabled {
        background: #e6e6e6;
        box-shadow: none;
        cursor: not-allowed;
      }
      
      &.signed {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        box-shadow: 0 6px 24px rgba(79, 172, 254, 0.45);
      }
      
      img {
        margin-right: 10px;
        margin-top: 2px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        width: 20px;
        height: 20px;
      }
      
      .tips {
        margin-left: 4px;
      }
    }
  }
  
  // 日期显示
  .date-display {
    background: #ffffff;
    border-radius: 14px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    
    .date-info {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .current-day {
        font-size: 46px;
        font-weight: 700;
        color: #333;
        line-height: 1;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .date-details {
        display: flex;
        flex-direction: column;
        gap: 4px;
        
        .date {
          font-size: 16px;
          font-weight: 500;
          color: #666;
        }
        
        .weekday {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  
  // 今日寄语
  .fortune-cookie {
    background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #e4e7ed;
    position: relative;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #ff9500, #ff6b6b);
    }
    
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
      border-color: #ff9500;
    }
    
    .fortune-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 14px;
      
      el-icon {
        color: #ff9500;
        font-size: 16px;
      }
      
      span {
        font-size: 15px;
        font-weight: 600;
        color: #333;
      }
    }
    
    .fortune-text {
      font-size: 15px;
      font-weight: 500;
      line-height: 1.6;
      text-align: center;
      margin: 0;
      padding: 16px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      color: #666;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-1px);
      }
      
      &::before,
      &::after {
        content: '"';
        font-size: 24px;
        font-weight: bold;
        color: #ff9500;
        opacity: 0.3;
      }
      
      &::before {
        position: absolute;
        top: -8px;
        left: 16px;
      }
      
      &::after {
        position: absolute;
        bottom: -12px;
        right: 16px;
      }
    }
  }
  
  // 连续签到
  .streak-info {
    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(64, 158, 255, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid #e6f7ff;
    
    &:hover {
      box-shadow: 0 6px 24px rgba(64, 158, 255, 0.25);
      transform: translateY(-2px);
      border-color: #409eff;
    }
    
    .streak-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f0f0f0;
      
      el-icon {
        color: #409eff;
        font-size: 14px;
        flex-shrink: 0;
      }
      
      span {
        font-size: 13px;
        font-weight: 700;
        color: #2d3748;
        flex: 1;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    }
    
    .streak-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2px 0;
    }
    
    .streak-value {
      font-size: 24px;
      font-weight: 800;
      color: #409eff;
      margin-bottom: 4px;
      text-align: center;
      min-width: 60px;
      display: inline-block;
      text-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);
    }
    
    .streak-reward {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 11px;
      color: #4a5568;
      font-weight: 500;
      background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
      padding: 3px 8px;
      border-radius: 12px;
      border: 1px solid rgba(64, 158, 255, 0.2);
    }
    
    .streak-next-reward {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(103, 194, 58, 0.2);
      display: flex;
      flex-direction: column;
      gap: 3px;
      
      .next-reward-text {
        font-size: 10px;
        color: #666;
        text-align: center;
      }
      
      .next-reward-amount {
        font-size: 11px;
        font-weight: 600;
        color: #67c23a;
        text-shadow: 0 1px 2px rgba(103, 194, 58, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        
        img {
          vertical-align: middle;
          margin-bottom: 1px;
          width: 10px;
        }
      }
    }
  }
  
  // 签到规则（Popover显示）
  .sign-rules-popover {
    
    .rules-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 18px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 2px solid #e8f5e8;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
        border-color: #67c23a;
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(103, 194, 58, 0.15);
      }
      
      el-icon {
        color: #67c23a;
        font-size: 16px;
      }
      
      span {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
    }
  }
  
  /* 全局样式，用于 popover 内容 */
  :global(.attendance-rules-popover) {
    border-radius: 12px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
    border: 2px solid #e8f5e8 !important;
    overflow: hidden !important;
  }
  
  :global(.attendance-rules-popover .el-popover__content) {
    padding: 0 !important;
  }
  
  :global(.attendance-rules-popover .popover-title) {
    font-size: 16px;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 16px 0;
    text-align: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  :global(.attendance-rules-popover .rules-list) {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  :global(.attendance-rules-popover .rule-item) {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1.5;
  }
  
  :global(.attendance-rules-popover .rule-item:last-child) {
    margin-bottom: 0;
  }
  
  :global(.attendance-rules-popover .rule-dot) {
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(103, 194, 58, 0.3);
  }
  
  :global(.attendance-rules-popover .rule-text) {
    color: #4a5568;
    flex: 1;
    font-weight: 500;
  }
  
  :global(.attendance-rules-popover .rule-text strong) {
    color: #67c23a;
    font-weight: 700;
    background: linear-gradient(135deg, rgba(103, 194, 58, 0.1) 0%, rgba(103, 194, 58, 0.05) 100%);
    padding: 2px 6px;
    border-radius: 4px;
    margin: 0 2px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  
  :global(.attendance-rules-popover .rule-text strong:nth-child(1)) {
    min-width: 60px;
    justify-content: center;
  }
  
  :global(.attendance-rules-popover .rule-text strong img) {
    vertical-align: middle;
    margin-bottom: 2px;
  }
  
  // logo宣传
  .logo-qrcode {
    background: #ffffff;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      
      .logo {
        height: 48px;
      }
      
      p {
        font-size: 14px;
        font-weight: 400;
        color: #86909c;
        margin: 0;
        line-height: 1.4;
      }
    }
    
    .logo-box {
      .wx-qun {
        height: 60px;
        width: 60px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }

  :deep(.el-calendar__header) {
    display: none;
  }

  :deep(.el-calendar-day) {
    height: 100%;
    padding: 5px 3px;
    padding-right: 6px;
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    .attendance-dialog-content-box {
      flex-direction: column;
      padding: 16px;
    }
    
    .attendance-area {
      width: 100%;
    }
  }
</style>
<style lang="scss">
  .attendance-dialog {
    .el-dialog__header {
      display: none !important;
    }
    
    .el-dialog__body {
      padding: 0 !important;
      background: #f5f7fa;
    }
    
    .el-dialog__wrapper {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
    }
  }
</style>
