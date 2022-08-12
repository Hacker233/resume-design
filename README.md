<p align="center"><img width="200" src="https://gitee.com/sharemore52/resume-img/raw/master/logo.png"></p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
</p>
<h1 align="center">😙化简</h1>
<h2 align="center">一款免费简历制作神器</h2>

<p align="center"><b>基于Vue3 + TypeScript + Vite + Element-plus + pinia实现</b></p>

# 目录

- [目录](#目录)
  - [项目介绍](#项目介绍)
  - [演示](#演示)
  - [功能介绍](#功能介绍)
  - [项目特性](#项目特性)
  - [如何使用](#如何使用)
    - [拉取项目](#拉取项目)
    - [安装项目依赖](#安装项目依赖)
    - [运行项目](#运行项目)
    - [构建项目](#构建项目)
    - [目录说明:](#目录说明)
  - [交流&贡献](#交流贡献)
  - [贡献者](#贡献者)
  - [License](#license)

## 项目介绍

该项目为纯前端项目，所有数据存储在浏览器端，你可以利用该项目轻松制作出精美的简历。你可以随意添加删除简历模块、选择模板、更改字体大小、颜色、间距等等样式。

## 演示

**图片：**

<p align="center"><img width="1000" src="https://gitee.com/sharemore52/resume-design/raw/main/doc/images/1.png"></p>

<p align="center"><img width="1000" src="https://gitee.com/sharemore52/resume-design/raw/main/doc/images/3.png"></p>


<p align="center"><img width="1000" src="https://gitee.com/sharemore52/resume-design/raw/main/doc/images/4.png"></p>


<p align="center"><img width="1000" src="https://gitee.com/sharemore52/resume-design/raw/main/doc/images/6.png"></p>

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
## 交流&贡献

添加vx：LHQfighting，进入微信交流群，可方便解决和提出问题。
<p align="center"><img width="400" src="https://github.com/huajian-pro/resume-design/blob/main/src/assets/images/vx.jpg"></p>

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
</tr>
</table>

## License

- [MIT](https://opensource.org/licenses/MIT)

