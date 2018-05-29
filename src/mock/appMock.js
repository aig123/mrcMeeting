const Mock = require('mockjs')
export default {
  initMock(mock) {
    mock.onPost('/api/roomManagerData').reply(config => {
      let pageIndex,condition,pageSize
      if(config.data){
        pageIndex= JSON.parse(config.data).pageIndex;
        condition = JSON.parse(config.data).condition;
        pageSize = JSON.parse(config.data).pageSize;
      }
      let mockDatas = roomManagerData;
      let total = mockDatas.length;
      mockDatas = mockDatas.filter((u, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{
              "content":mockDatas,
              "pageNumber":1,
              "pageSize":5,
              "totalNumber":2,
              "totalPages":roomManagerData.length
            },
            "httpCode":0,
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });//获取"会议室管理"表格数据
    mock.onPost('/api/roomManagerAdd').reply(config => {
      roomManagerData.push(JSON.parse(config.data))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{},
            "httpCode":0,
            "title":"成功",
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });//增加"会议室管理"table列表
    mock.onPost('/api/roomManagerEdit').reply(config => {//合作伙伴删除数据
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{},
            "httpCode":0,
            "title":"成功",
            "messages":[
              "修改成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });

    });//编辑"会议室管理"table列表
    mock.onPost('/api/roomManagerDel').reply(config => {//合作伙伴删除数据
      let { id } = JSON.parse(config.data);
      function manyDelect(data) {
        if(id.toString().indexOf(data.id)!=-1){
          return false
        }else {
          return data
        }

      }
      roomManagerData = roomManagerData.filter(manyDelect);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{},
            "httpCode":0,
            "messages":[
              "删除成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });//删除"会议室管理"table列表
    mock.onPost('/api/myManagerData').reply(config => {
      let pageIndex,condition,pageSize
      if(config.data){
        pageIndex= JSON.parse(config.data).pageIndex;
        condition = JSON.parse(config.data).condition;
        pageSize = JSON.parse(config.data).pageSize;
      }
      let mockDatas = myManagerData;
      let total = mockDatas.length;
      mockDatas = mockDatas.filter((u, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{
              "content":mockDatas,
              "pageNumber":1,
              "pageSize":5,
              "totalNumber":2,
              "totalPages":myManagerData.length
            },
            "httpCode":0,
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });//获取"我的会议管理"表格数据
    mock.onPost('/api/appointmentListData').reply(config => {
      let pageIndex,condition,pageSize
      if(config.data){
        pageIndex= JSON.parse(config.data).pageIndex;
        condition = JSON.parse(config.data).condition;
        pageSize = JSON.parse(config.data).pageSize;
      }
      let mockDatas = appointmentListData;
      let total = mockDatas.length;
      mockDatas = mockDatas.filter((u, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{
              "content":mockDatas,
              "pageNumber":1,
              "pageSize":5,
              "totalNumber":2,
              "totalPages":appointmentListData.length
            },
            "httpCode":0,
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });//获取"会议室预约列表"表格数据
    mock.onPost('/api/appointmentChartData').reply(config => {
      let pageIndex,condition,pageSize
      if(config.data){
        pageIndex= JSON.parse(config.data).pageIndex;
        condition = JSON.parse(config.data).condition;
        pageSize = JSON.parse(config.data).pageSize;
      }
      let mockDatas = appointmentChartData;
      let total = mockDatas.length;
      mockDatas = mockDatas.filter((u, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{
              "content":mockDatas,
              "pageNumber":1,
              "pageSize":5,
              "totalNumber":2,
              "totalPages":appointmentChartData.length
            },
            "httpCode":0,
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });//获取"会议室预约图表"表格数据
  }
};
var roomManagerData = [];//获取"会议室管理"表格数据
for (let i = 0; i < 30; i++) {
  roomManagerData.push(Mock.mock({
    "id": Mock.Random.integer(0, 1000),
    "MeetingRoomId":Mock.Random.integer(0, 1000)+"培训室",
    "DepartmentNo":"管理服务部",
    "RoomType":"Advanced",
    "IsPublic":"False",
    "Description":"会议室说明",
    "del":true,
    "edit":true
  }));
};
var myManagerData = [];//获取"我的会议管理"表格数据
for (let i = 0; i < 30; i++) {
  myManagerData.push(Mock.mock({
    "id": Mock.Random.integer(0, 1000),
    "StartTime":Mock.Random.date('yyyy-MM-dd'),
    "Subject":"财务组工作总结汇报",
    "MeetingRoomId":Mock.Random.integer(0, 1000)+"培训室",
    "Importance":"重要",
    "MeetingStatus":"已批准",
    "EndTime":Mock.Random.date('yyyy-MM-dd'),
    "Creator":"jingwen.xu",
    "Description":"会议内容",
    "ContentInfo":"会议资料",
    "MailCc":"与会人员",
    "MailTo":"抄送人员",
    "operate":true,
  }));
};
var appointmentListData = [];//获取"会议室预约查询列表"表格数据
for (let i = 0; i < 30; i++) {
  appointmentListData.push(Mock.mock({
    "id": Mock.Random.integer(0, 1000),
    "StartTime":Mock.Random.date('yyyy-MM-dd'),
    "Subject":"财务组工作总结汇报",
    "MeetingRoomId":Mock.Random.integer(0, 1000)+"培训室",
    "Importance":"重要",
    "MeetingStatus":"已批准",
    "EndTime":Mock.Random.date('yyyy-MM-dd'),
    "Creator":"jingwen.xu",
    "Description":"会议内容",
    "ContentInfo":"会议资料",
    "MailCc":"与会人员",
    "MailTo":"抄送人员",
    "view":true,
  }));
};
var appointmentChartData = [];//获取"会议室预约查询图表"表格数据
for (let i = 0; i < 30; i++) {
  appointmentChartData.push(Mock.mock({
    "id": Mock.Random.integer(0, 1000),
    "MeetingRoomName":Mock.Random.integer(0, 1000)+"培训室",
    "time1":0.25,
    "time2":0.5,
    "time3":0.75,
    "time4":1,
    "time5":1,
    "time6":1,
    "time7":1,
    "time8":1,
    "time9":1,
    "time10":0.25,
    "time11":0.75,
    "time12":0,
    "time13":0,
    "time14":0,
    "time15":1,
  }));
};
