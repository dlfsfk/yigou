<template>
	<div class="container">
		<a-form :form="form" class="rform" @submit="handleSubmit">
		  <div class="title">
		  	<h3> 欢迎注册 </h3>
		  	<p>
		  		已有帐号?
		  		<a href="">
					<span id="login_btn"> 登录 </span>
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
		              type: 'text',
		              message: 'The input is not valid username!',
		            },
		            {
		              required: true,
		              message: 'Please input your username!',
		            },
		          ],
		        },
		      ]"
		    />
		  </a-form-item>
		  <a-form-item v-bind="formItemLayout" label="密码" class="form-item" has-feedback>
		    <a-input
		      v-decorator="[
		        'password',
		        {
		          rules: [
		            {
		              required: true,
		              message: 'Please input your password!',
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
		  <a-form-item v-bind="formItemLayout" label="确认密码" class="form-item" has-feedback>
		    <a-input
		      v-decorator="[
		        'confirm',
		        {
		          rules: [
		            {
		              required: true,
		              message: 'Please confirm your password!',
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
		  <a-form-item v-bind="formItemLayout" label="手机号" class="form-item">
		    <a-input
		      v-decorator="[
		        'phone',
		        {
		          rules: [{ required: true, message: 'Please input your phone number!' }],
		        },
		      ]"
		      style="width: 100%"
		    >
		      <a-select
		        slot="addonBefore"
		        v-decorator="['prefix', { initialValue: '86' }]"
		        style="width: 70px"
		      >
		        <a-select-option value="86">
		          +86
		        </a-select-option>
		        <a-select-option value="87">
		          +87
		        </a-select-option>
		      </a-select>
		    </a-input>
		  </a-form-item>
		  <a-form-item v-bind="tailFormItemLayout" class="form-item1">
		    <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
		      I have read the
		      <a href="">
		        agreement
		      </a>
		    </a-checkbox>
		  </a-form-item>
		  <a-form-item v-bind="tailFormItemLayout" class="form-item">
		    <a-button type="primary" style="width: 100%;" html-type="submit">
		      Register
		    </a-button>
		  </a-form-item>
		</a-form>
	</div>
</template>

<script>

export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
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
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
};
</script>

<style scoped>
.container{
	position: fixed;
	width:100%;
	/* background-image: url(../assets/banner.jpg); */
	height: 600px;
	background:rgba(0,0,0,.1);
}
.rform{
	width: 450px;
	margin: 60px auto;
	border-radius: 10px;
	background: rgba(255, 255, 255, 0.5);
	overflow: hidden;
	padding: 10px;
	display: flex;
	flex-direction: column;
}
.title{
	width:450px;
}
.title h3{
	font-size: 30px;
	color: #000;
	font-family: PingFang-SC-Regular,Helvetica,"Microsoft Yahei","微软雅黑";
	margin: 0px;
	padding-left: 30px;
	text-align: left;
	font-weight: bold;
}
.title p #login_btn{
	font-size:14px;
	font-family: PingFang-SC-Regular,Helvetica,"Microsoft Yahei","微软雅黑";
}
.title p{
	text-align: left;
	margin-left: 30px;
	color: #9B9B9B;
}
#login_btn{
	margin-left: 10px;
	color: #2e58FF;
}
.form-item{
	/* padding-left: 30px; */
	padding-right: 30px;
}
.form-item1{
	margin-right: 80px;
}
</style>