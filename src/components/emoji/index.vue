<template>
        <div class="mo-yu-container" ref="moyuRef">
            <div class="input-part">
                <div class="input-panel" ref="msgInputContainer"
                     placeholder="说点什么..."
                     contenteditable="true" spellcheck="false"
                     @keydown="pushKeyword($event)"
                     >
                </div>
                <span class="emoji-btn" @click="handleEmojiPanelVisibility">
                      <van-icon name="more-o" v-if="isEmojiShow"/>
                      <van-icon name="smile-o" v-else/>
                    </span>
                <div class="action-bar" id="input-action-bar">
                    <!-- <span class="post-btn">发布</span> -->
                     <van-button
                      class="send-btn"
                      @click="send()"
                      round type="square"
                      hairline="false"
                      color="rgb(2,203,11)"
                      size="small">
                        发送</van-button>
                </div>
            </div>
            <div class="emoji-container" id="emoji-container" v-show="isEmojiShow">
                <div class="emoji-list">
                    <div class="emoji-title-history" v-if="historyList.length!==0">
                        最近使用
                    </div>
                    <div class="emoji-history-list" v-if="historyList.length!==0">
                    <span v-for="i in historyList" :key="i">
                      <img class="emoji-item" @click="onEmojiClick(i)"
                           :src="'https://cdn.sunofbeaches.com/emoji/'+i+'.png'">
                    </span>
                    </div>
                    <div class="emoji-title-all">
                        所有表情
                    </div>
                    <div class="emoji-all-list">
                     <span v-for="i in 130" :key="i">
                      <img @click="onEmojiClick(i)" class="emoji-item"
                           :src="'https://cdn.sunofbeaches.com/emoji/'+i+'.png'">
                     </span>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { ref, onMounted } from '@vue/composition-api'

export default {
  name: 'Emoji',
  setup(props, context) {
    const msgInputContainer = ref(null)
    const historyList = ref([10, 23, 1, 33, 22])
    const isEmojiShow = ref(false)
    const moyuRef = ref(null)
    const handleEmojiPanelVisibility = () => {
      isEmojiShow.value = !isEmojiShow.value
    }
    const onEmojiClick = (i) => {
      // 如果输入框没有焦点，那么让它获取焦点
      if (msgInputContainer.value !== document.activeElement) {
        msgInputContainer.value.focus()
      }
      // 往焦点出插入内容
      const targetUrl = 'https://cdn.sunofbeaches.com/emoji/' + i + '.png'
      console.log('targetUrl==> ' + targetUrl)
      const imageTag = `<img class="emojiImg" src="${targetUrl}" width="20" height="20" >`
      document.execCommand('insertHtml', false, imageTag)
      // 保存历史记录
      // 先要获取出来，然后进行拼接
      let targetStr = i.toString()
      const items = window.localStorage.getItem('emoji-history')
      if (items) {
        // 进行切割
        let currentIndex = 0
        const itemArray = items.split(',')
        for (let j = 0; j < itemArray.length; j++) {
          // 从头开始加,targetStr一定是有的了
          // 所以，先添加逗号
          // 判断i是否已经包含了
          const item = itemArray[j]
          if (targetStr.indexOf(item) === -1) {
            targetStr += ','
            targetStr += item
            currentIndex++
          }
          // 1+1,2,3,4,5==>6个元素
          if (currentIndex > 4) {
            break
          }
        }
      }
      // console.log("targetStr ==> " + targetStr);
      // 最多保存6个，也就是最近使用
      window.localStorage.setItem('emoji-history', targetStr)
      updateHistory()
    }
    const updateHistory = () => {
      const items = window.localStorage.getItem('emoji-history')
      if (items) {
        historyList.value = items.split(',')
      }
    }
    onMounted(() => {
      // 防止点击表情的时候输入框失去焦点
      const inputPart = document.getElementById('input-action-bar')
      if (inputPart) {
        inputPart.addEventListener('mousedown', function(e) {
          e.preventDefault()
        })
      }
      const emojiContainer = document.getElementById('emoji-container')
      if (emojiContainer) {
        emojiContainer.addEventListener('mousedown', function(e) {
          e.preventDefault()
        })
      }
      // 更新历史
      updateHistory()
    })
    const send = () => {
      context.emit('send', msgInputContainer.value.innerHTML.replace(/[\r\n]/g, ''))
      msgInputContainer.value.innerHTML = ''
      isEmojiShow.value = false
    }
    // const enterSend = () => {
    //   const text = msgInputContainer.value.innerText
    //   console.log('text', text)
    //   emit('enterSend', text)
    //   msgInputContainer.value.innerHTML = null
    //   isEmojiShow.value = false
    // }

    const pushKeyword = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        send()
        msgInputContainer.value.blur()
      }
    }
    return {
      msgInputContainer,
      historyList,
      isEmojiShow,
      handleEmojiPanelVisibility,
      onEmojiClick,
      updateHistory,
      moyuRef,
      send,
      pushKeyword
    }
  }
}
</script>
<style>

    /* html {
        background: #F4F5F6;
    } */

    .post-btn {
        cursor: pointer;
        border-radius: 4px;
        padding: 5px 20px;
        background: dodgerblue;
        color: white;
    }

    .action-bar {
        display: flex;
        justify-content: space-between;
    }

    .action-bar {
        padding: 10px 10px 0;
    }

    .input-part {
      position:relative;
       width: 250px;
        padding: 10px;
    }
    .emoji-btn {
        position:absolute;
        padding: 5px 0;
        color: black;
        font-size: 30px;
        cursor: pointer;
        top:10px;
        left: 280px;
    }
    .emoji-btn:active{
      bottom: 200px;
    }
    .send-btn{
      position: absolute;
      width: 45px;
      top:15px;
      left: 320px;
    }
    .mo-yu-container {
        width: 100%;
        height:auto;
        background: rgb(239,239,239);
        margin: 0px auto;
    }

    /* .emoji-container{
      display:inline-block;
    } */
    .emoji-item {
        width: 25px;
        cursor: pointer;
        height: 25px;
        padding: 10px;
    }

    .emoji-list {
        width: 100%;
        height: 300px;
        padding: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .emoji-title-history{
      font-size:10px;
      margin: 0 0 5px 10px;
    }
    .emoji-title-all{
      font-size:10px;
      margin: 0 0 5px 10px;
    }

    /*滚动条效果*/
    .emoji-list::-webkit-scrollbar {
        width: 10px;
    }

    .emoji-list::-webkit-scrollbar-track {
        background-color: #F9FAFB;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }

    .emoji-list::-webkit-scrollbar-thumb {
        background-color: #E5E6EB;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
    }

    /* .input-panel:focus {
        /* border: dodgerblue 2px solid; */
  /* } */

    .input-panel img {
        margin: 0 2px;
        vertical-align: middle;
    }

    .input-panel {
        margin: 0;
        font-size: 14px;
        line-height: 25px;
        background: #fff;
        width: 250px;
        height: 100%;
        max-height: 50px;
        outline: none;
        border: #F4F5F6 2px solid;
        border-radius: 4px;
        padding: 5px;
    }

    .input-panel:empty:before {
        content: attr(placeholder);
        position: absolute;

        color: #4d4d4d;
        background-color: transparent;
    }

</style>
