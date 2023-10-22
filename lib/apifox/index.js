const dayjs = require('dayjs');
const fs = require('fs');
const request = require('request');

class YAPI {
  constructor(host, pid, options) {
    this.host = host;
    this.pid = pid;
    this.yapiAddress = `${host}/project/${pid}`;
    this.prefix = options.prefix || '';
    this.pathToFolder = options.pathFolder || undefined;
    this.error = '';
    this.cookie = '';
    this.spaceString = '  ';
    this.requestInstanceName = options.requestInstanceName || 'request';
    this.requestImportName = options.requestImportName || '@/utils/request';
    this.createTemplate = options.createTemplate || false;
    this.apiCondition = options.apiCondition || '查询';
  }

  login(params) {
    const config = {
      url: `${this.host}/api/user/login`,
      method: 'POST',
      headers: {},
      form: params,
    };

    return new Promise((resolve) => {
      request(config, (e, r) => {
        this.cookie = r.headers['set-cookie'];
        resolve(r);
      });
    });
  }

  parseContent(content) {
    return new Promise((resolve, reject) => {
      try {
        const path = `${this.pathToFolder}/api/`;
        if (fs.existsSync(path)) {
          this.clearFile(path);
        }
        const startTime = new Date().getTime();
        for (let i of content) {
          let { desc, list } = i;
          desc = desc ? desc : 'defaultDesc'
          let str = this._start(i.name, i.add_time, i.up_time);
          i.name = i.name.replace(/\//g, '_');
          if (list.length) {
            for (let apiItem of list) {
              apiItem.path = apiItem.path.replace(/\/\//g, '/');
              if (apiItem.path !== '///') {
                str += this._createFunction(apiItem);
              }
            }
          }
          str += this._end();
          this._writeFile(desc.toLowerCase().replace(/\s+/g, '-') + '.js', str, `${this.pathToFolder}/api/`);
        }
        const endTime = new Date().getTime();
        console.log('转化使用时间', endTime - startTime, 'ms');
        resolve(true);
      } catch (e) {
        reject(this._setError(e));
      }
    })
  }

  startTask() {

    return new Promise((resolve, reject) => {
      if (!this.cookie) {
        reject(this._setError('你还没有登录'));
      } else {
        let opts = {
          url: `${this.host}/api/plugin/export?type=json&pid=${this.pid}&status=all`,
          headers: {
            Cookie: this.cookie,
          },
        };

        request(opts, async (e, r) => {
          try {
            if (this.createTemplate) {
              this.parseToTable(r.body);
            }
            await this.parseContent(JSON.parse(r.body));
            resolve(true);
          } catch (e) {
            reject(this._setError(e));
          }
        });
      }
    })

  }

  _start(name, createTime, updateTime) {
    return `
/**
 * ${name}
 * createTime ${dayjs(createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
 * updateTime ${dayjs(updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}
 */
 
import ${this.requestInstanceName} from '${this.requestImportName}';
    `;
  }

  _end() {
    return `
    `;
  }

  _createFunction(item) {
    let returnValue = '';

    const spaceString = this.spaceString;
    const functionName = this._raiseFunctionName(item);
    console.log(item.method, '===>');

    const method = item.method.toLowerCase();
    const path = item.path.replace(/{/g, '${');

    const comments = this._createComments(item);

    returnValue += `
    ${comments}
export function ${functionName}
${spaceString}return ${this.requestInstanceName}({
${spaceString + spaceString}url: \`${path}\`,
${spaceString + spaceString}method: '${item.method}',
${spaceString + spaceString}${method === 'get' ? 'params' : 'data'},
${spaceString + spaceString}...other
${spaceString}})
}`;
    return returnValue;
  }

  _createComments(item) {
    let str = `
/**
 * ${item.title}
 * YAPI: ${this.yapiAddress}/interface/api/${item._id}
 * 备注: ${this._filterHtmlTag((item.desc || '').trim()).replace(/\n/g, `\n${this.spaceString}* `)}`;

    return str + '\n */';
  }

  _filterHtmlTag(value) {
    if (!value) return '';
    return value.trim().replace(/<[^<>]+>/g, '')
      .replace('<br>', '')
      .replace('&nbsp;', '')
      .replace(/\n\n/g, '');
  }

  _raiseFunctionName(item) {
    const value = item.path;
    console.log(item.method, '===>');

    const method = item.method.toLowerCase();
    let path = this._filter(value, 'url');
    path = path.replace(/\_|-/g, '/');
    let pathList = path.split('/');
    const funName = pathList.filter(item => !!item).map(item => this._letterToUpper(item, 0)).join('');
    let reqParamString = item.req_params.map(v => v.name).join(', ');
    if (item.req_params.length) reqParamString += ', ';
    return method + funName + `(${reqParamString}${method === 'get' ? 'params' : 'data'}, other = {}) {`;
  }

  createVueComments(item) {
    const str = `    /**
    * @description:${item.title} 
    * @param {*}
    * @return {*}
    */
    `;
    return str;
  }

  createVueFuntionBody(item) {
    const funName = this.createFunctionName(item);
    const returnValue = `    async ${funName} (){
        try {
        const { code, data } = await ${funName}()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },`;
    return returnValue;
  }

  createFunctionName(item) {
    const value = item.path;
    console.log(item.method, '===>');
    const method = item.method.toLowerCase();
    let path = this._filter(value, 'url');
    path = path.replace(/\_|-/g, '/');
    let pathList = path.split('/');
    const funName = pathList.filter(item => !!item).map(item => this._letterToUpper(item, 0)).join('');
    return method + funName;
  }

  createVueFunction(item) {
    const comments = this.createVueComments(item);
    const func = this.createVueFuntionBody(item);
    const str = `${comments}${func}\n\n`;
    return str;
  }

  _letterToUpper(value, number) {
    if (number > value.length - 1 || value === '') {
      this._setError('索引大于字符串长度了');
      return value;
    }
    return value.replace(value[0], value[0].toUpperCase());
  }

  _writeFile(filePathName, value, filePath) {

    if (!fs.existsSync(filePath)) {
      const res = fs.mkdirSync(filePath);
      if (res) {
        fs.writeFileSync(filePath + filePathName, value);
      }
    } else {
      // 删除文件
      // fs.unlinkSync(filePath + filePathName);
      fs.writeFileSync(filePath + filePathName, value);
    }
  }

  _filter(value, type) {
    if (type === 'url') {
      return value.replace(/\{|\}|\./g, '');
    }
    return value;
  }

  _setError(value) {
    this.error = value;
    throw new Error(value);
  }

  getError() {
    return this.error;
  }

  parseToTable(res) {
    const path = `${this.pathToFolder}/vue/`;
    if (fs.existsSync(path)) {
      this.clearFile(path);
    }
    const data = JSON.parse(res);
    data.forEach((item, index) => {
      item.list.forEach(sub_item => {
        const regx = new RegExp(this.apiCondition, 'i');
        if (regx.test(sub_item.title)) {
          let str = `<template>\n <div class="page">\n<el-table v-loading="tableLoading" :data="tabelData" border stripe>\n`;
          const res_body = JSON.parse(sub_item.res_body);
          let obj;
          if (res_body?.properties?.data?.properties?.records) {
            obj = res_body?.properties?.data?.properties?.records?.items?.properties || {};
          } else {
            obj = res_body?.properties?.data?.items?.properties || {};
          }
          for (const key in obj) {
            str += `<el-table-column prop="${key}" label="${obj[key]['description'] || '默认标题'}"></el-table-column>\n`;
          }
          const list = item.list;
          let methods = '';
          let importMethodName = '';
          if (list.length) {
            for (let apiItem of list) {
              apiItem.path = apiItem.path.replace(/\/\//g, '/');
              if (apiItem.path !== '///') {
                methods += this.createVueFunction(apiItem);
                importMethodName += this.createFunctionName(apiItem) + ',';
              }
            }
          }
          str += '</el-table>\n <Pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getSysDictPage" /></div>\n</template>\n';
          str += `<script>\nimport Pagination from '@/components/Pagination'\nimport {${importMethodName.replace(/,$/, '')}} from '@/api/${item.desc.toLowerCase().replace(/\s+/g, '-')}' \nexport default{\n  name:'',\n  components:{\n    Pagination\n  },\n  data(){\n    return{\n      listQuery:{\n        page:1,\n        size:20\n      }\n    }\n  },\n  methods:{\n${methods}\n  }\n}\n</script>`;

          this.createVueTemplate(str, sub_item.title);
        }
      });
    });
  }

  createVueTemplate(data, fileName = 'index') {
    this._writeFile(`${fileName}.vue`, data, `${this.pathToFolder}/vue/`);
  }

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
    }
  }
}

module.exports = YAPI;
