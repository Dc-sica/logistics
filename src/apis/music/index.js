import request from './../../config/service'

// 网易接口
export function getList(params) {
    return request({
        url: `cloudmusic`,
        method: 'GET',
        params
    })
}

