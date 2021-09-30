/**
 * SVS3-RESERVATION APIs
 * appActivity模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app首页活动轮播表信息
 * @param {object} data.req req
 * @param {string} data.req.activityTime 活动开始时间
 * @param {string} data.req.context 活动详情内容
 * @param {string} data.req.deadline 活动结束时间
 * @param {string} data.req.imageSrc 图片地址
 * @param {string} data.req.link 活动详情跳转地址,优先于context跳转
 * @param {string} data.req.subTitle 副标题
 * @param {string} data.req.title 主标题
 */
export const appActivity = (data) => request({
  url: `/appActivity`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 详情信息
 */
export const banner = () => request({
  url: `/appActivity/banner`,
  method: 'get',
})

/**
 * @description 查询app首页活动轮播表 列表
 * @param {string} params.activityTime 活动开始时间
 * @param {string} params.context 活动详情内容
 * @param {string} params.deadline 活动结束时间
 * @param {string} params.imageSrc 图片地址
 * @param {string} params.link 活动详情跳转地址,优先于context跳转
 * @param {string} params.subTitle 副标题
 * @param {string} params.title 主标题
 */
export const list = (params) => request({
  url: `/appActivity/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app首页活动轮播表 列表
 * @param {string} params.activityTime 活动开始时间
 * @param {string} params.context 活动详情内容
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.deadline 活动结束时间
 * @param {string} params.imageSrc 图片地址
 * @param {string} params.link 活动详情跳转地址,优先于context跳转
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.subTitle 副标题
 * @param {string} params.title 主标题
 */
export const page = (params) => request({
  url: `/appActivity/page`,
  method: 'get',
  params,
})
