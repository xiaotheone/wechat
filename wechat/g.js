

'use strict'
var sha1 = require('sha1')
var getRawBody = require('raw-body')
var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    access: prefix+'token?grant_type=client_credential'
}
function Wechat(opts){
    var that = this
    this.appID = opts.appID
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken
   
    this.getAccessToken()
     .then(function(data){
      
         try{
         data = JSON.parse(data)
         }
         catch(e){
             return  that.updataAccessToken(data)
         }
         if(that.isValidAccessToken(data)){
           Promise.resolve(data)
         }
         else{
             return that.updataAccessToken()
         }
     })
     .then(function(data){
         that.access_token = data.access_token
         that.expires_in = data.expires_in
         that.saveAccessToken(data)
     })
   }
   Wechat.prototype.isValidAccessToken = function(data){
       if(!data || !data.access_token || !data.expires_in){
           return false;
       }
   var access_token = data.access_token
   var expires_in = data.expires_in
   var now = (new Date().getTime())
   if(now<expires_in){
   return true
   }
   else{
   return false
   }
   }
   
   Wechat.prototype.updataAccessToken = function(){
       var appID = this.appID
       var appSecret = this.appSecret
       var url = api.access + '&appid=' +appID + '&secret='+appSecret
   
       return new Promise(function(resolve,reject){
   
       request({url:url,json:true}).then(function(response){
   
           var data = response.body
           var now = (new Date().getTime())
           var expires_in = now+(data.expires_in-20)*1000
           
           data.expires_in = expires_in
           resolve(data)
           
       })
       })
   }

module.exports = function(opts){
var wechat_data =new Wechat (opts)

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
}
}
}
