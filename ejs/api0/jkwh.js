/**
 * SVS3-RESERVATION APIs
 * jkwh模块
 * http://192.168.160.220:8084/swagger-ui.html
 */

import request from '@/utils/request'

/**
 * @description 获取皖事通用户信息
 * @param {string} params.sesseionId sesseionId
 */
export const userInfo = (params) => request({
  url: `/jkwh/userInfo`,
  method: 'get',
  params,
})
