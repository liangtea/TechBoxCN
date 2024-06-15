// 引入Express框架
const express = require('express');
// 创建一个Express应用
const app = express();
// 定义端口号
const port = 3000;

// 创建一个路由处理GET请求
app.get('/', (req, res) => {
  // 发送响应数据
  res.send('Hello World');
});

// 让应用监听定义的端口号
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
