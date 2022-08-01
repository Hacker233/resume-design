import { computed, onBeforeUnmount, ref, watch } from 'vue';

/**
 * 倒计时 hook
 * @author lewinloo
 * @returns
 */
export function useCountdown() {
  const countdown = ref(-1);
  const isEnd = computed(() => countdown.value === -1);
  let timer: NodeJS.Timer | null = null;

  watch(
    () => countdown.value,
    () => {
      if (timer || countdown.value === -1) return;

      timer = setInterval(() => {
        if (countdown.value === 0) {
          clearInterval(timer as NodeJS.Timer);
          timer = null;
          countdown.value = -1;
          return;
        }
        countdown.value = countdown.value - 1;
      }, 1000);
    },
    { immediate: false }
  );

  onBeforeUnmount(() => {
    clearInterval(timer as NodeJS.Timer);
    timer = null;
  });

  return { countdown, isEnd };
}
