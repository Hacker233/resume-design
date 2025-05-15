<template>
  <el-dialog
    class="attendance-dialog"
    :model-value="dialogAttendanceVisible"
    width="800px"
    :show-close="false"
    :close-on-click-modal="true"
    append-to-body
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="attendance-dialog-content-box">
      <el-calendar ref="calendar" v-model="currentDate" :disabled-date="disableFutureDates">
        <template #header="{ date }">
          <span>{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-month')"> 上个月 </el-button>
            <el-button size="small" @click="selectDate('today')"> 本月 </el-button>
          </el-button-group>
        </template>
        <template #date-cell="{ data }">
          <div
            class="date-cell"
            :class="{
              'future-date':
                !moment(data.day).isSame(currentDate, 'month') ||
                disableFutureDates(new Date(data.day))
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
            </div>
          </div>
        </template>
      </el-calendar>
      <!-- 签到区域 -->
      <div class="attendance-area">
        <el-tooltip
          content="今天您已经签过到啦~"
          :disabled="!appStore.useUserInfoStore.userIntegralInfo.isattendance"
        >
          <el-button
            class="sign-btn"
            type="primary"
            :disabled="appStore.useUserInfoStore.userIntegralInfo.isattendance"
            @click="signIn"
            ><img
              width="20"
              src="@/assets/images/jianB.png"
              alt="简币"
              title="简币 - 您的专属虚拟货币"
            /><span class="tips">{{
              appStore.useUserInfoStore.userIntegralInfo.isattendance ? '已签到' : '签到'
            }}</span></el-button
          >
        </el-tooltip>
        <el-divider />
        <!-- 日历 -->
        <div class="calendar-box">
          <div class="block-one ellipse"><div class="inner-ellipse"></div></div>
          <div class="block-two ellipse"><div class="inner-ellipse"></div></div>
          <div class="part-top">
            <span class="current-day">{{ currentDay }}</span>
            <span class="date">{{ currentDateStr }}</span>
          </div>
        </div>
        <!-- 随机话术 -->
        <div class="fortune-cookie">
          <p>{{ fortuneCookie || '我们终将会改变世界' }}</p>
        </div>
        <!-- logo宣传 -->
        <div class="logo-qrcode">
          <div class="left">
            <logo-com></logo-com>
            <p>扫描右方二维码加入交流群</p>
          </div>
          <div v-viewer class="logo-box">
            <img class="wx-qun" :src="wxQun" alt="微信交流群" title="微信交流群" loading="lazy" />
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

  // 切换月份时获取数据
  const selectDate = async (val: CalendarDateType) => {
    if (!calendar.value) return;

    // 更新当前日期
    calendar.value.selectDate(val);

    // 根据操作类型更新currentDate
    if (val === 'prev-month') {
      currentDate.value = moment(currentDate.value).subtract(1, 'month').toDate();
    } else if (val === 'today') {
      currentDate.value = new Date();
    }

    // 获取新月份的签到数据
    await fetchAttendanceData();
    // updateCurrentDateDisplay(); // 移除该调用
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
    currentDay.value = moment().format('DD');
    currentDateStr.value = moment().format('MMM YYYY');
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
</script>

<style lang="scss" scoped>
  .attendance-dialog-content-box {
    display: flex;
    padding: 0;
    border-radius: 8px;
    height: 450px;
  }

  .el-calendar {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background-color: #ffffff;
    :deep(.el-calendar__body) {
      flex: 1;
      padding: 10px !important;
      .el-calendar-table {
        height: 100%;
      }
    }
  }

  .date-cell {
    position: relative;
    height: 100%;
    padding: 5px;
    background: rgba(245, 245, 245, 0.5);

    &.future-date {
      background: rgba(245, 245, 245, 0.8);
      .text {
        color: #999 !important;
      }
      .unsigned-status {
        opacity: 0.4;
      }
    }

    .text {
      font-size: 14px;
      color: #606266;
      text-align: center;
      margin-bottom: 2px;
    }

    .signed-status,
    .unsigned-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .status-text {
      font-size: 12px;
      line-height: 1;
    }

    .signed-status .status-text {
      color: #409eff;
    }

    .unsigned-status .status-text {
      color: rgba(0, 0, 0, 0.3);
    }

    .sign-icon,
    img {
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
    }

    &:hover {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      .text {
        color: #333333;
      }

      .unsigned-status {
        opacity: 0.6;
      }
    }
  }

  .attendance-area {
    display: flex;
    flex-direction: column;
    .sign-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 240px;
      height: 56px;
      border-radius: 4px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      background-color: #1e80ff;
      box-shadow: 0 0 16px rgba(30, 128, 255, 0.24);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 2px;
      &:hover {
        background-color: #409eff;
        box-shadow: 0 0 16px rgba(64, 158, 255, 0.32);
      }
      img {
        margin-right: 4px;
        margin-top: 2px;
      }
      .tips {
        margin-left: 4px;
      }
    }
    .calendar-box {
      width: 240px;
      box-sizing: border-box;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      position: relative;

      .ellipse {
        width: 12px;
        height: 20px;
        padding: 2px;
        border-radius: 50px;
        background-color: #fff;
        transform: translateY(-50%);
        box-sizing: border-box;
        .inner-ellipse {
          width: 100%;
          height: 100%;
          border-radius: 50px;
          background-color: #6aa1ff;
        }
      }
      .block-one {
        position: absolute;
        left: 56px;
      }
      .block-two {
        position: absolute;
        right: 56px;
      }
      .part-top {
        padding: 30px 0 30px 24px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        box-sizing: border-box;
        background-image: url(@/assets/images/home/calendar.png);
        background-repeat: no-repeat;
        color: #e8f3ff;
        background-size: 100% 158px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        .current-day {
          line-height: 74px;
          font-size: 57px;
          font-weight: 700;
        }
      }
    }
    .fortune-cookie {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      border: 1px solid #e5e6eb;
      p {
        font-size: 20px;
        font-weight: 600;
        background: -webkit-linear-gradient(top, #f76767, #09c609);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: 1px;
      }
    }
    .logo-qrcode {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 85px;
      padding: 16px;
      background-color: #f7f8fa;
      border: 1px solid #e5e6eb;
      border-top: none;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      .left {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .logo {
          height: 60%;
        }
        p {
          font-size: 12px;
          font-weight: 400;
          color: #86909c;
          margin-bottom: 3px;
        }
      }
      .logo-box {
        .wx-qun {
          height: 50px;
          width: 50px;
        }
      }
    }
  }

  :deep(.el-calendar__header) {
    background: #f1eeee;
    border-bottom: 1px solid #ebeef5;
    padding: 12px 20px;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.el-calendar-day) {
    height: 100%;
    padding: 5px 3px;
    background: #ffffff;
  }
</style>
<style lang="scss">
  .attendance-dialog {
    .el-dialog__header {
      display: none !important;
    }
  }
</style>
