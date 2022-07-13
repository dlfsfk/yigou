<template>
  <div>
    <div id="chart" ref="container"></div>
  </div>
</template>
<script>
export default {
  name: "ec",
  data() {
    return {
      echartsinstance: {},
      options: {
        // 标题设置
        title: {
          text: "宜昌房价涨跌幅",
        },
        legend: {
          data: ["涨幅", "跌幅"],
        },
        grid: {
          containLabel: true,
          left: 20,
        },
        animationDurationUpdate: 500,
        series: [
          {
            name: "涨幅",
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
    };
  },
  mounted() {
    this.echartsinstance = this.$echarts.init(this.$refs.container);
    this.echartsinstance.setOption(this.options);
  },
  methods: {},
  watch: {
    options() {
      this.echartsinstance.setOption(this.options);
    },
  },
};
</script>

<style scoped>
#chart {
  width: 600px;
  height: 400px;
}
</style>