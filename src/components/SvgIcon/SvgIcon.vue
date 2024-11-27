<template>
  <svg :class="svgClass" aria-hidden="true" @mouseover="mouseover" @mouseleave="mouseleave">
    <use :xlink:href="iconClassName" :fill="defaultColor" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps({
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#409eff'
    },
    size: {
      type: String,
      default: '14px'
    },
    hoverColor: {
      type: String,
      default: ''
    },
    isHover: {
      type: Boolean,
      default: false
    }
  });
  const iconClassName = computed(() => {
    return `#${props.iconName}`;
  });
  const svgClass = computed(() => {
    if (props.className) {
      return `svg-icon ${props.className}`;
    }
    return 'svg-icon';
  });

  watch(
    () => props.color,
    (newVal) => {
      if (newVal) {
        defaultColor.value = newVal;
      }
    }
  );

  const defaultColor = ref<any>(props.color);
  const mouseover = () => {
    if (props.isHover) {
      defaultColor.value = props.hoverColor || '#2ddd9d';
    }
    return;
  };
  const mouseleave = () => {
    if (props.isHover) {
      defaultColor.value = props.color;
    }
    return;
  };
</script>

<style scoped lang="scss">
  .svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
    font-size: v-bind('props.size');
    outline: none;
  }
</style>
