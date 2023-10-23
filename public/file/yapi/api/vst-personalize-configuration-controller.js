
/**
 * 个人接种说明表
 * createTime 2021-09-27 18:16:00
 * updateTime 2021-09-27 18:16:00
 */
 
import request from '@/utils/request';
    
    
/**
 * 分页查询个人接种说明表 列表
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/6053
 * 备注: 
 */
export function getVstPersonalizeConfigurationPage(params, other = {}) {
  return request({
    url: `/vstPersonalizeConfiguration/page`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 删除个人接种说明表信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/6074
 * 备注: 
 */
export function deleteVstPersonalizeConfigurationId(id, data, other = {}) {
  return request({
    url: `/vstPersonalizeConfiguration/${id}`,
    method: 'DELETE',
    data,
    ...other
  })
}
    
/**
 * 更新个人接种说明表表信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/6067
 * 备注: 
 */
export function putVstPersonalizeConfigurationId(id, data, other = {}) {
  return request({
    url: `/vstPersonalizeConfiguration/${id}`,
    method: 'PUT',
    data,
    ...other
  })
}
    
/**
 * 查询个人接种说明表 列表
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/6046
 * 备注: 
 */
export function getVstPersonalizeConfigurationList(params, other = {}) {
  return request({
    url: `/vstPersonalizeConfiguration/list`,
    method: 'GET',
    params,
    ...other
  })
}
    
/**
 * 添加个人接种说明表信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/6039
 * 备注: 
 */
export function postVstPersonalizeConfiguration(data, other = {}) {
  return request({
    url: `/vstPersonalizeConfiguration`,
    method: 'POST',
    data,
    ...other
  })
}
    
/**
 * 详情信息
 * YAPI: https://doc.jsxygkj.com/project/258/interface/api/6060
 * 备注: 
 */
export function getVstPersonalizeConfigurationId(id, params, other = {}) {
  return request({
    url: `/vstPersonalizeConfiguration/${id}`,
    method: 'GET',
    params,
    ...other
  })
}
    