// design-gpt-web/server/src/server.js
const express = require('express');
const methodRoutes = require('./api/routes/methodRoutes');
const promptRoutes = require('./api/routes/promptRoutes');
const path = require('path');


const app = express();

app.use(express.json());

app.use('/api/method', methodRoutes);
app.use('/api/prompt', promptRoutes);

// 静态文件服务配置.需要client build好
const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
app.use(express.static(buildPath));

// SPA 路由处理，确保所有路由都返回前端的 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(3058, () => {
    console.log('Server running on port 3058')
});
