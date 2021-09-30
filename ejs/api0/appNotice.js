/**
 * SVS3-RESERVATION APIs
 * appNotice模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app官方发布消息信息
 * @param {object} data.req req
 * @param {string} data.req.context 消息内容
 * @param {string} data.req.imageSrc 消息封面图片地址
 * @param {string} data.req.link 消息详情跳转地址,优先于context跳转
 * @param {string} data.req.publishStatus 发布状态0-否1-是
 * @param {string} data.req.receiverRegion 接受者区域
 * @param {string} data.req.remarks 备注
 * @param {string} data.req.subTitle 消息副标题
 * @param {string} data.req.title 消息标题
 */
export const appNotice = (data) => request({
  url: `/appNotice`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询app个人消息
 * @param {string} params.deptType 公告类型 cdc-官方发布,pov-门诊消息
 */
export const getUserNotice = (params) => request({
  url: `/appNotice/getUserNotice`,
  method: 'get',
  params,
})

/**
 * @description 查询app官方发布消息 列表
 * @param {string} params.context 消息内容
 * @param {string} params.deptCode 发布机构编码
 * @param {string} params.deptName 发布机构名称
 * @param {string} params.deptType 发布机构类型-cdc,pov,other
 * @param {string} params.imageSrc 消息封面图片地址
 * @param {string} params.link 消息详情跳转地址,优先于context跳转
 * @param {string} params.noticeId 通知id
 * @param {string} params.publishStatus 发布状态0-否1-是
 * @param {string} params.publishTime 发布时间
 * @param {string} params.receiverRegion 接受者区域
 * @param {string} params.remarks 备注
 * @param {string} params.subTitle 消息副标题
 * @param {string} params.title 消息标题
 */
export const list = (params) => request({
  url: `/appNotice/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询app官方发布消息 列表
 * @param {string} params.context 消息内容
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.deptCode 发布机构编码
 * @param {string} params.deptName 发布机构名称
 * @param {string} params.deptType 发布机构类型-cdc,pov,other
 * @param {string} params.imageSrc 消息封面图片地址
 * @param {string} params.link 消息详情跳转地址,优先于context跳转
 * @param {string} params.noticeId 通知id
 * @param {string} params.publishStatus 发布状态0-否1-是
 * @param {string} params.publishTime 发布时间
 * @param {string} params.receiverRegion 接受者区域
 * @param {string} params.remarks 备注
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.subTitle 消息副标题
 * @param {string} params.title 消息标题
 */
export const page = (params) => request({
  url: `/appNotice/page`,
  method: 'get',
  params,
})

/**
 * @description 发布公告
 * @param {object} data.req req
 * @param {string} data.req.noticeId 通知id
 */
export const publish = (data) => request({
  url: `/appNotice/publish`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 公告设置已读状态
 * @param {string} params.noticeId noticeId
 */
export const readNotice = (params) => request({
  url: `/appNotice/readNotice`,
  method: 'get',
  params,
})

/**
 * @description 获取上传图片url
 */
export const uploadImg = () => request({
  url: `/appNotice/uploadImg`,
  method: 'get',
})
