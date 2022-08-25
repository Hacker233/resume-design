import CustomTemplate from '@/template/custom/index.vue';

const componentList: Array<any> = [CustomTemplate];

export default {
  install(app: any) {
    componentList.map((component) => {
      app.component(component.name, component);
    });
  }
};
