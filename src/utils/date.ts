/**
 * 处理项目中常见的时间函数
 */

type DateRange = [Date, Date];

/**
 * @desc 获取今天时间区间
 * @returns {DateRange}
 */
function getTodayRange(): DateRange {
  const start = new Date();
  const end = new Date();
  start.setHours(0, 0, 0, 1);
  end.setHours(23, 59, 59, 999);

  return [start, end];
}

/**
 * @desc 获取本周时间区间
 * @returns {DateRange}
 */
function getWeekRange(): DateRange {
  const [start, end] = getTodayRange();

  const todayOfWeek = start.getDay();
  const nowDay = start.getDate();

  start.setDate(nowDay - todayOfWeek + 1);
  end.setDate(nowDay + (7 - todayOfWeek));

  return [start, end];
}

/**
 * @desc 获取本月时间区间 当月一号 - 当月月尾
 * @returns {DateRange}
 */
function getMonthRange(): DateRange {
  const [start, end] = getTodayRange();

  start.setDate(1);
  const currentMonth = start.getMonth();
  const nextMonth = currentMonth + 1;

  const nextMonthFirstDay = new Date(start.getFullYear(), nextMonth, 1);
  const oneDayTimeStamp = 86400000; // 1000 * 60 * 60 * 24
  const lastTime = new Date(nextMonthFirstDay.valueOf() - oneDayTimeStamp);
  const lastDay = lastTime.getDate();

  end.setDate(lastDay);
  return [start, end];
}

/**
 * @desc 获取当年时间区间
 * @returns {DateRange}
 */
function getYearRange(): DateRange {
  const [start, end] = getMonthRange();
  start.setMonth(0);
  end.setMonth(11, 31);
  return [start, end];
}

export { getTodayRange, getWeekRange, getMonthRange, getYearRange };
