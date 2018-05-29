export default {
	baseURL: process.env.BASE_URL,
  headers: {'Content-Type':'application/json','authorization':"Basic YWlndWFuZw==:QWlndWFuZyFAIw=="},
  onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},
	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},
	maxContentLength: 2000,
  withCredentials:false,
	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	}
}
