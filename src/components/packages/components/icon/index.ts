import { withInstall } from '../../util/index';
import iconVue from './icon.vue';

export type IconInstance = InstanceType<typeof iconVue>;
export const UIcon = withInstall(iconVue);
export default UIcon;
