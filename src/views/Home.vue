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

    <div class="charts"><charts /></div>
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



