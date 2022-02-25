<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button
      class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search"
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated class="channel-tabs">
    <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data() {
    return {
      avtive: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.home-container {
 /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border:none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }
 /deep/ .channel-tabs {
   .van-tabs__wrap{
     height: 82px;
   }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__nav{
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
  }
}
</style>
