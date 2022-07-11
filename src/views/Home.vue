<template>
  <div id="home">
    <div style="height: 25px"></div>
    <h1 id="title">一燕不能成春，一树不能成林</h1>
    <div style="margin-bottom: 150px; margin-top: 100px" class="banner">
      <a-input-group compact>
        <a-select default-value="湖北">
          <a-select-option value="Hubei"> 湖北 </a-select-option>
          <a-select-option value="Hunan"> 湖南 </a-select-option>
          <a-select-option value="Shanghai"> 上海 </a-select-option>
          <a-select-option value="Beijing"> 北京 </a-select-option>
        </a-select>
        <a-input-search
          style="width: 40%"
          placeholder="input search text"
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
</template>

<script>
export default {
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>

<style>
#home {
  background-image: url(../assets/banner.jpg);
  height: 100%vh;
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
</style>



