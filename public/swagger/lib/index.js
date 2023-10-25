
var utils = {


  dict: {
    integer: "number",
    byte: "number",
    short: "number",
    int: "number",
    long: "number",
    float: "number",
    double: "number",
    string: "string",
    char: "string",
    boolean: "boolean",
    array: "string[] | number[]",
  },

  /**
    * @description: 获取tags和method
    * @param {*} target
    * @return {*}
    */
  getTagsAndMethod(target) {
    const method = target['get'] ? 'get' : 'post'
    const tag = target[method].tags || []
    return {
      tag,
      method
    }
  },

  /**
* @description: 判断是否有tags并且有数据
* @param {*} tags
* @param {*} apiData
* @return { Boolean }
**/
  isNotTags(tags, apiData) {
    return !tags && Object.keys(apiData).length > 0
  },


  /**
   * @description: 获取平台
   * @param {*} value 
   * @returns { String }
   */
  getPlatform(value) {
    return /openapi/.test(value) ? 'Apifox' : 'swagger'
  },

  /**
   * @description: 生成函数注释
   * @param {*} params
   * @return { string }
   */
  generateAnnotation(summary) {
    const annotation = this.annotationComment`
    * @description: ${summary}
    * @return {*}
    `
    return annotation
  },


  /**
   * @description: generateAnnotation 依赖这个函数, 利用模板标签将字符串拼接成注释, 只是为了美观
   * @param { strings } strings
   * @return { string }
   */
  annotationComment(strings, ...values) {
    const result = strings.reduce((acc, str, i) => {
      const value = values[i] || ''
      return acc + str + value
    }, '')
    return `/**${result}*/`
  },

  /**
   * @description: 生成swagger的interface
   * @param { string } title
   * @param { Object } properties
   * @return { string }
   */
  generateSwaggerInterface({ title, properties }) {
    return `\ninterface ${title} {\n${Object.entries(properties).map(([key, value]) => {
      return `${key}${value.required ? ':' : '?:'}${this.dict[value.type]}\n`
    }).join('')}}`
  },

  /**
   * @description: 生成apifox的interface
   * @param { string } name
   * @param { Object } schema
   * @return { string }
   */
  generateApifoxInterface(name, schema) {
    return `\ninterface ${name} {\n${Object.entries(schema.properties).map(([key, value]) => {
      return `${key}${schema.required.includes(key) ? ':' : '?:'}${this.dict[value.type]}\n`
    }).join('')}}`
  },

  generateInferfaceName(path, method) {
    const methodPart = path.split('/').at(-1)
    return `${method.replace(/^\S/, s => s.toUpperCase())}${methodPart.replace(/^\S/, s => s.toUpperCase())}`
  },

  normalizeSchema(schema = {}) {
    const required = schema.required || []
    const properties = schema.properties || {}
    const normalizedSchema = {
      required,
      properties: properties
    }
    return normalizedSchema
  },

  /**
     * @description: 生成函数
     * @param {string} basePath
     * @param {string} key
     * @param {string} method
     * @param {string} annotation
     * @return {string}
     */
  generateFunction(basePath, key, method, annotation, instanceName = 'request') {
    const paramsType = method === 'get' ? 'params' : 'data';
    const paths = key.split('/');
    const isUrlParams = /{\S+}/.test(key);
    const urlParams = isUrlParams ? paths.at(-2).replace(/\{|\}/g, '') : '';
    const url = isUrlParams ? `${basePath}${key.replace(/\{\S+\}/g, '')} + ${urlParams}` : `"${basePath}${key}"`;
    const methodPart = isUrlParams ? paths.at(-2) : paths.at(-1);
    const functionName = `${method}${this.camelize(methodPart)}`;

    const funcStr = `
    ${annotation}
    export function ${functionName}(${isUrlParams ? urlParams + ',' : ''} ${paramsType}, other = {}) {
        return ${instanceName}({
            url: ${url},
            method: '${method}',
            ${paramsType},
            ...other
        });
    }
  `;

    return funcStr;
  },

  /**
 * @description: 生成 vue 内部调用函数
 * @param {string} key
 * @param {string} method
 * @param {string} annotation
 * @return {string}
 */
  generateVueFunc(key, method, annotation) {
    const paths = key.split('/');
    const methodPart = paths.at(-1);
    const funcName = ` ${method}${methodPart.replace(/^\S/, s =>
      s.toUpperCase()
    )}`;

    const funcStr = `
    ${annotation}
    async ${funcName}() {
        try {
            const { code, result } = await ${funcName}();
            if (code === 200 && result) {
                // 在这里处理成功的情况
            } else {
                this.tableData = [];
                // 在这里处理错误的情况
            }
        } catch (error) {
            console.error(error);
        }
    },
  `;
    return funcStr;
  },


  getVueAnnotation(summary) {
    return `/**
    * @description: ${summary}
    * @return {*}
    */`
  },


  // apifox
  generateResInterface(schema, name) {
    const data = this.generateInterfaceFromSchema(schema)
    return `export interface ${name} ${JSON.stringify(data)}`
  },

  generateInterfaceFromSchema(schema) {
    const { properties } = this.getFiledObj(schema)
    const copyProperties = {}
    for (const [k, v] of Object.entries(properties)) {
      if (v.type === 'object') {
        copyProperties[k] = this.generateInterfaceFromSchema(v)
      } else if (v.type === 'array') {
        copyProperties[k] = `${JSON.stringify(this.generateInterfaceFromSchema(v))}[]`
      } else {
        copyProperties[k] = this.getTSType(v.type)
      }
    }
    return {
      ...copyProperties
    }
  },



  getFiledObj(schema) {
    const { type } = schema
    return {
      type,
      properties: type === 'array' ? schema.items.properties : schema.properties
    }
  },

  getTSType(type) {
    switch (type) {
      case 'integer':
        return 'number';
      case 'string':
        return 'string';
      default:
        return 'any';
    }
  },

  /**
   * @description: 将字符串转换成驼峰
   * @param {string} str
   * @return {string}
   */
  camelize(str) {
    return str.replace(/^\S/, s => s.toUpperCase()).replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
  }



}

