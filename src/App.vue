<template>
  <div>
    <div id="nav">
      <span> <router-link to="/">首页</router-link>
      |
      <router-link to="/graphs">统计图</router-link>
      |
      <router-link to="/map">地图</router-link></span>
     
      <span class="username"><user-name /></span>
    </div>
    <router-view />
	<!-- <div style="margin-bottom: 150px;">
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
	</div> -->
	
  </div>
</template>

<script>
import UserName from "./component/UserName";
export default {
  components: {
    UserName,
  },
  // methods: {
  //   onSearch(value) {
  //     console.log(value);
  //   },
  // },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url(assets/banner.jpg);
}
#nav {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: aliceblue;
}

#nav a {
  font-size: 1.2em;
  margin: 0 20px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .ml-5 {
  margin-left: 5px;
}
</style>
