<template>
        <van-icon
        :name="value ? 'star' : 'star-o'"
        :class="{
        collected : value
        }"
        :loading="loading"
        @click="onCollect"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/articles'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: 'false'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('收藏失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
