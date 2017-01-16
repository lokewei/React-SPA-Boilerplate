import { Get, Post } from '../../util/xFetch';

export function doLogin(params) {
	return Post('/api/login', params);
}
