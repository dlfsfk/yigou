<template>
  <div id="home">
    <div>
      <a-spin :spinning="spinning">
        <div class="spin-content">
          <div class="body">
            <h1 id="title">一燕不能成春，一树不能成林</h1>
            <div class="banner">
              <a-input-group compact>
                <a-select
                  default-value="宜昌"
                  v-model="city"
                  style="width: 80px"
                >
                  <a-select-option v-for="city in cities" :key="city" :value="city"> {{city}} </a-select-option>
                </a-select>
                <a-input-search
                  style="width: 40%"
                  placeholder="请输入地区名称开始找房"
                  enter-button
                  v-model="area"
                  @search="onSearch"
                />
              </a-input-group>
              <a-alert
                type="error"
                message="没有数据，请检查城市小区是否输入正确！"
                banner
                style="width: 562px; margin-left: 494px"
                v-if="!hasdata"
              />
            </div>
            <div class="subTitle">{{ city + area }}房产均价走势</div>
            <div style="opacity: 0.8; width: 80%; margin: auto" v-if="hasdata">
              <a-row :gutter="150">
                <a-col :span="6">
                  <a-card title="楼盘总数" :bordered="false" :hoverable="false">
                    <p>{{ analyze.totalProperty }}间</p>
                  </a-card>
                </a-col>
                <a-col :span="6">
                  <a-card title="上周均价" :bordered="false" :hoverable="false">
                    <p>{{ analyze.averagePriceLastWeek }}(元/m²)</p>
                  </a-card>
                </a-col>
                <a-col :span="6">
                  <a-card title="本周均价" :bordered="false" :hoverable="false">
                    <p>{{ analyze.averagePriceThisWeek }}(元/m²)</p>
                  </a-card>
                </a-col>
                <a-col :span="6">
                  <a-card title="涨跌幅" :bordered="false" :hoverable="false">
                    <a-statistic
                      :value="this.analyze.quoteChange.value"
                      :precision="2"
                      suffix="%"
                      :value-style="{ color: arrowColor }"
                    >
                      <template #prefix>
                        <a-icon
                          type="arrow-up"
                          v-if="analyze.quoteChange.symbol"
                        />
                        <a-icon type="arrow-down" v-else />
                      </template>
                    </a-statistic>
                  </a-card>
                </a-col>
              </a-row>
            </div>
            <div v-else class="info">该地区没有房价走势数据</div>
          </div>
        </div>
      </a-spin>
    </div>

    <div class="charts" v-if="Object.keys(graphs).length != 0">
      <Charts
        v-for="(item, index) in graphs.title"
        :key="item"
        :options="makeOptions(index)"
      />
    </div>
  </div>
</template>

<script>
import Charts from "../component/Charts";
import * as housePriceTrendApi from "@/api/housePriceTrend.js";
export default {
  components: {
    Charts,
  },
  data() {
    return {
      cities:["恩施","鄂州","黄冈","黄石","荆门","荆州","潜江","神农架","十堰","随州","天门","武汉","襄阳","咸宁","仙桃","孝感","宜昌"],
      city: "宜昌",
      area: "西陵",
      analyze: {
        totalProperty: 0,
        averagePriceLastWeek: 0,
        averagePriceThisWeek: 0,
        quoteChange: {
          symbol: true,
          value: 0,
        },
      },
      hasdata: true,
      graphs: {},
      spinning: false,
    };
  },
  methods: {
    async onSearch() {
      this.spinning = true;
      const result = await housePriceTrendApi.getHousePriceTrend(
        this.city,
        this.area
      );
      if (!result.msg) {
        this.hasdata = true;
        this.analyze.totalProperty = result.analyze.totalProperty;
        this.analyze.averagePriceLastWeek = result.analyze.averagePriceLastWeek;
        this.analyze.averagePriceThisWeek = result.analyze.averagePriceThisWeek;
        this.analyze.quoteChange.symbol =
          parseFloat(result.analyze.quoteChange) >= 0 ? true : false;
        this.analyze.quoteChange.value = Math.abs(
          parseFloat(result.analyze.quoteChange)
        );
        this.graphs = result.graph;
        this.spinning = false;
      } else {
        this.hasdata = false;
        this.spinning = false;
      }
    },
    makeOptions(i) {
      return {
        // 标题设置
        title: {
          text: this.city + this.graphs.title[i],
        },
        legend: {
          data: this.graphs.data[i].graphTitle,
        },
        grid: {
          containLabel: true,
          left: 20,
        },
        animationDurationUpdate: 500,
        series: [
          {
            name: this.graphs.data[i].graphTitle[0],
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
            data: this.graphs.data[i].graphData[0],
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
            name: this.graphs.data[i].graphTitle[1],
            id: "bar2",
            type: "bar",
            barGap: "10%",
            label: {
              show: true,
              position: "right",
              offset: [10, 0],
              fontSize: 12,
            },
            data: this.graphs.data[i].graphData[1].map((x) => Math.abs(x)),
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
          data: this.graphs.data[i].graphName,
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
      };
    },
    changeSpinning() {
      this.spinning = !this.spinning;
    },
  },
  computed: {
    arrowColor() {
      return this.analyze.quoteChange.symbol ? "#3f8600" : "#FF2D5E";
    },
  },
  mounted() {
    this.spinning = true;
    housePriceTrendApi.getHousePriceTrend(this.city, this.area).then(
      (res) => {
        if (!res.msg) {
          this.hasdata = true;
          this.analyze.totalProperty = res.analyze.totalProperty;
          this.analyze.averagePriceLastWeek = res.analyze.averagePriceLastWeek;
          this.analyze.averagePriceThisWeek = res.analyze.averagePriceThisWeek;
          this.analyze.quoteChange.symbol =
            parseFloat(res.analyze.quoteChange) >= 0 ? true : false;
          this.analyze.quoteChange.value = Math.abs(
            parseFloat(res.analyze.quoteChange)
          );
          this.graphs = res.graph;
          this.spinning = false;
        } else {
          this.hasdata = false;
          this.spinning = false;
        }
      },
      (err) => {
        this.spinning = false;
      }
    );
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
  margin-bottom: 100px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
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
.subTitle {
  color: #fff;
  text-shadow: 1px 1px 10px black;
  font-size: 2em;
  margin-bottom: 60px;
}
.charts {
  display: flex;
  margin: 100px;
}
.info {
  color: #fff;
  font-size: 1.5em;
  text-shadow: 1px 1px 10px black;
}
</style>



