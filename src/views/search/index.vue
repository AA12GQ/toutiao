<template>
  <div class="search-container">
    <form action="/">
    <van-search
      v-model="value"
      show-action
      background= '#3296fa'
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
</form>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  components: {},
  props: {},
  data() {
    return {
      value: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(val) {
      console.log(val)
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
