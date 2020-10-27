// 获取菜单列表！
// import { getRole } from "@/request/role"

import VueRouter from "vue-router";

import router from '../../router'

let taglist = localStorage.getItem('taglist') ? JSON.parse(localStorage.getItem('taglist')) : []

export default {
    namespaced:true,
    state: {
        taglist
    },
    getters: {
        taglist: state => state.taglist
        
    },
    mutations: {
        SET_TAGS(state,route){
            // 判断是否已经存在，如果存在就不添加
            let isExist = state.taglist.some(val=>val.path == route.fullPath);
            if(!isExist){
                state.taglist.push({
                    name:route.meta.title,
				    path:route.fullPath
                })
                localStorage.setItem('taglist', JSON.stringify(state.taglist))
            }
        },
        DEL_TAGS(state,{index,isActive}){
            if(isActive){
                let delItem = state.taglist[index];
                state.taglist.splice(index,1)
                if(state.taglist.length){
                    if(index == state.taglist.length){
                        router.push(state.taglist[index-1].path)
                    }else{
                        router.push(state.taglist[index].path)
                    }
                }else{
                    // 删除的那个是最后一个元素
                    router.push("/");

                }
            }else{
                state.taglist.splice(index,1)
            }
        },
        DEL_ALL(state){
            state.taglist = [];
            localStorage.setItem('taglist', JSON.stringify(state.taglist))
            router.push("/")
        },
        DEL_OTHERS(state,path){
            state.taglist = state.taglist.filter(val=>val.path === path)
        }
    },
   
};