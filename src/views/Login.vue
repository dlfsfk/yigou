<template>
  <div class="container">
    <a-form :form="form" class="lform" @submit="handleSubmit">
      <div class="title">
        <h3>账号登录</h3>
        <p>
          还没帐号?
          <router-link class="toRegister" to="/register">注册</router-link>
        </p>
      </div>
      <a-form-item>
        <a-input
          v-decorator="[
            'account',
            {
              rules: [
                { required: true, message: '请输入账号!' },
                {
                  validator: validateAccount,
                },
              ],
            },
          ]"
          placeholder="账号"
        >
          <a-tooltip title="账号为您注册时用的手机号" slot="prefix">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }],
            },
          ]"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item class="loginModel">
        <a-button :disabled="loading" class="login-btn" html-type="submit">
          {{ loading ? "登录中..." : "登录" }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as userApi from "@/api/user.js";
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
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  computed: mapState("loginUser", ["loading"]),
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store
            .dispatch("loginUser/login", {
              loginId: values.account,
              loginPwd: values.password,
            })
            .then(
              (res) => {
                const path = this.$route.query.returnurl || "/";
                this.$router.push(path);
              },
              (err) => {
                alert("账号密码错误");
                this.$store.commit("loginUser/setLoading", false);
              }
            );
        }
      });
    },
    validateAccount(rule, value, callback) {
      const form = this.form;
      if (value) {
        userApi.checkAccount(form.getFieldValue("account")).then(
          () => {
            callback();
          },
          (err) => {
            callback(err);
          }
        );
      } else {
        callback();
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
.toRegister {
  margin-left: 10px;
  color: #2e58ff;
}
.login-btn {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  width: 300px;
  height: 35px;
  text-align: center;
  font-size: 16px;
}
</style>
