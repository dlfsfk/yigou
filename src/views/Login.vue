<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="lform">
      <div class="title">
        <h3>账号登录</h3>
        <p>
          还没帐号?
          <router-link class="login_btn" to="/register">注册</router-link>
        </p>
      </div>
      <div class="form-item">
        <label>账号：</label>
        <input type="text" v-model="loginId" />
      </div>
      <div class="form-item">
        <label>密码：</label>
        <input type="password" autocomplete="new-password" v-model="loginPwd" />
      </div>
      <div class="form-item">
        <button :disabled="loading">
          {{ loading ? "loading..." : "登录" }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";

/**
 * {
 *  loading(){
 *    return this.$store.state.loginUser.loading
 *  },
 *  user(){
 *    return this.$store.state.loginUser.user
 *  }
 * }
 *
 *  */

export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  computed: mapState("loginUser", ["loading"]),
  methods: {
    async handleSubmit() {
      const resp = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (resp) {
        const path = this.$route.query.returnurl || "/";
        this.$router.push(path);
      } else {
        alert("账号密码错误");
      }
    },
  },
};
</script>
<style scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(../assets/bg.jpg);
  background-size: cover;
}
.lform {
  margin: 100px auto;
  width: 400px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  padding: 30px;
  display: flex;
  flex-direction: column;
}
.title {
  width: 450px;
}
.title h3 {
  font-size: 30px;
  color: #000;
  font-family: PingFang-SC-Regular, Helvetica, "Microsoft Yahei", "微软雅黑";
  margin: 0px;
  padding-left: 30px;
  text-align: left;
  font-weight: bold;
}
.title p .login_btn {
  font-size: 14px;
  font-family: PingFang-SC-Regular, Helvetica, "Microsoft Yahei", "微软雅黑";
}
.title p {
  text-align: left;
  margin-left: 30px;
  color: #9b9b9b;
}
.login_btn {
  margin-left: 10px;
  color: #2e58ff;
}
.form-item {
  /* margin: 1em auto; */
  padding: 15px;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>
