

'use strict'
var sha1 = require('sha1')
var getRawBody = require('raw-body')
var outh = require('./wechat')
var util = require('./util')
module.exports = function(opts){
var wechat_data = new outh (opts)

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
 
}
}
}
