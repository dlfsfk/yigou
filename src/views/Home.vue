<template>
  <div id="home">
    <div class="body">
      <h1 id="title">一燕不能成春，一树不能成林</h1>
      <div class="banner">
        <a-input-group compact>
          <a-select default-value="宜昌" v-model="city" style="width:80px">
            <a-select-option value="恩施"> 恩施 </a-select-option>
            <a-select-option value="鄂州"> 鄂州 </a-select-option>
            <a-select-option value="黄冈"> 黄冈 </a-select-option>
            <a-select-option value="黄石"> 黄石 </a-select-option>
            <a-select-option value="荆门"> 荆门 </a-select-option>
            <a-select-option value="荆州"> 荆州 </a-select-option>
            <a-select-option value="潜江"> 潜江 </a-select-option>
            <a-select-option value="神农架"> 神农架 </a-select-option>
            <a-select-option value="十堰"> 十堰 </a-select-option>
            <a-select-option value="随州"> 随州 </a-select-option>
            <a-select-option value="天门"> 天门 </a-select-option>
            <a-select-option value="武汉"> 武汉 </a-select-option>
            <a-select-option value="襄阳"> 襄阳 </a-select-option>
            <a-select-option value="咸宁"> 咸宁 </a-select-option>
            <a-select-option value="仙桃"> 仙桃 </a-select-option>
            <a-select-option value="孝感"> 孝感 </a-select-option>
            <a-select-option value="宜昌"> 宜昌 </a-select-option>
          </a-select>
          <a-input-search
            style="width: 40%"
            placeholder="请输入地区名称开始找房"
            enter-button
            v-model="area"
            @search="onSearch"
          />
        </a-input-group>
      </div>
      <div class="subTitle">{{ area }}房产均价走势</div>
      <div style="opacity: 0.8; width: 80%; margin: auto">
        <a-row :gutter="150">
          <a-col :span="6">
            <a-card title="楼盘总数" :bordered="false" :hoverable="false">
              <p>{{analyze.totalProperty}}间</p>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card title="上周均价" :bordered="false" :hoverable="false">
              <p>{{analyze.averagePriceLastWeek}}(元/m²)</p>
            </a-card>
          </a-col>
          <a-col :span="6">
            <a-card title="本周均价" :bordered="false" :hoverable="false">
              <p>{{analyze.averagePriceThisWeek}}(元/m²)</p>
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
                  <a-icon type="arrow-up" v-if="analyze.quoteChange.symbol" />
                  <a-icon type="arrow-down" v-else />
                </template>
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="charts" ><charts /></div>
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
    };
  },
  methods: {
    async onSearch() {
      const result = await housePriceTrendApi.getHousePriceTrend(
        this.city,
        this.area
      );
      this.analyze.totalProperty = result.totalProperty;
      this.analyze.averagePriceLastWeek = result.averagePriceLastWeek;
      this.analyze.averagePriceThisWeek = result.averagePriceThisWeek;
      this.analyze.quoteChange.symbol =
        parseFloat(result.quoteChange) >= 0 ? true : false;
      this.analyze.quoteChange.value = Math.abs(parseFloat(result.quoteChange))
    },
  },
  computed: {
    arrowColor() {
      return this.analyze.quoteChange.symbol ? '#3f8600' : '#FF2D5E';
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
  margin-bottom: 100px;
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
.subTitle {
  color: #fff;
  text-shadow: 1px 1px 10px black;
  font-size: 2em;
  margin-bottom: 60px;
}
.charts {
  width: 600px;
  margin: 100px auto;
}
</style>



