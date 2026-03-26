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
        <div class="date-display">
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
          <div class="streak-value">{{ continuousStreak }} 天</div>
          <div class="streak-reward">
            <img width="16" src="@/assets/images/jianB.png" alt="简币" />
            <span>+{{ continuousStreak }} 简币</span>
          </div>
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
  import { addIntegralLogAsync, getMonthAttendanceListAsync } from '@/http/api/integral';
  import { getVXQunListUnauthAsync } from '@/http/api/website';
  import appStore from '@/store';
  import { CalendarDateType, CalendarInstance } from 'element-plus';
  import { ArrowLeft, ArrowRight, Star, Timer } from '@element-plus/icons-vue';
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
        calculateContinuousStreak();
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

    &.future-date {
      background: rgba(245, 245, 245, 0.7);
      .text {
        color: #999 !important;
      }
      .unsigned-status {
        opacity: 0.4;
      }
    }
    
    &.other-month {
      background: rgba(245, 245, 245, 0.5);
      .text {
        color: #999 !important;
      }
      .unsigned-status {
        opacity: 0.5;
      }
    }
    
    &.signed-date {
      background: rgba(64, 158, 255, 0.15);
      border: 1px solid rgba(64, 158, 255, 0.3);
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
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

    .signed-status .status-text {
      color: #409eff;
      font-weight: 600;
    }

    .unsigned-status .status-text {
      color: rgba(0, 0, 0, 0.4);
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
      line-height: 1.5;
      text-align: center;
      margin: 0;
      padding: 12px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      color: #666;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      
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
        left: 8px;
      }
      
      &::after {
        position: absolute;
        bottom: -12px;
        right: 8px;
      }
    }
  }
  
  // 连续签到
  .streak-info {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid #e4e7ed;
    
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
      border-color: #409eff;
    }
    
    .streak-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 16px;
      
      el-icon {
        color: #409eff;
        font-size: 18px;
      }
      
      span {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
    }
    
    .streak-value {
      font-size: 32px;
      font-weight: 700;
      color: #409eff;
      margin-bottom: 10px;
      text-align: center;
    }
    
    .streak-reward {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }
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
