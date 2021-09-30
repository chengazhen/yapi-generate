/**
 * SVS3-RESERVATION APIs
 * appArticle模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加疫苗课堂表信息
 * @param {object} data.req req
 * @param {string} data.req.commentAble 是否可发表评论
 * @param {string} data.req.content 内容
 * @param {string} data.req.image 图片地址
 * @param {string} data.req.mainHead 主标题
 * @param {string} data.req.subHead 副标题
 */
export const appArticle = (data) => request({
  url: `/appArticle`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询疫苗课堂表 列表
 * @param {string} params.content 内容
 * @param {string} params.mainHead 主标题
 * @param {string} params.subHead 副标题
 */
export const list = (params) => request({
  url: `/appArticle/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询疫苗课堂表 列表
 * @param {string} params.content 内容
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.mainHead 主标题
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.subHead 副标题
 */
export const page = (params) => request({
  url: `/appArticle/page`,
  method: 'get',
  params,
})

/**
 * @description 获取上传图片url
 */
export const uploadImg = () => request({
  url: `/appArticle/uploadImg`,
  method: 'get',
})
