import Vue from 'vue'
import * as Utils from '../utils/index'
import Status from '../utils/status'
let $utils = {
  install (Vue) {
    Vue.prototype.$utils = Utils
  }
}
let $status = {
  install (Vue) {
    Vue.prototype.$status = Status
  }
}
Vue.use($utils)
Vue.use($status)
