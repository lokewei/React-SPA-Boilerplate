import { Get, Post } from '../util/xFetch';

//获取项目树
export function getProjectTree(params) {
	return Get('/project/getProjectTree.do', params)
}

//根据分组号获取通用参数表数据
export function getCommonParamByGroupId(params) {
	return Get('/param/getCommonParamByGroupId.do', params)
}

//根据分组号获取字典表业务对象
export function getDictItemByGroupId(params) {
	return Get('/param/getDictItemByGroupId.do', params)
}

// 房间保存
export function saveRoom(params) {
	return Post('/param/saveRoom.do', params)
}
