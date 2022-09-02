let serverAddress =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3399'
    : 'https://huajian.smallpig.site';
const CONFIG = {
  // serverAddress: 'http://localhost:3399',
  // serverAddress: 'https://huajian.smallpig.site',
  serverAddress: serverAddress,
  operatingMode: 'local' // 运行模式：online-在线、local-本地
};
console.log('运行环境', CONFIG);
export default CONFIG;
