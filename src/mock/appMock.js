const Mock = require('mockjs')


export default {
  /**
   * mock bootstrap
   */
  initMock(mock) {
    mock.onPost('/api/tableData').reply(config => {
      let pageIndex,condition,pageSize
      if(config.data){
       pageIndex= JSON.parse(config.data).pageIndex;
       condition = JSON.parse(config.data).condition;
        pageSize = JSON.parse(config.data).pageSize;
      }
      let mockDatas = tableDatas;
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
              "totalPages":tableDatas.length
            },
            "httpCode":0,
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });
    mock.onPost('/api/addTable').reply(config => {
      tableDatas.push(JSON.parse(config.data))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200,{
            "data":{},
            "httpCode":0,
            "messages":[
              "查询成功"
            ],
            "result":"success"
          }]);
        }, 0);
      });
    });
    mock.onPost('/api/delTable').reply(config => {
      let { id } = JSON.parse(config.data);
      function manyDelect(data) {
        if(id.toString().indexOf(data.id)!=-1){
          return false
        }else {
          return data
        }

      }
      tableDatas = tableDatas.filter(manyDelect);
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
    });
  }
};
var tableDatas = [];
for (let i = 0; i < 30; i++) {
  tableDatas.push(Mock.mock({
    "id": Mock.Random.integer(0, 1000),
    "name": Mock.Random.cname(),
    "sex":Mock.Random.integer(0, 1).toString(),
    "date":Mock.Random.date('yyyy-MM-dd'),
    "comment":"这是一个备注1,这是一个备注1,这是一个备注1" ,
    "city":Mock.Random.city(true),
     "del":true,
     "edit":Mock.Random.boolean()
  }));
}
