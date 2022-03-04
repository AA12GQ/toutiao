<template>
  <div class="user-profile">
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
    />

    <van-cell title="头像" is-link>
      <van-image
      class="avatar"
      fit="cover"
      round
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="内容" is-link/>
    <van-cell title="性别" value="内容" is-link/>
    <van-cell title="生日" value="内容" is-link/>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
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
.user-profile {
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
