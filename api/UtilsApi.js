import $axios from '../utils/axios'
import $status from '../utils/status'

//Util的API
let Util = '/v1/utils'

export default class UtilsApi {
  constructor (store) {
    this.$store = store
    $axios.setStore(store)
  }

  async uploadFile (data) {
    let url = Util + `/upload/${data.type}`
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
