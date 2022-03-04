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
      :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"/>
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link/>
    <van-cell title="生日" :value="user.birthday" is-link/>

    <van-popup
     v-model="isUpdateNameShow"
     style="height: 100%"
     position="bottom">
      <update-name @close="isUpdateNameShow = false"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
export default {
  name: 'UserProfile',
  components: { UpdateName },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 100px;
    height: 100px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
