<template>
  <div class="my-container">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div v-else class="header not-login" @click="$router.push('/login')">
      <div class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
  </van-grid>
  <van-cell-group>
    <van-cell title="消息通知" is-link  class="message"/>
    <van-cell title="小智同学" is-link  class="Bot_Classmate"/>
  </van-cell-group>
  <van-button v-if="user" type="primary" block class="exit-btn" @click="exit" clickable>退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {
    exit() {
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {

      })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试~')
      }
    }
  }
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

  .user-info {
    .base-info {
      height: 231px;
      padding : 76px 32px 23px;
      box-sizing: border-box;
      display:flex;
      justify-content: space-between;
      align-items: center;
      .left {
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        margin-right:23px;
        border: 4px solid #fff;
      }
      .name {
        font-size:30px;
        color: #fff;
      }
      }
    }
    .data-stats{
      // height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size:23px;
        }
      }
    }
  }

  .grid-nav {
    margin-bottom: 5px;
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size:45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .message::after {
    content: '';
     position: absolute;
     left: 30px;
     bottom: 0;
     right: 0px;
     width: 687px;
     height: 0.1px;
     background-color:#ccc;
  }
  .exit-btn {
    margin-top: 10px;
    background-color: #fff;
    color: rgb(193,92,81);
    border: none;
  }
}
</style>
