<template>
  <div v-if="titles.length" class="catalog-card">
    <div class="catalog-card-header">
      <div>
        <svg-icon
          icon-name="icon-mulu"
          color="#4c4948"
          size="18px"
          class-name="catalog-icon"
        ></svg-icon>
        <span>目录</span>
      </div>
      <!-- <span class="progress">{{ progress }}</span> -->
    </div>

    <div class="catalog-content">
      <div
        v-for="title in titles"
        v-show="title.isVisible"
        :key="title.id"
        :class="['catalog-item', currentTitle.id == title.id ? 'active' : 'not-active']"
        :style="{ marginLeft: title.level * 20 + 'px' }"
        :title="title.rawName"
        @click="scrollToView(title.scrollTop)"
      >
        {{ title.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface ICatalog {
    container: any;
  }
  const props = withDefaults(defineProps<ICatalog>(), {
    container: '.article-content'
  });

  let titles = ref<any>([]);
  let currentTitle = reactive<any>({});
  let progress = ref<number | string>(0);
  const DOM = ref<any>(null);

  // 获取目录的标题
  const getTitles = () => {
    let titleList: any = [];
    let levels = ['h1', 'h2', 'h3', 'h4', 'h5'];
    console.log('标题', levels);
    DOM.value = document.querySelector(props.container);
    if (!DOM.value) {
      return titleList;
    }
    let elements = Array.from(DOM.value.querySelectorAll('*'));

    // 调整标签等级
    let tagNames = new Set(elements.map((el: any) => el.tagName.toLowerCase()));
    for (let i = levels.length - 1; i >= 0; i--) {
      if (!tagNames.has(levels[i])) {
        levels.splice(i, 1);
      }
    }

    let serialNumbers = levels.map(() => 0);
    for (let i = 0; i < elements.length; i++) {
      const element: any = elements[i];
      let tagName = element.tagName.toLowerCase();
      let level = levels.indexOf(tagName);
      if (level == -1) continue;

      let id = tagName + '-' + element.innerText + '-' + i;
      let node = {
        id,
        level,
        parent: null,
        children: [],
        rawName: element.innerText,
        scrollTop: element.offsetTop,
        isVisible: false,
        name: ''
      };

      if (titleList.length > 0) {
        let lastNode = titleList.at(-1);

        // 遇到子标题
        if (lastNode.level < node.level) {
          node.parent = lastNode;
          lastNode.children.push(node);
        }
        // 遇到上一级标题
        else if (lastNode.level > node.level) {
          serialNumbers.fill(0, level + 1);
          let parent = lastNode.parent;
          while (parent) {
            if (parent.level < node.level) {
              parent.children.push(node);
              node.parent = parent;
              break;
            }
            parent = parent.parent;
          }
        }
        // 遇到平级
        else if (lastNode.parent) {
          node.parent = lastNode.parent;
          lastNode.parent.children.push(node);
        }
      }

      serialNumbers[level] += 1;
      let serialNumber = serialNumbers.slice(0, level + 1).join('.');

      node.isVisible = node.parent == null;
      node.name = serialNumber + '. ' + element.innerText;
      titleList.push(node);
    }

    titles.value = titleList;
  };

  // 监听滚动事件并更新样式
  window.addEventListener('scroll', function () {
    progress.value = parseInt(((window.scrollY / DOM.value.clientHeight) * 100).toString()) + '%';

    let visibleTitles = [];

    for (let i = titles.value.length - 1; i >= 0; i--) {
      const title = titles.value[i];
      if (title.scrollTop <= window.scrollY) {
        if (currentTitle.id === title.id) return;

        Object.assign(currentTitle, title);

        // 展开节点
        setChildrenVisible(title, true);
        visibleTitles.push(title);

        // 展开父节点
        let parent = title.parent;
        while (parent) {
          setChildrenVisible(parent, true);
          visibleTitles.push(parent);
          parent = parent.parent;
        }

        // 折叠其余节点
        for (const t of titles.value) {
          if (!visibleTitles.includes(t)) {
            setChildrenVisible(t, false);
          }
        }

        return;
      }
    }
  });

  // 设置子节点的可见性
  const setChildrenVisible = (title: { children: any }, isVisible: boolean) => {
    for (const child of title.children) {
      child.isVisible = isVisible;
    }
  };

  // 滚动到指定的位置
  const scrollToView = (scrollTop: any) => {
    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
  };

  defineExpose({
    getTitles
  });
</script>

<style lang="scss" scoped>
  .catalog-card {
    background: white;
    box-shadow: 0px 5 5 2px rgba(119, 136, 146, 0.14);
    padding: 20px 24px;
    flex: 1;
    margin-left: 20px;
    box-sizing: border-box;
    position: sticky;
    top: 90px;
  }

  .catalog-card-header {
    text-align: left !important;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .catalog-icon {
    font-size: 18px;
    margin-right: 10px;
  }

  .catalog-card-header div > span {
    font-size: 17px;
    color: #4c4948;
  }

  .progress {
    color: #a9a9a9;
    font-style: italic;
    font-size: 140%;
  }

  .catalog-content {
    max-height: calc(100vh - 120px);
    overflow: auto;
    margin-right: -24px;
    padding-right: 20px;
  }

  .catalog-item {
    color: #666261;
    margin: 5px 0;
    line-height: 28px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-size: 14px;
    padding: 2px 6px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    border-radius: 4px;

    &:hover {
      color: green;
    }
  }

  .active {
    background-color: #eee;
    color: green;

    &:hover {
      background-color: green;
      color: white;
    }
  }
</style>
