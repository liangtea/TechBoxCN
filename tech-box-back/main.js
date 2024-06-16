
const mysql = require('mysql');
// 引入Express框架
const express = require('express');
// 创建一个Express应用
const app = express();
// 定义端口号
const port = 3005;

const cors = require('cors');

// 允许所有来源
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', // 数据库服务器地址
    user: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    database: 'tech_box' // 数据库名称
});



// 连接到数据库
db.connect((err) => {
    if (err) {
        throw err;

    }
    console.log('数据库连接成功！');
});

// 修改您的POST路由以从数据库获取新闻列表
app.post('/news', (req, res) => {
    if (req.body.method === 'get_news_list') {
        // 执行SQL查询以获取除content字段外的所有新闻数据
        db.query('SELECT id, title, subtitle, image_url, publish_time, preface FROM news_content', (err, results) => {
            if (err) {
                // 如果查询过程中出现错误，发送错误响应
                res.status(500).json({ error: '数据库查询失败' });
            } else {
                // 将查询结果以JSON格式发送回客户端
                res.json(results);
            }
        });
    } else if (req.body.method === 'get_news_by_id') {
        // 当method为get_news_by_id时，根据id查询单条记录
        const newsId = req.body.id;
        if (Number.isInteger(newsId)) {
            // 执行SQL查询以根据ID获取单条新闻记录的所有字段
            db.query('SELECT * FROM news_content WHERE id = ?', [newsId], (err, results) => {
                if (err) {
                    // 如果查询过程中出现错误，发送错误响应
                    res.status(500).json({ error: '数据库查询失败' });
                } else if (results.length > 0) {
                    // 如果找到了记录，将其以JSON格式发送回客户端
                    res.json(results[0]);
                } else {
                    // 如果没有找到记录，发送404响应
                    res.status(404).json({ error: '未找到新闻' });
                }
            });
        } else {
            // 如果id不是数字，发送400响应
            res.status(400).json({ error: '无效的ID' });
        }
    } else {
        res.status(400).json({ error: 'Invalid method' });
    }
});

// 在服务器关闭时结束数据库连接
process.on('SIGINT', () => {
    db.end((err) => {
        console.log('数据库连接已关闭！');
        process.exit(err ? 1 : 0);
    });
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
