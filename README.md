# 程序员之家前端项目

 本项目为程序员之家平台的前端项目，[具体的项目说明地址](https://github.com/CXYZJ408/CXYZJ)

## 项目使用说明

1. [安装Node.js与NPM](https://www.jianshu.com/p/03a76b2e7e00)（如果没有安装的话）
2. 下载本项目，如果要进行协同开发，则将本项目Fork到自己的git仓库中
3. 进入项目根目录下安装项目依赖并运行：

```bash
#使用命令行进入项目更目录下（windows下推荐使用cmder）
#安装项目依赖
npm install
#运行项目
npm run dev
```

项目会运行在3000端口上，在浏览器中输入localhost:300即可访问了，但注意页面的数据获取需要配合[后端项目](https://github.com/CXYZJ408/cxyzjback)，但现在因为后端还处在开发阶段，所以有些页面前端项目里自带了一些测试数据。

**需要后端的页面：**

- 登录注册
- 用户中心
- 文章详情页面

---

**注：**
因为项目需要用到cookie，虽然大部分情况不会出现问题，但在项目获取到了cookie且后端没启动的情况下，此时页面会报错，因为项目在检测到有cookie时，会自动向后端获取相关信息，此时将页面cookie清除后即可。

## 项目进度（目前只在做前台界面，后台还未开始）

- [x] 用户登录注册功能（除第三方登录已全部完成）
- [ ] 用户中心（开发了一半，用户信息编辑配合后端可以正常使用了，但用户文章评论等的列表信息获取还没完成，有些地方需要重写）
- [ ] 文章标签系统（与后端对接中）
- [ ] 文章页面（开发中，与后端对接基本完成，待完善）
- [ ] 文章撰写页面（需要重新设计，页面有bug，还未与后端对接）
- [ ] 主页（需要调整，页面有bug且性能也有问题，还未与后端对接）
- [ ] 文章评论系统（未开始）
- [ ] 讨论与学堂模块（未开始）

## 项目目录结构及主要文件说明

 - api：后端API接口目录，所有的API文件均在这个文件夹下，但应注意当需要使用相应的api时，都通过统一的入口，即访问该目录下的API.js来获取相应的api实例，不直接访问相应的API文件，所有的API文件都需要在API.js里面暴露相关实例
 - assets：资源目录，用于组织未编译的静态资源如 `LESS`、`SASS` 或 `JavaScript`，此处存放的css样式为全局样式。
 - components：组件目录，用于组织应用的 Vue.js 组件。
 - layouts：页面布局文件目录，此处需要注意一点的就是除了error报错页面的布局文件不需要放置updateCookie组件，其它的布局文件都需要放置该组件，为了能够及时更新用户的cookie。**注：该目录名为Nuxt.js保留的，不可更改。**
 - middleware：目录用于存放应用的中间件。
 - pages：页面文件目录，用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 `.vue` 文件并自动生成对应的路由配置。**注：该目录名为Nuxt.js保留的，不可更改。**
 - plugins：应用插件目录， 用于组织那些需要在 `根vue.js应用` 实例化之前需要运行的 Javascript 插件。
 - static：静态文件目录，存放一些静态文件，以图片为主。**注：该目录名为Nuxt.js保留的，不可更改。**
 - store：vuex状态树文件目录**注：该目录名为Nuxt.js保留的，不可更改。**
    - 需要注意里面的一个`nuxtServerInit`方法，因为vuex在页面刷新的时候会丢失所有的数据信息，所以该方法配合utils里面的`proxy`方法保证了页面刷新也能及时重新获取到用户的相关信息
 - utils：工具文件目录
    - axios.js为封装过的axios文件
    - constant.js为一些常量表
    - index.js为一些自定义工具，此处需要注意一点，**所有与后端进行通信**都需要调用里面的`proxyOne`或`proxy`，该函数方法保证了当用户登陆后，**只要refreshToken不过期就可以请求到相应数据**。在用户访问网站期间，如果token过期了，该方法在检测到后端返回的token过期消息后，会**自动使用refreshToken进行token的刷新**，同时在获得新的token后进行数据的再次请求。对于单个请求使用`proxyOne`方法，对于一次包含多个请求则使用`proxy`方法，该方法会对所有请求进行打包后统一发送处理
    - status.js为后端请求后返回的状态码
 - nuxt.config.js：nuxt项目的配置文件

更多目录结构的详细说明，参见[nuxt官方的目录结构说明文档](https://zh.nuxtjs.org/guide/directory-structure)

## 项目开发要求

对于每一个页面，首先应该考虑其整体的布局，也就是layouts目录下的布局文件，在布局文件中不要放置太多的组件，但必须放置`nuxt`和`updateCookie`组件，一个用于显示并导航子组件一个用于更新用户cookie，同时最外层必须用`v-app`进行包裹，需要注意一点的是页面的背景只能在布局文件中设置，对于动态切换的背景，可以通过`vuex`来控制。写好布局文件后，在pages目录下添加要写的页面，注意`nuxt`会根据pages下面的目录结构来自动进行[路由的配置](https://zh.nuxtjs.org/guide/routing)，对于一些需要多次使用到的组件需要进行封装成单个组件，放置在components目下。

## 项目所使用的主要工具与框架一览(暂)

- [Vue.js](https://cn.vuejs.org/index.html)
- [Node.js](http://nodejs.cn/)
- [npm](https://www.npmjs.com.cn/)
- [Nuxt.js](https://zh.nuxtjs.org/)
- [Axios](https://github.com/axios/axios)
- [Vuex](https://vuex.vuejs.org/zh/guide/)
- [Element-ui](https://element.eleme.io/#/zh-CN)
- [Vuetify](https://vuetifyjs.com/zh-Hans/layout/grid)
- [Mavon-editor](https://github.com/hinesboy/mavonEditor)
- [Markdown-it](https://github.com/markdown-it/markdown-it)

