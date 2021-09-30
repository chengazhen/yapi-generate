/**
 * SVS3-RESERVATION APIs
 * appMessage模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app个人消息信息
 * @param {object} data.req req
 * @param {string} data.req.bizType 业务类型
 * @param {string} data.req.context 消息内容
 * @param {string} data.req.messageIcon 消息显示icon
 * @param {integer} data.req.messageId 消息id
 * @param {string} data.req.messageTime 消息发送时间
 * @param {string} data.req.readStatus 已读状态
 * @param {string} data.req.readTime 消息已读时间
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.sender 发送者
 * @param {string} data.req.senderId 发送者用户id
 * @param {string} data.req.title 消息标题
 * @param {string} data.req.userId 接受者id
 */
export const appMessage = (data) => request({
  url: `/appMessage`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询app个人消息
 */
export const getUserMessage = () => request({
  url: `/appMessage/getUserMessage`,
  method: 'get',
})

/**
 * @description 查询app个人消息 列表
 * @param {string} params.bizType 业务类型
 * @param {string} params.context 消息内容
 * @param {string} params.messageIcon 消息显示icon
 * @param {integer} params.messageId 消息id
 * @param {string} params.messageTime 消息发送时间
 * @param {string} params.readStatus 已读状态
 * @param {string} params.readTime 消息已读时间
 * @param {string} params.remarks 备注
 * @param {string} params.sender 发送者
 * @param {string} params.senderId 发送者用户id
 * @param {string} params.title 消息标题
 * @param {string} params.userId 接受者id
 */
export const list = (params) => request({
  url: `/appMessage/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app个人消息 列表
 * @param {string} params.bizType 业务类型
 * @param {string} params.context 消息内容
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.messageIcon 消息显示icon
 * @param {integer} params.messageId 消息id
 * @param {string} params.messageTime 消息发送时间
 * @param {string} params.readStatus 已读状态
 * @param {string} params.readTime 消息已读时间
 * @param {string} params.remarks 备注
 * @param {string} params.sender 发送者
 * @param {string} params.senderId 发送者用户id
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.title 消息标题
 * @param {string} params.userId 接受者id
 */
export const page = (params) => request({
  url: `/appMessage/page`,
  method: 'get',
  params,
})

/**
 * @description 更改app个人消息阅读状态
 * @param {string} params.messageId messageId
 */
export const readMessage = (params) => request({
  url: `/appMessage/readMessage`,
  method: 'get',
  params,
})
