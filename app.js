const express = require('express');
const app = express();

var port = 80;

app.set('views', './views/')
app.set('view engine', 'ejs')

app.use('/', require('./route/index'))

app.use(express.static('./public'))

app.listen(port, function() {
  console.log(`正在监听${port}端口`);
})