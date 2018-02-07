'use strict'
var Koa = require('koa')
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')

var wechat_file = path.join(__dirname,'./config/wechat.txt')
var config = {
    wechat:{
        appID : 'wx50ca0f93abffbc89',
        appSecret:'37593fa311a45a9556e153a172456cc8',
        token: 'xiaotheone',
        getAccessToken: function(data){
            data = JSON.stringify(data)
            return util.readFileAsync(wechat_file,data)
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file,data)
        }
    }
}

var app = new Koa()
app.use(wechat(config.wechat))

app.listen(1234)
console.log('listening 1234')