import http from '../utils/http'


//文章保存
export function textSave(data){
    return http.post('/article/save', data)
}
//根据类型，标题查询
export function textFind(data){
    return http.post('/article/find', data)
}