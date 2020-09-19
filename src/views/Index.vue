<template>
<div>
  <v-chart class="box" :options="data1"></v-chart>
  <v-chart class="box" :options="data2"></v-chart>
</div>
</template>
<script>
// 局部使用
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie"
import "echarts/lib/chart/bar"
import 'echarts/lib/component/tooltip'
import "echarts/lib/component/polar"

let data1 = {
  // 每块的鼠标效果悬浮提示信息
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			// 图例设置
			legend: {
				orient: 'vertical',
				left: 0,
				data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
			},
			// 数据
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: ['0%', '70%'],
					avoidLabelOverlap: true,
					label: {
						// 是否固定或悬浮时显示每个在中间显示
						show: true,
						position: 'outside',
						// formatter:'{a} <br/>{b}: {c} ({d}%)'
					},
					emphasis: {
						// 悬浮每块时是否显示文字
						label: {
							show: true,
							fontSize: '20',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: true
					},
					data:[]
				}
			]
}

let data2 = {
  xAxis:{
    type:'category',
    data:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  },
  yAxis:{
    type:'value'
  },
  series:[{
    data:[],
    type:'bar'
  }]
}

export default {
    data(){
        return{
          data1:data1,
          data2:{}
        }
    },
    created(){
      // console.log(this.$router)
      setTimeout(() => {
        this.data1.series[0].data= [
						{ value: 335, name: '直接访问' },
						{ value: 310, name: '邮件营销' },
						{ value: 234, name: '联盟广告' },
						{ value: 135, name: '视频广告' },
						{ value: 1548, name: '搜索引擎' }
          ]
        data2.series[0].data=[5, 20, 36, 10, 10, 20];
        this.data2 = data2
      }, 2000)
    },
    methods:{},
    components:{
      'v-chart': ECharts
    }
}
</script>
<style scoped>
.box{
  width: 450px;
  height: 250px;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}
</style>