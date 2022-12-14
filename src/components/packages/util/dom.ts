import { h, render, DefineComponent } from 'vue';

/**
 * 创建node节点
 * @param dom 目标dom
 * @param options 参数
 * @returns
 */
export function createGlobalNode(dom: DefineComponent<{}, {}, any>, options: object) {
  // 根据components定义生成虚拟DOM
  const vnode = h(dom, options);
  // 需要创建一个容器div来渲染这个虚拟节点
  const div = document.createElement('div');
  // 然后将container append 到body上面
  document.body.append(div);
  // 这样就成功将虚拟节点渲染到 div
  render(vnode, div);
  return { vnode, div };
}

/**
 * 移除元素
 * @param el 需要移除的元素
 */
export function removeGlobalNode(el: HTMLElement) {
  try {
    el && el.remove();
  } catch (e) {}
}
