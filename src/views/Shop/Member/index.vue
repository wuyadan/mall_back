<template>
  <div>
     
     <!-- 添加/修改组件 -->
     <v-info :info="info" ref="form" @update="update"></v-info>

	 <!-- 列表组件 -->
     <v-list @edit="edit" ref="list"></v-list>
  </div>
</template>
<script>
import VList from "./vlist"
import VInfo from "./vinfo"
export default {
    data(){
        return{
          info:{ // 这是组件的info变量！
            isShow:false
          },
          list:[]
        }
    },
    methods:{
      
      edit(val){
        this.info.isShow = true;
        // 调用弹框组件的setinfo方法！
        // console.log("这里",this.$refs)
        // return
        this.$refs.form.setinfo(val);
      },
      update(){
        this.$refs.list.get_member();
      }
    },
    components:{
      VList,VInfo
    }
}
</script>
<style scoped>
</style>