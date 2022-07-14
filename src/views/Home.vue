<template>
  <div id="home">
    <div class="body">
      <h1 id="title">一燕不能成春，一树不能成林</h1>
      <div class="banner">
        <a-input-group compact>
          <a-select default-value="湖北" v-model="province">
            <a-select-option value="湖北"> 湖北 </a-select-option>
            <a-select-option value="湖南"> 湖南 </a-select-option>
            <a-select-option value="上海"> 上海 </a-select-option>
            <a-select-option value="北京"> 北京 </a-select-option>
          </a-select>
          <a-input-search
            style="width: 40%"
            placeholder="请输入城市名称开始找房"
            enter-button
            @search="onSearch"
          />
        </a-input-group>
      </div>
      <div style="opacity: 0.8; width: 80%; margin: auto">
        <a-row :gutter="150">
          <a-col :span="6">
            <a-card title="Card title" :bordered="false" :hoverable="true">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card title="Card title" :bordered="false" :hoverable="true">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card title="Card title" :bordered="false" :hoverable="true">
              <p>card content</p>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card title="Card title" :bordered="false" :hoverable="true">
              <a-statistic
                :value="11.28"
                :precision="2"
                suffix="%"
                :value-style="{ color: '#3f8600' }"
              >
                <template #prefix>
                  <a-icon type="arrow-up" />
                </template>
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="charts"> 
		<Charts :options="gain"/>
		<Charts :options="drop"/>
	</div>
  </div>
</template>

