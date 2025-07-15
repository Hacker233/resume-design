export interface PricePlan {
  title: string; // 标题
  price: number; // 价格
  priceDesc?: string; // 价格描述
  buttonText: string; // 按钮文字
  buttonColor: string; // 按钮背景色
  features: {
    text: string; // 权益描述
    included: boolean; // 是否包含该权益
    desc: string;
  }[];
  bottomText: string; // 底部文字
  bottomDesc?: string; // 底部描述
}

export const pricePlans: PricePlan[] = [
  {
    title: '免费版',
    price: 0,
    buttonText: '去下载',
    buttonColor: '#ecf1f9',
    features: [
      { text: '猫步简历官方微信交流群', included: true, desc: '' },
      { text: '前端最新源码', included: true, desc: '' },
      { text: '个人用户可用于商业应用开发', included: false, desc: '' },
      { text: '网站开发部署文档', included: false, desc: '' },
      { text: '网站后端源码', included: false, desc: '' },
      { text: '是否具备后台管理系统', included: false, desc: '' },
      { text: '赠送网站会员', included: false, desc: '' },
      { text: '赠送上千套word简历模板', included: false, desc: '' },
      { text: '赠送上千套PPT模板', included: false, desc: '' },
      { text: '系统具备简币积分体系功能', included: false, desc: '' },
      { text: '一对一技术指导', included: false, desc: '' },
      { text: 'AI简历润色', included: false, desc: '' },
      { text: 'AI简历翻译', included: false, desc: '' },
      { text: 'AI简历创作', included: false, desc: '' },
      { text: 'AI简历诊断', included: false, desc: '' },
      { text: 'AI简历生成', included: false, desc: '' },
      { text: '后端代码持续更新', included: false, desc: '' },
      { text: '企业/学校/组织入驻功能', included: false, desc: '' },
      { text: '整站纯净免费模式', included: false, desc: '' },
      { text: '企业用户可用于商业应用开发', included: false, desc: '' },
      { text: '网站功能持续更新迭代', included: false, desc: '' },
      { text: '存量bug修复', included: false, desc: '' },
      { text: '二次开发指导', included: false, desc: '' },
      { text: '是否与猫步简历官网一致', included: false, desc: '' }
    ],
    bottomText: '无后端源码'
  },
  {
    title: '基础版',
    price: 399,
    buttonText: '立即获取',
    buttonColor: '#9a95eb',
    features: [
      { text: '猫步简历官方微信交流群', included: true, desc: '' },
      { text: '前端最新源码', included: true, desc: '' },
      { text: '个人用户可用于商业应用开发', included: true, desc: '' },
      { text: '网站开发部署文档', included: true, desc: '' },
      { text: '网站后端源码', included: true, desc: '' },
      { text: '是否具备后台管理系统', included: true, desc: '' },
      { text: '赠送网站月度会员（价值9.9￥）', included: true, desc: '' },
      { text: '赠送上千套word简历模板', included: true, desc: '' },
      { text: '赠送上千套PPT模板', included: true, desc: '' },
      { text: '系统具备简币积分体系功能', included: true, desc: '' },
      { text: '一对一技术指导', included: false, desc: '' },
      { text: 'AI简历翻译', included: false, desc: '' },
      { text: 'AI简历创作', included: false, desc: '' },
      { text: 'AI简历创作', included: false, desc: '' },
      { text: 'AI简历诊断', included: false, desc: '' },
      { text: 'AI简历生成', included: false, desc: '' },
      { text: '后端代码持续更新', included: false, desc: '' },
      { text: '企业/学校/组织入驻功能', included: false, desc: '' },
      { text: '整站纯净免费模式', included: false, desc: '' },
      { text: '企业用户可用于商业应用开发', included: false, desc: '' },
      { text: '网站功能持续更新迭代', included: false, desc: '' },
      { text: '存量bug修复', included: false, desc: '' },
      { text: '二次开发指导', included: false, desc: '' },
      { text: '是否与猫步简历官网一致', included: false, desc: '' }
    ],
    bottomText: '后端源码更新至2023年8月',
    bottomDesc: '具备完善的后台功能，如积分、积木创作等等，简历设计器为旧版'
  },
  {
    title: '升级版',
    price: 699,
    buttonText: '立即获取',
    buttonColor: '#6ed6bd',
    features: [
      { text: '猫步简历官方微信交流群', included: true, desc: '' },
      { text: '前端最新源码', included: true, desc: '' },
      { text: '个人用户可用于商业应用开发', included: true, desc: '' },
      { text: '网站开发部署文档', included: true, desc: '' },
      { text: '网站后端源码', included: true, desc: '' },
      { text: '是否具备后台管理系统', included: true, desc: '' },
      { text: '赠送网站年度会员（价值29.9￥）', included: true, desc: '' },
      { text: '赠送上千套word简历模板', included: true, desc: '' },
      { text: '赠送上千套PPT模板', included: true, desc: '' },
      { text: '系统具备简币积分体系功能', included: true, desc: '' },
      { text: '一对一技术指导', included: true, desc: '' },
      { text: 'AI简历润色', included: true, desc: '' },
      { text: 'AI简历翻译', included: true, desc: '' },
      { text: 'AI简历创作', included: true, desc: '' },
      { text: 'AI简历诊断', included: true, desc: '' },
      { text: 'AI简历生成', included: true, desc: '' },
      { text: '后端代码持续更新', included: false, desc: '' },
      { text: '企业/学校/组织入驻功能', included: false, desc: '' },
      { text: '整站纯净免费模式', included: false, desc: '' },
      { text: '企业用户可用于商业应用开发', included: false, desc: '' },
      { text: '网站功能持续更新迭代', included: false, desc: '' },
      { text: '存量bug修复', included: false, desc: '' },
      { text: '二次开发指导', included: false, desc: '' },
      { text: '是否与猫步简历官网一致', included: false, desc: '' }
    ],
    bottomText: '后端源码更新至2025年5月',
    bottomDesc: '具备完善的后台功能，如简币体系、会员体系、支付等，简历设计器为新版'
  },
  {
    title: '永久更新版',
    price: 899,
    buttonText: '立即获取',
    buttonColor: '#bd9772',
    features: [
      { text: '猫步简历官方微信交流群', included: true, desc: '' },
      { text: '前端最新源码', included: true, desc: '' },
      { text: '个人用户可用于商业应用开发', included: true, desc: '' },
      { text: '网站开发部署文档', included: true, desc: '' },
      { text: '网站后端源码', included: true, desc: '' },
      { text: '是否具备后台管理系统', included: true, desc: '' },
      { text: '赠送网站永久会员（价值59.9￥）', included: true, desc: '' },
      { text: '赠送上千套word简历模板', included: true, desc: '' },
      { text: '赠送上千套PPT模板', included: true, desc: '' },
      { text: '系统具备简币积分体系功能', included: true, desc: '' },
      { text: '一对一技术指导', included: true, desc: '' },
      { text: 'AI简历润色', included: true, desc: '' },
      { text: 'AI简历翻译', included: true, desc: '' },
      { text: 'AI简历创作', included: true, desc: '' },
      { text: 'AI简历诊断', included: true, desc: '' },
      { text: 'AI简历生成', included: true, desc: '' },
      { text: '后端代码持续更新', included: true, desc: '' },
      { text: '企业/学校/组织入驻功能', included: true, desc: '' },
      { text: '整站纯净免费模式', included: true, desc: '' },
      { text: '企业用户可用于商业应用开发', included: true, desc: '' },
      { text: '网站功能持续更新迭代', included: true, desc: '' },
      { text: '存量bug修复', included: true, desc: '' },
      { text: '二次开发指导', included: true, desc: '' },
      { text: '是否与猫步简历官网一致', included: true, desc: '' }
    ],
    bottomText: '持续更新迭代',
    bottomDesc: '与猫步简历官网完全保持一致'
  }
];
