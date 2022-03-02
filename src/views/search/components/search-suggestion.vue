<template>
  <div class="search-suggestion">
    <van-cell
    :title="text"
    icon="search"
    v-for="(text,index) in suggestions"
    :key="index"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'loadash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
