<template>
  <div class="search-container">
    <form action="/">
    <van-search
      v-model="searchText"
      show-action
      background= '#3296fa'
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
    />
</form>
<!-- /搜索栏 -->

    <search-result v-if="isResultShow"/>

     <!-- 联想建议 -->
    <search-suggestion
    v-else-if="searchText"
    :search-text="searchText"
     />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else/>
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(val) {
      console.log(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
