/**
 * SVS3-RESERVATION APIs
 * appUser模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加app用户表信息
 * @param {object} data.req req
 * @param {string} data.req.account 用户账号用户密码登录
 * @param {string} data.req.password 密码-用于密码登录
 * @param {string} data.req.phone 账号-用户密码登录
 * @param {string} data.req.profileId 档案id
 * @param {string} data.req.regionCode 区域编码
 * @param {string} data.req.userId 用户ID
 * @param {string} data.req.userName 用户名称
 */
export const appUser = (data) => request({
  url: `/appUser`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查询用户关联的档案信息
 * @param {string} params.userId 用户的user_Id
 */
export const profile = (params) => request({
  url: `/appUser/bound/profile`,
  method: 'get',
  params,
})

/**
 * @description 家庭成员
 * @param {integer} params.id id
 */
export const member = (params) => request({
  url: `/appUser/family/member/${id}`,
  method: 'get',
  params,
})

/**
 * @description 大数据局接口调用接口
 * @param {string} params.idCard idCard
 */
export const familyData = (params) => request({
  url: `/appUser/familyData/${idCard}`,
  method: 'get',
  params,
})

/**
 * @description 获取登录用户信息
 */
export const information = () => request({
  url: `/appUser/information`,
  method: 'get',
})

/**
 * @description 查询app用户表 列表
 * @param {string} params.account 用户账号用户密码登录
 * @param {string} params.name 用户名称
 * @param {string} params.password 密码-用于密码登录
 * @param {string} params.phone 账号-用户密码登录
 * @param {string} params.profileId 档案id
 * @param {string} params.regionCode 区域编码
 * @param {string} params.userId 用户ID
 */
export const list = (params) => request({
  url: `/appUser/list`,
  method: 'get',
  params,
})

/**
 * @description 登录
 * @param {object} data.appUserLoginDTO appUserLoginDTO
 * @param {string} data.appUserLoginDTO.channel 渠道
 * @param {string} data.appUserLoginDTO.openIdOrUserId 
 * @param {string} data.appUserLoginDTO.openid openid
 */
export const login = (data) => request({
  url: `/appUser/login`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 分页查询app用户表 列表
 * @param {string} params.account 用户账号用户密码登录
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.name 用户名称
 * @param {string} params.password 密码-用于密码登录
 * @param {string} params.phone 账号-用户密码登录
 * @param {string} params.profileId 档案id
 * @param {string} params.regionCode 区域编码
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.userId 用户ID
 */
export const page = (params) => request({
  url: `/appUser/page`,
  method: 'get',
  params,
})

/**
 * @description 刷新token
 */
export const refreshToken = () => request({
  url: `/appUser/refreshToken`,
  method: 'get',
})

/**
 * @description 获取上传头像url
 */
export const uploadAvatar = () => request({
  url: `/appUser/uploadAvatar`,
  method: 'get',
})
