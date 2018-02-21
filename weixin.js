'use strict'

exports.reply = function* (next){
var message = this.weixin

if(message.MsgType ==='event'){
    if(message.Event ==='subscribe'){
        if(message.EventKey===''){
            console.log('扫二维码进来' + message.EventKey + ' '+ message.ticket)
        }
        this.body = '欢迎订阅 😄'
    }
    else if(message.Event ==='unsubscribe'){
        console.log('无情取消')
        this.body = ''
    }
    else if (message.Event ==='CLICK'){
        this.body = '您点了菜单: '+message.EventKey
    }
    else if (message.Event ==='VIEW'){
        this.body = '您点了菜单中的链接: '+message.EventKey
    }
}
else if(message.MsgType ==='text'){
    var content = message.Content
    var reply = ' 没用您输入的这个选项 : ' + message.Content + '请输入1，2或者3' 
    if(content ==='1'){
        this.body = 'Take a simple idea and take it serisouly'
    }
    else if(content ==='2'){
        this.body = 'The best preparation for tomorrow is doing your best today'
    }
    else if(content ==='3'){
        this.body = 'A negative mind will never give you a positive life'
    }
    else if(content ==='4'){
        this.body = [{
            title:'NodeJS 微信开发',
            description:'It is fun',
            picurl:'http://www.xiaoyikeji.cn/wp-content/uploads/2017/05/timg.png',
            url:'https://nodejs.org'
        }]
    }
    else{
        this.body = reply;
    }
    
    
}

yield next

}