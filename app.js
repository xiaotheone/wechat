'use strict'
var Koa = require('koa')
var wechat = require('./wechat/g')
var config = require('./config')
var weixin = require('./weixin')

var app = new Koa()
app.use(wechat(config.wechat))


app.listen(1234)
console.log('listening 1234')