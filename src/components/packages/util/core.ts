/* 
  防抖：在第一次触发事件时，不立即执行函数，而是给出一个限定值，比如200ms，然后：
    如果在200ms内没有再次触发事件，那么执行函数
    如果在200ms内再次触发函数，那么当前的计时取消，重新开始计时
    应用场景：
      点击按钮提交表单
      输入框中频繁的输入内容，搜索或者提交信息
      频繁的点击按钮，触发某个事件
      监听浏览器滚定事件，完成某些特定操作
      用户缩放浏览器的resize 事件
  
  节流：
      如果短时间内大量触发同一事件，那么在函数执行一次之后，
      该函数在指定的时间期限内不在工作，直至过了这段时间才重新生效
    应用场景：
      监听页面的滚定事件
      鼠标移动事件
      搜索框input事件，要支持实时搜索可以使用节流方案
      用户频繁点击按钮操作
      游戏中的一些设计
    效果：在某个时间内(比如500ms)，某个函数只能被触发一次
*/

/* 防抖和节流的作用：都是为了避免一段代码高频率无意义的触发，减少浏览器或者服务器的负担
防抖和节流的区别：
防抖：防止代码多频次执行造成页面抖动，在一定时间内，代码多次触发会销毁之前的执行过程
节流：指定时间持续触发某个事件时，该事件只会执行首次触发事件，也就是说指定时间内只会触发一次 */

/**
 * 防抖
 * 当触发一个函数时，并不会立即执行这个函数，而是会延迟（通过定时器来延迟函数的执行）
 * 如果在延迟时间内，有重新触发函数，那么取消上一次的函数执行（取消定时器）；
 * 如果在延迟时间内，没有重新触发函数，那么这个函数就正常执行（执行传入的函数）
 * debounce(() => console.log('fn 防抖执行了'), 1000)
 * @param fn
 * @param delay
 * @returns
 */
const debounce = (fn: (...args: any) => void, delay = 200) => {
  let timer: any = null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * 节流
 * 指定时间持续触发某个事件时，该事件只会执行首次触发事件，也就是说指定时间内只会触发一次
 * @param fn
 * @param duration
 * @returns
 */
const throttle = (fn: (...args: any) => void, duration = 500) => {
  let timer: any = null;
  return (...args: any) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, duration);
  };
};

export { debounce, throttle };
