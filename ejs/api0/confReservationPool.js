/**
 * SVS3-RESERVATION APIs
 * confReservationPool模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加预约号源池信息
 * @param {object} data.req req
 * @param {string} data.req.confNum 号源总数量
 * @param {string} data.req.povCode 门诊编号
 * @param {string} data.req.povName 门诊名称
 * @param {integer} data.req.remainNum 号源剩余数量
 * @param {string} data.req.timeSlot 接种时间段
 * @param {string} data.req.workdayDate 工作日日期
 */
export const confReservationPool = (data) => request({
  url: `/confReservationPool`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询预约号源池 列表
 * @param {string} params.confNum 号源总数量
 * @param {string} params.povCode 门诊编号
 * @param {string} params.povName 门诊名称
 * @param {integer} params.remainNum 号源剩余数量
 * @param {string} params.timeSlot 接种时间段
 * @param {string} params.workdayDate 工作日日期
 */
export const list = (params) => request({
  url: `/confReservationPool/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询预约号源池 列表
 * @param {string} params.confNum 号源总数量
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.povCode 门诊编号
 * @param {string} params.povName 门诊名称
 * @param {integer} params.remainNum 号源剩余数量
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.timeSlot 接种时间段
 * @param {string} params.workdayDate 工作日日期
 */
export const page = (params) => request({
  url: `/confReservationPool/page`,
  method: 'get',
  params,
})

/**
 * @description 根据门诊编号查询号源日期
 * @param {string} params.povCode povCode
 */
export const workdayDate = (params) => request({
  url: `/confReservationPool/workdayDate`,
  method: 'get',
  params,
})

/**
 * @description 根据门诊编号和日期查询号源时间
 * @param {string} params.povCode povCode
 * @param {string} params.workdayDate workdayDate
 */
export const workdayTime = (params) => request({
  url: `/confReservationPool/workdayTime`,
  method: 'get',
  params,
})
