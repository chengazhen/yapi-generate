/**
 * SVS3-RESERVATION APIs
 * appArticleComment模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app疫苗课堂评论表信息
 * @param {object} data.req req
 * @param {string} data.req.articleId 文章id
 * @param {string} data.req.context 评论内容
 * @param {string} data.req.quoteId 应用评论的id
 */
export const appArticleComment = (data) => request({
  url: `/appArticleComment`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询app疫苗课堂评论表 列表
 * @param {string} params.articleId 文章id
 * @param {string} params.commentId 评论id
 * @param {string} params.context 评论内容
 * @param {string} params.quoteId 应用评论的id
 * @param {string} params.remarks 备注
 * @param {integer} params.thumbs 点赞数
 * @param {string} params.userId 评论用户id
 */
export const list = (params) => request({
  url: `/appArticleComment/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app疫苗课堂评论表 列表
 * @param {string} params.articleId 文章id
 * @param {string} params.commentId 评论id
 * @param {string} params.context 评论内容
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.quoteId 应用评论的id
 * @param {string} params.remarks 备注
 * @param {integer} params.size 分页大小，默认20
 * @param {integer} params.thumbs 点赞数
 * @param {string} params.userId 评论用户id
 */
export const page = (params) => request({
  url: `/appArticleComment/page`,
  method: 'get',
  params,
})
