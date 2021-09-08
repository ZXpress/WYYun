//封装网络请求
import request from '../utils/request'

// 将来外面可能传入params的值 {limit: 20}
export const recommendMusic = params => request({
    url: '/personalized',
    params: params
})

export const newMusic = params => request({
    url: "/personalized/newsong",
    params: params
})

