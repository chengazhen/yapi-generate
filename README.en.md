# YAPI2JS

>Conversion tool of Yapi to front-end api code based on 'nodejs'

**The generated example is our own company's development framework based on "Axios" second development, which needs to be customized during use**

>You may encounter some strange interfaces (interface address, name, etc.) defined in Yapi or some other exceptions that are not handled. If you do, please modify the api.ts file


## Objectives

>Auto build 'Yapi' - 'JS' code

**Make front-end development more concerned about 'UI' and interaction**

**SRC is the directory to generate the front-end API, which will be added to the specified directory later**



## Dependencies

```
package.json
```



## Use


```
npm install

npm run start
```


## Need

```
Yapi's login account and password

Yapi corresponds to the PID of the project, which can also be seen in the URL
```

## example

```nodejs
// YAPI address
const host: string = 'http://127.0.0.1:3000'

const pid: number = 15

const loginData: InterfaceLoginData =  {
    email: 'admin@admin.com',
    password: 'ymfe.org'
}

// init
const tmp = new API(host, pid, {
    // prefix: '',
    pathFolder: __dirname + '\\api\\',
    space: 2,
    requestInstanceName: 'axios',
    requestImportName: 'axios'
})

// login
tmp.login(loginData).then(() => {
    // start task
    tmp.startTask()
})

```