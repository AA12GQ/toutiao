<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed  @click-left="$router.back()" title="小飘同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item,index) in list" :key="index">
        <!-- 左侧是机器人 -->
        <div class="chat-item left" v-if="item.name === 'xp'">
          <van-image fit="cover"  round :src="require('@/assets/avatar/dpy.jpg')" />
          <div class="chat-pao left">{{item.msg}}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao" v-html="item.msg"></div>
          <van-image fit="cover" round :src="require('@/assets/avatar/gq.jpg')" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <!-- <div class="reply-container van-hairline--top"> -->
      <Emoji @send="send" @enterSend="enterSend" class="reply-container van-hairline--top"/>
    <!-- </div> -->
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { sendMsg } from '@/api/sendMsg.js'
import { Toast } from 'vant'
import Emoji from '@/components/emoji'
// import VueEmoji from 'emoji-vue'
// import { useStore } from 'vuex'

export default {
  name: 'Chat',
  components: { Emoji },
  setup() {
    // const store = useStore()
    // const word = ref('')
    const isEmoji = ref(false)
    const list = reactive([
      { name: 'xp', msg: 'hi，你好！我是小飘' },
      { name: 'me', msg: '我是王炸' }]
    )
    const send = (val) => {
      const data = {
        key: '',
        info: val.replace(/<[^>]+>/g, '')
      }
      if (val) {
        list.push({ name: 'me', msg: val.replace(/\\"/g, '"') })
        sendMsg(data).then((res) => {
          // store.commit('msgList/setMsgList', { name: 'xp', msg: res.data.msg.text })
          list.push({ name: 'xp', msg: res.data.msg.text })
        })
        // word.value = ''
      } else {
        Toast.fail('不能发送空白消息')
      }
    }
    const enterSend = (val) => {
      const data = {
        key: '',
        info: val
      }
      if (val) {
        var pattern = /<[^>]+>/g
        const obj2 = val.match(pattern) && val.match(pattern).length > 0 ? val.replace(/<[^>]+>/g, '') : val
        list.push({ name: 'me', msg: obj2 })
        sendMsg(data).then((res) => {
          // store.commit('msgList/setMsgList', { name: 'xp', msg: res.data.msg.text })
          list.push({ name: 'xp', msg: res.data.msg.text })
        })
        // word.value = ''
      } else {
        Toast.fail('不能发送空白消息')
      }
    }
    // onMounted(() => {
    //   if (store.state.msgList) {
    //     list.push(store.state.msgList)
    //   }
    // })
    const isEmojiShow = (val) => {
      isEmoji.value = val
      if (val) {

      }
    }
    const delHtmlTag = (str) => {
      return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '')
    }
    return { send, list, isEmojiShow, enterSend, delHtmlTag }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: rgb(245,245,245);
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        // min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: rgb(158,234,106);
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: rgb(158,234,106);
        }

      }
      .chat-pao.left {
        vertical-align: top;
        display: inline-block;
        // min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        // border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: white;
        word-break: break-all;
        border:none;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          border:none;
          top: 12px;
          // border-top: 0.5px solid #c2d9ea;
          // border-right: 0.5px solid #c2d9ea;
          background: white;
        }
      }
    }
  }
}

.chat-item.right{
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    font-size: 30px;
    .emojiImg{
      display: block;
    margin: 10px auto;
    }
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: -10px;
  height: auto;
  width: 100%;
  background: rgb(241,241,243);
  z-index: 9999;
  .reply-emoji{
    position: absolute;
    bottom: 0;
  }
  .send-btn{
    line-height: 44px;
    left:10px;
    bottom: 3.9px;
    width: 50px;
  }
  .vue3-discord-emojipicker__emojibutton{
  position:absolute;
  left: 0;
  top: 0;
  height: 44px;
  width: 100%;
  z-index: 99999;
  }
}
</style>
