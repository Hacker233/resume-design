import WEB_DEVELOP from './web/web-develop.vue';

const componentList: Array<any> = [WEB_DEVELOP];

export default {
  install(app: any) {
    componentList.map((component) => {
      app.component(component.name, component);
    });
  }
};
