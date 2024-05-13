const { methodsListPrompt } = require('../../../data/methodListPrompt');

const axios = require('axios');

exports.getPromptContent = async (req, res) => {
    const { url, key, history } = req.body;
    console.log(key);
    console.log(history)
    const newHistory = [{ role: 'system', content: methodsListPrompt }, ...history];

    try {
        const response = await axios.post(
            // 'https://api.ai-yyds.com/v1/chat/completions'
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

        if (response.data) {
            console.log(response.data.choices[0].message.content)
            res.json({
                status: 'success',
                data: {
                    replyText: response.data.choices[0].message.content,
                    methodIds: [],  // You might need to modify this part based on your actual needs
                },
            });
        } else {
            throw new Error('No data returned from OpenAI API');
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error getting prompt content',
            error: error.message,
        });
    }
};
