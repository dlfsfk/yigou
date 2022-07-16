import Vue from 'vue';
import *as echarts from 'echarts';
import china from "echarts/map/json/china.json";
Vue.prototype.$echarts = echarts;
echarts.registerMap("china", china);
Vue.use(echarts)