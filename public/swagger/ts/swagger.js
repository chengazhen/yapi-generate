class Swagger {
  constructor(parameters, definitions, basePath = '') {
    this.parameters = parameters;
    this.definitions = definitions;
    this.interfaceNameMap = new Map()
    this.schema = null
    this.basePath = basePath
  }

  isChinese(str) {
    const reg = /[\u4e00-\u9fa5]/;
    return reg.test(str);
  }

  generateInterfaceName(method, key) {
    const paths = key.split('/')
    const methodPart = paths.at(-1)

    // 首字母
    const name = `${method.replace(/^\S/, s =>
      s.toUpperCase()
    )}${methodPart.replace(/^\S/, s =>
      s.toUpperCase()
    )}`
    
    return name + 'Req'
  }

  getSchema() {
    const reqKey = this.parameters[0].schema?.$ref.split('/').at(-1);
    if (reqKey) {
      return this.schema = this.definitions[reqKey];
    }
  }

  getInterfaceName() {

    if (!this.schema) {
      return ''
    }

    if (this.schema.title && !this.isChinese(this.schema.title)) {
      return this.schema.title;
    }

    return ''
  }

  getInterface(name) {
    let paramStr = `
    interface ${name} {`
    for (const [key, value] of Object.entries(this.schema.properties)) {
      const requires = this.schema.required || []
      paramStr += `
        ${key}${requires.includes(key) ? ':' : '?:'}${dict[value.type]}`
    }

    paramStr += `
  }`

    return paramStr
  }

  /**
     * @description: 生成函数
     * @param {*} key
     * @param {*} method
     * @param {*} annotation
     * @return {*}
     */
  generateFuction(key, method, annotation) {
    let paramsType = 'data'

    if (method === 'get') {
      paramsType = 'params'
    }
    const paths = key.split('/')
    const isUrlParams = /{\S+}/.test(paths)
    let url = `${this.basePath}${key}`
    let methodPart = paths.at(-1)
    const urlParams = paths.at(-1).replace(/\{|\}/g, '')
    if (isUrlParams) {
      methodPart = paths.at(-2)
      key = key.replace(/\{\S+\}/g, '')
      url = `"${this.basePath}${key}"` + '+' + urlParams
    }
    const funcStr = `
          ${annotation}
          export function ${method}${methodPart.replace(/^\S/, s =>
      s.toUpperCase()
    )}(${isUrlParams ? urlParams + ',' : ''} ${paramsType}, other = {}) {
              return request({
              url:'${url}',
              method: '${method}',
              ${paramsType},
              ...other
            })
          }`
    return funcStr
  }

  /**
    * @description: 生成函数注释
    * @param {*} parameters
    * @return {*}
    */
  generateAnnotation(summary) {
    let paramStr = ``
    //  判断是否生成了参数
    if (paramStr) {
      return `\n/**\n* @description: ${summary}\n${paramStr}\n* @return {*}\n*/ `
    } else {
      return `\n/**\n* @description: ${summary}\n* @return {*}\n*/ `
    }
  }


}