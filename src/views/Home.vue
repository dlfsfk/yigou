<template>
<div id="home">
  <div style="height: 25px;"></div>
  <h1 id="title">E&nbsp;&nbsp;购</h1>
  <div style="margin-bottom: 150px; margin-top: 100px;" class="banner">
    <a-input-group compact>
      <a-select default-value="湖北">
        <a-select-option value="Hubei">
          湖北
        </a-select-option>
        <a-select-option value="Hunan">
          湖南
        </a-select-option>
  		<a-select-option value="Shanghai">
  		  上海
  		</a-select-option>
  		<a-select-option value="Beijing">
  		  北京
  		</a-select-option>
      </a-select>
  	<a-input-search style="width: 50%" placeholder="input search text" enter-button @search="onSearch" />
    </a-input-group>
  </div>
  <div style="opacity: 0.8; width:80%;margin: auto;">
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
	#home{
		background-image: url(../assets/banner.jpg);
		height:600px;
	}
	#title{
		font-size: 50px;
		font-family: Helvetica, ‘Hiragino Sans GB’, ‘Microsoft Yahei’, ‘微软雅黑’, Arial, sans-serif;
		color: #FFF;
		text-shadow: 1px 1px 10px black;
	}
</style>



