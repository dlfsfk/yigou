<template>
  <div class="container">
    <h1>地图</h1>
    <div>该模块还在维护请耐心等待</div>
    <div class="chartBox">
      <div id="mapChart" style="width:100%,height:100%"></div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  mounted() {
    this.getRandom();
  },
  methods: {
    getRandom() {
      var cityData = [
        {
          name: "北京",
          value: 10,
          ename: "北京",
        },
        {
          name: "天津",
          ename: "天津",
        },
        {
          name: "上海",
          value: 5,
          ename: "上海",
        },
        {
          name: "重庆",
          ename: "重庆",
        },
        {
          name: "河北",
          ename: "河北",
        },
        {
          name: "河南",
          ename: "河南",
        },
        {
          name: "云南",
          ename: "云南",
        },
        {
          name: "辽宁",
          ename: "辽宁",
        },
        {
          name: "黑龙江",
          ename: "黑龙江",
        },
        {
          name: "湖南",
          ename: "湖南",
        },
        {
          name: "安徽",
          ename: "安徽",
        },
        {
          name: "山东",
          ename: "山东",
        },
        {
          name: "新疆",
          ename: "新疆",
        },
        {
          name: "江苏",
          ename: "江苏",
        },
        {
          name: "浙江",
          value: 3,
          ename: "浙江",
        },
        {
          name: "江西",
          ename: "江西",
        },
        {
          name: "湖北",
          ename: "湖北",
        },
        {
          name: "广西",
          ename: "广西",
        },
        {
          name: "甘肃",
          ename: "甘肃",
        },
        {
          name: "山西",
          ename: "山西",
        },
        {
          name: "内蒙古",
          ename: "内蒙古",
        },
        {
          name: "陕西",
          ename: "陕西",
        },
        {
          name: "吉林",
          ename: "吉林",
        },
        {
          name: "福建",
          ename: "福建",
        },
        {
          name: "贵州",
          ename: "贵州",
        },
        {
          name: "广东",
          value: 53,
          ename: "广东",
        },
        {
          name: "青海",
          ename: "青海",
        },
        {
          name: "西藏",
          ename: "西藏",
        },
        {
          name: "四川",
          ename: "四川",
        },
        {
          name: "宁夏",
          ename: "宁夏",
        },
        {
          name: "海南",
          ename: "海南",
        },
        {
          name: "台湾",
          ename: "台湾",
        },
        {
          name: "香港",
          ename: "香港",
        },
        {
          name: "澳门",
          ename: "澳门",
        },
      ];
      const geoCoordMap = {
        广东: [113.75, 23.04],
      }
      this.convertData = (data) => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),//将上面数组的value添加到经纬度后面
              ename: data[i].ename
            });
          }
        }
        return res;
      };
      this.getMapChart(cityData);
    },
    getMapChart(data) {
      var myChart = this.$echarts.init(document.getElementById("mapChart"));
      var option = {
        title: {
          text: "中国地图",
          x: "20",
          top: "20",
          textStyle: {
            color: "#000",
            fontSize: "22",
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "16",
          },
        },
        backgroundColor: "#fff",
        tooltip: {
          textStyle: {
            color: "#fff",
          },
        },
        geo: {//设置geo地图
          map: 'china',//此处名字应和registerMap处一样
          label: {
            show: true,
            color: '#000',
            fontSize: 12
          },
          silent: true
        },
        series: [
          {

            name: "拥有分店",//图例名称
            type: "effectScatter",//图例类型
            coordinateSystem: "geo",//使用geo地图
            symbol: "pin",//图例样式
            showEffectOn: "emphasis",//涟漪特效何时触发
            symbolSize: 60,//图例大小,
            rippleEffect: {//特效设置
              scale: 1.5,
            },
            label: {
              show: true,//是否显示文本标签
              formatter: "{@value}",//展示名称为value的数据
              color: "#fff",
            },
            encode: {//展示value数据 的下标
              value: 2
            },
            data: this.convertData(data),
          },
        ],
      };
      myChart.on("click", (params) => {
        this.$router.push({
          path: "/mapEchartProvince",
          query: { provinceName: params.data.ename, province: params.name },
        });
      });
      myChart.setOption(option);
      window.onresize = () => {
        myChart.resize();
      }
    },
  },
};
</script>

<style scoped>
.chartBox {
  width: 100%;
  height: 100vh;
}

#mapChart {
  width: 100%;
  height: 100%;
}
</style>