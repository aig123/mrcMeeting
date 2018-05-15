const cn =
  {
    add: "增加",
    edit: "编辑",
    delect: "删除",
    search: "搜索",
    moreConditions:"更多条件",
    lessConditions:"更少条件",
    save: "保存",
    cancel: "取消",
    index: "序号",
    listTitle: "用户",
    fullScreen: "全屏",
    import: "导入",
    export: "导出",
    operation: "操作",
    fullScreenList: "全屏列表",
    name: "姓名",
    grade: "年级",
    class: "班级",
    age: "年龄",
    platformName: "后台管理系统",
    user: "张三",
    department: "信息技术部",
  }
const en =
  {
    add: "add",
    edit: "edit",
    delect: "delect",
    search: "search",
    moreConditions: "moreConditions",
    lessConditions: "lessConditions",
    save: "save",
    cancel: "cancel",
    index: "index",
    listTitle: "user",
    fullScreen: "fullScreen",
    import: "import",
    export: "export",
    operation: "operation",
    fullScreenList: "fullScreenList",
    name: "name",
    grade: "grade",
    class: "class",
    age: "age",
    platformName: "management system",
    user: "aiguang",
    department: "department",
  }
var language = {};
if (localStorage.getItem('ELEMENT_LANGUAGE') == "cn") {
  language = cn;
} else if (localStorage.getItem('ELEMENT_LANGUAGE') == "en") {
  language = en;
}
export default language
