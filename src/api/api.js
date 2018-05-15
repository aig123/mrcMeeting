import BaseAPI from './baseApi';
//region 全局通用接口
const base="http://VMCCSYSWFDEWEB.faw-vw.in:9000";
export const getTableData = params => BaseAPI.post('/api/tableData', params); //获取table列表

//endregion
