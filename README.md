<p align="center"><img width="200" src="https://gitee.com/sharemore52/resume-img/raw/master/logo.png"></p>

<p align="center">
    <a href="https://v3.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Vue-%3E3.x-brightgreen?color=91aac3&labelColor=439EFD" alt="vue">
    </a>
    <a href="https://element-plus.gitee.io/#/zh-CN/component/changelog" target="_blank">
        <img src="https://img.shields.io/badge/Element--Plus-%3E2.1-brightgreen?color=91aac3&labelColor=439EFD" alt="element plus">
    </a>
    <a href="https://www.tslang.cn/" target="_blank">
        <img src="https://img.shields.io/badge/TypeScript-%3E4.4-blue?color=91aac3&labelColor=439EFD" alt="typescript">
    </a>
    <a href="https://vitejs.dev/" target="_blank">
        <img src="https://img.shields.io/badge/Vite-%3E3.0-blue?color=91aac3&labelColor=439EFD" alt="vite">
    </a>
    <a href="https://pinia.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Pinia-%3E2.0-blue?color=91aac3&labelColor=439EFD" alt="vite">
    </a>
    <a href="https://pinia.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/Node-%3E16.0-blue?color=91aac3&labelColor=439EFD" alt="vite">
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/npm/l/vue.svg?color=91aac3&labelColor=439EFD" alt="License">
    </a>
</p>
<h1 align="center">😙91化简</h1>
<h2 align="center">一款免费简历制作神器</h2>

<p align="center"><b>基于Vue3 + TypeScript + Vite + Element-plus + pinia实现</b></p>

线上地址：https://91huajian.cn

# 目录

- [目录](#目录)
  - [项目介绍](#项目介绍)
  - [演示](#演示)
  - [功能介绍](#功能介绍)
  - [项目特性](#项目特性)
  - [如何使用](#如何使用)
    - [拉取项目](#拉取项目)
    - [安装项目依赖](#安装项目依赖)
    - [项目配置](#项目配置)
    - [运行项目](#运行项目)
    - [构建项目](#构建项目)
    - [目录说明:](#目录说明)
  - [交流&贡献](#交流贡献)
  - [贡献者](#贡献者)
  - [License](#license)

## 项目介绍
这是一个开源的简历制作项目，项目提供了多套精美的简历模板，用户可以自行设置主题色、字号、间距等等，项目提供了高清PDF打印和JSON输出功能。除此之外，用户还可以根据不同的物料组件随意组合出自己想要的简历。

该项目已发布两个纯前端版本，这两个纯前端版本之后，项目将接入后台系统，所以如果单纯想要学习前端的小伙伴可以直接下载发布的两个版本之一即可。

纯前端版本：https://github.com/huajian-pro/resume-design/releases


## 演示

**图片：**

<p align="center"><img width="1000" src="https://smallpig.site:9000/resume/templatePreview/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-09-17%20133332.png"></p>


<p align="center"><img width="1000" src="https://smallpig.site:9000/resume/templatePreview/file-1663315601969.png"></p>


<p align="center"><img width="1000" src="https://gitee.com/sharemore52/resume-design/raw/main/doc/images/6.png"></p>

## 功能介绍
- [x] 用户登录注册功能
- [x] 简历模板提供
- [x] 动态增删简历模块
- [x] 自定义模板中字体样式
- [x] 自定义调整模块间距
- [x] 保存草稿功能
- [x] 导出为高清PDF功能
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

### 拉取项目
```bash
git clone https://github.com/huajian-pro/resume-design.git
```
- 推荐使用包管理工具[pnpm](https://pnpm.io/installation)
- 或使用[yarn](https://yarnpkg.com/getting-started/install)、npm（node自带无需额外安装）包管理工具
- Node版本请确保在v16.0及以上

> pnpm全局安装方法`npm i -g pnpm`

### 安装项目依赖
```bash
cd resume-design

// 使用pnpm安装依赖（推荐）
pnpm install
```

### 项目配置
若要运行项目，需要有相对应的后台，如果没有自己搭建的后台，则可以连接91化简官方后台。
**修改对应文件**：
```
// src/config/index.ts

const CONFIG = {
  serverAddress: 'https://91huajian.cn', // 服务器地址
};
console.log('运行环境', CONFIG);
export default CONFIG;
```

### 运行项目
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

### 目录说明:

```
├─ build		  // vite打包配置相关文件目录
├─ doc			  // 项目相关文档
├─ public         // 公共资源目录
│  ├─ json        // 模板JSON文件存放目录
├─ types          // 全局类型声明目录
├─ src
│  ├─ assets      // 资源文件存放目录
│  ├─ components  // 公共组件存放路径
│  ├─ config      // 相关配置文件
│  ├─ dictionary  // 相关字典文件存放目录
│  ├─ hooks       // 定义的一些Vue3的hooks
│  ├─ http        // 全局请求封装目录
│  ├─ interface   // 接口文件存放目录
│  ├─ material    // 物料组件存放目录
│  ├─ options     // 属性面板设置组件存放目录
│  ├─ router      // 路由文件存放目录
│  ├─ schema      // 简历模板JSON格式定义
|  ├─ store       // 状态管理文件夹
|  ├─ style      // 一些样式文件
|  ├─ template    // 简历模板配置文件
|  ├─ utils       // 工具函数
|  ├─ views       // 页面文件
|  └─ App.vue     // 主入口页面
|  └─ env.d.ts    // ts类型声明文件
|  └─ main.ts     // 项目主入口文件
```
## 交流&贡献

添加vx：LHQfighting，进入微信交流群，可方便解决和提出问题。
<p align="center">
    <img width="300" src="https://gitee.com/sharemore52/resume-design/raw/main/src/assets/images/vx.jpg">
</p>

## 贡献者

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 75.0; height: 75.0">
        <a href=https://github.com/Hacker233>
            <img src=https://avatars.githubusercontent.com/u/28037169?v=4 width="50;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=会飞的猪/>
            <br />
            <sub style="font-size:14px"><b>会飞的猪</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 75.0; height: 75.0">
        <a href=https://github.com/QC2168>
            <img src=https://avatars.githubusercontent.com/u/82024018?v=4 width="50;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=山田/>
            <br />
            <sub style="font-size:14px"><b>山田</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 75.0; height: 75.0">
        <a href=https://github.com/ynzy>
            <img src=https://avatars.githubusercontent.com/u/39397772?v=4 width="50;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=张雨凡/>
            <br />
            <sub style="font-size:14px"><b>张雨凡</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 75.0; height: 75.0">
        <a href=https://github.com/daluozha>
            <img src=https://avatars.githubusercontent.com/u/35727398?v=4 width="50;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=- luozha -/>
            <br />
            <sub style="font-size:14px"><b>- luozha -</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 75.0; height: 75.0">
        <a href=https://github.com/Hbisedm>
            <img src=https://avatars.githubusercontent.com/u/51397088?v=4 width="50;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Sam/>
            <br />
            <sub style="font-size:14px"><b>Sam</b></sub>
        </a>
    </td>
</tr>
</table>

## License

- [MIT](https://opensource.org/licenses/MIT)

