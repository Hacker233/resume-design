// 模板组件
import Template1Vue from '@/template/template1/template1.vue'; // 前端开发简历模板组件
import Template2Vue from '@/template/template2/template2.vue';
import template3Vue from '@/template/template3/template3.vue';
import CustomTemplate from '@/template/custom/index.vue';

const componentList: Array<any> = [Template1Vue, Template2Vue, template3Vue, CustomTemplate];

export default {
  install(app: any) {
    componentList.map((component) => {
      app.component(component.name, component);
    });
  }
};
