import { createReducer } from '../../util';
import { Map } from 'immutable';
import { message } from 'antd'

const initialState = Map({
  isLogging: false,
  message: null
})

export default createReducer(initialState, {
  USER_LOGIN_PENDING: (state, data, params) => {
    return state.set('isLogging', true);
  },
  USER_LOGIN_ERROR: (state, data, params) => {
    message.error(`登录出错,${data}`);
    return state.set('isLogging', false);
  },
  USER_LOGIN_SUCCESS: (state, { jsonResult = {} }, params) => {
    // message.success(jsonResult.message);
    return state.merge({
      isLogging: false,
      // loginSuccess: jsonResult.success,
      loginSuccess: true,
      jsonResult
    });
  }
});
