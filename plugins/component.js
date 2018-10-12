import Vue from 'vue'
import foot from '~/components/other/footer'
import avatarUpload from '~/components/other/upload'
import updateCookie from '~/components/other/updateCookie'
import toolbar from '~/components/user/toolBar'
//用于安装使用频率较高的自定义组件，以避免多次频繁的注册组件信息

Vue.use(foot)
Vue.use(avatarUpload)
Vue.use(updateCookie)
Vue.use(toolbar)

