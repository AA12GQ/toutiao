<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  >
  <CommentItem v-for="(item,index) in list" :key="index" :comment="item" />
</van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/views/article/components/comment-item'
export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created() {
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data)
        this.loading = true
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {

      }
    }
  }
}
</script>

<style scoped lang="less"></style>
