
'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    access: prefix+'token?grant_type=client_credential'
}
function wechat(opts){
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
      if(data.access.token){
      that.access_token = data.access_token
      that.expires_in = data.expires_in
      that.saveAccessToken(data)
      }
  })
}
wechat.prototype.isValidAccessToken = function(data){
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

wechat.prototype.updataAccessToken = function(){
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
module.exports = wechat