<template>
 <div class="page">
<el-table v-loading="tableLoading" :data="tabelData" border stripe>
</el-table>
 <Pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getSysDictPage" /></div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {getEpiReservationScheme,getEpiVaccinatePlan,getEpiReservationSchemeV2,postSubscribe} from '@/api/epi-controller' 
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
    * @description:查询预约计划 
    * @param {*}
    * @return {*}
    */
        async getEpiReservationScheme (){
        try {
        const { code, data } = await getEpiReservationScheme()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:查询预约计划 
    * @param {*}
    * @return {*}
    */
        async getEpiVaccinatePlan (){
        try {
        const { code, data } = await getEpiVaccinatePlan()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:查询预约计划 
    * @param {*}
    * @return {*}
    */
        async getEpiReservationSchemeV2 (){
        try {
        const { code, data } = await getEpiReservationSchemeV2()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:预约上报 
    * @param {*}
    * @return {*}
    */
        async postSubscribe (){
        try {
        const { code, data } = await postSubscribe()
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