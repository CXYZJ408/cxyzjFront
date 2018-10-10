import UserApi from './UserApi'
import UtilApi from './UtilsApi'
import ArticleApi from './ArticleApi'

export default class Api {
  constructor (store) {
    this.$userApi = new UserApi(store)
    this.$utilApi = new UtilApi(store)
    this.$articleApi = new ArticleApi(store)
    this.$store = store
  }

  UserApi () {
    return this.$userApi
  }

  UtilApi () {
    return this.$utilApi
  }

  ArticleApi () {
    return this.$articleApi
  }
}
