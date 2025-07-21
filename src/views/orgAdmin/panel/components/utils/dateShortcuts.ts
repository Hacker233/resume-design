import moment from 'moment';

export const DATE_SHORTCUTS = [
  {
    text: '当日',
    value: () => {
      const start = moment().startOf('day');
      const end = moment().endOf('day');
      return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
  },
  {
    text: '当月',
    value: () => {
      const start = moment().startOf('month');
      const end = moment().endOf('month');
      return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
  },
  {
    text: '上个月',
    value: () => {
      const start = moment().subtract(1, 'month').startOf('month');
      const end = moment().subtract(1, 'month').endOf('month');
      return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
  },
  {
    text: '最近一周',
    value: () => {
      const end = moment().endOf('day');
      const start = moment().subtract(7, 'days').startOf('day');
      return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
  },
  {
    text: '最近一月',
    value: () => {
      const end = moment().endOf('day');
      const start = moment().subtract(30, 'days').startOf('day');
      return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
  },
  {
    text: '最近一年',
    value: () => {
      const end = moment().endOf('day');
      const start = moment().subtract(365, 'days').startOf('day');
      return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
  }
];
