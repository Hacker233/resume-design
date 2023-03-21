import { onMounted, onUnmounted, ref, watch, Ref, computed } from 'vue';
import {
  getElSize,
  filterHandles,
  getId,
  getReferenceLineMap,
  addEvent,
  removeEvent
} from './utils';
import { ContainerProvider, MatchedLine, ReferenceLineMap, ResizingHandle } from './types';

type HandleEvent = MouseEvent | TouchEvent;

export function useState<T>(initialState: T): [Ref<T>, (value: T) => T] {
  const state = ref(initialState) as Ref<T>;
  const setState = (value: T): T => {
    state.value = value;
    return value;
  };
  return [state, setState];
}

export function initState(props: any, emit: any) {
  const [width, setWidth] = useState<number>(props.initW);
  const [height, setHeight] = useState<number>(props.initH);
  const [left, setLeft] = useState<number>(props.x);
  const [top, setTop] = useState<number>(props.y);
  const [enable, setEnable] = useState<boolean>(props.active);
  const [dragging, setDragging] = useState<boolean>(false);
  const [resizing, setResizing] = useState<boolean>(false);
  const [resizingHandle, setResizingHandle] = useState<ResizingHandle>('');
  const [resizingMaxWidth, setResizingMaxWidth] = useState<number>(Infinity);
  const [resizingMaxHeight, setResizingMaxHeight] = useState<number>(Infinity);
  const [resizingMinWidth, setResizingMinWidth] = useState<number>(props.minW);
  const [resizingMinHeight, setResizingMinHeight] = useState<number>(props.minH);
  const aspectRatio = computed(() => height.value / width.value);
  watch(
    width,
    (newVal) => {
      emit('update:w', newVal);
    },
    { immediate: true }
  );
  watch(
    height,
    (newVal) => {
      emit('update:h', newVal);
    },
    { immediate: true }
  );
  watch(top, (newVal) => {
    emit('update:y', newVal);
  });
  watch(left, (newVal) => {
    emit('update:x', newVal);
  });
  watch(enable, (newVal, oldVal) => {
    emit('update:active', newVal);
    if (!oldVal && newVal) {
      emit('activated');
    } else if (oldVal && !newVal) {
      emit('deactivated');
    }
  });
  watch(
    () => props.active,
    (newVal: boolean) => {
      setEnable(newVal);
    }
  );
  return {
    id: getId(),
    width,
    height,
    top,
    left,
    enable,
    dragging,
    resizing,
    resizingHandle,
    resizingMaxHeight,
    resizingMaxWidth,
    resizingMinWidth,
    resizingMinHeight,
    aspectRatio,
    setEnable,
    setDragging,
    setResizing,
    setResizingHandle,
    setResizingMaxHeight,
    setResizingMaxWidth,
    setResizingMinWidth,
    setResizingMinHeight,
    setWidth: (val: number) => setWidth(Math.floor(val)),
    setHeight: (val: number) => setHeight(Math.floor(val)),
    setTop: (val: number) => setTop(Math.floor(val)),
    setLeft: (val: number) => setLeft(Math.floor(val))
  };
}

export function initParent(containerRef: Ref<HTMLElement | undefined>) {
  const parentWidth = ref(0);
  const parentHeight = ref(0);
  onMounted(() => {
    if (containerRef.value && containerRef.value.parentElement) {
      const { width, height } = getElSize(containerRef.value.parentElement);
      parentWidth.value = width;
      parentHeight.value = height;
    }
  });
  return {
    parentWidth,
    parentHeight
  };
}

