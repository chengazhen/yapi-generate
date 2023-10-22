<template>
 <div class="page">
<el-table v-loading="tableLoading" :data="tabelData" border stripe>
<el-table-column prop="id" label="默认标题"></el-table-column>
<el-table-column prop="personalConfCode" label="业务编码(用于Update或Delete)"></el-table-column>
<el-table-column prop="profileCode" label="受种人编码"></el-table-column>
<el-table-column prop="reason" label="原因(为何拒种或偏好该产品/产品批次)"></el-table-column>
<el-table-column prop="targetCode" label="关系编码(与关系级别一起决定是哪一个小类/产品/产品批次)"></el-table-column>
<el-table-column prop="targetLevel" label="关系级别(1-小类级别；2-产品级别；3-批号级别)"></el-table-column>
<el-table-column prop="weight" label="权重(1-10000决定偏好，设为0代表拒种)"></el-table-column>
</el-table>
 <Pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getSysDictPage" /></div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {getVstPersonalizeConfigurationPage,deleteVstPersonalizeConfigurationId,putVstPersonalizeConfigurationId,getVstPersonalizeConfigurationList,postVstPersonalizeConfiguration,getVstPersonalizeConfigurationId} from '@/api/vst-personalize-configuration-controller' 
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
    * @description:分页查询个人接种说明表 列表 
    * @param {*}
    * @return {*}
    */
        async getVstPersonalizeConfigurationPage (){
        try {
        const { code, data } = await getVstPersonalizeConfigurationPage()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:删除个人接种说明表信息 
    * @param {*}
    * @return {*}
    */
        async deleteVstPersonalizeConfigurationId (){
        try {
        const { code, data } = await deleteVstPersonalizeConfigurationId()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:更新个人接种说明表表信息 
    * @param {*}
    * @return {*}
    */
        async putVstPersonalizeConfigurationId (){
        try {
        const { code, data } = await putVstPersonalizeConfigurationId()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:查询个人接种说明表 列表 
    * @param {*}
    * @return {*}
    */
        async getVstPersonalizeConfigurationList (){
        try {
        const { code, data } = await getVstPersonalizeConfigurationList()
          if (code === 0) {
             console.log(data);
          }
        } catch (error) {
              console.log(error);
        }
    },

    /**
    * @description:添加个人接种说明表信息 
    * @param {*}
    * @return {*}
    */
        async postVstPersonalizeConfiguration (){
        try {
        const { code, data } = await postVstPersonalizeConfiguration()
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
        async getVstPersonalizeConfigurationId (){
        try {
        const { code, data } = await getVstPersonalizeConfigurationId()
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