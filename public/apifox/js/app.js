const { ref, createApp } = Vue;

const app = createApp({

  setup() {

    const formData = ref({
      host: 'https://doc.jsxygkj.com',
      pid: '258',
      email: '',
      password: ''
    })

    const formRules = {
      email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        // You can add more email validation rules here if needed
      ],
      password: [
        { required: true, message: 'Password is required', trigger: 'blur' },
        // You can add more password validation rules here if needed
      ],

      host: [
        { required: true, message: 'host is required', trigger: 'blur' },
      ],
      pid: [
        { required: true, message: 'pid is required', trigger: 'blur' },
      ]
    }

    const  tableData = ref([])


    function submitForm() {
      axios.post('/apifox', formData.value).then(res => {
        tableData.value = res.data.data
        ElementPlus.ElMessage({
          message: '生成成功',
          type: 'success'
        })
      }).catch(err => {
        ElementPlus.ElMessage({
          message: '生成失败',
          type: 'error'
        })
      })
    }

    return {
      formData,
      formRules,
      submitForm,
      tableData
    }
  }



})
console.log(23342);
app.use(ElementPlus)
app.mount('#app')