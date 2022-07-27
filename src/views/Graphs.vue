<template>
  <div style="position: relative">
    <div style="margin-left: 10vh">
      <div style="margin-top: 50px">
        <a-input-search
          placeholder="请输入要查询城市"
          style="width: 40%"
          enter-button
          v-model="city"
          @search="onSearch"
        />
      </div>
      <div class="charts">
        <div v-if="Object.keys(predictData).length != 0">
          <div>
            <Charts
              v-for="(item, index) in predictData.title"
              :key="item"
              :options="makeOptions(index)"
            />
          </div>
        </div>
      </div>
      <div style="margin-left: 100px">
        <Charts :options="makeBarOptions()" />
      </div>
    </div>

    <div class="ranking">
      <p style="font-size: 30px; font-weight: bold; margin-bottom: 15px">
        房价排行榜
      </p>
      <table border="0" cellpadding="10" cellspacing="1" align="center">
        <tr bgcolor="skyblue">
          <th>排名</th>
          <th>城市</th>
          <th>二手房(元)</th>
          <th>同比(去年)</th>
          <th>环比(上月)</th>
          <th>总价(元)</th>
        </tr>
        <tr v-for="item in ranking" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.house }}</td>
          <td>{{ item.tongbi }}</td>
          <td>{{ item.huanbi }}</td>
          <td bgcolor="#FFC0CB">{{ item.total }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import * as housePredictApi from "@/api/predict.js";
import * as rankApi from "@/api/rank.js";
import Charts from "../component/Charts";
export default {
  components: {
    Charts,
  },
  data() {
    return {
      city: "武汉",
      predictData: {},
      ranking: [
        {
          id: "1",
          city: "武汉",
          house: "19120",
          tongbi: "-0.81%",
          huanbi: "-2.31%",
          total: "214",
        },
        {
          id: "2",
          city: "神农架",
          house: "8328",
          tongbi: "+26.09%",
          huanbi: "--",
          total: "48",
        },
        {
          id: "3",
          city: "襄阳",
          house: "8099",
          tongbi: "-4.54%",
          huanbi: "+14.13%",
          total: "111",
        },
        {
          id: "4",
          city: "宜昌",
          house: "7958",
          tongbi: "-5.54%",
          huanbi: "-1.21%",
          total: "91",
        },
        {
          id: "5",
          city: "鄂州",
          house: "6790",
          tongbi: "-4.77%",
          huanbi: "+18.25%",
          total: "99",
        },
        {
          id: "6",
          city: "十堰",
          house: "6335",
          tongbi: "+1.83%",
          huanbi: "+1.56%",
          total: "64",
        },
        {
          id: "7",
          city: "黄冈",
          house: "6181",
          tongbi: "+3%",
          huanbi: "-3.4%",
          total: "69",
        },
        {
          id: "8",
          city: "荆州",
          house: "5978",
          tongbi: "-12.06%",
          huanbi: "+17.16%",
          total: "75",
        },
        {
          id: "9",
          city: "黄石",
          house: "5831",
          tongbi: "+0.64%",
          huanbi: "+1.34%",
          total: "68",
        },
        {
          id: "10",
          city: "仙桃",
          house: "5713",
          tongbi: "-5.16%",
          huanbi: "+24.28%",
          total: "78",
        },
        {
          id: "11",
          city: "潜江",
          house: "5460",
          tongbi: "-0.8%",
          huanbi: "+16.18%",
          total: "85",
        },
        {
          id: "12",
          city: "恩施",
          house: "5417",
          tongbi: "-6.36%",
          huanbi: "+3.34%",
          total: "68",
        },
        {
          id: "13",
          city: "天门",
          house: "5178",
          tongbi: "-1.05%",
          huanbi: "-1.15%",
          total: "61",
        },
        {
          id: "14",
          city: "孝感",
          house: "4936",
          tongbi: "-3.25%",
          huanbi: "+29.56%",
          total: "72",
        },
        {
          id: "15",
          city: "荆门",
          house: "4898",
          tongbi: "+1.16%",
          huanbi: "+1.27%",
          total: "53",
        },
        {
          id: "16",
          city: "随州",
          house: "4831",
          tongbi: "-5.2%",
          huanbi: "+27.54%",
          total: "69",
        },
        {
          id: "17",
          city: "咸宁",
          house: "4663",
          tongbi: "+0.06%",
          huanbi: "+1.93%",
          total: "59",
        },
      ],
      rankData: {},
    };
  },
  methods: {
    async onSearch() {
      housePredictApi.predictHouseTrend(this.city).then((res) => {
        this.predictData = res;
      });
      rankApi.getRankData(this.city).then((res) => {
        this.rankData = res;
      });
    },
    makeOptions(i) {
      return {
        title: {
          text: this.predictData.title[i],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.predictData.data[i].graphName,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.predictData.data[i].graphTitle,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: this.predictData.data[i].graphName[0],
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: this.predictData.data[i].graphData[0],
          },
          {
            name: this.predictData.data[i].graphName[1],
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: this.predictData.data[i].graphData[1],
          },
        ],
      };
    },
    makeBarOptions() {
      return {
        title: {
          text: this.rankData.graphName[0],
        },
        xAxis: {
          type: "category",
          data: this.rankData.graphTitle,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.rankData.graphData,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
    },
  },
  mounted() {
    housePredictApi.predictHouseTrend(this.city).then((res) => {
      this.predictData = res;
    });
    rankApi.getRankData(this.city).then((res) => {
      this.rankData = res;
    });
  },
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  font-weight: bold;
}
.charts {
  width: 100vh;
  display: flex;
}
.ranking {
  position: fixed;
  bottom: 10px;
  right: 40px;
  width: 25vw;
  height: 80vh;
  overflow: auto;
}
</style>

