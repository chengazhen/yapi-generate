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
        if (!/openapi/.test(value)) {
          // value = value + '/v2/api-docs'
          this.platform = 'swagger'
        }

        this.$notify({
          type: "success",
          title: '提示',
          position: "bottom-right",
          message: `当前api文档平台为 (${this.platform}) `
        })

        this.loading = true


        axios
          .get(value)
          .then(({ data }) => {
            this.loading = false
            const { tags, basePath, definitions } = data
            this.basePath = basePath || ''
            this.module = tags
            this.apiData = data.paths

            // 收集生成表格的原生数据
            var reg = /^[\u4e00-\u9fa5]\S*[\u4e00-\u9fa5]$/
            for (const key in definitions) {
              if (reg.test(key)) {
                this.tableDataRow.push(definitions[key])
              }
            }
            // debugger
            this.definitions = definitions
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
      for (const key in this.apiData) {
        const target = this.apiData[key]
        let method = 'get'
        let tag
        if (target['get']) {
          tag = target['get'].tags
          method = 'get'
        } else {
          tag = target['post'].tags
          method = 'post'
        }
        if (tag.includes(this.formInline.module)) {
          let parameters
          parameters = target[method].parameters
          const tableRow = target[method]['responses'][200]['schema']?.$ref

          this.tableDataRow.find(item => {
            const reg = new RegExp(`${item.title}`, 'g')
            if (reg.test(tableRow)) {
              this.tableGenerateData += this.generateTable(item)
            }
          })

          summary = target[method].summary


          //  --------------------生成interface-------------------------
          let interface = ''
          // 判断是哪个平台
          // 如果是 apifox
          if (/openapi/.test(this.formInline.url)) {
            const interfaceName = this.getInterfaceName(key, method)
            const { requestBody } = target[method]
            if (requestBody) {
              const schema = requestBody?.content['application/json']?.schema
              if (!this.interfaceMap.has(interfaceName) && schema) {
                const schema = requestBody.content['application/json']?.schema
                interface = this.generateInterface(interfaceName, schema)
                this.interfaceMap.set(interfaceName, interface)
              }
            }

          } else {

            // swagger 平台

            const swagger = new Swagger(parameters, this.definitions, this.formInline.oldHost)

            const schema = swagger.getSchema()

            if (!schema) {
              continue
            }

            this.apiGenerate += swagger.generateFuction(key, method, swagger.generateAnnotation(summary))

            const interfaceName = swagger.getInterfaceName(schema) || swagger.generateInterfaceName(method, key)
            interface = swagger.getInterface(interfaceName)
            
            if (!this.interfaceMap.has(interfaceName)) {
              this.interfaceMap.set(interfaceName, interface)
            }

            // swagerr 重构了代码，如果是 swagger 就直接跳过下面的代码
            continue
          }


          const annotation = this.generateAnnotation(parameters, summary)
          if (this.formInline.new) {
            this.apiGenerate += this.generateFuction(
              target,
              key,
              method,
              annotation
            )
          }

          if (this.formInline.old) {
            this.oldApiGenerate += this.generateOldFunction(
              key,
              method,
              annotation,
              interface,
              interfaceName
            )
          }

          const vueannotation = `
            /**
            * @description: ${summary}
            *  @return {*}
            */ `
          if (this.formInline.vueFunc) {
            this.vueFuncGenerate += this.generateVueFunc(
              key,
              method,
              vueannotation
            )
          }
        }
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