/**
 * SVS3-RESERVATION APIs
 * confHoliday模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加节假日配置表信息
 * @param {object} data.req req
 * @param {string} data.req.holidayDate 节假日日期
 * @param {string} data.req.holidayType 节假日类型(1放假2补班)
 * @param {string} data.req.year 年度
 */
export const confHoliday = (data) => request({
  url: `/confHoliday`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询节假日配置表 列表
 * @param {string} params.holidayDate 节假日日期
 * @param {string} params.holidayType 节假日类型(1放假2补班)
 * @param {string} params.year 年度
 */
export const list = (params) => request({
  url: `/confHoliday/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询节假日配置表 列表
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.holidayDate 节假日日期
 * @param {string} params.holidayType 节假日类型(1放假2补班)
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.year 年度
 */
export const page = (params) => request({
  url: `/confHoliday/page`,
  method: 'get',
  params,
})
