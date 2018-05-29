import axios from 'axios';
import config from './apiConfig';
import { Notification } from 'element-ui';
axios.interceptors.response.use(
    response => {
      if(response.data.code!='0'&&response.data.result == 'failure'){
          Notification.error({
            message: response.data.messages
          });
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500 :
                    Notification.error({
                        message: '系统异常请稍后在试！'
                    });
                    break;
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
    );
export default {
  post (url, param,method){
    if(method){
      config.headers['nd-method']=method
    }
    console.log(config);
    return axios.post(url, param?param:{}, config);
   // return apiPost(url,param)

  },
  get (url,param){
    return axios.get(url, {
      params:param
    },config);
  }
};
let apiPost=function ajaxpost(u, d, m, n) {
  var parm = { url: u, data: d, method: m, ndtarget: n };
  if (typeof (d) == "function") { parm.method = d; parm.data = null; }
  if (typeof (m) != "function") { parm.ndtarget = m; parm.method = undefined; }

  var config = {
    url: parm.url.replace(/([^\/]*)\/([^\/]*)$/g, '$1'),
    data: parm.data,
    method: "Post",
    async: typeof (parm.method) != "undefined" ? true : false,
    success: parm.method,
    datatype: "json",
    submit: parm.url.substring(parm.url.lastIndexOf("/") + 1),
    ndtarget: parm.ndtarget
  };
  return api(config);
}
let api = function ajaxmethod(conf) {

  var ajaxkey = '';

  //过滤
  if (typeof (conf) == "undefined") return;
  if (typeof (conf.url) == "undefined") return;

  var config = {
    url: conf.url,
    data: conf.data,
    async: typeof (conf.async) == "undefined" ? false : conf.async,
    contentType: typeof (conf.contentType) == "undefined" ? "application/json; charset=utf-8" : conf.contentType,
    method: typeof (conf.method) == "undefined" ? "Post" : conf.method,
    success: conf.success,
    error: conf.error,
    datatype: typeof (conf.datatype) == "undefined" ? "json" : conf.datatype,
    submit: conf.submit,
    ndtarget: conf.ndtarget,
    ndhost: conf.ndhost
  };
  var rddata;

  // new XMLDocumentRequest();

  //头处理
  var xmlhttp = new XMLHttpRequest();
  if (xmlhttp.overrideMimeType)
    xmlhttp.overrideMimeType("application/json; charset=utf-8");
  if ("withCredentials" in xmlhttp) {
    // 针对Chrome/Safari/Firefox.
  }
  //else if (typeof XDomainRequest != undefined) {
  //    // 针对IE
  //    xmlhttp = new XDomainRequest();
  //}
  else {
    // 不支持CORS
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 401) {
          var data = eval('(' + xmlhttp.responseText + ')');
          if (typeof (window.login) == 'function') {
            window.login();
          } else {
            window.location.href = data.url + '?u=' + window.location.href;
          }
        }
        else if (xmlhttp.status == 200 && xmlhttp.responseText != "") {
          if (config.datatype == "json") {
            data = eval('(' + xmlhttp.responseText + ')');
            data.status = 200;
          } else data = xmlhttp.responseText;
        } else {
          data = { status: xmlhttp.status, success: false, message: xmlhttp.statusText, data: xmlhttp.responseText };
        }
        if (typeof (config.success) != "undefined") {
          if (typeof (config.success) != "function") {
            eval('(' + config.success + "(data)" + ')');
          }
          else config.success.call(this, data);
        }
      }
      rddata = data;
      return data;
    };

    var hasn = config.url.indexOf('?') > 0 ? "&" : "?";

    if (config.method.toLowerCase() == "get") {
      if (typeof (config.data) == "string") config.data = "[\"" + config.data + "\"]";
      var M = (typeof (config.submit) != "undefined") ? hasn + "nd-method=" + config.submit : "";
      var D = (typeof (config.data) != "undefined") ? (M.length > 0) ? "&" : hasn + "nd-senddata=" + JSON.stringify(config.data) : "";
      config.url = encodeURI(config.url + M + D).replace(/\%/g, "%_").replace(/\+/g, "%2B");
    }

    xmlhttp.open(config.method, config.url, config.async);
    if (config.datatype == "json") {
      xmlhttp.setRequestHeader("keys", ajaxkey);
      xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    }

    //火狐不支持
    if (navigator.userAgent.indexOf("Firefox") == 0) {
      xmlhttp.withCredentials = true;
    }


    if (typeof (config.submit) != "undefined") {
      xmlhttp.setRequestHeader("nd-method", config.submit);
    }

    if (typeof (config.ndtarget) != "undefined") {
      xmlhttp.setRequestHeader("ndtarget", config.ndtarget);
    }

    if (typeof (config.ndhost) != "undefined") {
      xmlhttp.setRequestHeader("ndhost", config.ndhost);
    }

    if (typeof (config.data) != "undefined")
      xmlhttp.send(JSON.stringify(config.data).replace(/\%/g, "%_").replace(/\+/g, "%2B"));
    else xmlhttp.send();
    return rddata;
  }

  // 回应处理
  xmlhttp.onload = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 401) {
        var data = eval('(' + xmlhttp.responseText + ')');
        if (typeof (window.login) == 'function') {
          window.login();
        } else {
          window.location.href = data.url + '?u=' + window.location.href;
        }
      }
      else if (xmlhttp.status == 200 && xmlhttp.responseText != "") {
        if (config.datatype == "json") {
          data = eval('(' + xmlhttp.responseText + ')');
          data.status = 200;
        }
        else data = xmlhttp.responseText;
      } else {
        if (config.datatype == "json") {
          data = { status: xmlhttp.status, success: false, message: xmlhttp.statusText, data: xmlhttp.responseText };
        } else {
          data = xmlhttp.responseText;
        }
      }
      if (typeof (config.success) != "undefined") {
        if (typeof (config.success) != "function") eval('(' + config.success + "(data)" + ')');
        else config.success.call(this, data);
      }
    }
    rddata = data;
    return data;
  };

  xmlhttp.onerror = function (e) {
    rddata = { message: e.toString(), success: false };
    if (typeof (config.error) != "undefined") eval('(' + config.error + "(data)" + ')');
    return rddata;
  };

  var hasn = config.url.indexOf('?') > 0 ? "&" : "?";

  if (config.method.toLowerCase() == "get") {
    if (typeof (config.data) == "string") config.data = "[\"" + config.data + "\"]";
    var M = (typeof (config.submit) != "undefined") ? hasn + "nd-method=" + config.submit : "";
    var D = (typeof (config.data) != "undefined") ? (M.length > 0) ? "&" : hasn + "nd-senddata=" + JSON.stringify(config.data) : "";
    config.url = encodeURI(config.url + M + D).replace(/\%/g, "%_").replace(/\+/g, "%2B");
  }

  xmlhttp.open(config.method, config.url, config.async);
  if (config.datatype == "json") {
    xmlhttp.setRequestHeader("keys", ajaxkey);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
  }
  if (navigator.userAgent.indexOf("Firefox") == 0) {
    xmlhttp.withCredentials = true;
  }

  if (typeof (config.submit) != "undefined") {
    xmlhttp.setRequestHeader("nd-method", config.submit);
  }

  if (typeof (config.ndtarget) != "undefined") {
    xmlhttp.setRequestHeader("ndtarget", config.ndtarget);
  }

  if (typeof (config.ndhost) != "undefined") {
    xmlhttp.setRequestHeader("ndhost", config.ndhost);
  }

  if (typeof (config.data) != "undefined" && config.data != null) {
    xmlhttp.send(JSON.stringify(config.data).replace(/\%/g, "%_").replace(/\+/g, "%2B"));
  }
  else xmlhttp.send();

  if (!rddata && xmlhttp.readyState == 4) {
    if (xmlhttp.status == 401) {
      rddata = eval('(' + xmlhttp.responseText + ')');
      if (typeof (window.login) == 'function') {
        window.login();
      } else {
        window.location.href = rddata.url + '?u=' + window.location.href;
      }
    }
    else if (xmlhttp.status == 200 && xmlhttp.responseText != "") {
      if (config.datatype == "json") {
        rddata = eval('(' + xmlhttp.responseText + ')');
        rddata.status = 200;
      }
      else rddata = xmlhttp.responseText;
    } else {
      rddata = { status: xmlhttp.status, success: false, message: xmlhttp.statusText, data: xmlhttp.responseText };
    }
    if (typeof (config.success) != "undefined") {
      if (typeof (config.success) != "function") eval('(' + config.success + "(data)" + ')');
      else config.success.call(this, rddata);
    }
  }
  return rddata;
}
