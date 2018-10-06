import UserApi from './UserApi'
import UtilApi from './UtilsApi'

export default class Api {
  constructor (store) {
    this.$userApi = new UserApi(store)
    this.$utilApi = new UtilApi(store)
    this.$store = store
  }

  UserApi () {
    return this.$userApi
  }

  UtilApi () {
    return this.$utilApi
  }
}
