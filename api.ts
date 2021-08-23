import { url } from "inspector";

const dayjs: any = require('dayjs')
const fs: any = require('fs')
const request = require('request');

interface loginParams {
    email: string;
    password: string
}

interface InterfacePathFolder {
    key: string;
    value: string
}

// API的一些配置文件
interface InterFaceOptions {
    prefix?: string;
    pathFolder?: InterfacePathFolder;
    space?: number;
    requestInstanceName?: string;
    requestImportName?: string;
    createTemplate?: boolean
    apiCondition?: string
}

class YAPI {
    // 登录域名
    host: string;
    // 项目ID
    pid: number;
    // 根据host和pid生成的yapi地址
    yapiAddress: string;
    // 前缀
    prefix: string;
    // 映射对应模块到对应文件夹
    pathToFolder: any;
    // 错误信息
    error: string;
    // 登录请求后获取的cookie
    cookie: string;
    // 空格数量 默认两个
    spaceString: string = '  ';
    // request实例名字
    requestInstanceName: string = 'request';
    // request import名字（路径）
    requestImportName: string = 'request'
    // 是否生成vue模板
    createTemplate: boolean = false
    // 自定义方法
    customConvertFun: any
    // 需要生成vue模板的关键字
    apiCondition: string = '查询'

    /**
     * 构造函数
     * @param host yapi的地址 主要用于生成mock地址和快速链接到浏览器
     * @param pid 项目ID
     * @param prefix 前缀
     * @param pathToFolder 文件map图吧对应的api文件放到对应的文件夹下面
     */
    constructor(host: string, pid: number, options: InterFaceOptions) {
        this.host = host
        this.pid = pid
        this.yapiAddress = `${host}/project/${pid}`;
        if (options.pathFolder) {
            this.pathToFolder = options.pathFolder
        }
        if (options.prefix) {
            this.prefix = options.prefix
        }

        if (options.space) {
            this.spaceString = new Array(options.space + 1).join(' ')
        }

        if (options.requestImportName) {
            this.requestImportName = options.requestImportName
        }

        if (options.requestInstanceName) {
            this.requestInstanceName = options.requestInstanceName
        }

        if (options.createTemplate) {
            this.createTemplate = options.createTemplate
        }
        if (options.apiCondition) {
            this.apiCondition = options.apiCondition
        }

    }

    /**
     * 登录参数 {email: '', password: ''}
     * @param params
     */
    login(params: loginParams) {
        const config: any = {
            url: this.host + '/api/user/login',
            method: 'POST',
            headers: {},
            form: params,
        };
        return new Promise((resolve) => {
            request(config, (e, r) => {
                this.cookie = r.headers['set-cookie']
                resolve(r)
            });
        })
    }

