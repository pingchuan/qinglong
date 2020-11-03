const express = require('express');
const path = require('path');
const app = express();

// 通常用于加载静态资源
app.use(express.static(__dirname + '/dist'));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.listen(8000, () => {
  console.log('node服务启动在8000端口');
});
