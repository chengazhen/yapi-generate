/**
 * SVS3-RESERVATION APIs
 * appReservationOperation模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app预约操作表信息
 * @param {object} data.req req
 * @param {string} data.req.operationTime 操作时间
 * @param {string} data.req.operationType 操作类型 1登记 2-取消 3-改约 4-违约
 * @param {string} data.req.povCode 登记门诊编码
 * @param {string} data.req.reservationCode 预约编号
 * @param {string} data.req.userId 用户id
 */
export const appReservationOperation = (data) => request({
  url: `/appReservationOperation`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询app预约操作表 列表
 * @param {string} params.operationTime 操作时间
 * @param {string} params.operationType 操作类型 1登记 2-取消 3-改约 4-违约
 * @param {string} params.povCode 登记门诊编码
 * @param {string} params.reservationCode 预约编号
 * @param {string} params.userId 用户id
 */
export const list = (params) => request({
  url: `/appReservationOperation/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app预约操作表 列表
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.operationTime 操作时间
 * @param {string} params.operationType 操作类型 1登记 2-取消 3-改约 4-违约
 * @param {string} params.povCode 登记门诊编码
 * @param {string} params.reservationCode 预约编号
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.userId 用户id
 */
export const page = (params) => request({
  url: `/appReservationOperation/page`,
  method: 'get',
  params,
})
