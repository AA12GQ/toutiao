<template>
  <div class="article-list">
  <van-pull-refresh
    v-model="isRefreshLoading"
    @refresh="onRefresh"
    :success-text="refreshSuccessText"
    :success-duration="1500"
   >
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
    >
  <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
</van-list>
</van-pull-refresh>
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
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: ''
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
        // 模拟请求失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('daojfhgka')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 模拟请求失败
        // if (Math.random() > 0.2) {
        //   JSON.parse('daojfhgka')
        // }
        const { results } = data.data
        this.list.unshift(...results)
        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isRefreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
