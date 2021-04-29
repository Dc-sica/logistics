// 格式化日期
/*
* @formate 'yyyy-MM-dd HH:mm:ss'
*
*/
export function formateDate (time, formate) {
  let date = new Date(time)
  let arr1 = formate.split(' ')
  let fomatArray1 = []
  let fomatArray2 = []
  if (arr1[0]) {
    fomatArray1 = arr1[0].split('-')
  }
  if (arr1[1]) {
    fomatArray2 = arr1[1].split(':')
  }
  let data = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
    dd: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
    HH: date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
    mm: date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
    ss: date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  }
  let dateStr = ''
  for (let i in fomatArray1) {
    if (i < fomatArray1.length - 1) {
      dateStr = dateStr + data[fomatArray1[i]] + '-'
    } else {
      dateStr = dateStr + data[fomatArray1[i]]
    }
  }
  for (let i in fomatArray2) {
    if (i < fomatArray2.length - 1) {
      if (i === '0') {
        dateStr = dateStr + ' '
      }
      dateStr = dateStr + data[fomatArray2[i]] + ':'
    } else {
      dateStr = dateStr + data[fomatArray2[i]]
    }
  }
  return dateStr
}
export function serialization () {
  let temp = new Date()
  let y = temp.getFullYear()
  let m = temp.getMonth()
  let d = temp.getDate()
  if (m < 9) {
    m = '0' + m
  }
  if (d < 9) {
    d = '0' + d
  }
  let random = new random(1000)

}
// 返回月份
export function getNowMonth (time) {
  let date = new Date(time)
  let yyyy = date.getFullYear()
  let MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  return yyyy + '-' + MM
}
// 返回当前日期所在第几周
export function getWeekNum (date) {
  let currentDate = new Date(date)
  let fisrtDate = new Date(currentDate.getFullYear(), 0, 1)
  let d = Math.round((currentDate.valueOf() - fisrtDate.valueOf()) / 86400000)
  let weekNum = Math.ceil((d + ((fisrtDate.getDay() + 1) - 1)) / 7)
  return weekNum
}
// 返回周几
export function getWeekDay (date) {
  let currentDate = new Date(date)
  let weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekArray[currentDate.getDay()]
}
// 比较日期
export function compareDate (date1, date2) {
  let time1 = new Date(date1).getTime()
  let time2 = new Date(date2).getTime()
  return time1 - time2
}
// 计算提前或推后日期
export function computeDays (currentDate, days, type) {
  let curentTime = new Date(currentDate).getTime()
  let daysTime = days * 3600 * 24 * 1000
  let resutTime = 0
  if (type === 1) {
    resutTime = curentTime + daysTime
  } else {
    resutTime = curentTime - daysTime
  }
  return formateDate(resutTime, 'Y-m-d h:mm:s')
}
// token 管理
export function setNewToken (tokenData, timeLen) {
  let startTime = new Date().getTime()
  let tokenInfo = {
    data: tokenData,
    endTime: startTime + timeLen
  }
  localStorage.tokenInfo = JSON.stringify(tokenInfo)
}
export function getTokenInfo () {
  let endTime = new Date().getTime()
  if (JSON.parse(localStorage.tokenInfo).endTime > endTime) {
    return JSON.parse(localStorage.tokenInfo).data
  } else {
    return false
  }
}
// token 管理
export function setNewIdenity (timeLogin) {
  let startTime = new Date().getTime()
  localStorage.lastTime = Number(timeLogin) + startTime
}

// 计算table高度   
/*
* wrapperId contanier盒子id
* searchBoxId 搜索框盒子id
* pagationId 页码盒子id
* nevboxId  导入导出盒子id
*
*/
export function getTableHeight (wrapperId, searchBoxId, pagationId, nevboxId) {
  var searchBoxHeght = document.getElementById(searchBoxId).clientHeight
  var pagationBoxHeght = document.getElementById(pagationId).clientHeight
  var wrapHeight = document.getElementById(wrapperId).clientHeight
  if (nevboxId) {
    var nevboxHeght = document.getElementById(nevboxId).clientHeight
    return wrapHeight - pagationBoxHeght - searchBoxHeght - nevboxHeght - 140 + 'px'
  } else {
    return wrapHeight - pagationBoxHeght - searchBoxHeght - 80 + 'px'
  }
}