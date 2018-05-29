import BaseAPI from './baseApi';
//region 全局通用接口
const base="http://vmcccapbuild01.faw-vw.in:1003/api";
/**
 * @api {post} /api/roomManagerData roomManagerData
 * @apiDescription 获取"会议室管理"表格数据
 * @apiGroup roomManager
 * @apiParamExample {json} Request-Example:
 *     {
 *       pageIndex:"当前页",
 *       searchData:"搜索关键字"
 *       pageSize: "每页显示条目个数"
 *     }
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *       "id":"id",
 *       "MeetingRoomId":"会议室",
 *       "DepartmentNo":"所属",
 *       "RoomType":"类型",
 *       "IsPublic":"是否公用",
 *       "Description":"会议室说明",
 *    }
 *  ]
 */
export const getDepartment = params => BaseAPI.post(base+'/data/meetingroom/Department', params,);//获取组织机构
export const roomManagerData = params => BaseAPI.post(base+'/grid/meetingroom/meetingroom', params,'GridBind'); //获取"会议室管理"table列表
/**
 * @api {post} /api/roomManagerAdd roomManagerAdd
 * @apiDescription 增加"合作伙伴"表格数据
 * @apiGroup roomManager
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":"id",
 *       "MeetingRoomId":"会议室",
 *       "DepartmentNo":"所属",
 *       "RoomType":"类型",
 *       "IsPublic":"是否公用",
 *       "Description":"会议室说明",
 *     }
 * @apiSuccessExample Success-Response:
 *    {
 *        httpCode:0,
 *        messages:["增加成功"],
 *        result:"success"
 *    }
 */
export const roomManagerAdd = params => BaseAPI.post('/api/roomManagerAdd', params); //"会议室管理"table列表增加
/**
 * @api {post} /api/roomManagerEdit roomManagerEdit
 * @apiDescription 编辑"会议室管理"表格数据
 * @apiGroup roomManager
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":"id",
 *       "MeetingRoomId":"会议室",
 *       "DepartmentNo":"所属",
 *       "RoomType":"类型",
 *       "IsPublic":"是否公用",
 *       "Description":"会议室说明",
 *     }
 * @apiSuccessExample Success-Response:
 *    {
 *        httpCode:0,
 *        messages:["编辑成功"],
 *        result:"success"
 *    }
 */
export const roomManagerEdit = params => BaseAPI.post('/api/roomManagerEdit', params); //"会议室管理"table列表编辑
/**
 * @api {post} /api/roomManagerDel roomManagerDel
 * @apiDescription 删除"会议室管理"表格数据
 * @apiGroup roomManager
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id":"id",
 *       "MeetingRoomId":"会议室",
 *       "DepartmentNo":"所属",
 *       "RoomType":"类型",
 *       "IsPublic":"是否公用",
 *       "Description":"会议室说明",
 *     }
 * @apiSuccessExample Success-Response:
 *    {
 *        httpCode:0,
 *        messages:["删除成功"],
 *        result:"success"
 *    }
 */
export const roomManagerDel = params => BaseAPI.post('/api/roomManagerDel', params); //删除"会议室管理"table列表
/**
 * @api {post} /api/myManagerData myManagerData
 * @apiDescription 获取"我的会议管理"表格数据
 * @apiGroup myManager
 * @apiParamExample {json} Request-Example:
 *     {
 *       pageIndex:"当前页",
 *       searchData:"搜索关键字"
 *       pageSize: "每页显示条目个数"
 *     }
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *      id:"id",
 *      StartTime:"开始时间",
 *      Subject:"会议主题",
 *      MeetingRoomId:"会议地点",
 *      Importance:"重要度",
 *      MeetingStatus:"状态",
 *      EndTime:"结束时间",
 *      Creator:"发起人",
 *      Description:"会议内容",
 *      ContentInfo:"会议资料",
 *      MailCc:"与会人员",
 *      MailTo:"抄送人员",
 *      operate:true
 *    }
 *  ]
 */
export const myManagerData = params => BaseAPI.post(base+'/grid/meetingroom/meetinglist', params,'GridBind') //获取"我的会议管理"table列表
/**
 * @api {post} /api/appointmentListData appointmentListData
 * @apiDescription 获取"会议室预约列表"表格数据
 * @apiGroup appointment
 * @apiParamExample {json} Request-Example:
 *     {
 *       pageIndex:"当前页",
 *       searchData:"搜索关键字"
 *       pageSize: "每页显示条目个数"
 *     }
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *      id:"id",
 *      MeetingRoomId:"会议地点",
 *      Subject:"会议主题",
 *      StartTime:"开始时间",
 *      EndTime:"结束时间",
 *      Creator:"发起人",
 *      Description:"会议内容",
 *      ContentInfo:"会议资料",
 *      MailCc:"与会人员",
 *      MailTo:"抄送人员",
 *      Importance:"重要度",
 *      view:true,
 *    }
 *  ]
 */
export const appointmentListData = params => BaseAPI.post('/api/appointmentListData', params); //获取"会议室预约列表"table列表
/**
 * @api {post} /api/appointmentChartData appointmentChartData
 * @apiDescription 获取"会议室预约图表"表格数据
 * @apiGroup appointment
 * @apiParamExample {json} Request-Example:
 *     {
 *       pageIndex:"当前页",
 *       searchData:"搜索关键字"
 *       pageSize: "每页显示条目个数"
 *     }
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *      id:"id",
 *      MeetingRoomName:"会议室名称",
 *      time1:true,
 *      time2:true,
 *      time3:true,
 *      time4:true,
 *      time5:true,
 *      time6:true,
 *      time7:true,
 *      time8:true,
 *      time9:true,
 *      time10:"",
 *      time11:"",
 *      time12:"",
 *      time13:"",
 *      time14:"",
 *      time15:"",
 *
 *    }
 *  ]
 */
export const appointmentChartData = params => BaseAPI.post('/api/appointmentChartData', params); //获取"会议室预约图表"table列表

//endregion
