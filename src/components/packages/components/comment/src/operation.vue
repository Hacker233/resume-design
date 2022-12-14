<template>
  <el-popover
    v-if="str(user.id) === uid"
    ref="popoverRef"
    placement="bottom-end"
    popper-class="operatoin-popover"
    trigger="click"
  >
    <ul class="operation-list select-none">
      <li v-if="false" :class="{ active: active }" class="operation-option" @click="rawReport">
        <u-icon>
          <svg viewBox="0 0 1127 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1612">
            <path
              d="M1108.468296 824.890547C1159.055032 910.219597 1097.227863 1024 990.429373 1024L130.432879 1024C29.258031 1024-32.574625 910.219597 18.012112 824.890547L450.825613 68.266574C473.306472 22.754136 518.276424 0 563.240888 0 608.209469 0 653.173934 22.754136 675.660283 68.266574L1108.468296 824.890547 1108.468296 824.890547 1108.468296 824.890547 1108.468296 824.890547ZM1020.384123 877.110641 1019.583053 875.735153 586.77504 119.111177 583.854223 113.62523C580.333998 106.500274 573.244216 102.4 563.240888 102.4 553.240806 102.4 546.151071 106.500212 542.636068 113.61633L539.710577 119.111663 106.096287 877.110641C95.301134 895.319767 109.937021 921.6 130.432879 921.6L990.429373 921.6C1016.30634 921.6 1031.298263 895.520476 1020.384123 877.110641L1020.384123 877.110641 1020.384123 877.110641 1020.384123 877.110641ZM558.08319 307.2C532.482248 307.2 512 322.819385 512 342.344809L512 579.251379C512 598.776801 532.482248 614.4 558.08319 614.4L568.321812 614.4C593.922749 614.4 614.4 598.776801 614.4 579.251379L614.4 342.344809C614.4 322.819385 593.922749 307.2 568.321812 307.2L558.08319 307.2 558.08319 307.2 558.08319 307.2 558.08319 307.2ZM512 766.885176C512 780.001705 517.522432 793.032632 526.999818 802.305669 536.477199 811.577487 549.797038 816.975247 563.200625 816.975247 576.602962 816.975247 589.927798 811.577487 599.405184 802.305669 608.882565 793.032632 614.4 780.001705 614.4 766.885176 614.4 753.772319 608.882565 740.741391 599.405184 731.469573 589.927798 722.19776 576.602962 716.8 563.200625 716.8 549.797038 716.8 536.477199 722.19776 526.999818 731.469573 517.522432 740.741391 512 753.772319 512 766.885176L512 766.885176 512 766.885176 512 766.885176Z"
              p-id="1613"
            ></path>
          </svg>
        </u-icon>
        <span>举报</span>
      </li>
      <li
        v-if="str(user.id) === uid"
        class="operation-option"
        :class="{ active: active }"
        @click="rawRemove"
      >
        <u-icon>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1750">
            <path
              d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004zM415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004zM928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123zM736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
              p-id="1751"
            ></path>
          </svg>
        </u-icon>
        <span>删除</span>
      </li>
    </ul>
    <template #reference>
      <div class="operation-warp" :class="{ 'operation-parent': parentId == null }">
        <u-icon>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z"
              fill="currentColor"
            ></path>
          </svg>
        </u-icon>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { ContentBoxParam, InjectionContentBox } from '@/components/packages/components/index';
  import { PopoverInstance } from 'element-plus';
  import { str } from '@/components/packages/util/index';

  interface Props {
    //评论id
    id: string;
    //父id
    parentId: string | null;
    //用户id
    uid: string;
  }

  const active = ref(false);
  const popoverRef = ref<PopoverInstance>();

  const props = defineProps<Props>();

  const { user, report, remove } = inject(InjectionContentBox) as ContentBoxParam;

  const close = () => {
    popoverRef.value?.hide();
  };

  const rawReport = () => {
    active.value = true;
    close();
    report(props.id, () => {
      active.value = false;
    });
  };

  const rawRemove = () => {
    active.value = true;
    close();
    remove(props.id, props.parentId, () => {
      active.value = false;
    });
  };
</script>

<style lang="scss">
  .el-popover.operatoin-popover {
    padding: 0px !important;
    width: 90px !important;
    min-width: 90px !important;
  }
</style>
<style lang="scss" scoped>
  .active {
    pointer-events: none;
  }
  .operation-list {
    padding: 5px 0;
    margin: 0;
    list-style: none;
    .operation-option {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 32px;
      cursor: pointer;

      .u-icon {
        margin-right: 5px;
      }

      &:hover {
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
      }
    }
  }
  .operation-warp {
    position: absolute;
    right: 0;
    font-size: 16px;
    color: #9499a0;
    cursor: pointer;
  }
  .operation-warp:hover {
    color: #00aeec;
  }

  .operation-parent {
    right: 16px;
  }

  .action-operation {
    display: block;
  }
</style>
