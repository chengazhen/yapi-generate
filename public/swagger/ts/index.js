const dict = {
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
}


const app = Vue.createApp({
  data() {
    return {
      basePath: '',
      visible: false,
      formInline: {
        url: '',
        module: '',
        old: false,
        new: true,
        vueFunc: true,
        oldHost: 'api'
      },
      module: [],
      apiData: {},
      apiGenerate: '',
      oldApiGenerate: '',
      vueFuncGenerate: '',
      loading: false,
      activeNames: '1',
      tableDataRow: [],
      tableGenerateData: '',
      definitions: {},
      platform: 'Apifox',
      interfaceMap: new Map(),
    }
  },
  mounted() {
    var clipboard = new ClipboardJS('.copyBtn')
    console.log(clipboard);
    clipboard.on('success', (e) => {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      e.clearSelection()
    })
    clipboard.on('error', (e) => {
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
      this.$message({
        type: "error",
        message: '复制失败'
      })
    })

    const form = JSON.parse(localStorage.getItem('form'))
    if (form) {
      delete form.module
      this.formInline = form
      this.urlInput(this.formInline.url)
    }
  },
  beforeMount() {
    console.log(23424);
  },
  methods: {
    /**
     * @description: 用户输入的url
     * @param {*} value
     * @return {*}
     */
    urlInput(value) {
      if (/http/.test(value)) {
        this.platform = getPlatform()
        this.$notify({
          type: "success",
          title: '提示',
          position: "bottom-right",
          message: `当前api文档平台为 (${this.platform}) `
        })

        this.loading = true

        axios
          .post('/swagger', { url: value })
          .then(({ data }) => {
            this.loading = false
            const { tags, basePath, components: definitions } = data
            this.basePath = basePath || ''
            this.module = tags
            this.apiData = data.paths
            this.definitions = definitions

            if (isNotTags(tags, this.apiData)) {
              this.module = [{ name: '全部', description: '全部' }]
            }
          })
          .catch(() => {
            this.loading = false
            this.$notify({
              type: "error",
              title: '提示',
              position: "bottom-right",
              message: `文档数据加载失败了!!! `
            })

          })

        /**
      * @description: 判断是否有tags并且有数据
      * @param {*} tags
      * @param {*} apiData
      * @return { Boolean }
      **/
        function isNotTags(tags, apiData) {
          return !tags && Object.keys(apiData).length > 0
        }

        /**
         * @description: 获取平台
         * @param {*} value 
         * @returns { String }
         */
        function getPlatform(value) {
          return /openapi/.test(value) ? 'Apifox' : 'swagger'
        }
      }
    },

    /**
     * @description: 选择需要生成代码的模块
     * @param {*}
     * @return {*}
     */
    selectModule() {
      localStorage.setItem('form', JSON.stringify(this.formInline))
      this.interfaceMap.clear()
      this.apiGenerate = ''
      this.oldApiGenerate = ''
      this.vueFuncGenerate = ''
      this.tableGenerateData = ''

      try {
        for (const [key, target] of Object.entries(this.apiData)) {
          const { tag, method } = utils.getTagsAndMethod(target)
          if (tag.includes(this.formInline.module)) {
            const { parameters = [], summary, requestBody = null } = target[method]
            if (requestBody) {
              if (/openapi/.test(this.formInline.url)) {
                this.startApifox({ requestBody, key, method })
              } else {
                this.startSwagger({ parameters, summary, requestBody, key, method })
              }
            }
            this.startCommon({ target, parameters, summary, key, method })
          }
        }
      } catch (error) {
        console.log(error)
        this.$message({
          type: "error",
          message: '生成失败'
        })
      }


      // // 导入接口类型
      // const importStr = `import { ${Array.from(this.interfaceMap.keys()).join(',')} } from ''`
      // if (this.formInline.old) {
      //   this.oldApiGenerate = importStr + this.oldApiGenerate
      // }


      // if (this.formInline.new) {
      //   this.apiGenerate = importStr + this.apiGenerate
      // }

    },

    /**
     * @description: 启动swagger生成
     * @param {*}
     * @return {*}
     * */
    startSwagger({ parameters, summary, requestBody, key, method }) {
      const swagger = new Swagger(parameters, this.definitions, this.formInline.oldHost)
      const schema = swagger.getSchema2(requestBody)
      if (schema) {
        const interfaceName = swagger.getInterfaceName(schema) || swagger.generateInterfaceName(method, key)
        this.apiGenerate += swagger.generateFuction(key, method, swagger.generateAnnotation(summary))
        if (!this.interfaceMap.has(interfaceName)) {
          this.interfaceMap.set(interfaceName, swagger.getInterface(interfaceName))
        }
      }
    },

    startApifox({ requestBody, key, method }) {
      const interfaceName = this.getInterfaceName(key, method)
      if (requestBody) {
        const schema = requestBody.content['application/json']?.schema.$ref.split('/').at(-1);
        if (!this.interfaceMap.has(interfaceName) && schema) {
          interface = this.generateInterface(interfaceName, schema)
          this.interfaceMap.set(interfaceName, interface)
        }
      }
    },

    /**
     * @description: 启动公共生成
     * @param {*}
     * @return {*}
     * */
    startCommon({ target, parameters, summary, key, method }) {
      const annotation = this.generateAnnotation(parameters, summary)
      if (this.formInline.new) {
        this.apiGenerate += this.generateFuction(target, key, method, annotation)
      }
      if (this.formInline.old) {
        const interfaceName = this.getInterfaceName(key, method)
        this.oldApiGenerate += this.generateOldFunction(key, method, annotation, interface, interfaceName)
      }
      const vueannotation = `/**
      * @description: ${summary}
      * @return {*}
      */`
      if (this.formInline.vueFunc) {
        this.vueFuncGenerate += this.generateVueFunc(key, method, vueannotation)
      }
    },



    /**
     * @description: 生成函数注释
     * @param {*} parameters
     * @return {*}
     */
    generateAnnotation(parameters = [], summary) {
      let paramStr = ``

      //  判断是否生成了参数
      if (paramStr) {
        return `
/**
  * @description: ${summary}
  ${paramStr}
  * @return {*}
  */ `
      } else {
        return `
/**
  * @description: ${summary}
  * @return {*}
  */ `
      }

    },

    /**
     * @description: 生成函数
     * @param {*} target
     * @param {*} key
     * @param {*} method
     * @param {*} annotation
     * @return {*}
     */
    generateFuction(target, key, method, annotation) {
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
    },


    generateInterface(methodName, schema) {
      console.log(methodName, schema);
      let paramStr = `
      interface ${methodName} {`
      for (const [key, value] of Object.entries(schema.properties)) {
        paramStr += `
          ${key}${schema.required.includes(key) ? ':' : '?:'}${dict[value.type]}`
      }

      paramStr += `
    }`

      return paramStr

    },

    // 生成swagger接口
    generateSwaggerInterface({ title, properties }) {
      return `\ninterface ${title} {\n${Object.entries(properties).map(([key, value]) => {
        return `${key}${value.required ? ':' : '?:'}${dict[value.type]}\n`
      }).join('')}}`
    },

    /**
     * @description: 生成旧版 api
     * @param {*}
     * @return {*}
     */
    generateOldFunction(key, method, summary, interface, interfaceName) {
      const paths = key.split('/')
      const methodPart = paths.at(-1)
      const url = `${this.formInline.oldHost}|${this.basePath}${key}|${method.toUpperCase()}`
      return `\n${summary}
          export const ${method}${methodPart.replace(/^\S/, s =>
        s.toUpperCase()
      )} = (data: ${interfaceName} ):Promise&lt;any&gt; =>  request('${url}',data)`
    },

    async getAppReservationPage() {
      try {
        this.tableLoading = true
        const { code, data } = await getAppReservationPage(this.listQuery)
        if (code === 0) {
          this.total = data.total
          this.tabelData = data.records
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.tableLoading = false
      }
    },

    /**
     * @description: 生成 vue 内部调用函数
     * @param {*} key
     * @param {*} method
     * @param {*} annotation
     * @return {*}
     */
    generateVueFunc(key, method, annotation) {
      const paths = key.split('/')
      const methodPart = paths.at(-1)
      const funcName = ` ${method}${methodPart.replace(/^\S/, s =>
        s.toUpperCase()
      )}`
      const funcStr = `
        ${annotation}
        async ${funcName}() {
            try {
                const { code, result } = await ${funcName}()
                if (code === 200 && result) {

                }else{
                    this.tableData = []
                }
            } catch (error) {
                console.log(error)
            }
        },`
      return funcStr
    },

    generateTable(row) {
      const properties = row.properties
      let keyArr = `
                [`
      let titleArr = `
                [`
      // const propertiesLength = Object.keys(row.properties).length-1
      // let index = 0
      function generateAccuracyStr(key, title) {
        if (/[准确率|正确率]/g.test(title)) {
          return `
            <template slot-scope="{row}">
              <div>
                {{((row['${key}']||0)*100).toFixed(2)}}%
              </div>
            </template>
            `
        }
        return ``
      }
      let str = `
            // ${row.title}
            <el-table :data="tableData"
            style="width: 100%"
            height="100%"
            v-loading="tableLoading"
            :header-row-style="aheaderRowStyle"
            :row-class-name="tableRowClassName">`
      for (const [key, value] of Object.entries(properties)) {
        keyArr += `"${key}",
                `
        titleArr += `"${value.description}",
                `
        str += `
                <el-table-column prop="${key}"
                     label="${value.description}"
                     sortable=''
                     min-width='160px'
                     align='center'>
                ${generateAccuracyStr(key, value.description)}
                </el-table-column> `
      }
      str += `
            </el-table>
            ${keyArr}]
            ${titleArr}]
            `
      return str
    },

    getInterfaceName(key, method) {
      const paths = key.split('/')
      const methodPart = paths.at(-1)
      return `${method.replace(/^\S/, s => s.toUpperCase())}${methodPart.replace(/^\S/, s => s.toUpperCase())}`
    }
  }
})
app.use(ElementPlus)
app.mount('#app')