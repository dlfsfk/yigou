<template>
  <div>
    <div @click="goBack()">返回</div>
    <div :id="id" class="provinceCharts"></div>
  </div>
</template>

<script>
import * as mapApi from "@/api/mapData.js";
export default {
  name: "province",
  data() {
    return {
      reName: {
        湘西市: "湘西土家族苗族自治州",
        恩施市: "恩施土家族苗族自治州",
        大兴安岭市: "大兴安岭地区",
        延边市: "延边朝鲜族自治州",
        兴安盟市: "兴安盟",
        巴彦淖尔市市: "巴彦淖尔市",
        锡林郭勒盟市: "锡林郭勒盟",
        临夏市: "临夏回族自治州",
        黔东南市: "黔东南苗族侗族自治州",
        黔南市: "黔南布依族苗族自治州",
        黔西南市: "黔西南布依族苗族自治州",
        大理市: "大理白族自治州",
        西双版纳市: "西双版纳傣族自治州",
        德宏市: "德宏傣族景颇族自治州",
        文山市: "文山壮族苗族自治州",
        红河市: "红河哈尼族彝族自治州",
        楚雄市: "楚雄彝族自治州",
        迪庆市: "迪庆藏族自治州",
        海南市: "海南藏族自治州",
        海西市: "海西蒙古族藏族自治州",
        密云区: "密云县",
        延庆区: "延庆县",
        蓟州区:"蓟县",
        宁河区:"宁河县",
        静海区:"静海县"
      },
      id: "echarts_" + new Date().getTime() + Math.floor(Math.random() * 1000),
      echartObj: null,
      option: {
        title: {
          text: "",
          top: "8%",
          left: "8%",
          textStyle: {
            fontSize: 14,
            fontWeight: 300,
            color: "#000",
          },
        },
        tooltip: {
          padding: 0,
          // 数据格式化
          formatter: function (params, callback) {
            return params.name + "：" + (params.value || 0);
          },
        },
        legend: {
          orient: "vertical",
          top: "9%",
          left: "5%",
          icon: "circle",
          data: [],
          selectedMode: "single",
          selected: {},
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          inactiveColor: "#b6d7ff",
          textStyle: {
            color: "#ec808d",
            fontSize: 14,
            fontWeight: 300,
            padding: [0, 0, 0, 15],
          },
        },
        visualMap: {
          min: 0,
          max: 500,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 取值范围的文字
          inRange: {
            color: ["#e0ffff", "blue"], // 取值范围的颜色
          },
          show: true, // 图注
        },
        geo: {
          map: "",
          roam: false, // 不开启缩放和平移
          zoom: 0.6, // 视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: 10,
              color: "#000",
            },
            emphasis: {
              show: true,
              color: "blue",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "skyblue", // 鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "5%",
        },
        series: [
          {
            name: "省份数据",
            type: "map",
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data: [],
          },
        ],
        provinceJSON: {},
        provinceName: "",
      },
    };
  },
  mounted() {
    const province = this.$route.query.province;
    mapApi.getCityData(province).then(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          if (Object.keys(this.reName).includes(res[i].name)) {
            res[i].name = this.reName[res[i].name];
          }
        }
        this.option.series[0].data = res;
        this.initDate();
        this.resizeListener();
      },
      (err) => {
        this.initDate();
        this.resizeListener();
      }
    );
  },
  methods: {
    initDate() {
      const provinceName = this.$route.query.provinceName;
      const province = this.$route.query.province;
      this.provinceName = provinceName;
      this.provinceJSON =
        this.provinceJSON = require("../utils/省份数据/json(省份)/" +
          provinceName);
      this.option.title.text = province;
      this.option.geo.map = province;
      this.echartObj = this.$echarts.init(document.getElementById(this.id));
      this.$echarts.registerMap(province, this.provinceJSON);
      this.echartObj.setOption(this.option);
      this.echartObj.on("click", (params) => {
        this.$router.push({
          path: "/city",
          query: { city: params.name },
        });
      });
    },
    resizeListener() {
      window.addEventListener("resize", () => {
        if (this.echartObj && this.echartObj.resize) {
          this.echartObj.resize();
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.provinceCharts {
  height: 100vh;
  width: 100vw;
}
</style>

