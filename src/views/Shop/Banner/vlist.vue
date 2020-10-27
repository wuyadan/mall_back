<template>
  <div class="table-bg">
      <el-table :data="bannerlist">
          <el-table-column prop="id" label="ID" width="120" align="center"></el-table-column>
          <el-table-column prop="title" label="轮播图名称" align="center"></el-table-column>
          <el-table-column label="轮播图" align="center">
              <template slot-scope="scope">
                  <img style="width:80px" v-if="scope.row.img" :src="scope.row.img | pixImg" alt="">
                  <span v-else>暂无图片</span>
              </template>
          </el-table-column>
          <el-table-column label="状态">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
                </template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { delBanner,getBanner } from "@/request/banner"
export default {
    data(){
        return{
            bannerlist:[]
        }
    },
    computed: {
        
    },
    mounted() {
        this.get_banner_list();
    },
    methods:{
       
        edit(val){
            this.$emit('edit',{...val})
        },
        async get_banner_list(){
            let res = await getBanner()
            this.bannerlist = res;
        },
        async del(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delBanner(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    // 如果本页只有1条数据！且不是第1页！
                    this.get_banner_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        }
    },
    components:{}
}
</script>
<style scoped>
</style>