<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
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
      <van-tab
        :title="channel.name"
        v-for="channel in this.channels"
        :key="channel.id"
      >
      <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="isChennelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <channel-edit :my-channels="channels" ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/chennel-edit'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels()
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
 /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 8px;
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
     position: fixed;
     height: 82px;
     z-index: 1;
     left: 0;
     right: 0;
     top : 92px;
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
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      position: absolute;
      left: 0;
      content : '';
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
    }
  }
}
</style>
