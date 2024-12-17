// home/design-gpt-web/server/src/api/controllers/methodController.js
const methodData = require('../../../data/methodsData');

exports.getMethodById = (req, res) => {
    const methodId = req.params.id;
    const method = methodData.methods.find(method => method.methodId === methodId);    console.log(methodId)
    console.log(method)
    if (method) {
        res.json({
            status: 'success',
            data: method
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Method not found'
        });
    }
};