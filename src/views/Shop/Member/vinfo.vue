<template>
  <el-dialog title="修改会员信息" @close="cancel"  :visible.sync="info.isShow" width="520px">
   <!-- 表单 -->
    <el-form :model="forminfo" ref="memberform" :rules="rules" label-width="100px">
        <el-form-item label="会员昵称" prop="nickname">
             <el-input v-model="forminfo.nickname" placeholder="请输入昵称" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="手机号" prop="phone">
             <el-input v-model="forminfo.phone" placeholder="请输入手机号" disabled></el-input>
        </el-form-item>

		<el-form-item label="密码" prop="password">
             <el-input v-model="forminfo.password" placeholder="请输入密码" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item label="状态">
            <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="sumbit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// 导入  添加和修改的 请求封装方法！
import { editMember } from "@/request/member"
let defaultItem = {
    nickname:"",  
	phone:"",
	password:"",
    status:1    // 状态1正常2禁用
}
let resetItem = {...defaultItem}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isShow:false
                }
            }
        }
    },
    data(){
        return{
            forminfo:{...defaultItem},
            rules:{  // 验证规则对象！
            },
            list:[{value:''}]
        }
    },
    methods:{
       
        
        setinfo(val){  // 将数据赋给默认defaultItem; 赋给表单
            
            // this.list = val.attrs.map(v=>({
            //     value:v
            // }))
            defaultItem = {...val};
            this.forminfo = {...val};
        },
        async sumbit(){
            
            // 表单验证！
            this.$refs.memberform.validate(async valid=>{
                if(valid){ // 如果验证通过！
                    let res;
                        res = await editMember(this.forminfo)
                    
                    if(res.code==200){
                        this.$message.success(res.msg)
                        this.info.isShow = false;
                        this.$emit('update'); // 提示数据更新
                        this.cancel();
                    }else{
                        this.$message.error(res.msg)
                    }
                }
            })
        },
        reset(){
            this.setinfo({...defaultItem})    
        },
        cancel(){
            this.forminfo = {...resetItem}
            this.list = [{value:''}]
        }
    },
    components:{}
}
</script>
<style scoped>
</style>