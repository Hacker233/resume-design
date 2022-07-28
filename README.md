<p align="center"><img width="200" src="https://gitee.com/sharemore52/resume-img/raw/master/logo.png"></p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
</p>

<h2 align="center">一款免费简历制作神器</h2>

<p align="center"><b>基于Vue3 + TypeScript + Vite + Element-plus + pinia实现</b></p>

# 目录

- [目录](#目录)
  - [项目介绍](#项目介绍)
  - [演示](#演示)
  - [功能介绍](#功能介绍)
  - [项目特性](#项目特性)
  - [如何使用](#如何使用)
  - [维护者](#维护者)
  - [License](#license)

## 项目介绍

该项目为纯前端项目，所有数据存储在浏览器端，你可以利用该项目轻松制作出精美的简历。你可以随意添加删除简历模块、选择模板、更改字体大小、颜色、间距等等样式。

## 演示

**图片：**

<p align="center"><img width="1000" src="https://github.com/Hacker233/resume-design/blob/main/doc/images/1.png"></p>


<p align="center"><img width="1000" src="https://github.com/Hacker233/resume-design/blob/main/doc/images/4.png"></p>


<p align="center"><img width="1000" src="https://github.com/Hacker233/resume-design/blob/main/doc/images/6.png"></p>

## 功能介绍

- [x] 简历模板提供
- [x] 动态增删简历模块
- [x] 自定义模板中字体样式
- [x] 自定义调整模块间距
- [x] 保存草稿功能
- [x] 导出为PDF功能
- [x] 重置
- [x] 自定义头像
- [x] 自定义各模块内容
- [x] 导入JSON数据
- [x] 导出JSON文件

## 项目特性

- 使用pinia做状态管理
- 使用Vue3 + Typescript + Vite技术栈
- 可自定义图标库

## 如何使用

安装：

```bash
$ git clone https://github.com/Hacker233/resume-design.git
$ npm install
$ npm run dev
```

目录说明:

```
├─ doc			  // 项目相关文档
├─ public         // 公共资源目录
├─ scripts
├─ src
│  ├─ api         // 请求封装，暂时未用到
│  ├─ assets      // 资源文件存放目录
│  ├─ components  // 公共组件存放路径
│  ├─ router      // 项目路由配置
│  ├─ schema      // 简历模板JSON格式定义
|  ├─ store       // 状态管理文件夹
|  ├─ styles      // 一些样式文件
|  ├─ template    // 简历模板文件
|  ├─ types       // ts类型定义文件
|  ├─ utils       // 工具函数
|  ├─ views       // 页面文件
|  └─ App.vue     // 主入口页面
|  └─ env.d.ts    // ts类型声明文件
|  └─ main.ts     // 项目主入口文件
```


## 维护者

- [会飞的猪](https://github.com/Hacker233)

## License

- [MIT](https://opensource.org/licenses/MIT)

