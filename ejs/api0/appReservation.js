/**
 * SVS3-RESERVATION APIs
 * appReservation模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app预约记录信息
 * @param {object} data.req req
 * @param {array} data.req.addAppReservationDetailREQ 预约详情
 * @param {string} data.req.channel 预约渠道
 * @param {string} data.req.planDate 计划接种时间(不可修改)
 * @param {string} data.req.povCode 接种单位编码
 * @param {string} data.req.povName 接种单位
 * @param {string} data.req.profileCode 档案编码
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.reservationCode 预约编号
 * @param {string} data.req.reservationDate 预约日期
 * @param {string} data.req.reservationTime 预约时段
 * @param {string} data.req.status 预约状态
 * @param {string} data.req.userId 预约人id
 */
export const appReservation = (data) => request({
  url: `/appReservation`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 取消预约
 * @param {integer} data.id id
 */
export const reservation = (data) => request({
  url: `/appReservation/cancel/reservation/${id}`,
  method: 'put',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询预约详情列表详细(所有预约页面使用)
 * @param {string} params.channel 预约渠道
 * @param {string} params.planDate 计划接种时间(不可修改)
 * @param {string} params.povCode 接种单位编码
 * @param {string} params.povName 接种单位
 * @param {string} params.profileCode 档案编码
 * @param {string} params.remarks 备注
 * @param {string} params.reservationCode 预约编号
 * @param {string} params.reservationDate 预约日期
 * @param {string} params.reservationTime 预约时段
 * @param {string} params.status 预约状态
 * @param {string} params.userId 预约人id
 */
export const detail = (params) => request({
  url: `/appReservation/detail`,
  method: 'get',
  params,
})

/**
 * @description 查询app预约记录 列表
 * @param {string} params.channel 预约渠道
 * @param {string} params.planDate 计划接种时间(不可修改)
 * @param {string} params.povCode 接种单位编码
 * @param {string} params.povName 接种单位
 * @param {string} params.profileCode 档案编码
 * @param {string} params.remarks 备注
 * @param {string} params.reservationCode 预约编号
 * @param {string} params.reservationDate 预约日期
 * @param {string} params.reservationTime 预约时段
 * @param {string} params.status 预约状态
 * @param {string} params.userId 预约人id
 */
export const list = (params) => request({
  url: `/appReservation/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app预约记录 列表
 * @param {string} params.channel 预约渠道
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.planDate 计划接种时间(不可修改)
 * @param {string} params.povCode 接种单位编码
 * @param {string} params.povName 接种单位
 * @param {string} params.profileCode 档案编码
 * @param {string} params.remarks 备注
 * @param {string} params.reservationCode 预约编号
 * @param {string} params.reservationDate 预约日期
 * @param {string} params.reservationTime 预约时段
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.status 预约状态
 * @param {string} params.userId 预约人id
 */
export const page = (params) => request({
  url: `/appReservation/page`,
  method: 'get',
  params,
})

/**
 * @description 后台预约详情信息1-N
 * @param {string} params.reservationCode reservationCode
 */
export const detailReservationCode = (params) => request({
  url: `/appReservation/reservationCode/detail/`,
  method: 'get',
  params,
})

/**
 * @description app添加预约和详情
 * @param {object} data.req req
 * @param {array} data.req.addAppReservationDetailREQ 预约详情
 * @param {string} data.req.channel 预约渠道
 * @param {string} data.req.planDate 计划接种时间(不可修改)
 * @param {string} data.req.povCode 接种单位编码
 * @param {string} data.req.povName 接种单位
 * @param {string} data.req.profileCode 档案编码
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.reservationCode 预约编号
 * @param {string} data.req.reservationDate 预约日期
 * @param {string} data.req.reservationTime 预约时段
 * @param {string} data.req.status 预约状态
 * @param {string} data.req.userId 预约人id
 */
export const subscribe = (data) => request({
  url: `/appReservation/subscribe`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 修改预约时间
 * @param {integer} data.detailId detailId
 * @param {object} data.req req
 * @param {string} data.req.channel 预约渠道
 * @param {string} data.req.planDate 计划接种时间(不可修改)
 * @param {string} data.req.povCode 接种单位编码
 * @param {string} data.req.povName 接种单位
 * @param {string} data.req.profileCode 档案编码
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.reservationCode 预约编号
 * @param {string} data.req.reservationDate 预约日期
 * @param {string} data.req.reservationTime 预约时段
 * @param {string} data.req.status 预约状态
 * @param {string} data.req.userId 预约人id
 */
export const updateReservationDate = (data) => request({
  url: `/appReservation/updateReservationDate/${detailId}`,
  method: 'put',
  data,
  headers: { 'Content-Type': 'application/json' },
})