export function initLimitSizeAndMethods(
  props: any,
  parentSize: ReturnType<typeof initParent>,
  containerProps: ReturnType<typeof initState>
) {
  const {
    width,
    height,
    left,
    top,
    resizingMaxWidth,
    resizingMaxHeight,
    resizingMinWidth,
    resizingMinHeight
  } = containerProps;
  const { setWidth, setHeight, setTop, setLeft } = containerProps;
  const { parentWidth, parentHeight } = parentSize;
  const limitProps = {
    minWidth: computed(() => {
      return resizingMinWidth.value;
    }),
    minHeight: computed(() => {
      return resizingMinHeight.value;
    }),
    maxWidth: computed(() => {
      let max = Infinity;
      if (props.parent) {
        max = Math.min(parentWidth.value, resizingMaxWidth.value);
      }
      return max;
    }),
    maxHeight: computed(() => {
      let max = Infinity;
      if (props.parent) {
        max = Math.min(parentHeight.value, resizingMaxHeight.value);
      }
      return max;
    }),
    minLeft: computed(() => {
      return props.parent ? 0 : -Infinity;
    }),
    minTop: computed(() => {
      return props.parent ? 0 : -Infinity;
    }),
    maxLeft: computed(() => {
      return props.parent ? parentWidth.value - width.value : Infinity;
    }),
    maxTop: computed(() => {
      return props.parent ? parentHeight.value - height.value : Infinity;
    })
  };
  const limitMethods = {
    setWidth(val: number) {
      if (props.disabledW) {
        return width.value;
      }
      return setWidth(
        Math.min(limitProps.maxWidth.value, Math.max(limitProps.minWidth.value, val))
      );
    },
    setHeight(val: number) {
      if (props.disabledH) {
        return height.value;
      }
      return setHeight(
        Math.min(limitProps.maxHeight.value, Math.max(limitProps.minHeight.value, val))
      );
    },
    setTop(val: number) {
      if (props.disabledY) {
        return top.value;
      }
      return setTop(Math.min(limitProps.maxTop.value, Math.max(limitProps.minTop.value, val)));
    },
    setLeft(val: number) {
      if (props.disabledX) {
        return left.value;
      }
      return setLeft(Math.min(limitProps.maxLeft.value, Math.max(limitProps.minLeft.value, val)));
    }
  };
  return {
    ...limitProps,
    ...limitMethods
  };
}

const DOWN_HANDLES: (keyof HTMLElementEventMap)[] = ['mousedown', 'touchstart'];
const UP_HANDLES: (keyof HTMLElementEventMap)[] = ['mouseup', 'touchend'];
const MOVE_HANDLES: (keyof HTMLElementEventMap)[] = ['mousemove', 'touchmove'];

function getPosition(e: HandleEvent) {
  if ('touches' in e) {
    return [e.touches[0].pageX, e.touches[0].pageY];
  } else {
    return [e.pageX, e.pageY];
  }
}

