
exports.getPromptContent = async (req, res) => {
    const { url, key, history } = req.body;

    try {
        res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error getting prompt content'
        });
    }
};