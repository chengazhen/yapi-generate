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
      interfaceResMap: new Map(),
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
        this.$notify({
          type: "success",
          title: '提示',
          position: "bottom-right",
          message: `当前api文档平台为 (${utils.getPlatform(value)}) `
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

            if (utils.isNotTags(tags, this.apiData)) {
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

            const name = utils.generateInferfaceName(key, method)
            const { parameters = [], summary, requestBody = null, responses = null } = target[method]

            if (requestBody) {
              if (/openapi/.test(this.formInline.url)) {
                this.startApifox({ name, requestBody, responses })
              } else {
                this.startSwagger({ parameters, summary, requestBody, key, method })
              }
            }

            if (responses) {
              this.startApifoxRes(name, responses)
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

    startApifoxRes(name, responses) {
      const resSchema = getInnerContentProperty(responses);

      if (resSchema) {
        // 返回基本类型，直接取值
        if (['string', 'number', 'boolean'].includes(resSchema.type)) {
          return this.interfaceResMap.set(name, `export type ${name} = ${resSchema.type}`)
        }

        const jsonString = utils.generateResInterface(resSchema, name)
        if (resSchema.type === 'object') {
          this.interfaceResMap.set(name, jsonString)
        }

        if (resSchema.type === 'array') {
          this.interfaceResMap.set(name, `${jsonString}`)
        }
      }

      function getInnerContentProperty(data, key = 'result') {
        return data[200].content["application/json"].schema.properties[key]
      }
    },

    startApifox({ name, requestBody, responses }) {
      const schema = requestBody.content['application/json']?.schema
      if (this.interfaceMap.has(name)) {
        return
      }
      const _schema = utils.normalizeSchema(schema)
      const interface = utils.generateApifoxInterface(name, _schema)
      this.interfaceMap.set(name, interface)



    },

    /**
     * @description: 启动公共生成
     * @param {*}
     * @return {*}
     * */
    startCommon({ summary, key, method }) {
      const annotation = utils.generateAnnotation(summary)
      this.apiGenerate += utils.generateFunction(this.basePath, key, method, annotation)
      this.vueFuncGenerate += utils.generateVueFunc(key, method, utils.getVueAnnotation(summary))
    },

  }
})
app.use(ElementPlus)
app.mount('#app')

