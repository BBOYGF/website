let proxyObj={}

proxyObj['/']={
    //websocket
    ws:false,
    //目标地址
    target: 'http://localhost:81',
    //发送请求头的host会被设置target
    changeOrigin: true,
    //不重写请求地址
    pathReWrite:{
        '^/':'/'
    }
}

module.exports = {
    runtimeCompiler: true,
    devServer:{
        host: 'localhost',
        port: 82,
        proxy:proxyObj
    }
}
