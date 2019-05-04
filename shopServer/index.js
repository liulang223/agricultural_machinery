const Koa = require('koa');
const app = new Koa();

//解决跨域问题
const cors = require('koa2-cors');
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}))

//接收前端post请求
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//加载路由
const Router = require('koa-router')
let user = require('./controller/user.js')

let router = new Router()
router.use('/user',user.routes());

app.use(router.routes());
app.use(router.allowedMethods())

const {connect, initShemas} = require('./init.js');

(async () =>{
   await connect();
   initShemas();
})();

app.use(async (ctx)=>{
    ctx.body = 'hello'
})

app.listen(3000, ()=>{
    console.log('start success');
    
})