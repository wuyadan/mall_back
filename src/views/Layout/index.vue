<template>
    <el-container class="page">
        <el-aside :width="iscollapse ? '64px':'220px'" class="page-nav">
            <left/>
        </el-aside>
        <el-container class="page-content">
            <el-header class="page-header">
                <top/>
            </el-header>
            <el-main height="" class="page-main">
                <!-- Main content -->
                <tagslist/>
                 <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import top from "./top"
import left from "./left"
import { mapState } from "vuex"
import tagslist from './tagslist'
export default {
    data(){
        return{  }
    },
    computed: {
        ...mapState(['iscollapse'])
    },
    methods:{},
    components:{
        top,left,tagslist
    }
}
</script>
<style scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.page-nav{
    height: 100%;
    background-color: #444;
}
.page-content{
    height: 100%;
    background-color: #f7f7f7;
}
.page-header{
    background-color: #fff;
    box-shadow:  0 0 4px 0 rgba(0,0,0,.3);
     position: relative;
  z-index: 1000;
}
.page-main{
    position: relative;
    padding-top: 60px;
    /* width: 1146px; */
}
.el-aside::-webkit-scrollbar,
.el-main::-webkit-scrollbar{
    display: none
}

</style>