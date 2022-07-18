//login.ts
import http from '@/service/index'
import * as T from './types'

const loginApi: T.ILanzouyun = {
  getLinkHtml() {
    return http.get('https://wwi.lanzoup.com/ioeZv077fsmf')
  },
}

export const getLinkHtml = () => {
  return http.get('https://wwi.lanzoup.com/ioeZv077fsmf')
}

// export default loginApi