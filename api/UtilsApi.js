import {Api} from './API'
import {Request, requestMethods} from './Request'

//Util的API
const Util = '/v1/utils'

export class UtilsApi extends Api {
  constructor (store) {
    super(store)
  }

  uploadImage (imageUsage, image, send = true) {
    let url = Util + `/upload/${imageUsage}`
    let params = new FormData()
    params.append('image', image)
    let header = {
      'Content-Type': 'multipart/form-data'
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.uploadImage, params, header)
    return super.judgeSend(send)
  }
}
