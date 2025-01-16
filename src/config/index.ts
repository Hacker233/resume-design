const CONFIG = {
  maxUserResume: 4, // 允许每位用户最多制作多少份在线制作的简历，限制数量是为了减少数据库存储压力
  isEmailVerify: true, // 邮箱注册后，是否需要去邮件验证。true：开启验证。false：未开启验证
  serverAddress: import.meta.env.VITE_SERVER_ADDRESS, // 动态设置后台地址
  smallpigAddress: 'https://maobucv.com', // 另一个后台地址，如果没有多个后台，无需填写此字段
  aiModel: 'glm-4-flash' // ai模型
};

export default CONFIG;
