/**
 * SVS3-RESERVATION APIs
 * appFeedbackRecord模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加信息
 * @param {object} data.req req
 * @param {string} data.req.content 反馈内容
 * @param {string} data.req.image 图片url
 * @param {string} data.req.phone 联系电话
 */
export const appFeedbackRecord = (data) => request({
  url: `/appFeedbackRecord`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询 列表
 * @param {string} params.content 反馈内容
 * @param {string} params.image 图片url
 * @param {string} params.phone 联系电话
 */
export const list = (params) => request({
  url: `/appFeedbackRecord/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询 列表
 * @param {string} params.content 反馈内容
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.image 图片url
 * @param {string} params.phone 联系电话
 * @param {integer} params.size 分页大小，默认20
 */
export const page = (params) => request({
  url: `/appFeedbackRecord/page`,
  method: 'get',
  params,
})
