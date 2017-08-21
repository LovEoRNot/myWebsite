const express = require('express');
const app = express();

app.set('views', './views/')
app.set('view engine', 'ejs')

app.use('/', require('./route/index'))

app.use(express.static('./public'))

app.listen('8080', function() {
  console.log('正在监听8080端口');
})