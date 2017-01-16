import * as Api from './api'

export function doLogin(params) {
  return {
    type: 'USER_LOGIN',
    payload: {
      promise: Api.doLogin(params)
    }
  }
}
