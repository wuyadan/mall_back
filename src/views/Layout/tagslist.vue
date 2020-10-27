<template>
<div class="taglist">
	<el-scrollbar class="scroll-bar">
		<el-tag 
		class="item"
		v-for="(tag,index) in taglist" 
		:key="index"
		closable
		:type="isActive(tag.path) ? '':'info'"
		size="small"
		@close="clearSingle(tag.path,index)"
		>
		
		<router-link :to="tag.path">{{tag.name}}</router-link>
		
		</el-tag>
		<el-tag @click.native="DEL_ALL" v-if="!(taglist.length===1&&taglist[0].path=='/index')" class="item" type="info" size="small">关闭所有</el-tag>
		<el-tag @click.native="DEL_OTHERS($route.fullPath)" v-if="!(taglist.length===1&&taglist[0].path=='/index')" class="item" type="info" size="small">关闭其他</el-tag>
	</el-scrollbar>
</div>
</template>
<script>
import { mapMutations,mapGetters } from 'vuex'
export default {
	data() {
	  return {
		  list:[12,12,12,34]
	  }
	},
	watch:{
		$route:{
			immediate:true,
			deep:true,
			handler(newval){
				// 传入当前路由地址信息
				this.SET_TAGS(newval)
				// console.log(newval)
			}
		}
	},
	components: {},
	
	methods:{
		...mapMutations({
			SET_TAGS:"tagsview/SET_TAGS",
			DEL_TAGS:"tagsview/DEL_TAGS",
			DEL_ALL:"tagsview/DEL_ALL",
			DEL_OTHERS:"tagsview/DEL_OTHERS"
		}),
		isActive(path){
			return path === this.$route.fullPath
		},
		clearSingle(path,index){
			// 删除某一个tag
			if(this.$route.fullPath === path){
				this.DEL_TAGS({index,isActive:true})
			}else{
				// 未激活的
				this.DEL_TAGS({index})
			}
		},
	},
	computed:{
		...mapGetters({
			taglist:"tagsview/taglist"
		})
	},
	created(){},
	mounted(){},
}
</script>
<style>
.scroll-bar{
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	height: 40px;
	background-color: #fff;
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, .3);
	padding: 0 10px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.taglist .item{
	margin: 8px;
}
.taglist .item:hover{
	cursor: pointer;
}
.taglist .item a{
	text-decoration: none;
	color: inherit;
}
</style>