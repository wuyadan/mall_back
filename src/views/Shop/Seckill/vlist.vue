<template>
  <div class="table-bg">
      <el-table :data="secklist">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="title" label="活动名称" align="center"></el-table-column>
          
          <el-table-column prop="begintime" label="开始时间" align="center">
              <template slot-scope="scope">
                  {{scope.row.begintime | getTime}}
              </template>
          </el-table-column>
         
          <el-table-column prop="endtime" label="结束时间" align="center">
              <template slot-scope="scope">
                  {{scope.row.endtime | getTime}}
              </template>
          </el-table-column>
          

          <el-table-column label="状态">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">已禁用</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
                </template>
          </el-table-column>
      </el-table>
      
  </div>
</template>
<script>
import { mapGetters,mapActions,mapMutations } from "vuex"
import { delSeckill } from "@/request/seckill"
export default {
    data(){
        return{
        }
    },
    computed: {
        ...mapGetters({
            secklist:"seckill/secklist",
        })
    },
    mounted() {
        if(!this.secklist.length){
            this.get_seck_list();
        }
        // if(!this.get_specs_list.length){
        //     this.get_specs_list();
        // }
    },
    methods:{
        ...mapMutations({
        }),
        ...mapActions({
            get_seck_list:"seckill/get_seck_list",
        }),
        edit(val){
            this.$emit('edit',{...val})
        },
        async del(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delSeckill(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    // 如果本页只有1条数据！且不是第1页！
                    
                    this.get_seck_list(); // 重新获取列表！
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