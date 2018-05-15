import axios from 'axios';
import baseApi from '../api/baseApi'
import MockAdapter from 'axios-mock-adapter';
import appMock from './appMock'
const Mock = require('mockjs')

export default {
  bootstrap() {
    let _mock = new MockAdapter(axios);
    appMock.initMock(_mock);
  }
}
