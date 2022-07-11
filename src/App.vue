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
  </div>
</template>

<script>
import UserName from "./component/UserName";
export default {
  components: {
    UserName,
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
