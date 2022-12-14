import { isArray } from '.';

/**
 * @param data
 * @returns
 *
 * 适用于任何数组和对象的深拷贝
 * const arr = [1, 2, 3, { a: "b" }, [{ c: "d" }]];
 * const cloneArr = cloneDeep(arr);
 *
 * cloneArr[3].a = "u";
 * cloneArr[4][0].c = "uu";
 *
 * console.log(arr); // [1, 2, 3, { a: "b" }, [{ c: "d" }]]
 * console.log(cloneArr); // [1, 2, 3, { a: "u" }, [{ c: "uu" }]]
 */
export function cloneDeep(data: any) {
  // 判断传入的值类型
  if (!data) {
    return data;
  }
  if (typeof data !== 'object') return data;
  if (data.constructor === Date) return new Date(data);
  if (data.constructor === RegExp) return new RegExp(data);

  // 开始克隆
  const clone: any = Array.isArray(data) ? [] : {};
  for (const key in data) {
    // 不克隆原型链上的属性和方法
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === 'object') {
        clone[key] = cloneDeep(data[key]);
      } else {
        clone[key] = data[key];
      }
    }
  }
  return clone;
}

// const obj = {
//   name: '张三'
// } as any
// const str = 'username'
// obj[str] = '李明'
// console.log(obj[str])

/**
 * 数组结构转换树型结构
 * @param list
 * @param param: { parentId: string, children: string } //parentId 判断条件属性名， children转换树型结构合并成数组的属性名
 * @returns
 */
export function deepTree(list: any[], { parentId = 'parentId', children = 'children' }) {
  list = cloneDeep(list);
  const newList: any[] = [];
  const map: any = {};

  list.forEach((e) => (map[e.id] = e));

  list.forEach((e) => {
    const parent = map[e[parentId]];

    if (parent) {
      (parent[children] || (parent[children] = [])).push(e);
    } else {
      newList.push(e);
    }
  });

  return newList;
}

/**
 * 树型结构转换为数组结构
 * @param list
 * @param param: { parentId: string, children: string} //parentId 判断条件属性名， children转换数据结构拆分对象的属性名
 * @returns
 */
export function revDeepTree(list: any[] = [], { parentId = 'parentId', children = 'children' }) {
  const d: any[] = [];

  const deep = (list: any[], id: any) => {
    list.forEach((e) => {
      if (!e.id) {
        e.id = id++;
      }

      e[parentId] = id;

      d.push(e);

      if (e[children] && isArray(e[children])) {
        deep(e[children], e.id);
      }
    });
  };

  deep(list || [], null);

  return d;
}

//将array递归为一维数组。
// export function flattenDeep(arr: any[], result: any[] = []) {
//   let len = arr.length
//   for (let i = 0; i < len; i++) {
//     if (Array.isArray(arr[i])) {
//       flattenDeep(arr[i], result)
//     } else {
//       result.push(arr[i])
//     }
//   }
//   return result
// }

/**
 *
 * @param arr
 * @param depth
 * @returns
 *
 * 无穷数(Infinity)
 * 将array递归为一维数组。
 * const array = [1,2,[1,2]];
 * console.log(array.flattenDeep(Infinity));  // [1,2,1,2]
 */
export const flattenDeep = (arr: any[], depth = Infinity) => {
  return arr.flat(depth);
};
