// 当前这个模块：api进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"

// 三级联动的接口。
// api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () => requests({ url: '/api/product/getBaseCategoryList', method: 'get' });
export const reqBanner = () => mockRequests.get('/banner')
export const reqFloor = () => mockRequests.get('/floor')
export const reqSearch = (params) => requests({ url: 'api/list', method: 'post', data: params })