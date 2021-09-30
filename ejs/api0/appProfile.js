/**
 * SVS3-RESERVATION APIs
 * appProfile模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 添加档案信息
 * @param {object} data.req req
 * @param {string} data.req.avatar 档案头像
 * @param {string} data.req.birthCardNo 出生证号码
 * @param {string} data.req.birthDate 出生日期
 * @param {string} data.req.birthHospitalCode 出生医院编码
 * @param {integer} data.req.birthWeight 出生体重
 * @param {string} data.req.censusAddress 户口地址 - 详细
 * @param {string} data.req.censusCityCode 户口地址 - 市
 * @param {string} data.req.censusDistrictCode 户口地址 - 区县
 * @param {string} data.req.censusProvCode 户口地址 - 省
 * @param {string} data.req.contactPhone 联系电话，手机号
 * @param {string} data.req.gender 性别
 * @param {string} data.req.grantRelation 是否可授予授权(只有本人可授权)
 * @param {string} data.req.grantStatus 是否授权
 * @param {string} data.req.id 
 * @param {string} data.req.idCardNo 证件号码
 * @param {string} data.req.idCardType 证件类型
 * @param {string} data.req.liveAddress 居住地址 - 详细
 * @param {string} data.req.liveCityCode 居住地址 - 市
 * @param {string} data.req.liveCommunityCode 所属区块，关联社区基础数据 - povCode 字段
 * @param {string} data.req.liveDistrictCode 居住地址 - 区县
 * @param {string} data.req.liveProvCode 居住地址 - 省
 * @param {string} data.req.name 姓名
 * @param {string} data.req.nationCode 民族编码
 * @param {integer} data.req.parity 胎次
 * @param {string} data.req.povCode 管理pov编码，所属pov编码
 * @param {string} data.req.povName 管理pov名称，所属pov名称
 * @param {string} data.req.profileCode 档案编码
 * @param {string} data.req.profileStatusCode 档案状态，关联字典表 - profile_status，在册、离册等
 * @param {string} data.req.profileTypeCode 档案类型编码，关联字典表 profile_type
 * @param {string} data.req.relation 关系
 * @param {string} data.req.residentialTypeCode 居住属性，关联字典表 - residential_type，本地、外来、流动
 * @param {string} data.req.revokeRelation 是否可撤销授权(除了本人都可撤销)
 * @param {string} data.req.verify 认证状态-0-未认证 1-已认证
 */
export const appProfile = (data) => request({
  url: `/appProfile`,
  method: 'post',
  data,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * @description 查看档案的授权记录(分页)
 * @param {string} params.profileCode profileCode
 */
export const record = (params) => request({
  url: `/appProfile/auth/record`,
  method: 'get',
  params,
})

/**
 * @description 查看档案绑定的用户
 * @param {string} params.profileCode profileCode
 */
export const user = (params) => request({
  url: `/appProfile/bound/user`,
  method: 'get',
  params,
})

/**
 * @description 查询档案 列表
 * @param {string} params.birthCardNo 出生证号码
 * @param {string} params.birthDate 出生日期
 * @param {string} params.birthHospitalCode 出生医院编码
 * @param {integer} params.birthWeight 出生体重
 * @param {string} params.censusAddress 户口地址 - 详细
 * @param {string} params.censusCityCode 户口地址 - 市
 * @param {string} params.censusDistrictCode 户口地址 - 区县
 * @param {string} params.censusProvCode 户口地址 - 省
 * @param {string} params.contactPhone 联系电话，手机号
 * @param {string} params.gender 性别
 * @param {string} params.idCardNo 证件号码
 * @param {string} params.idCardType 证件类型
 * @param {string} params.liveAddress 居住地址 - 详细
 * @param {string} params.liveCityCode 居住地址 - 市
 * @param {string} params.liveCommunityCode 所属区块，关联社区基础数据 - povCode 字段
 * @param {string} params.liveDistrictCode 居住地址 - 区县
 * @param {string} params.liveProvCode 居住地址 - 省
 * @param {string} params.name 姓名
 * @param {string} params.nationCode 民族编码
 * @param {integer} params.parity 胎次
 * @param {string} params.povCode 管理pov编码，所属pov编码
 * @param {string} params.profileCode 档案编码
 * @param {string} params.profileStatusCode 档案状态，关联字典表 - profile_status，在册、离册等
 * @param {string} params.profileTypeCode 档案类型编码，关联字典表 profile_type
 * @param {string} params.residentialTypeCode 居住属性，关联字典表 - residential_type，本地、外来、流动
 * @param {string} params.verify 认证状态-0-未认证 1-已认证
 */
export const list = (params) => request({
  url: `/appProfile/list`,
  method: 'get',
  params,
})

/**
 * @description 分页查询档案 列表
 * @param {string} params.birthCardNo 出生证号码
 * @param {string} params.birthDate 出生日期
 * @param {string} params.birthHospitalCode 出生医院编码
 * @param {integer} params.birthWeight 出生体重
 * @param {string} params.censusAddress 户口地址 - 详细
 * @param {string} params.censusCityCode 户口地址 - 市
 * @param {string} params.censusDistrictCode 户口地址 - 区县
 * @param {string} params.censusProvCode 户口地址 - 省
 * @param {string} params.contactPhone 联系电话，手机号
 * @param {integer} params.current 页码， 默认1
 * @param {string} params.gender 性别
 * @param {string} params.idCardNo 证件号码
 * @param {string} params.idCardType 证件类型
 * @param {string} params.liveAddress 居住地址 - 详细
 * @param {string} params.liveCityCode 居住地址 - 市
 * @param {string} params.liveCommunityCode 所属区块，关联社区基础数据 - povCode 字段
 * @param {string} params.liveDistrictCode 居住地址 - 区县
 * @param {string} params.liveProvCode 居住地址 - 省
 * @param {string} params.name 姓名
 * @param {string} params.nationCode 民族编码
 * @param {integer} params.parity 胎次
 * @param {string} params.povCode 管理pov编码，所属pov编码
 * @param {string} params.profileCode 档案编码
 * @param {string} params.profileStatusCode 档案状态，关联字典表 - profile_status，在册、离册等
 * @param {string} params.profileTypeCode 档案类型编码，关联字典表 profile_type
 * @param {string} params.residentialTypeCode 居住属性，关联字典表 - residential_type，本地、外来、流动
 * @param {integer} params.size 分页大小，默认20
 * @param {string} params.verify 认证状态-0-未认证 1-已认证
 */
export const page = (params) => request({
  url: `/appProfile/page`,
  method: 'get',
  params,
})

/**
 * @description 刷新档案
 * @param {string} params.idCardNo idCardNo
 * @param {string} params.userId userId
 */
export const refreshProFile = (params) => request({
  url: `/appProfile/refreshProFile`,
  method: 'get',
  params,
})

/**
 * @description 获取上传图片url
 */
export const uploadImg = () => request({
  url: `/appProfile/uploadImg`,
  method: 'get',
})
