<template>
  <div class="user-profile">
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange"/>
    <van-cell title="头像" is-link>
      <van-image
      class="avatar"
      fit="cover"
      round
      :src="user.photo"
      @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true"/>
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true"/>
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true"/>

    <van-popup
     v-model="isUpdateNameShow"
     style="height: 100%"
     position="bottom">
      <update-name
      v-if="isUpdateNameShow"
      @close="isUpdateNameShow = false"
      v-model="user.name"
      />
    </van-popup>
    <van-popup
    v-model="isUpdateGenderShow"
    position="bottom"
    >
    <update-gender
    v-if="isUpdateGenderShow"
    v-model="user.gender"
    @close="isUpdateGenderShow = false"
    />
    </van-popup>
    <van-popup
    v-model="isUpdateBirthdayShow"
    position="bottom"
    >
    <update-birthday
    v-if="isUpdateBirthdayShow"
    v-model="user.birthday"
    @close="isUpdateBirthdayShow = false"
    />
    </van-popup>

    <van-popup
    v-model="isUpdatePhotoShow"
    position="bottom"
    style="height: 100%;"
    >
    <update-photo
      v-if="isUpdatePhotoShow"
      :img="img"
      @close="isUpdatePhotoShow = false"
      @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
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
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.value = ''
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
