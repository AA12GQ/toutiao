<template>
  <div class="article-list">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
  <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
</van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('验证失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
