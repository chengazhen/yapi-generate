/**
 * SVS3-RESERVATION APIs
 * appReservationDetail模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app预约记录详情信息
 * @param {object} data.req req
 * @param {string} data.req.batchNo 疫苗批号
 * @param {string} data.req.groupCode 疫苗大类编码
 * @param {string} data.req.payStatus 支付状态
 * @param {string} data.req.price 价格
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.reservationCode 预约编号
 * @param {string} data.req.signStatus 签署告知书状态
 * @param {string} data.req.status 预约状态
 * @param {string} data.req.vaccinateNo 接种剂次
 * @param {string} data.req.vaccineCode 疫苗小类编码
 * @param {string} data.req.vaccineName 疫苗显示名称
 */
export const appReservationDetail = (data) => request({
  url: `/appReservationDetail`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description app预约详情信息
 * @param {integer} params.id id
 */
export const app = (params) => request({
  url: `/appReservationDetail/app/${id}`,
  method: 'get',
  params,
})

/**
 * @description 查询app预约记录详情 列表
 * @param {string} params.batchNo 疫苗批号
 * @param {string} params.groupCode 疫苗大类编码
 * @param {string} params.payStatus 支付状态
 * @param {string} params.price 价格
 * @param {string} params.remarks 备注
 * @param {string} params.reservationCode 预约编号
 * @param {string} params.signStatus 签署告知书状态
 * @param {string} params.status 预约状态
 * @param {string} params.vaccinateNo 接种剂次
 * @param {string} params.vaccineCode 疫苗小类编码
 * @param {string} params.vaccineName 疫苗显示名称
 */
export const list = (params) => request({
  url: `/appReservationDetail/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app预约记录详情 列表
 * @param {string} params.batchNo 疫苗批号
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.groupCode 疫苗大类编码
 * @param {string} params.payStatus 支付状态
 * @param {string} params.price 价格
 * @param {string} params.remarks 备注
 * @param {string} params.reservationCode 预约编号
 * @param {string} params.signStatus 签署告知书状态
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.status 预约状态
 * @param {string} params.vaccinateNo 接种剂次
 * @param {string} params.vaccineCode 疫苗小类编码
 * @param {string} params.vaccineName 疫苗显示名称
 */
export const page = (params) => request({
  url: `/appReservationDetail/page`,
  method: 'get',
  params,
})

/**
 * @description 根据档案编码查询详情
 * @param {string} params.profileCode profileCode
 */
export const profileCode = (params) => request({
  url: `/appReservationDetail/profileCode`,
  method: 'get',
  params,
})
