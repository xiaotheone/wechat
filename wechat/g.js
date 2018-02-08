

'use strict'
var sha1 = require('sha1')
var getRawBody = require('raw-body')
var wechat = require('./wechat')
var util = require('./util')
module.exports = function(opts){
var wechat_data = new wechat (opts)

return function *(next){
    var that = this
    console.log(this.query)
    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var time = this.query.timestamp
    var ecostr = this.query.echostr
    var str = [token,time,nonce].sort().join('')
    var sha = sha1(str)
    if(this.method ==='GET'){
    if(sha ===signature){
        this.body = ecostr + ''
    }
    else{
        this.body = 'wrong get'
    }
}
else if (this.method ==='POST'){
    if(sha !==signature){
        this.body = 'wrong'
        return false
    }
    var data = yield getRawBody(this.req,{
        length: this.length,
        limit:'1mb',
        encoding:this.charset
    })
 var content = yield util.parseXMLAsync(data)
   var message = util.formatMessage(content.xml)    
   console.log(message)
     
    if(message.MsgType ==='event'){
        if(message.Event ==='subscribe'){
            var now = new Date().getTime()
            that.status = 200
            that.type = 'application/xml'
            that.body = '<xml>'+
            '<ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>'+
            '<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>'+
            '<CreateTime>'+now+'</CreateTime>'+
            '<MsgType><![CDATA[text]]></MsgType>'+
            '<Content><![CDATA[Hi,欢迎订阅我的公众号]]></Content>'+
            '</xml>'
        return
        }
    }
 
}
}
}
