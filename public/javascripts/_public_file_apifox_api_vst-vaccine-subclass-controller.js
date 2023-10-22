
/**
 * 疫苗小类表
 * createTime 2021-10-27 11:28:00
 * updateTime 2021-10-27 11:28:00
 */
 
import request from '@/utils/request';
    
    
/**
 * 分页查询疫苗小类表 列表
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7264
 * 备注: 
 */
export function getVstVaccineSubclassPage(params, other = {}) {
  return request({
    url: `/vstVaccineSubclass/page`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 删除疫苗小类表信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7285
 * 备注: 
 */
export function deleteVstVaccineSubclassId(id, data, other = {}) {
  return request({
    url: `/vstVaccineSubclass/${id}`,
    method: 'DELETE',
    data,
    ...other
  })
}
    
/**
 * 更新疫苗小类表表信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7278
 * 备注: 
 */
export function putVstVaccineSubclassId(id, data, other = {}) {
  return request({
    url: `/vstVaccineSubclass/${id}`,
    method: 'PUT',
    data,
    ...other
  })
}
    
/**
 * 查询疫苗小类表 列表
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7257
 * 备注: 
 */
export function getVstVaccineSubclassList(params, other = {}) {
  return request({
    url: `/vstVaccineSubclass/list`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 添加疫苗小类表信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7250
 * 备注: 
 */
export function postVstVaccineSubclass(data, other = {}) {
  return request({
    url: `/vstVaccineSubclass`,
    method: 'POST',
    data,
    ...other
  })
}
    
/**
 * 详情信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/7271
 * 备注: 
 */
export function getVstVaccineSubclassId(id, params, other = {}) {
  return request({
    url: `/vstVaccineSubclass/${id}`,
    method: 'GET',
    params,
    ...other
  })
}
    