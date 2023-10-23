
/**
 * 免疫规划模型
 * createTime 2021-08-25 16:26:32
 * updateTime 2021-08-25 16:26:32
 */
 
import request from '@/utils/request';
    
    
/**
 * 查询预约计划
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/4492
 * 备注: 
 */
export function getEpiReservationScheme(params, other = {}) {
  return request({
    url: `/epi/reservationScheme`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 查询预约计划
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7425
 * 备注: 
 */
export function getEpiVaccinatePlan(params, other = {}) {
  return request({
    url: `/epi/vaccinatePlan`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 查询预约计划
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/9861
 * 备注: 
 */
export function getEpiReservationSchemeV2(params, other = {}) {
  return request({
    url: `/epi/reservationSchemeV2`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 预约上报
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/4709
 * 备注: 
 */
export function postSubscribe(data, other = {}) {
  return request({
    url: `/subscribe`,
    method: 'POST',
    data,
    ...other
  })
}
    