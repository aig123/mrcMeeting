'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"localhost"', // doclever中端地址11
  // BASE_URL: '"http://192.168.12.81:8888/mock/5a9775f705fca1168d5cc949"', // doclever mock地址
  // BASE_URL: '"http://new.test.hhedu.cn/middle"', //三代中学测试地址
  UPLOAD_URL:'"http://192.168.13.9:8080/fileserver/upload_files"',
  RESOURCES_URL:'"http://test.hhedu.cn/"',
  DOWNLOAD_URL:'"http://new.test.hhedu.cn/fileserver/"',
})
