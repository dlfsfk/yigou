<template>
  <div class="container">
    <a-form :form="form" class="rform" @submit="handleSubmit">
      <div class="title">
        <h3>欢迎注册</h3>
        <p>
          已有帐号?
          <a href="">
            <router-link class="login_btn" to="/login"> 登录 </router-link>
          </a>
        </p>
      </div>
      <a-form-item v-bind="formItemLayout" label="用户名" class="form-item">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: true,
                  message: '请输入你的用户名!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="密码"
        class="form-item"
        has-feedback
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入你的密码!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="确认密码"
        class="form-item"
        has-feedback
      >
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请确认你的密码',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" class="form-item">
        <span slot="label">
          手机号
          <a-tooltip title="手机号将会作为您的账号">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: '请输入你的手机号' },
                { validator: validatePhone },
              ],
            },
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '86' }]"
            style="width: 70px"
          >
            <a-select-option value="86"> +86 </a-select-option>
            <a-select-option value="87"> +87 </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="验证码">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'captcha',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入你收到的验证码!',
                    },
                    {
                      validator: validateCaptcha,
                    },
                  ],
                },
              ]"
            />
          </a-col>
          <a-col :span="12">
            <a-button @click="getCaptcha">获得验证码</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" class="form-item1">
        <a-checkbox
          v-decorator="[
            'agreement',
            {
              valuePropName: 'checked',
              rules: [{ required: true, message: '请同意用户注册协议' }],
            },
          ]"
        >
          <span style="color: #2e58ff">阅读并接受</span>
          <span> 用户注册协议 </span>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout" class="form-item">
        <a-button type="primary" style="width: 100%" html-type="submit">
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import * as captchaApi from "@/api/captcha.js";
import * as userApi from "@/api/user.js";
export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 5,
          },
        },
      },
      captcha: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          userApi.register(values.phone,values.password,values.username).then((res)=>{
            if(res.success == 1){
              this.$router.push("/login");
            }
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    validatePhone(rule, value, callback) {
      const form = this.form;
      if (value && !this.isPhoneNumber(form.getFieldValue("phone"))) {
        callback("手机号不合法");
      } else {
        callback();
      }
    },
    validateCaptcha(rule, value, callback) {
      const form = this.form;
      if (value && form.getFieldValue("captcha") != this.captcha) {
        callback("验证码错误");
      } else {
        callback();
      }
    },
    async getCaptcha() {
      this.captcha = await captchaApi.getCaptcha(
        this.form.getFieldValue("phone")
      );
    },
    isPhoneNumber(tel) {
      var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
      return reg.test(tel);
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
.rform {
  width: 450px;
  margin: 60px auto;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  padding: 20px;
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
.form-item1 {
  margin-right: 50px;
}
</style>