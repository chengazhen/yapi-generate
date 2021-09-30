/**
 * SVS3-RESERVATION APIs
 * confWorkday模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加工作日配置表信息
 * @param {object} data.req req
 * @param {integer} data.req.confNum 门诊号源数量
 * @param {string} data.req.intervalDate 间隔时间
 * @param {string} data.req.povCode 门诊编号
 * @param {string} data.req.povName 门诊名称
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.workAm 上午上班时间
 * @param {string} data.req.workArray 门诊每周几上下午上班数组
 * @param {string} data.req.workPm 下午上班时间
 */
export const confWorkday = (data) => request({
  url: `/confWorkday`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询工作日配置表 列表
 * @param {integer} params.confNum 门诊号源数量
 * @param {string} params.intervalDate 间隔时间
 * @param {string} params.povCode 门诊编号
 * @param {string} params.povName 门诊名称
 * @param {string} params.remarks 备注
 * @param {string} params.workAm 上午上班时间
 * @param {string} params.workArray 门诊每周几上下午上班数组
 * @param {string} params.workPm 下午上班时间
 */
export const list = (params) => request({
  url: `/confWorkday/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询工作日配置表 列表
 * @param {integer} params.confNum 门诊号源数量
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.intervalDate 间隔时间
 * @param {string} params.povCode 门诊编号
 * @param {string} params.povName 门诊名称
 * @param {string} params.remarks 备注
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.workAm 上午上班时间
 * @param {string} params.workArray 门诊每周几上下午上班数组
 * @param {string} params.workPm 下午上班时间
 */
export const page = (params) => request({
  url: `/confWorkday/page`,
  method: 'get',
  params,
})
