# yapi-generate

>基于`nodejs`的`YAPI`转换成前端`API`代码的转化工具

**生成的示例是我们自己公司基于`axios`二开开发框架，使用时候需要自定义一下**

>可能会遇到YAPI中定义的一些奇奇怪怪的接口（接口地址、名称等等）或者一些别的异常没有处理，要是遇到了请修改api.ts文件哦

## 目标

>自动构建`yapi`-`js`代码

**让前端开发更加的关心`UI`与交互**

**api为生成前端api的目录，后续会增加生成到指定目录 vue文件夹是生成的vue代码片段的文件夹,默认不生成vue代码片段**

## 依赖
```
package.json
```

## 使用

```
npm install
npm run start
```

## 需要

> 下文需要的项目pid

![项目的id](https://i.loli.net/2021/08/23/HTCM6rbtAPK2ivq.png)
```
yapi的登录账号和密码

yapi对应项目的pid，在url中也可以看见

```

## 例子



```nodejs
const API = require('./api')

interface InterfaceLoginData {
    email: string;
    password: string
}

// YAPI地址
const host: string = 'http://127.0.0.1:3000'
<!-- 项目的id -->
const pid: number = 15

const loginData: InterfaceLoginData =  {
    email: '',
    password: ''
}

// 初始化
const tmp = new API(host, pid, {
    // prefix: '',
    pathFolder: __dirname + '\\api\\',
    space: 2,
    requestInstanceName: 'axios',
    requestImportName: 'axios',
    apiCondition:'查询', //一般需要生成表格文件的都是查询接口,这个是正则匹配的查询接口的文字
    createTemplate:false // 是否生成vue表格代码片段
})

// 登录
tmp.login(loginData).then(() => {
    // 开始转化任务
    tmp.startTask()
})

```