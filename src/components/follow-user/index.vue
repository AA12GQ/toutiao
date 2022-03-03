<template>
    <van-button
       v-if="value"
       class="follow-btn"
       round
       :loading="loading"
       size="small"
       @click="onFollow"
       >已关注
  </van-button>
   <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        :loading="loading"
        size="small"
        icon="plus"
        @click="onFollow"
        >关注
    </van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    UserId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.value) {
          await deleteFollow(this.UserId)
          // this.article.is_followed = false
        } else {
          await addFollow(this.UserId)
          // this.article.is_followed = true
        }
        // this.is_followed = !this.is_followed
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less"></style>
