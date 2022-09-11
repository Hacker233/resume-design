<!-- 主题色选择组件 -->
<template>
  <div class="color-picker-box">
    <el-tooltip content="自定义主题色">
      <div class="item-box">
        <color-picker :hex="modelValue" @change="changeColorPicker"></color-picker>
      </div>
    </el-tooltip>
    <div v-for="(item, index) in colorList" :key="item.hex" :class="['item-box']">
      <span
        :class="['item', { active: index === curentIndex || modelValue === item.hex }]"
        :style="{
          'background-color': item.hex
        }"
        @click="changTheme(index, item)"
      ></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits(['update:modelValue', 'change']);

  // 颜色列表
  const colorList = reactive<Array<{ rgb: string; hex: string }>>([
    {
      rgb: 'rgb(37,70,101)',
      hex: '#254665'
    },
    {
      rgb: 'rgb(221,65,94)',
      hex: '#dd415e'
    },
    {
      rgb: 'rgb(150,122,91)',
      hex: '#967a5b'
    },
    {
      rgb: 'rgb(51,144,205)',
      hex: '#3390cd'
    },
    {
      rgb: 'rgb(245,79,79)',
      hex: '#f54f4f'
    },
    {
      rgb: 'rgb(77,77,77)',
      hex: '#4d4d4d'
    },
    {
      rgb: 'rgb(170,132,96)',
      hex: '#aa8460'
    },
    {
      rgb: 'rgb(118,186,49)',
      hex: '#76ba31'
    },
    {
      rgb: 'rgb(100,126,201)',
      hex: '#647ec9'
    }
  ]);

  // 更改主题色
  const curentIndex = ref<number>(-1);
  const changTheme = (index: number, item: { rgb: string; hex: string }) => {
    curentIndex.value = index;
    emit('update:modelValue', item.hex);
    emit('change', item);
  };

  // 颜色选择器颜色改变
  const changeColorPicker = (e: any) => {
    curentIndex.value = -1;
    emit('update:modelValue', e.hex);
    emit('change', e);
  };
</script>
<style lang="scss" scoped>
  .color-picker-box {
    display: flex;
    flex-wrap: wrap;
    height: 60px;
    align-content: space-between;
    user-select: none;
    .item-box {
      width: 30px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .active {
      background-color: rgb(214, 21, 4);
      box-shadow: rgb(99, 100, 99) 0px 0px 10px;
    }
    :deep(.zs-color-picker) {
      border-radius: 50%;
      .zs-color-picker-btn {
        border-radius: 50%;
        .zs-color-picker-btn-color {
          border-radius: 50%;
        }
      }
    }
  }
</style>