    parseContent(content: any) {
        const startTime: number = new Date().getTime()
        for (let i of content) {
            let str: string = this._start(i.name, i.add_time, i.up_time)
            i.name = i.name.replace(/\//g, '_')
            const list: Array<any> = i.list
            if (list.length) {
                for (let apiItem of list) {
                    // 路径中出现两个/
                    apiItem.path = apiItem.path.replace(/\/\//g, '/')
                    // 废弃API
                    if (apiItem.path !== '///') {
                        str += this._createFunction(apiItem)
                    }
                }
            }
            str += this._end()
            // 写文件
            this._writeFile(__dirname + '/api/' + i.name + '.js', str, __dirname + '/api/')
        }
        const endTime: number = new Date().getTime()
        console.log('转化使用时间', endTime - startTime, 'ms')
    }


    startTask() {
        if (!this.cookie) {
            this._setError('你还没有登录')
        } else {
            let opts = {
                url: `${this.host}/api/plugin/export?type=json&pid=${this.pid}&status=all`,
                headers: {
                    Cookie: this.cookie,
                }
            };
            request(opts, (e: any, r: { body: string; }) => {
                try {
                    if (this.createTemplate) {
                        this.parseToTable(r.body)
                    }
                    this.parseContent(JSON.parse(r.body))
                } catch (e) {
                    console.error(e)
                }
            });
        }
    }


    /**
     * 文件的开始
     *  @param name 木块
     *  @param createTime 创建时间
     *  @param updateTime 更新时间
     */
    _start(name: string, createTime: number, updateTime: number) {
        return `
/**
 * ${name}
 * createTime ${dayjs(createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
 * updateTime ${dayjs(updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
 */
 
import ${this.requestInstanceName} from '${this.requestImportName}';`
    }

    _end() {
        return `
`
    }

    /**
     * 构造方法
     * @param item
     * @private
     */
    _createFunction(item: any) {
        let returnValue = ''
        // 第一步创建注释

        const spaceString: string = this.spaceString

        // 第二步创建方法名
        // const functionName = this._raiseFunctionName(item.path, item.method.toLowerCase())
        const functionName = this._raiseFunctionName(item)
        // 格式化请求方式
        const method = item.method.toLowerCase()
        const path = item.path.replace(/{/g, '${')
        returnValue += `
    ${this._createComments(item)}
export function ${functionName}
${spaceString}return ${this.requestInstanceName}({
${spaceString + spaceString}url: \`${path}\`,
${spaceString + spaceString}method: '${item.method}',
${spaceString + spaceString}${method === 'get' ? 'params' : 'data'},
${spaceString + spaceString}...other
${spaceString}})
}`
        // 第三步创建方法内容

        // 最后闭合方法
        return returnValue
    }

    /**
     * 生成注释
     * @param item
     * @private
     */
    _createComments(item: any) {
        let str: string = `
/**
 * ${item.title}
 * YAPI: ${this.yapiAddress}/interface/api/${item._id}
 * 备注: ${this._filterHtmlTag((item.desc || '').trim()).replace(/\n/g, `\n${this.spaceString}* `)}`

        const obj: any = {
            req_params: '请求参数 - 路径中的标量',
            req_body_other: '请求参数 - body - json',
            req_body_form: '请求参数 - body - formData',
        }

        for (let i in obj) {
            let commentItem = item[i]
            if (commentItem && commentItem.length) {
                if (i === 'req_params') {
                    commentItem = commentItem.map(item => ({ name: item.name, desc: item.desc }))
                }
                if (typeof commentItem === 'string') {
                    str += `\n * ${obj[i]}\n` + commentItem
                } else {
                    str += `\n * ${obj[i]}\n` + JSON.stringify(commentItem, null, 2)
                }
            }
        }


        return str + '\n */'
    }

    _filterHtmlTag(value: string) {
        if (!value) return ''
        return value.trim().replace(/<[^<>]+>/g, '')
            .replace('<br>', '')
            .replace('&nbsp;', '')
            .replace(/\n\n/g, '')
    }

    /**
     * 生成方法名字
     * @param value 路径
     * @private
     */
    _raiseFunctionName(item) {
        const value: string = item.path
        const method: string = item.method.toLowerCase()
        let path: string = this._filter(value, 'url')
        // 把路径中的_转换成/
        path = path.replace(/\_|-/g, '/')
        let pathList: Array<string> = path.split('/')
        const funName: string = pathList.filter(item => !!item).map(item => this._letterToUpper(item, 0)).join('')
        // 替换路径的中的参数
        let reqParamString: string = item.req_params.map(v => v.name).join(', ')
        if (item.req_params.length) reqParamString += ', '
        return method + funName + `(${reqParamString}${method === 'get' ? 'params' : 'data'}, other = {}) {`
    }

    /**
     * 字母转大写
     * @param value
     * @private
     */
    _letterToUpper(value: string, number: number) {
        if (number > value.length - 1 || value === '') {
            this._setError('索引大于字符串长度了');
            return value
        }
        return value.replace(value[0], value[0].toUpperCase())
    }

    // 写入文件数据
    _writeFile(filePathName: string, value: string, filePath) {
        if (!fs.existsSync(filePath)) {
            const res = fs.mkdirSync(filePath)
            if (res) {
                fs.writeFileSync(filePathName, value)
            }
        } else {
            fs.writeFileSync(filePathName, value)
        }
    }

    /**
     * 过滤方法 过滤掉一些奇奇怪怪的东西
     * @param value
     * @private
     */
    _filter(value: string, type: string) {
        if (type === 'url') {
            return value.replace(/\{|\}|\./g, '')
        }
        return value
    }

    _setError(value: string) {
        this.error = value
        throw new Error(value)
    }

    getError() {
        return this.error
    }

    /**
     * @description:  将返回数据格式化为需要的字符串
     * @param {*} res 接口返回的数据
     * @return {*}
     */
    parseToTable(res) {
        // 判断文件夹是否存在
        const path = `${__dirname}/vue/`
        if (fs.existsSync(path)) {
            this.clearFile(path)
        }
        const data = JSON.parse(res)
        data.forEach((item, index) => {
            item.list.forEach(sub_item => {
                const regx = new RegExp(this.apiCondition, 'i')
                if (regx.test(sub_item.title)) {
                    let str = `<template>\n <div class="page">\n<el-table v-loading="tableLoading" :data="tabelData" border stripe>\n`
                    const res_body = JSON.parse(sub_item.res_body)
                    let obj
                    if (res_body?.properties?.data?.properties?.records) {
                        obj = res_body?.properties?.data?.properties?.records?.items?.properties || {}
                    } else {
                        obj = res_body?.properties?.data?.items?.properties || {}
                    }
                    for (const key in obj) {
                        str += `<el-table-column prop="${key}" label="${obj[key]['description'] || '默认标题'}"></el-table-column>\n`
                    }
                    str += '</el-table>\n <Pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getSysDictPage" /></div>\n</template>\n'
                    str += `<script>\nimport Pagination from '@/components/Pagination'\n</script>`
                    this.createVueTemplate(str, sub_item.title)
                }
            })
        });

    }
    /**
     * @description: 生成vue模板文件
     * @param {*} data 需要生成的数据
     * @param {*} fileName 文件名称
     * @return {*}
     */
    createVueTemplate(data, fileName = 'index') {
        this._writeFile(`${__dirname}/vue/${fileName}.vue`, data, `${__dirname}/vue`)
    }
    /**
     * @description: 清空文件夹下的文件
     * @param {*} path 文件夹路径
     * @return {*}
     */
    clearFile(path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    this.clearFile(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            // fs.rmdirSync(path); 删除文件夹自身
        }
    }
}

module.exports = YAPI