export function initDraggableContainer(
  containerRef: Ref<HTMLElement | undefined>,
  containerProps: ReturnType<typeof initState>,
  limitProps: ReturnType<typeof initLimitSizeAndMethods>,
  draggable: Ref<boolean>,
  emit: any,
  containerProvider: ContainerProvider | null,
  parentSize: ReturnType<typeof initParent>
) {
  const { left: x, top: y, width: w, height: h, dragging, id } = containerProps;
  const { setDragging, setEnable, setResizing, setResizingHandle } = containerProps;
  const { setTop, setLeft } = limitProps;
  let lstX = 0;
  let lstY = 0;
  let lstPageX = 0;
  let lstPageY = 0;
  let referenceLineMap: ReferenceLineMap | null = null;
  const documentElement = document.documentElement;
  const _unselect = (e: HandleEvent) => {
    const target = e.target;
    if (!containerRef.value?.contains(<Node>target)) {
      setEnable(false);
      setDragging(false);
      setResizing(false);
      setResizingHandle('');
    }
  };
  const handleUp = () => {
    setDragging(false);
    // document.documentElement.removeEventListener('mouseup', handleUp)
    // document.documentElement.removeEventListener('mousemove', handleDrag)
    removeEvent(documentElement, UP_HANDLES, handleUp);
    removeEvent(documentElement, MOVE_HANDLES, handleDrag);
    referenceLineMap = null;
    if (containerProvider) {
      containerProvider.updatePosition(id, {
        x: x.value,
        y: y.value,
        w: w.value,
        h: h.value
      });
      containerProvider.setMatchedLine(null);
    }
  };
  const handleDrag = (e: MouseEvent) => {
    e.preventDefault();
    if (!(dragging.value && containerRef.value)) return;
    const [pageX, pageY] = getPosition(e);
    const deltaX = pageX - lstPageX;
    const deltaY = pageY - lstPageY;
    let newLeft = lstX + deltaX;
    let newTop = lstY + deltaY;
    if (referenceLineMap !== null) {
      const widgetSelfLine = {
        col: [newLeft, newLeft + w.value / 2, newLeft + w.value],
        row: [newTop, newTop + h.value / 2, newTop + h.value]
      };
      const matchedLine: unknown = {
        row: widgetSelfLine.row
          .map((i, index) => {
            let match = null;
            Object.values(referenceLineMap!.row).forEach((referItem) => {
              if (i >= referItem.min && i <= referItem.max) {
                match = referItem.value;
              }
            });
            if (match !== null) {
              if (index === 0) {
                newTop = match;
              } else if (index === 1) {
                newTop = Math.floor(match - h.value / 2);
              } else if (index === 2) {
                newTop = Math.floor(match - h.value);
              }
            }
            return match;
          })
          .filter((i) => i !== null),
        col: widgetSelfLine.col
          .map((i, index) => {
            let match = null;
            Object.values(referenceLineMap!.col).forEach((referItem) => {
              if (i >= referItem.min && i <= referItem.max) {
                match = referItem.value;
              }
            });
            if (match !== null) {
              if (index === 0) {
                newLeft = match;
              } else if (index === 1) {
                newLeft = Math.floor(match - w.value / 2);
              } else if (index === 2) {
                newLeft = Math.floor(match - w.value);
              }
            }
            return match;
          })
          .filter((i) => i !== null)
      };
      containerProvider!.setMatchedLine(matchedLine as MatchedLine);
    }
    emit('dragging', { x: setLeft(newLeft), y: setTop(newTop) });
  };
  const handleDown = (e: HandleEvent) => {
    if (!draggable.value) return;
    setDragging(true);
    lstX = x.value;
    lstY = y.value;
    lstPageX = getPosition(e)[0];
    lstPageY = getPosition(e)[1];
    // document.documentElement.addEventListener('mousemove', handleDrag)
    // document.documentElement.addEventListener('mouseup', handleUp)
    addEvent(documentElement, MOVE_HANDLES, handleDrag);
    addEvent(documentElement, UP_HANDLES, handleUp);
    if (containerProvider && !containerProvider.disabled.value) {
      referenceLineMap = getReferenceLineMap(containerProvider, parentSize, id);
    }
  };
  watch(dragging, (cur, pre) => {
    if (!pre && cur) {
      emit('drag-start', { x: x.value, y: y.value });
      setEnable(true);
      setDragging(true);
    } else {
      emit('drag-end', { x: x.value, y: y.value });
      setDragging(false);
    }
  });
  onMounted(() => {
    const el = containerRef.value;
    if (!el) return;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    // document.documentElement.addEventListener('mousedown', _unselect)
    // el.addEventListener('mousedown', handleDown)
    addEvent(documentElement, DOWN_HANDLES, _unselect);
    addEvent(el, DOWN_HANDLES, handleDown);
  });
  onUnmounted(() => {
    if (!containerRef.value) return;
    // document.documentElement.removeEventListener('mousedown', _unselect)
    // document.documentElement.removeEventListener('mouseup', handleUp)
    // document.documentElement.removeEventListener('mousemove', handleDrag)
    removeEvent(documentElement, DOWN_HANDLES, _unselect);
    removeEvent(documentElement, UP_HANDLES, handleUp);
    removeEvent(documentElement, MOVE_HANDLES, handleDrag);
  });
  return { containerRef };
}

