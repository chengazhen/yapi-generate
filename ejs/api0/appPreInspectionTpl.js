/**
 * SVS3-RESERVATION APIs
 * appPreInspectionTpl模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app预诊模板信息
 * @param {object} data.req req
 * @param {string} data.req.modelCode 模板编码
 * @param {string} data.req.normalRange 正常范围
 * @param {string} data.req.optionType 选项类型 multiple多选,single单选,input输入
 * @param {string} data.req.options 预诊选项
 * @param {string} data.req.question 预诊问题
 * @param {string} data.req.remarks 备注
 */
export const appPreInspectionTpl = (data) => request({
  url: `/appPreInspectionTpl`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询app预诊模板 列表
 * @param {string} params.modelCode 模板编码
 * @param {string} params.normalRange 正常范围
 * @param {string} params.options 预诊选项
 * @param {string} params.optionType 选项类型 multiple多选,single单选,input输入
 * @param {string} params.question 预诊问题
 * @param {string} params.remarks 备注
 */
export const list = (params) => request({
  url: `/appPreInspectionTpl/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app预诊模板 列表
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.modelCode 模板编码
 * @param {string} params.normalRange 正常范围
 * @param {string} params.options 预诊选项
 * @param {string} params.optionType 选项类型 multiple多选,single单选,input输入
 * @param {string} params.question 预诊问题
 * @param {string} params.remarks 备注
 * @param {integer} params.size 分页大小，默认20
 */
export const page = (params) => request({
  url: `/appPreInspectionTpl/page`,
  method: 'get',
  params,
})
