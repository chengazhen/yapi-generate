<template>
 <div class="page">
<el-table v-loading="tableLoading" :data="tabelData" border stripe>
<el-table-column prop="createBy" label="创建人"></el-table-column>
<el-table-column prop="createTime" label="创建时间"></el-table-column>
<el-table-column prop="deleteTime" label="删除时间"></el-table-column>
<el-table-column prop="effect" label="疫苗作用"></el-table-column>
<el-table-column prop="id" label="默认标题"></el-table-column>
<el-table-column prop="liveState" label="疫苗活性 D=非活疫苗，L=减活疫苗，M=非活和减活联合疫苗--关联字典表--vaccine_status"></el-table-column>
<el-table-column prop="remark" label="备注"></el-table-column>
<el-table-column prop="updateBy" label="更新人"></el-table-column>
<el-table-column prop="updateTime" label="更新时间"></el-table-column>
<el-table-column prop="vaccineCode" label="疫苗小类code"></el-table-column>
<el-table-column prop="vaccineEngName" label="疫苗小类英文名称"></el-table-column>
<el-table-column prop="vaccineFullName" label="疫苗小类全称"></el-table-column>
<el-table-column prop="vaccineGroupCode" label="疫苗大类编码"></el-table-column>
<el-table-column prop="vaccineGroupEngName" label="疫苗大类英文名称"></el-table-column>
<el-table-column prop="vaccineGroupFullName" label="疫苗大类全称"></el-table-column>
<el-table-column prop="vaccineName" label="疫苗小类名称"></el-table-column>
</el-table>
 <Pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getSysDictPage" /></div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {getVstVaccineSubclassPage,deleteVstVaccineSubclassId,putVstVaccineSubclassId,getVstVaccineSubclassList,postVstVaccineSubclass,getVstVaccineSubclassId} from '@/api/vst-vaccine-subclass-controller' 
export default{
  name:'',
  components:{
    Pagination
  },
  data(){
    return{
      listQuery:{
        page:1,
        size:20
      }
    }
  },
  methods:{
    /**
    * @description:分页查询疫苗小类表 列表 
    * @param {*}
    * @return {*}
    */
        async getVstVaccineSubclassPage (){
        try {
        const { code, data } = await getVstVaccineSubclassPage()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:删除疫苗小类表信息 
    * @param {*}
    * @return {*}
    */
        async deleteVstVaccineSubclassId (){
        try {
        const { code, data } = await deleteVstVaccineSubclassId()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:更新疫苗小类表表信息 
    * @param {*}
    * @return {*}
    */
        async putVstVaccineSubclassId (){
        try {
        const { code, data } = await putVstVaccineSubclassId()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:查询疫苗小类表 列表 
    * @param {*}
    * @return {*}
    */
        async getVstVaccineSubclassList (){
        try {
        const { code, data } = await getVstVaccineSubclassList()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:添加疫苗小类表信息 
    * @param {*}
    * @return {*}
    */
        async postVstVaccineSubclass (){
        try {
        const { code, data } = await postVstVaccineSubclass()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:详情信息 
    * @param {*}
    * @return {*}
    */
        async getVstVaccineSubclassId (){
        try {
        const { code, data } = await getVstVaccineSubclassId()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },


  }
}
</script>