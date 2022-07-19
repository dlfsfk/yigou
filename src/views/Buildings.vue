<template>
  <div>
    <div>
      <a-collapse default-active-key="1" :bordered="false">
        <a-collapse-panel key="1" header="位置" style="text-align: left">
          <div class="wrapper">
            <label v-for="item in cities" :key="item">
              <input
                :value="item"
                type="radio"
                name="area"
                style="display: none"
                v-model="city"
              />{{ item }}
            </label>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="单价" style="text-align: left">
          <div class="wrapper">
            <label v-for="item in prices" :key="item">
              <input type="radio" name="price" :value="item" class="list-item" v-model="price"  />{{ item }}
            </label>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div>
      <House v-for="house in houseData"
        :houseName="house.name"
        :room="house.room"
        :area="house.area"
        :tags="house.tag"
        :number="14200"
        data="169-250"
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
      city: "宜昌",
      price:"全部",
      houseData:[],
      page: 1,
    };
  },
  mounted() {
    houseApi.searchHouse(this.page).then(
      (res) => {
        this.houseData = res;
        console.log(res);
      },
      (err) => {}
    );
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
