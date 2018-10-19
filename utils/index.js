// 解析请求头cookie的指定name值
export const parseCookieByName = (cookie, name) => {
  if (!cookie || !name) return ''
  let pattern = new RegExp(`(?:^|\\s)${name}=([^;]*)(?:;|$)`)
  let matched = cookie.match(pattern) || []
  let value = matched[1] || ''
  return decodeURIComponent(value)
}

export function dataURLtoFile (dataUrl, filename) {//base64转file
  let arr = dataUrl.split(',')
  console.log(arr)
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}

export function transformTime (time) {
  let date = new Date(time)
  let Y = date.getFullYear() + '.'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}

export function setInterval (callback, interval) {
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  let intervalTimer
  const loop = () => {
    intervalTimer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback()
    }
  }
  intervalTimer = window.requestAnimationFrame(loop)
  return intervalTimer
}

export function clearInterval (intervalTimerId) {
  window.cancelAnimationFrame(intervalTimerId)
}
