const express = require('express');
const path = require('path');
const { webNodePort: port } = require('./config/public')
const app = express();

// 通常用于加载静态资源
app.use(express.static(__dirname + '/dist'));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.listen(port, () => {
  console.log('node服务启动');
});
