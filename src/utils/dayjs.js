import dayjs from 'dayjs'

require('dayjs/locale/zh-cn')

dayjs.locale('zh-cn') // 全局使用\

console.log(dayjs().format('YYYY-MM-DD'))
