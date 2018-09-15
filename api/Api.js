import UserApi from './UserApi'
import UtilApi from './UtilsApi'

export default class Api {
  constructor (store) {
    this.$UserApi = new UserApi(store)
    this.$UtilApi = new UtilApi(store)
  }

  UserApi () {
    return this.$UserApi
  }

  UtilApi () {
    return this.$UtilApi
  }
}
