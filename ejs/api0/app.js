/**
 * SVS3-RESERVATION APIs
 * app模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description app常见问题
 */
export const appCommonProblem = () => request({
  url: `/app/appCommonProblem`,
  method: 'get',
})

/**
 * @description app使用说明
 */
export const appExplain = () => request({
  url: `/app/appExplain`,
  method: 'get',
})

/**
 * @description 疫苗介绍(根据疫苗小类编码查询)
 * @param {string} params.groupCode groupCode
 * @param {string} params.vaccineCode vaccineCode
 */
export const recommend = (params) => request({
  url: `/app/vaccine/recommend`,
  method: 'get',
  params,
})

/**
 * @description 根据门诊编号查询号源日期
 * @param {string} params.povCode povCode
 */
export const workdayDate = (params) => request({
  url: `/app/vaccine/workdayDate`,
  method: 'get',
  params,
})

/**
 * @description 根据门诊编号和日期查询号源时间
 * @param {string} params.povCode povCode
 * @param {string} params.workdayDate workdayDate
 */
export const workdayTime = (params) => request({
  url: `/app/vaccine/workdayTime`,
  method: 'get',
  params,
})
