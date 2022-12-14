import { App } from 'vue';
import components from './components/components';
import './styles/index.scss';
export * from './components';
export * from './hooks';
export * from './util';

export default {
  install: (app: App) => {
    components.forEach((item) => {
      app.use(item);
    });
  }
};
