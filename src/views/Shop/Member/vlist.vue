<template>
  <div class="table-bg">
      <el-table :data="memberlist">
          <el-table-column prop="uid" label="ID" align="center"></el-table-column>
          <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
          
          <!-- <el-table-column v-else prop="nickname" label="昵称" align="center"></el-table-column> -->

          <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="addtime" label="注册日期" align="center"></el-table-column>
          <el-table-column label="状态">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
              </template>
          </el-table-column>
          <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                </template>
          </el-table-column>
      </el-table>

     
  </div>
</template>
<script>
import { delMember,getMember } from "@/request/member"
export default {
    data(){
        return{
            input:'',
            memberlist:[]
        }
    },
    computed: {
        
    },
    mounted() {
        this.get_member()
    },
    methods:{
       
        change(e){
            this.$forceUpdate();
        },
        edit(val){
            this.isShow=true;
            this.$emit('edit',{...val})
        },
        async get_member(){
            let res = await getMember();
            this.memberlist=res;
        },
        async del(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delMember(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    // 如果本页只有1条数据！且不是第1页！
                    this.get_member(); // 重新获取列表！
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