// 当前这个模块：api进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"

// 三级联动的接口。
// api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () => requests({ url: '/api/product/getBaseCategoryList', method: 'get' });
export const reqBanner = () => mockRequests.get('/banner')
export const reqFloor = () => mockRequests.get('/floor')
export const reqSearch = (params) => requests({ url: 'api/list', method: 'post', data: params })
export const reqDetail = (skuId) => requests({ url: `api/item/${skuId}`, method: 'get' })
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `api/cart/addToCart/${ skuId }/${ skuNum }`, method: 'post' })
export const reqCastList = () => requests({ url: '/api/cart/cartList', method: 'get' })
export const reqDeleteCartById = (skuId) => requests({ url: `/api/cart/deleteCart/${skuId}`, method: 'delete'})
export const reqChangeCheckedById = (skuId,isChecked) => requests({ url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})
export const reqGetCode = (phone) => requests({url:`/api/user/passport/sendCode/${phone}`, method: 'get'})
export const reqRegist = (data) => requests({url:'/api/user/passport/register',data, method: 'post'})
export const reqUserLogin = (data) => requests({url:'/api/user/passport/login',data, method: 'post'})
export const reqUserInfo = () => requests({url: '/api/user/passport/auth/getUserInfo',method: 'get'})
