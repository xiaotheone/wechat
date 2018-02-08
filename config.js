'use strict'
var util = require('./libs/util')
var path = require('path')

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

module.exports = config