<script>
import Charts from "../component/Charts";
export default {
  components: {
    Charts,
  },
  data() {
    return {
      province: "湖北",
	  // 涨幅
	  gain:{
	          // 标题设置
	          title: {
	            text: "宜昌房价涨跌幅",
	          },
	          legend: {
	            data: ["价格", "涨幅"],
	          },
	          grid: {
	            containLabel: true,
	            left: 20,
	          },
	          animationDurationUpdate: 500,
	          series: [
	            {
	              name: "价格",
	              id: "bar1",
	              barCategoryGap: "40%",
	              color: "red",
	              type: "bar",
	              label: {
	                show: true,
	                position: "right",
	                offset: [10, 0],
	                fontSize: 12,
	              },
	              data: [
	                {
	                  value: 7.699,
	                },
	                {
	                  value: 11.576,
	                },
	                {
	                  value: 1.2112,
	                },
	                {
	                  value: 6.261,
	                },
	                {
	                  value: 5.11,
	                },
	                {
	                  value: 10.893,
	                },
	                {
	                  value: 9.901,
	                },
	                {
	                  value: 6.679,
	                },
	                {
	                  value: 7.007,
	                },
	                {
	                  value: 11.778,
	                },
	              ],
	              symbolRepeat: true,
	              symbolSize: [("80%", "60%")],
	              universalTransition: {
	                enabled: true,
	                delay: function (idx, total) {
	                  return (idx / total) * 1000;
	                },
	              },
	            },
	            {
	              name: "涨幅",
	              id: "bar2",
	              type: "bar",
	              barGap: "10%",
	              label: {
	                show: true,
	                position: "right",
	                offset: [10, 0],
	                fontSize: 12,
	              },
	               data: [
	                {
	                  value: 12.2,
	                },
	                {
	                  value: 12.04,
	                },
	                {
	                  value: 10.21,
	                },
	                {
	                  value: 10.04,
	                },
	                {
	                  value: 8.06,
	                },
	                {
	                  value: 7.43,
	                },
	                {
	                  value: 6.67,
	                },
	                {
	                  value: 6.35,
	                },
	                {
	                  value: 6.15,
	                },
	                {
	                  value: 5.9,
	                },
	              ],
	              symbolRepeat: true,
	              symbolSize: ["80%", "60%"],
	              color: "#00bfff",
	              universalTransition: {
	                enabled: true,
	                delay: function (idx, total) {
	                  return (idx / total) * 1000;
	                },
	              },
	            },
	          ],
	          xAxis: {
	            splitLine: { show: false },
	            axisLabel: { show: false },
	            axisTick: { show: false },
	            axisLine: { show: false },
	          },
	          yAxis: {
	            data: [
	              "阳光花园",
	              "维多利亚港湾别墅",
	              "龙盘湖高尔夫别墅二期",
	              "英郡年华",
	              "佳恒南郡天下",
	              "半岛花园二期",
	              "江山多娇别墅",
	              "山水龙城E区",
	              "清波小区",
	              "江山风华",
	            ],
	            inverse: true,
	            axisLine: { show: false },
	            axisTick: { show: false },
	            axisLabel: {
	              margin: 30,
	              fontSize: 14,
	            },
	            axisPointer: {
	              label: {
	                show: true,
	                margin: 30,
	              },
	            },
	          },
	          tooltip: {
	            trigger: "axis",
	            axisPointer: {
	              type: "shadow",
	            },
	          },
	  },
	  // 跌幅
	  drop:{
	          // 标题设置
	          title: {
	            text: "宜昌房价涨跌幅",
	          },
	          legend: {
	            data: ["价格", "跌幅"],
	          },
	          grid: {
	            containLabel: true,
	            left: 20,
	          },
	          animationDurationUpdate: 500,
	          series: [
	            {
	              name: "价格",
	              id: "bar1",
	              barCategoryGap: "40%",
	              color: "red",
	              type: "bar",
	              label: {
	                show: true,
	                position: "right",
	                offset: [10, 0],
	                fontSize: 12,
	              },
	              data: [
	                {
	                  value: 6.088,
	                },
	                {
	                  value: 5.125,
	                },
	                {
	                  value: 5.127,
	                },
	                {
	                  value: 7.068,
	                },
	                {
	                  value: 7.16,
	                },
	                {
	                  value: 8.041,
	                },
	                {
	                  value: 3.052,
	                },
	                {
	                  value: 7.162,
	                },
	                {
	                  value: 1.463,
	                },
	                {
	                  value: 9.303,
	                },
	              ],
	              symbolRepeat: true,
	              symbolSize: [("80%", "60%")],
	              universalTransition: {
	                enabled: true,
	                delay: function (idx, total) {
	                  return (idx / total) * 1000;
	                },
	              },
	            },
	            {
	              name: "跌幅",
	              id: "bar2",
	              type: "bar",
	              barGap: "10%",
	              label: {
	                show: true,
	                position: "right",
	                offset: [10, 0],
	                fontSize: 12,
	              },
	               data: [
	                {
	                  value: 10.88,
	                },
	                {
	                  value: 8.76,
	                },
	                {
	                  value: 8.29,
	                },
	                {
	                  value: 7.23,
	                },
	                {
	                  value: 6.93,
	                },
	                {
	                  value: 5.83,
	                },
	                {
	                  value: 5.74,
	                },
	                {
	                  value: 5.25,
	                },
	                {
	                  value: 5.25,
	                },
	                {
	                  value: 4.8,
	                },
	              ],
	              symbolRepeat: true,
	              symbolSize: ["80%", "60%"],
	              color: "#00bfff",
	              universalTransition: {
	                enabled: true,
	                delay: function (idx, total) {
	                  return (idx / total) * 1000;
	                },
	              },
	            },
	          ],
	          xAxis: {
	            splitLine: { show: false },
	            axisLabel: { show: false },
	            axisTick: { show: false },
	            axisLine: { show: false },
	          },
	          yAxis: {
	            data: [
	  			"平湖天下三期",
	  			"万富智慧城",
	  			"电信小区",
	  			"鑫怡翠园",
	  			"四季花园",
	  			"平湖国际",
	  			"金园小区",
	  			"农机小区",
	  			"永彬小区",
	  			"江山景苑",
	            ],
	            inverse: true,
	            axisLine: { show: false },
	            axisTick: { show: false },
	            axisLabel: {
	              margin: 30,
	              fontSize: 14,
	            },
	            axisPointer: {
	              label: {
	                show: true,
	                margin: 30,
	              },
	            },
	          },
	          tooltip: {
	            trigger: "axis",
	            axisPointer: {
	              type: "shadow",
	            },
	          },
	  }
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>

<style>
#home {
  height: 100%vh;
  overflow: auto;
}
.body {
  height: 600px;
  background-image: url(../assets/banner.jpg);
}
.banner {
  margin-bottom: 150px;
  margin-top: 100px;
}
#title {
  padding-top: 20px;
  font-size: 50px;
  font-family: KaiTi;
  color: #fff;
  text-shadow: 1px 1px 10px black;
}
button.ant-btn {
  background: #42b983;
  border-color: #999;
}
button.ant-btn:hover {
  background: #fff;
  color: #42b983;
  border-color: #999;
}
.charts {
  width: 600px;
  margin: 100px auto;
}
</style>

