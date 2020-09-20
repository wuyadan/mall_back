import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取规格列表
 */
export async function getSeckill() {
    let res = await $axios.get("/secklist")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加规格
 * @param {*} data  添加的数据
 */
export function addSeckill(data){
    return  $axios.post("/seckadd",data)
}
/**
 * 修改规格
 * @param {*} data  修改的数据
 */
export function editSeckill(data) {
    return $axios.post("/seckedit", data)
}
/**
 * 删除规格
 * @param {*} uid  删除的id
 */
export function delSeckill(id) {
    return $axios.post("/seckdelete", {id})
}

