const jwt = require('jsonwebtoken');
const mysql = require('mysql');
// 引入Express框架
const express = require('express');
// 创建一个Express应用
const app = express();
// 定义端口号
const port = 3005;

const cors = require('cors');
const KEY = "jsuoeSSLDl(@(#&7lsjfl7992SLSLFLsisoo(((626364xnljsjlsfjlsfjlsdjlf221422l....j,&&(&(X*&(";

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
        db.query('SELECT id, title, subtitle, image_url, publish_time, preface FROM news_content ORDER BY publish_time DESC', (err, results) => {
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

// 登录路由
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 检查用户名和密码是否正确
    checkUserCredentials(username, password, (err, user) => {
        if (err) {
            // 如果验证失败，发送错误响应
            res.status(401).json({ error: '认证失败' });
        } else {
            // 如果验证成功，创建一个JWT
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                KEY, // 用于签名的密钥，应该是一个长的随机字符串
                { expiresIn: '1h' } // 设置token过期时间
            );
            // 发送包含JWT的响应
            res.json({ token });
        }
    });
});
// 用于检查用户名和密码的示例函数
function checkUserCredentials(username, password, callback) {
    // 这里应该有数据库查询来验证用户
    // 以下是模拟的代码
    const user = { id: 1, username: 'admin', password: '123456' };
    if (username === user.username && password === user.password) {
        callback(null, user);
    } else {
        callback(new Error('认证失败'));
    }
}


// JWT验证中间件
const authenticateToken = (req, res, next) => {
    // 从请求头中获取token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        // 如果没有token，返回401未授权状态码
        return res.sendStatus(401);
    }

    jwt.verify(token, KEY, (err, user) => {
        if (err) {
            // 如果token无效或过期，返回403禁止状态码
            return res.sendStatus(403);
        }
        // 如果验证成功，将解码后的用户信息添加到请求对象
        req.user = user;
        // 调用next()继续处理请求
        next();
    });
};


app.post('/publish', authenticateToken, (req, res) => {
    // 从请求体中获取JSON字段
    const { title, subtitle, image_url, publish_time, preface, content } = req.body;

    // 创建SQL插入语句
    const sqlInsert = `
        INSERT INTO news_content (title, subtitle, image_url, publish_time, preface, content)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // 执行SQL插入操作
    db.query(sqlInsert, [title, subtitle, image_url, publish_time, preface, content], (err, results) => {
        if (err) {
            // 如果插入过程中出现错误，发送错误响应
            console.error(err);
            res.status(500).json({ success: false, message: '数据插入失败' });
        } else {
            // 如果插入成功，发送成功响应
            res.json({ success: true, message: '数据插入成功' });
        }
    });
});

app.post('/delete', authenticateToken, (req, res) => {
    // 从请求体中获取id数组
    const ids  = req.body;
    // 检查ids是否为数组且不为空
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: '无效的ID列表' });
    }

    // 创建SQL删除语句
    const sqlDelete = 'DELETE FROM news_content WHERE id IN (?)';

    // 执行SQL删除操作
    db.query(sqlDelete, [ids], (err, results) => {
        if (err) {
            // 如果删除过程中出现错误，发送错误响应
            console.error(err);
            res.status(500).json({ success: false, message: '数据库删除失败' });
        } else {
            // 如果删除成功，发送成功响应
            res.json({ success: true, message: '数据删除成功', deletedCount: results.affectedRows });
        }
    });
});



// 让应用监听定义的端口号
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
