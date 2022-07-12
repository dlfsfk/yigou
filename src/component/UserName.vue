<template>
  <div class="user-name">
    <span v-if="status === 'loading'">加载中...</span>

    <template v-else-if="status === 'login'">
      <span class="nameColor">{{ user.name }}</span>
      <a href="" @click.prevent="handleLoginOut">退出</a>
    </template>
    <span v-else
      ><router-link to="/login" exact-path>登录</router-link>|
      <router-link to="/register" exact-path>注册</router-link></span
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("loginUser", ["status"]),
    ...mapState("loginUser", ["user"]),
  },
  methods: {
    async handleLoginOut() {
      await this.$store.dispatch("loginUser/loginOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.user-name {
  display: inline-block;
}
.user-name a,
.user-name span {
  margin-right: 15px;
}
.nameColor {
  color: #666;
}
</style>
