import {Api} from './TestApi'
import {Request, requestMethods} from './Request'

const test = '/v1/test/'

export class Children extends Api {
  constructor (store) {
    super(store)
  }

  test (i, send = true) {
    let url = test + i
    console.log(url)
    super.pushRequest = new Request(requestMethods.GET, url, this.test)
    return super.judgeSend(send)
  }

}
