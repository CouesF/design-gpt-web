// design-gpt-web/server/src/server.js
// require('dotenv').config();

// const express = require('express');
// const methodRoutes = require('./api/routes/methodRoutes');
// const promptRoutes = require('./api/routes/promptRoutes');
// const path = require('path');



// const app = express();

// app.use(express.json());

// app.use('/api/method', methodRoutes);
// app.use('/api/prompt', promptRoutes);

// // 静态文件服务配置.需要client build好
// const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
// app.use(express.static(buildPath));

// // SPA 路由处理，确保所有路由都返回前端的 index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(buildPath, 'index.html'));
// });

// app.listen(3058, () => {
//     console.log('Server running on port 3058')
// });

// --------------------------------------
// require('dotenv').config();
// const express = require('express');
// const methodRoutes = require('./api/routes/methodRoutes');
// const promptRoutes = require('./api/routes/promptRoutes');
// const path = require('path');

// const app = express();

// app.use(express.json());

// // Add the sub-path prefix to the API routes
// const subPath = process.env.SUBDIRECTORY_PREFIX || '';
// console.log(subPath);
// app.use(`${subPath}/api/method`, methodRoutes);
// app.use(`${subPath}/api/prompt`, promptRoutes);

// // 静态文件服务配置.需要client build好 
// const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
// app.use(`${subPath}/`, express.static(buildPath));

// // SPA 路由处理，确保所有路由都返回前端的 index.html
// app.get(`${subPath}/*`, (req, res) => {  
//     res.sendFile(path.join(buildPath, 'index.html'));
// });

// app.listen(3058, () => {
//     console.log('Server running on port 3058')  
// });
// --------------------------------------
require('dotenv').config();
const express = require('express');
const methodRoutes = require('./api/routes/methodRoutes');
const promptRoutes = require('./api/routes/promptRoutes');
const path = require('path');

const app = express();

app.use(express.json());

// Add the sub-path prefix to the API routes
const subPath = process.env.SUBDIRECTORY_PREFIX || '';
console.log(subPath);
app.use(`${subPath}/api/method`, methodRoutes);
app.use(`${subPath}/api/prompt`, promptRoutes);

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