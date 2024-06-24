// 引入Express框架
const express = require('express');
// 创建一个Express应用
const app = express();
// 定义端口号
const port = 3000;

app.use(express.json());

// 模拟的新闻数据
const newsList = [
    {
        title: '新闻标题1',
        subtitle: '新闻子标题1',
        publishedAt: '2024-06-15T08:00:00Z',
        intro: '这是新闻前言1',
        imageUrl: 'http://example.com/image1.jpg',
        content: '这是新闻正文1'
    },
    {
        title: '新闻标题2',
        subtitle: '新闻子标题2',
        publishedAt: '2024-06-15T08:00:00Z',
        intro: '这是新闻前言1',
        imageUrl: 'http://example.com/image1.jpg',
        content: '这是新闻正文1'
    },
    {
        title: '新闻标题3',
        subtitle: '新闻子标题3',
        publishedAt: '2024-06-15T08:00:00Z',
        intro: '这是新闻前言1',
        imageUrl: 'http://example.com/image1.jpg',
        content: '这是新闻正文1'
    },
    {
        title: '新闻标题4',
        subtitle: '新闻子标题4',
        publishedAt: '2024-06-15T08:00:00Z',
        intro: '这是新闻前言1',
        imageUrl: 'http://example.com/image1.jpg',
        content: '这是新闻正文1'
    },
    // ...可以添加更多新闻项
];

app.post('/news', (req, res) => {
    // 检查请求体中的method字段
    if (req.body.method === 'get_news_list') {
        // 如果method匹配，返回新闻列表
        res.json(newsList);
    } else {
        // 如果method不匹配，返回错误消息
        res.status(400).json({ error: 'Invalid method' });
    }
});

// 创建一个路由处理GET请求
app.get('/', (req, res) => {
    // 发送响应数据
    res.send('Hello World');
});


// 添加一个新的GET路由来处理'/about'路径
app.get('/about', (req, res) => {
    res.send('关于页面');
});

// 让应用监听定义的端口号
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
