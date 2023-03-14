import { defineComponent, ref, toRef, h, Ref, inject } from 'vue';
import {
  initDraggableContainer,
  watchProps,
  initState,
  initParent,
  initLimitSizeAndMethods,
  initResizeHandle
} from './hooks';
import './index.css';
import { getElSize, filterHandles, IDENTITY } from './utils';
import {
  UpdatePosition,
  GetPositionStore,
  ResizingHandle,
  ContainerProvider,
  SetMatchedLine
} from './types';

export const ALL_HANDLES: ResizingHandle[] = ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'];

const VdrProps = {
  initW: {
    type: Number,
    default: null
  },
  initH: {
    type: Number,
    default: null
  },
  w: {
    type: Number,
    default: 0
  },
  h: {
    type: Number,
    default: 0
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: Number,
    default: 0
  },
  rotate: {
    type: Number,
    default: 0
  },
  draggable: {
    type: Boolean,
    default: true
  },
  resizable: {
    type: Boolean,
    default: true
  },
  disabledX: {
    type: Boolean,
    default: false
  },
  disabledY: {
    type: Boolean,
    default: false
  },
  disabledW: {
    type: Boolean,
    default: false
  },
  disabledH: {
    type: Boolean,
    default: false
  },
  minW: {
    type: Number,
    default: 20
  },
  minH: {
    type: Number,
    default: 20
  },
  active: {
    type: Boolean,
    default: false
  },
  parent: {
    type: Boolean,
    default: false
  },
  handles: {
    type: Array,
    default: ALL_HANDLES,
    validator: (handles: ResizingHandle[]) => {
      return filterHandles(handles).length === handles.length;
    }
  },
  classNameDraggable: {
    type: String,
    default: 'draggable'
  },
  classNameResizable: {
    type: String,
    default: 'resizable'
  },
  classNameDragging: {
    type: String,
    default: 'dragging'
  },
  classNameResizing: {
    type: String,
    default: 'resizing'
  },
  classNameActive: {
    type: String,
    default: 'active'
  },
  classNameHandle: {
    type: String,
    default: 'handle'
  },
  lockAspectRatio: {
    type: Boolean,
    default: false
  }
};

const emits = [
  'activated',
  'deactivated',
  'drag-start',
  'resize-start',
  'dragging',
  'resizing',
  'drag-end',
  'resize-end',
  'update:w',
  'update:h',
  'update:x',
  'update:y',
  'update:active'
];

const VueDraggableResizable = defineComponent({
  name: 'Vue3DraggableResizable',
  props: VdrProps,
  emits: emits,
  setup(props, { emit }) {
    const containerProps = initState(props, emit);
    const provideIdentity = inject('identity');
    let containerProvider: ContainerProvider | null = null;
    if (provideIdentity === IDENTITY) {
      containerProvider = {
        updatePosition: inject<UpdatePosition>('updatePosition')!,
        getPositionStore: inject<GetPositionStore>('getPositionStore')!,
        disabled: inject<Ref<boolean>>('disabled')!,
        adsorbParent: inject<Ref<boolean>>('adsorbParent')!,
        adsorbCols: inject<number[]>('adsorbCols')!,
        adsorbRows: inject<number[]>('adsorbRows')!,
        setMatchedLine: inject<SetMatchedLine>('setMatchedLine')!
      };
    }
    const containerRef = ref<HTMLElement>();
    const parentSize = initParent(containerRef);
    const limitProps = initLimitSizeAndMethods(props, parentSize, containerProps);
    initDraggableContainer(
      containerRef,
      containerProps,
      limitProps,
      toRef(props, 'draggable'),
      emit,
      containerProvider,
      parentSize
    );
    const resizeHandle = initResizeHandle(containerProps, limitProps, parentSize, props, emit);
    watchProps(props, limitProps);
    return {
      containerRef,
      containerProvider,
      ...containerProps,
      ...parentSize,
      ...limitProps,
      ...resizeHandle
    };
  },
  computed: {
    style(): { [propName: string]: string | number } {
      return {
        width: this.width + 2 + 'px',
        height: this.height + 2 + 'px',
        top: this.top + 'px',
        left: this.left + 'px',
        'z-index': this.zIndex,
        transform: `rotate(${this.rotate}deg)`
      };
    },
    klass(): { [propName: string]: string | boolean } {
      return {
        [this.classNameActive]: this.enable,
        [this.classNameDragging]: this.dragging,
        [this.classNameResizing]: this.resizing,
        [this.classNameDraggable]: this.draggable,
        [this.classNameResizable]: this.resizable
      };
    }
  },
  mounted() {
    if (!this.containerRef) return;
    this.containerRef.ondragstart = () => false;
    const { width, height } = getElSize(this.containerRef);
    this.setWidth(this.initW === null ? this.w || width : this.initW);
    this.setHeight(this.initH === null ? this.h || height : this.initH);
    if (this.containerProvider) {
      this.containerProvider.updatePosition(this.id, {
        x: this.left,
        y: this.top,
        w: this.width,
        h: this.height
      });
    }
  },
  render() {
    return h(
      'div',
      {
        ref: 'containerRef',
        class: ['vdr-container', this.klass],
        style: this.style
      },
      [
        this.$slots.default && this.$slots.default(),
        ...this.handlesFiltered.map((item) =>
          h('div', {
            class: [
              'vdr-handle',
              'vdr-handle-' + item,
              this.classNameHandle,
              `${this.classNameHandle}-${item}`
            ],
            style: { display: this.enable ? 'block' : 'none' },
            onMousedown: (e: MouseEvent) => this.resizeHandleDown(e, <ResizingHandle>item),
            onTouchstart: (e: TouchEvent) => this.resizeHandleDown(e, <ResizingHandle>item)
          })
        )
      ]
    );
  }
});

export default VueDraggableResizable;
