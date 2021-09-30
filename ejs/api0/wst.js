/**
 * SVS3-RESERVATION APIs
 * wst模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 获取皖事通用户信息
 * @param {string} params.token token
 */
export const userInfo = (params) => request({
  url: `/wst/userInfo`,
  method: 'get',
  params,
})
