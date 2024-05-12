// design-gpt-web/client/src/pages/MainPage.jsx
import React, { useState, useEffect,useRef} from 'react';
import { Modal, Button, Form, Input, Select, Message, Space } from 'antd';
import { Flex, Layout, Col, Row, Skeleton } from 'antd';

import MainGraph from '../components/MainGraph';
import { graphData } from '../assets/graphData';  // 确保路径正确
import ChatBox from '../components/ChatBox';
import {
    ArrowUpOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';
import { Typography } from 'antd';
import PhaseCard from '../components/PhaseCard';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const headerStyle = {
    // textAlign: 'center',
    color: '#111',
    height: 780,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
    width: "100%",
    maxWidth: "1280px",

};
const layoutStyle = {
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#e8eef3',
    alignItems: 'center',

};
const promptInputPrefix = (
    <img
        src="../img/sparkling.svg"
        style={{ height: "16px" }}
        alt="Logo"
    />
);
const MainPage = ({ title, height }) => {

    const navigate = useNavigate();
    const chatBoxRef = useRef(null);


    const handleMethodListButtonClick = () => {
        // window.location.href = `${window.location.origin}${method.link}`;
        navigate("/method-list");
    };
    const handleChatBoxClick = () => {
        if (chatBoxRef.current) {
            console.log("scroll to chatbox")

          chatBoxRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      };
    return (
        <Layout style={layoutStyle}>
            <CustomHeader></CustomHeader>
            <Flex vertical={true} justify="space-between" align="center" style={{
                width: "100%"
            }}>
                {/* 首页主图 */}
                <div style={{
                    display: 'flex',
                    height: '780px',
                    width: "100%"

                }}>
                    <div style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: "128px",
                        gap: "128px",
                        position: "relative"
                    }}>
                        {/* 左侧内容 */}
                        <Title>利用大语言模型<br />探索学习设计方法</Title>
                        {/* <Space.Compact style={{ width: '100%' }}>
                            <Input prefix={promptInputPrefix} placeholder="Combine input and button" />
                            <Button type="primary"><ArrowUpOutlined></ArrowUpOutlined></Button>
                        </Space.Compact> */}
                        <Button type="primary" onClick={handleChatBoxClick}>
                            {/* <img src="../img/sparkling.svg" style={{ height: "16px", marginRight:"8px"}} alt="Logo" /> */}
                            开始提问
                            <ArrowRightOutlined></ArrowRightOutlined>
                        </Button>
                        <img
                            src="../img/100deco.svg"
                            style={{
                                height: "300px",
                                position: "absolute",
                                top: "200px"
                            }}
                            alt="Logo"
                        />
                    </div>
                    <div style={{
                        flex: 1,
                        backgroundImage: 'url("../img/banner.svg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'right',
                        height: "100%"
                    }}>
                        {/* 右侧背景图片 */}
                    </div>
                </div>

                {/* chatbox */}
                <Flex ref={chatBoxRef} vertical={true} style={{
                    // maxWidth: "1280px",
                    padding: "72px 128px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    
                }}>
                    <ChatBox  height={720} placeholder={"我想设计一个无人机，但是不知道如何设计一个合适的商业模式，我应该使用什么设计方法。"}>
                    </ChatBox>
                </Flex>
                {/* 探索设计创新方法 */}
                <Flex vertical={true} style={{
                    // maxWidth: "1280px",
                    padding: "72px 128px",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"

                }}>
                    <Title style={{
                        marginBottom: "32px"
                    }}>探索设计创新方法</Title>

                    <Flex style={{
                        gap: "24px",
                        width: "100%",

                    }}>
                        <PhaseCard
                            method_title="发现阶段(Discover)"
                            method_info="description"
                            method_list_link="/method-list#发现阶段(Discover)"
                            method_logo="../img/method1.svg"
                        />
                        <PhaseCard
                            method_title="定义阶段(Define)"
                            method_info="description"
                            method_list_link="/method-list#定义阶段(Define)"
                            method_logo="../img/method2.svg"
                        />
                    </Flex>
                    <Flex style={{
                        gap: "24px",
                        width: "100%"

                    }}>
                        <PhaseCard
                            method_title="开发阶段(Develop)"
                            method_info="description"
                            method_list_link="/method-list#开发阶段(Develop)"
                            method_logo="../img/method3.svg"
                        />
                        <PhaseCard
                            method_title="交付阶段(Deliver)"
                            method_info="description"
                            method_list_link="/method-list#交付阶段(Deliver)"
                            method_logo="../img/method4.svg"
                        />

                    </Flex>
                    <Button onClick={() => navigate("/method-list")} style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        borderRadius: "2px",
                        padding: "12px 40px",
                        height: "auto",
                        marginTop: "24px"

                    }}>查看全部 <ArrowRightOutlined /></Button>

                </Flex>

            </Flex>
            <CustomFooter></CustomFooter>
        </Layout>);
};

export default MainPage;