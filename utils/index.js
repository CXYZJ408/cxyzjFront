// 解析请求头cookie的指定name值
let _ = require('lodash')
export const parseCookieByName = (cookie, name) => {
  if ( !cookie || !name ) return ''
  let pattern = new RegExp(`(?:^|\\s)${name}=([^;]*)(?:;|$)`)
  let matched = cookie.match(pattern) || []
  let value = matched[ 1 ] || ''
  return decodeURIComponent(value)
}

export function dataURLtoFile (dataUrl, filename) {//base64转file
  let arr = dataUrl.split(',')
  let mime = arr[ 0 ].match(/:(.*?);/)[ 1 ]
  let bstr = atob(arr[ 1 ])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while ( n-- ) {
	u8arr[ n ] = bstr.charCodeAt(n)
  }
  return new File([ u8arr ], filename, { type: mime })
}

export function setString(str, len) {
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
	if (str.charCodeAt(i) > 128) {
	  strlen += 2;
	} else {
	  strlen++;
	}
	s += str.charAt(i);
	if (strlen >= len) {
	  return s+"...";
	}
  }
  return s;
}

export function transformTime (time) {
  if ( _.isString(time) ) {
	time = parseInt(time)
  }
  let date = new Date(time)
  let Y = date.getFullYear() + '.'
  let M = ( date.getMonth() + 1 < 10 ? '0' + ( date.getMonth() + 1 ) : date.getMonth() + 1 ) + '.'
  let D = ( date.getDate() < 10 ? '0' + ( date.getDate() ) : date.getDate() ) + '  '
  let h = ( date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ) + ':'
  let m = ( date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ) + ':'
  let s = ( date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() )
  return Y + M + D + h + m + s
}

export function firstUpperCase (str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

export function setInterval (callback, interval) {
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  let intervalTimer
  const loop = () => {
	intervalTimer = window.requestAnimationFrame(loop)
	endTime = now()
	if ( endTime - startTime >= interval ) {
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

export function guid () {
  /**
   * @return {string}
   */
  function S4 () {
	return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString(16).substring(1)
  }

  return ( S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4() )
}

export function words (text) {
  //用word方式计算正文字数
  let str = text
  str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
  str = str.replace(/[\x00-\xff]/g, 'm')
  str = str.replace(/m+/g, '*')
  str = str.replace(/龘+/g, '')
  //返回字数
  return str.length
}
