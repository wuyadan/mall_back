<template>
  <el-dialog :title="info.isAdd ? '添加秒杀':'修改秒杀'" @close="cancel"  :visible.sync="info.isShow" width="675px">
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
         <el-row>
                    <el-col :span="20" :offset="2">
                        <el-form-item label="活动名称" prop="title">
                            <el-input v-model="forminfo.title" placeholder="请输入活动名称"></el-input>
                        </el-form-item>

                        <el-form-item label="活动时间" >
                            <!-- <el-date-picker ref="begin" style="width:150px" v-model="forminfo.begintime" prop="begintime" type="date" :picker-options="pickerStartDate" placeholder="开始日期">
                                </el-date-picker>
                                至
                            <el-date-picker ref="end" style="width:150px" v-model="forminfo.endtime" prop="endtime" type="date" :picker-options="pickerCloseDate" placeholder="结束日期">
                                </el-date-picker> -->
                                <el-date-picker
                                    v-model="value1"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                        </el-form-item>

                        <el-form-item label="一级分类">
                            <el-select v-model="forminfo.first_cateid" @change="topChange" placeholder="请选择">
                                <el-option  v-for="item in catelist" :key="item.id" :label="item.catename"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级分类">
                            <el-select v-model="forminfo.second_cateid" @change="secondChange" placeholder="请选择">
                                <el-option  v-for="item in secondlist" :key="item.id" :label="item.catename"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        
                        <el-form-item label="选择商品">
                            <el-select v-model="forminfo.goodsid" placeholder="请选择">
                                <el-option  v-for="item in goodsfilter" :key="item.id" :label="item.goodsname"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                 
                <el-row>
            <el-col :span="12" :offset="4">
                <el-form-item label="">
                    <el-button type="primary" @click="sumbit">提交</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        
        
    </el-form>
</el-dialog>
</template>
<script>
// 导入  添加和修改的 请求封装方法！
import { addSeckill,editSeckill } from "@/request/seckill"
import { getFilterGoods } from "@/request/goods"
import { mapGetters,mapActions } from "vuex"

// 导入富文本编辑器
import vueWangeditor from 'vue-wangeditor'

let defaultItem = {
    title:'',  
    begintime:"",
    endtime:"",
    first_cateid:"",
    second_cateid:"",
    goodsid:"",
    status:"",
}
let resetItem = {...defaultItem}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isAdd:true,
                    isShow:false
                }
            }
        }
    },
    data(){
        return{
            dialogVisible:false,
            forminfo:{...defaultItem},
            rules:{  // 验证规则对象！
                title:[{required:true,message:"必填！",trigger:'blur'}],
                // first_cateid:[{required:true,message:"必填！",trigger:'blur'}],
                // second_cateid:[{required:true,message:"必填！",trigger:'blur'}],
                // goodsid:[{required:true,message:"必填！",trigger:'blur'}],
            },
            value1:[],
            secondlist:[], //二级分类
            goodsfilter:[],
            pickerStartDate:{
                disabledDate: time => {
                    if (this.forminfo.endtime) {
                        return time.getTime() > this.forminfo.endtime;
                    }
                }
            },
            pickerCloseDate: {
                disabledDate: time => {
                    return time.getTime() < this.forminfo.begintime
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            catelist:"category/catelist",
            goodslist:"goods/goodslist",
            secklist:"seckill/secklist",
        }),
      
    },
    mounted() {
        if(!this.catelist.length){
            this.get_category_list();
        }
        if(!this.goodslist.length){
            this.get_goods_list();
        }
        if(!this.secklist.length){
            this.get_seck_list();
        }
       
    },
    
    methods:{
        ...mapActions({
            get_category_list:"category/get_category_list",
            get_goods_list:"goods/get_goods_list",
            get_seck_list:"seckill/get_seck_list",
        }),
        
        see(file){
            this.dialogVisible = true;
            this.dialogImageUrl = file.url // JS 生成的预览地址！
        },
        change(file,fileList){
            this.forminfo.img = file.raw;  // file.raw 是原生文件信息！
        },
        remove(file,fileList){
             this.forminfo.img =''
        },
        topChange(id){  //一级分类变化
            // console.log(val);
            this.secondlist = []
            this.forminfo.second_cateid = ''
            this.catelist.forEach(val => {
                if(val.id == id){
                    this.secondlist = val.children;
                    
                }
            })
        },
        async secondChange(id){  //二级列表变化
            // this.goodslist = [];
            // this.goodsfilter = [];
            // this.forminfo.goods_id = '';
            // this.goodslist.forEach(val => {
            //     if(val.second_cateid == id){
            //         this.goodsfilter.push(val);
            //     }
            // })

            let res = await getFilterGoods(this.forminfo.first_cateid, this.forminfo.second_cateid)
            this.goodsfilter=res
            // console.log(res)

        },
        setinfo(val){  // 将数据赋给默认defaultItem; 赋给表单
        // console.log(new Date(val.begintime*1))  //转成时间对象

        this.value1 = [new Date(val.begintime*1), new Date(val.endtime*1)]
            val.children ? delete val.children:''
            // console.log(val.begintime,val.endtime);
            this.topChange(val.first_cateid)
            this.secondChange(val.second_cateid);
            // 一级二级分类名称是添加接口不需要的
            'firstcatename' in val ? delete val.firstcatename:'';
            'secondcatename' in val ? delete val.secondcatename:'';
            defaultItem = {...val};
            this.forminfo = {...val};
        },
        async sumbit(){      
            // let date = new Date(this.$refs.begin.value);
            // let year1 = date.getFullYear();
            // let month1 = date.getMonth()+1;
            // let day1 = date.getDate();
            // this.forminfo.begintime=year1+'-'+month1+'-'+day1;  
            
            // let date1 = new Date(this.$refs.end.value);
            // let year2 = date1.getFullYear();
            // let month2 = date1.getMonth()+1;
            // let day2 = date1.getDate();
            // this.forminfo.endtime=year2+'-'+month2+'-'+ day2;

            // console.log(this.forminfo.begintime,this.forminfo.endtime); 
            // return

            // console.log(this.value1);
            // return
            if(!this.value1.length){
                this.$message.warning("请选择活动时间")
                return
            }
            this.forminfo.begintime = this.value1[0].getTime();
            this.forminfo.endtime = this.value1[1].getTime();


            // 表单验证！
            this.$refs.form.validate(async valid=>{
                if(valid){ // 如果验证通过！
                    let res;
                    
                    if(this.info.isAdd){ // 添加还是修改！
                    console.log(this.forminfo.begintime,this.forminfo.endtime);
                        res = await addSeckill(this.forminfo);
                    }else{
                        res = await editSeckill(this.forminfo)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg)
                        this.info.isShow = false;
                        this.get_seck_list();  // 再次获取列表，让仓库里面的数据是最新的！
                        this.cancel();
                    }else{
                        this.$message.error(res.msg)
                    }
                }
            })
        },
        reset(){
            if(this.info.isAdd){ // 添加时候的重置！
                this.cancel();
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
        },
        cancel(){ //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
            this.forminfo = {...resetItem}
            this.value1=[]
        }
    },
    components:{
        vueWangeditor
    }
}
</script>
<style scoped>
</style>