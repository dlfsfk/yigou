<template>
  <div>
    <div>
      <a-collapse default-active-key="1" :bordered="false">
        <a-collapse-panel key="2" header="单价" :style="customStyle">
          <div class="wrapper">
            <label v-for="item in prices" :key="item">
              <input
                type="radio"
                name="price"
                :value="item"
                class="list-item"
                v-model="price"
                @change="priceChange"
              />{{ item }}
            </label>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="面积" :style="customStyle">
          <div class="wrapper">
            <label v-for="item in areas" :key="item">
              <input
                type="radio"
                name="area"
                :value="item"
                class="list-item"
                v-model="area"
                @change="areaChange"
              />{{ item }}
            </label>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div>
      <a-spin :spinning="spinning">
        <div class="spin-content">
          <House
            v-for="house in houseData"
            :img="house.img"
            :houseName="house.name"
            :city="house.address"
            :location="house.business"
            :rooms="house.room"
            :area="house.area"
            :tags="house.tag"
            :number="house.price"
            :data="house.total_price"
            :key="house.id"
          />
        </div>
      </a-spin>
    </div>
    <div style="margin-top: 50px">
      <a-pagination
        :default-current="defaultCurrent"
        v-model="current"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import * as houseApi from "@/api/house.js";
import House from "../component/House";
export default {
  components: {
    House,
  },
  data() {
    return {
      customStyle: "background: white;border: 0;text-align: left",

      cities: [
        "恩施",
        "鄂州",
        "黄冈",
        "黄石",
        "荆门",
        "荆州",
        "潜江",
        "神农架",
        "十堰",
        "随州",
        "天门",
        "武汉",
        "襄阳",
        "咸宁",
        "仙桃",
        "孝感",
        "宜昌",
      ],
      prices: [
        "全部",
        "8000元/m²以下",
        "8000-10000元/m²",
        "10000-15000元/m²",
        "15000-20000元/m²",
        "20000-25000元/m²",
        "25000-30000元/m²",
      ],
      areas: [
        "全部",
        "60㎡以下",
        "60-90㎡",
        "90-120㎡",
        "120-140㎡",
        "140-200㎡",
        "200-300㎡",
      ],
      city: "宜昌",
      price: "全部",
      area: "全部",
      houseData: [],
      defaultCurrent: 1,
      current: 1,
      spinning: false,
      maxArea: 300,
      minArea: 60,
      maxPrice: 30000,
      minPrice: 8000,
      total: 1000,
    };
  },
  mounted() {
    this.spinning = true;
    houseApi.searchHouse(this.current).then(
      (res) => {
        this.houseData = res.info;
        this.total = res.total;
        this.spinning = false;
      },
      (err) => {}
    );
  },
  watch: {
    current(val) {
      this.spinning = true;
      houseApi.searchHouse(this.current).then(
        (res) => {
          this.houseData = res.info;
          this.total = res.total;
          this.spinning = false;
          this.backToTop();
        },
        (err) => {}
      );
    },
  },
  methods: {
    backToTop() {
      let top = document.documentElement.scrollTop; //获取点击时页面的滚动条纵坐标位置
      const timeTop = setInterval(() => {
        document.documentElement.scrollTop = top -= 50; //一次减50往上滑动
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 5);
    },
    areaChange() {
      if (this.area == "全部") {
        this.spinning = true;
        this.current = 1;
        houseApi.searchHouse(this.current).then(
          (res) => {
            this.houseData = res.info;
            this.total = res.total;
            this.spinning = false;
            this.backToTop();
          },
          (err) => {}
        );
      } else if (this.area.includes("以下")) {
        this.spinning = true;
        this.current = 1;
        houseApi.searchHouseByArea(this.current, this.minArea, 0).then(
          (res) => {
            this.houseData = res.info;
            this.total = res.total;
            this.spinning = false;
          },
          (err) => {}
        );
      } else {
        this.spinning = true;
        this.current = 1;
        let area = this.area.substr(0, this.area.length - 1);
        area = area.split("-");
        houseApi.searchHouseByArea(this.current, area[1], area[0]).then(
          (res) => {
            this.houseData = res.info;
            this.total = res.total;
            this.spinning = false;
          },
          (err) => {}
        );
      }
    },
    priceChange() {
      if (this.price == "全部") {
        this.spinning = true;
        this.current = 1;
        houseApi.searchHouse(this.current).then(
          (res) => {
            this.houseData = res.info;
            this.total = res.total;
            this.spinning = false;
            this.backToTop();
          },
          (err) => {}
        );
      } else if (this.price.includes("以下")) {
        this.spinning = true;
        this.current = 1;
        houseApi.searchHouseByPrice(this.current, this.minPrice, 0).then(
          (res) => {
            this.houseData = res.info;
            this.total = res.total;
            this.spinning = false;
          },
          (err) => {}
        );
      } else {
        this.spinning = true;
        this.current = 1;
        let price = this.price.substr(0, this.price.length - 4);
        price = price.split("-");
        houseApi.searchHouseByPrice(this.current, price[1], price[0]).then(
          (res) => {
            console.log(res);
            this.houseData = res.info;
            this.total = res.total;
            this.spinning = false;
          },
          (err) => {}
        );
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 15px;
  color: #101d37;
  line-height: 17px;
  font-weight: 700;
}
.list-item {
  margin-right: 3px;
}
</style>
