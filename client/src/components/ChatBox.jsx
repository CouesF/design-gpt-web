// design-gpt-web/client/src/components/ChatBox.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Message } from 'antd';
import Cookies from "js-cookie";
import axios from 'axios';

const ChatBox = ({ title, height }) => {
  const [dialogHistory, setDialogHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [apiURL, setApiURL] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    const storedApiURL = Cookies.get("apiURL");
    const storedApiKey = Cookies.get("apiKey");
    if (storedApiURL) {
      setApiURL(storedApiURL);
    }
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    console.log(dialogHistory);
  }, [dialogHistory]);

  const handleModalOk = () => {
    Cookies.set("apiURL", apiURL);
    Cookies.set("apiKey", apiKey);
    setIsModalVisible(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = async () => {
    // Add user dialog to history
  const newDialogHistory = [...dialogHistory, {role: 'user', content: inputValue}];
    console.log(inputValue);
    setDialogHistory(newDialogHistory);
    console.log(dialogHistory)
    setInputValue("");


    // Call backend API to get AI's reply
    const response = await axios.post(`${window.location.origin}/api/prompt`, {
      url: apiURL,
      key: apiKey,
      history: newDialogHistory
    });

    if (response.data.status === 'success') {
      // Add AI's reply to history
      setDialogHistory([...newDialogHistory, {role: 'assistant', content: response.data.data.replyText}]);
    } else {
      // Handle error
      console.error(response.data.message);
    }

  };

  return (
    <div style={{ width: '100%', height: height, borderRadius: '10px', border: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h2>{title}</h2>
        <Button onClick={() => setIsModalVisible(true)} type='primary'>
          settings
        </Button>
      </div>
      <div style={{ overflowY: 'scroll', maxHeight: '70%' }}>
        {dialogHistory.map((dialog, index) => (
          <p key={index}><strong>{dialog.role}:</strong> {dialog.content}</p>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Input value={inputValue} onChange={handleInputChange} />
        <Button onClick={handleSendClick}>Send</Button>
      </div>
      <Modal title="Settings" visible={isModalVisible} onOk={handleModalOk} onCancel={() => setIsModalVisible(false)}>
        <Input placeholder="API URL" value={apiURL} onChange={(e) => setApiURL(e.target.value)} />
        <Input placeholder="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </Modal>
    </div>
  );
};

export default ChatBox;
