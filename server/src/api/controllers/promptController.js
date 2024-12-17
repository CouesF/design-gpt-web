// home/design-gpt-web/server/src/api/controllers/promptController.js
const { methodsListPrompt } = require('../../../data/methodListPrompt');
const axios = require('axios');

exports.getPromptContent = async (req, res) => {
    const { url, key, history } = req.body;
    console.log('URL:', url);
    console.log('Key:', key);
    console.log('History:', history);

    const newHistory = [{ role: 'system', content: methodsListPrompt }, ...history];

    try {
        const response = await axios.post(
            url,
            {
                model: 'gpt-4',
                messages: newHistory,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${key}`,
                },
            }
        );

        if (response.data && response.data.choices && response.data.choices[0]) {
            console.log('Response data:', response.data.choices[0].message.content);
            res.json({
                status: 'success',
                data: {
                    replyText: response.data.choices[0].message.content,
                    methodIds: [],  // 你可能需要根据实际需求修改这部分
                },
            });
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('No data returned from OpenAI API');
        }
    } catch (error) {
        console.error('Error during axios request:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error getting prompt content',
            error: error.message,
        });
    }
};

