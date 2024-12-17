// design-gpt-web/client/src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Input } from 'antd';
import Cookies from "js-cookie";
import axios from 'axios';
import {
  SettingOutlined,
  ArrowUpOutlined,

} from '@ant-design/icons';

const chatContentFontSize = 16;
const primaryColor = "#0965F4"

const ChatBox = ({ title, height , placeholder}) => {
  const [dialogHistory, setDialogHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [apiURL, setApiURL] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);

  const methodLinksRef = useRef(null);


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

    if (!apiURL || !apiKey) {
      setIsModalVisible(true);
      return;
    }
    if(inputValue==="") return;


    setLoading(true);
    setError(null);

    // Add user dialog to history
    const newDialogHistory = [...dialogHistory, { role: 'user', content: inputValue }];
    console.log(inputValue);
    setDialogHistory(newDialogHistory);
    console.log(dialogHistory)
    setInputValue("");

    try {
      // system 的prompt需要在后端加，不然可能前端会获取到prompt
      // const dialogHistoryWithSystemPrompt = [{role:"system",content:"xxx"},...dialogHistory]

      // Call backend API to get AI's reply
      const response = await axios.post(`${process.env.REACT_APP_SUBDIRECTORY_PREFIX}/api/prompt`, {
        url: apiURL,
        key: apiKey,
        history: newDialogHistory
      });

      if (response.data.status === 'success') {
        // Add AI's reply to history
        setDialogHistory([...newDialogHistory, { role: 'assistant', content: response.data.data.replyText }]);
        parseAndSetUrls(response.data.data.replyText);
      } else {
        // Handle error
        setError(response.data.message);
        console.error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

  };
  const userIcon = (
    <img
      src={`${process.env.PUBLIC_URL}/img/user.svg`}
      style={{ height: chatContentFontSize + 6 }}
      alt="user icon"
    />
  );
  const aiIcon = (
    <img
      src={`${process.env.PUBLIC_URL}/img/sparkling.svg`}
      style={{ height: chatContentFontSize + 6 }}
      alt="ai icon"
    />
  );
  const parseAndSetUrls = (text) => {
    // const matches = text.match(/URL:\[(.*?)\](\/method\/.*?)\n/g);
    const matches = text.match(/URL:\[\s*(.+?)\s*\]\((.+?)\)/g);

    console.log(matches)
    if (matches) {
      const urlData = matches.map(item => {
        const parts = item.replace(/URL:\[\s*(.+?)\s*\]\((.+?)\)/, '\$1 | \$2').split('|');
      return { name: parts[0].trim(), link: parts[1].trim() };
      });
      setUrls(urlData);
    } else {
      setUrls([]);
    }
  };
  const checkMethodLinks = () => {
    return (
      <div ref={methodLinksRef} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxShadow: `inset 2px 0px 0 0px ${primaryColor}`,
        marginLeft: "24px",
        marginBottom: "12px",
        marginTop: "12px",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
        {urls.map((url, index) => (
        <Button key={index} type="link" href={`/innogpt${url.link}`} target='_blank'>
          {url.name}
        </Button>
      ))}
        {/* <Button type="link">
          method111
        </Button>
        <Button type="link">
          method111222
        </Button> */}
      </div>

    );
  };
  return (
    <div style={{
      width: '100%',
      height: height,
      borderRadius: '2px',
      border: '1px solid #ccc',
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignContent: "flex-start",
      boxSizing: 'border-box',  // add this line
      position: "relative",


    }}>
      {/* chatbox header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <img
          src={`${process.env.PUBLIC_URL}/img/sparkling.svg`}
          style={{ height: "24px" }}
          alt="Logo"
        />
        <SettingOutlined onClick={() => setIsModalVisible(true)} style={{
          fontSize: "20px",
          color: "#AAA"
        }} />
      </div>
      {/* chatbox main content + method links*/}
      <div style={{
        position: "relative",
        height: '100%',
        display: "flex",
        flexDirection: "column",
        alignContent: "space-between",
        backgroundColor: "#FAFAFA",
      }}>
        {/* chatbox main content */}
        <div style={{
          overflowY: 'auto',
          padding: "24px 36px",
          fontSize: chatContentFontSize,
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          bottom: true ? `${methodLinksRef.current?.offsetHeight || 0}px` : 0,
          left: 0,
          right: 0,

          // flex: 1,
          // overflowY: 'auto',
          // display: "flex",
          // flexDirection: "column",
          // alignContent: "flex-start",
          // padding: "24px 36px",
          // fontSize: chatContentFontSize,
          // boxSizing: 'border-box',

        }}>
          {dialogHistory.map((dialog, index) => (
            <div key={index} style={{ display: 'flex', justifyItems: 'center', marginBottom: "16px" }}>
              <div style={{ marginRight: "12px" }}>
                {dialog.role === "user" ? userIcon : aiIcon}
              </div>
              <div>
                {dialog.content}
              </div>
            </div>
          ))}
        </div>
        {/* chatbox method links */}
        {urls.length > 0 ? checkMethodLinks() : null}

        <img
          src={`${process.env.PUBLIC_URL}/img/100deco.svg`}
          style={{
            height: "240px",
            position: "absolute",
            top: "50%",  // center vertically
            left: "50%",  // center horizontally
            transform: "translate(-50%, -50%)"  // adjust for the image's own dimensions
          }}
          alt="decoration"
        />
      </div>

      {/* chatbox input area */}

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <Input value={inputValue} onChange={handleInputChange} onPressEnter={handleSendClick} placeholder={placeholder}/>
        <Button type="primary" onClick={handleSendClick} ><ArrowUpOutlined/></Button>
      </div>
      <Modal title="Settings" visible={isModalVisible} onOk={handleModalOk} onCancel={() => setIsModalVisible(false)}>
        <Input placeholder="API URL: https://api.openai.com/v1/chat/completions" value={apiURL} onChange={(e) => setApiURL(e.target.value)} />
        <Input placeholder="API Key: sk-xxxxxxxxx" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </Modal>
    </div>
  );
};

export default ChatBox;
