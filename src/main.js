import Vue from 'vue'
import App from './App'
//引入全局异步请求
import request from "./util/request";
Vue.prototype.request = request;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()