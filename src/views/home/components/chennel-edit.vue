<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" size="mini" plain small round @click="isEdit = !isEdit">
        {{isEdit ? "完成" : "编辑"}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="8">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in MyChannels"
        :key="index"
        @click="onMyChannelClick(channel,index)"
        >
        <van-icon v-show="isEdit && !flexChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
      <span class="text" :class="{ active: index === active }" slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="8">
      <van-grid-item
       class="grid-item"
       v-for="(channel,index) in recommendChannels"
       :key="index"
       icon="plus"
       :text="channel.name"
       @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    MyChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      flexChannels: [0]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter(channel => {
        return !this.MyChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels() {
    //   const channnels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.MyChannels.find(MyChannel => {
    //       return MyChannel.id === channel.id
    //     })
    //     if (!ret) {
    //       channnels.push(channel)
    //     }
    //   })
    //   return channnels
    // }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async addChannel(channel) {
      this.MyChannels.push(channel)

      if (this.user) {
        // try {
        //   await addUserChannel({
        //     id: channel.id,
        //     seq: this.MyChannels.length
        //   })
        // } catch (err) {
        //   this.$toast('保存失败，请稍后重试')
        // }
      } else {
        setItem('TOUTIAO_CHANNELS', this.MyChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        if (this.flexChannels.includes(channel.id)) {
          return
        }
        this.MyChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        this.$emit('update-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding:85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 109px;
    height: 48px;
    line-height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__text, .text {
      font-size: 28px;
      color: #222;
      margin-top:0;
     }
     .active {
       color: red;
     }
     .van-grid-item__icon-wrapper {
       position : unset;
     }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
      }
    }
  }

 /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 26px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
