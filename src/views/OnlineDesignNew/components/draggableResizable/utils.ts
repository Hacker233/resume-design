import { ContainerProvider, ParentSize, ReferenceLineMap, ResizingHandle } from './types';
import { ALL_HANDLES } from './Vue3DraggableResizable';

export const IDENTITY = Symbol('Vue3DraggableResizable');

export function getElSize(el: Element) {
  const style = window.getComputedStyle(el);
  return {
    width: parseFloat(style.getPropertyValue('width')),
    height: parseFloat(style.getPropertyValue('height'))
  };
}

function createEventListenerFunction(type: 'addEventListener' | 'removeEventListener') {
  return <K extends keyof HTMLElementEventMap>(el: HTMLElement, events: K | K[], handler: any) => {
    if (!el) {
      return;
    }
    if (typeof events === 'string') {
      events = [events];
    }
    events.forEach((e) => el[type](e, handler, { passive: false }));
  };
}

export const addEvent = createEventListenerFunction('addEventListener');

export const removeEvent = createEventListenerFunction('removeEventListener');

export function filterHandles(handles: ResizingHandle[]) {
  if (handles && handles.length > 0) {
    const result: ResizingHandle[] = [];
    handles.forEach((item) => {
      if (ALL_HANDLES.includes(item) && !result.includes(item)) {
        result.push(item);
      }
    });
    return result;
  } else {
    return [];
  }
}

export function getId() {
  return String(Math.random()).substr(2) + String(Date.now());
}

export function getReferenceLineMap(
  containerProvider: ContainerProvider,
  parentSize: ParentSize,
  id?: string
) {
  if (containerProvider.disabled.value) {
    return null;
  }
  const referenceLine = {
    row: [] as number[],
    col: [] as number[]
  };
  const { parentWidth, parentHeight } = parentSize;
  referenceLine.row.push(...containerProvider.adsorbRows);
  referenceLine.col.push(...containerProvider.adsorbCols);
  if (containerProvider.adsorbParent.value) {
    referenceLine.row.push(0, parentHeight.value, parentHeight.value / 2);
    referenceLine.col.push(0, parentWidth.value, parentWidth.value / 2);
  }
  const widgetPositionStore = containerProvider.getPositionStore(id);
  Object.values(widgetPositionStore).forEach(({ x, y, w, h }) => {
    referenceLine.row.push(y, y + h, y + h / 2);
    referenceLine.col.push(x, x + w, x + w / 2);
  });
  const referenceLineMap: ReferenceLineMap = {
    row: referenceLine.row.reduce((pre, cur) => {
      return { ...pre, [cur]: { min: cur - 5, max: cur + 5, value: cur } };
    }, {}),
    col: referenceLine.col.reduce((pre, cur) => {
      return { ...pre, [cur]: { min: cur - 5, max: cur + 5, value: cur } };
    }, {})
  };
  return referenceLineMap;
}
