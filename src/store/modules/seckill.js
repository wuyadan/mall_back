// 获取菜单列表！
import { getSeckill } from "@/request/seckill"


export default {
    namespaced:true,
    state: {
        secklist:[],  // 角色列表
        
    },
    getters: {
        secklist: state => state.secklist,
        
    },
    mutations: {
        SET_LIST(state,data){
            state.secklist = data;
        },
    
    },
    actions: {
        // 请求菜单列表的数据！
        async get_seck_list({commit,state,dispatch}){
            let res = await getSeckill();  
            // res.forEach(val => {
            //     val.specsattr = val.specsattr ? val.specsattr.split(","):[]
            // })
            commit('SET_LIST',res)
            // 请求数量
        },
        
    }
};