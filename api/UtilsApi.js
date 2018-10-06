import $axios from '../utils/axios'
import Status from '../utils/status'

//Util的API
let util = '/v1/utils'
let Auth = '/v1/user/auth'

export default class UtilsApi {
  constructor (store) {
    this.$store = store
    $axios.setStore(store)
  }

  async uploadFile (data) {
    let url = util + `/upload/${data.type}`
    let formData = new FormData()
    formData.append('file', data.file)
    let header = {
      'Content-Type': 'multipart/form-data'
    }
    return new Promise((resolve) => {
      resolve($axios.post(url, formData, header, false))
    })
  }
}
