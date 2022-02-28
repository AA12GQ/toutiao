import Vue from 'vue'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用\

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
// console.log(dayjs().format('YYYY-MM-DD'))
