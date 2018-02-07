

'use strict'
var sha1 = require('sha1')
var getRawBody = require('raw-body')
var outh = require('./wechat')
module.exports = function(opts){
var wechat_data = new outh (opts)

return function *(next){
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
    console.log(data.toString())
    console.log("test from mac")
}
}
}
