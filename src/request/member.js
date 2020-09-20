import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取规格列表
 */
export async function getMember() {
    let res = await $axios.get("/memberlist")
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
export function addMember(data){
    return  $axios.post("/memberadd",data)
}
/**
 * 修改规格
 * @param {*} data  修改的数据
 */
export function editMember(data) {
    return $axios.post("/memberedit", data)
}
/**
 * 删除规格
 * @param {*} uid  删除的id
 */
export function delMember(id) {
    return $axios.post("/memberdelete", { id})
}


