<template>
  <div class="my-container">
    <div class="header not-login" @click="$router.push('/login')">
      <div class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background:url('~@/assets/banner.png');
    background-size : cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .login-btn{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    }
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom:15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
</style>