export function initResizeHandle(
  containerProps: ReturnType<typeof initState>,
  limitProps: ReturnType<typeof initLimitSizeAndMethods>,
  parentSize: ReturnType<typeof initParent>,
  props: any,
  emit: any
) {
  const { setWidth, setHeight, setLeft, setTop } = limitProps;
  const { width, height, left, top, aspectRatio } = containerProps;
  const {
    setResizing,
    setResizingHandle,
    setResizingMaxWidth,
    setResizingMaxHeight,
    setResizingMinWidth,
    setResizingMinHeight
  } = containerProps;
  const { parentWidth, parentHeight } = parentSize;
  let lstW = 0;
  let lstH = 0;
  let lstX = 0;
  let lstY = 0;
  let lstPageX = 0;
  let lstPageY = 0;
  let tmpAspectRatio = 1;
  let idx0 = '';
  let idx1 = '';
  const documentElement = document.documentElement;
  const resizeHandleDrag = (e: HandleEvent) => {
    e.preventDefault();
    const [_pageX, _pageY] = getPosition(e);
    let deltaX = _pageX - lstPageX;
    let deltaY = _pageY - lstPageY;
    const _deltaX = deltaX;
    const _deltaY = deltaY;
    if (props.lockAspectRatio) {
      deltaX = Math.abs(deltaX);
      deltaY = deltaX * tmpAspectRatio;
      if (idx0 === 't') {
        if (_deltaX < 0 || (idx1 === 'm' && _deltaY < 0)) {
          deltaX = -deltaX;
          deltaY = -deltaY;
        }
      } else {
        if (_deltaX < 0 || (idx1 === 'm' && _deltaY < 0)) {
          deltaX = -deltaX;
          deltaY = -deltaY;
        }
      }
    }
    if (idx0 === 't') {
      setHeight(lstH - deltaY);
      setTop(lstY - (height.value - lstH));
    } else if (idx0 === 'b') {
      setHeight(lstH + deltaY);
    }
    if (idx1 === 'l') {
      setWidth(lstW - deltaX);
      setLeft(lstX - (width.value - lstW));
    } else if (idx1 === 'r') {
      setWidth(lstW + deltaX);
    }
    emit('resizing', {
      x: left.value,
      y: top.value,
      w: width.value,
      h: height.value
    });
  };
  const resizeHandleUp = () => {
    emit('resize-end', {
      x: left.value,
      y: top.value,
      w: width.value,
      h: height.value
    });
    setResizingHandle('');
    setResizing(false);
    setResizingMaxWidth(Infinity);
    setResizingMaxHeight(Infinity);
    setResizingMinWidth(props.minW);
    setResizingMinHeight(props.minH);
    // document.documentElement.removeEventListener('mousemove', resizeHandleDrag)
    // document.documentElement.removeEventListener('mouseup', resizeHandleUp)
    removeEvent(documentElement, MOVE_HANDLES, resizeHandleDrag);
    removeEvent(documentElement, UP_HANDLES, resizeHandleUp);
  };
  const resizeHandleDown = (e: HandleEvent, handleType: ResizingHandle) => {
    if (!props.resizable) return;
    e.stopPropagation();
    setResizingHandle(handleType);
    setResizing(true);
    idx0 = handleType[0];
    idx1 = handleType[1];
    if (aspectRatio.value) {
      if (['tl', 'tm', 'ml', 'bl'].includes(handleType)) {
        idx0 = 't';
        idx1 = 'l';
      } else {
        idx0 = 'b';
        idx1 = 'r';
      }
    }
    let minHeight = props.minH as number;
    let minWidth = props.minW as number;
    if (minHeight / minWidth > aspectRatio.value) {
      minWidth = minHeight / aspectRatio.value;
    } else {
      minHeight = minWidth * aspectRatio.value;
    }
    setResizingMinWidth(minWidth);
    setResizingMinHeight(minHeight);
    if (parent) {
      let maxHeight = idx0 === 't' ? top.value + height.value : parentHeight.value - top.value;
      let maxWidth = idx1 === 'l' ? left.value + width.value : parentWidth.value - left.value;
      if (props.lockAspectRatio) {
        if (maxHeight / maxWidth < aspectRatio.value) {
          maxWidth = maxHeight / aspectRatio.value;
        } else {
          maxHeight = maxWidth * aspectRatio.value;
        }
      }
      setResizingMaxHeight(maxHeight);
      setResizingMaxWidth(maxWidth);
    }
    lstW = width.value;
    lstH = height.value;
    lstX = left.value;
    lstY = top.value;
    const lstPagePosition = getPosition(e);
    lstPageX = lstPagePosition[0];
    lstPageY = lstPagePosition[1];
    tmpAspectRatio = aspectRatio.value;
    emit('resize-start', {
      x: left.value,
      y: top.value,
      w: width.value,
      h: height.value
    });
    // document.documentElement.addEventListener('mousemove', resizeHandleDrag)
    // document.documentElement.addEventListener('mouseup', resizeHandleUp)
    addEvent(documentElement, MOVE_HANDLES, resizeHandleDrag);
    addEvent(documentElement, UP_HANDLES, resizeHandleUp);
  };
  onUnmounted(() => {
    // document.documentElement.removeEventListener('mouseup', resizeHandleDrag)
    // document.documentElement.removeEventListener('mousemove', resizeHandleUp)
    removeEvent(documentElement, UP_HANDLES, resizeHandleUp);
    removeEvent(documentElement, MOVE_HANDLES, resizeHandleDrag);
  });
  const handlesFiltered = computed(() => (props.resizable ? filterHandles(props.handles) : []));
  return {
    handlesFiltered,
    resizeHandleDown
  };
}

export function watchProps(props: any, limits: ReturnType<typeof initLimitSizeAndMethods>) {
  const { setWidth, setHeight, setLeft, setTop } = limits;
  watch(
    () => props.w,
    (newVal: number) => {
      setWidth(newVal);
    }
  );
  watch(
    () => props.h,
    (newVal: number) => {
      setHeight(newVal);
    }
  );
  watch(
    () => props.x,
    (newVal: number) => {
      setLeft(newVal);
    }
  );
  watch(
    () => props.y,
    (newVal: number) => {
      setTop(newVal);
    }
  );
}
