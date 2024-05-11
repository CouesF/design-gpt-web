// design-gpt-web/client/src/pages/MainPage.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Message } from 'antd';
import MainGraph from '../components/MainGraph';
import { graphData } from '../assets/graphData';  // 确保路径正确
import ChatBox from '../components/ChatBox';


import Cookies from "js-cookie";
import axios from 'axios';

const MainPage = ({ title, height }) => {

    return (
        <div style={{ width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
            <div style={{ alignSelf: 'stretch', height: 98, justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                <div style={{ width: 586, alignSelf: 'stretch', paddingLeft: 36, paddingRight: 36, border: '1px black solid', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                    <div style={{ width: 131, height: 45, color: 'black', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>LOGO</div>
                    <div style={{ color: 'black', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>首页</div>
                    <div style={{ color: 'black', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>方法列表</div>
                </div>
                <div style={{ width: 627, alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, border: '1px black solid', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                    <div style={{ alignSelf: 'stretch', height: 41, borderRadius: 31, border: '1px black solid', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                        <div style={{ flex: '1 1 0', alignSelf: 'stretch', color: 'black', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>啊啊啊</div>
                        <div style={{ width: 45, alignSelf: 'stretch', background: '#D9D9D9' }} />
                    </div>
                </div>
            </div>
            <div style={{ alignSelf: 'stretch', height: 872, background: '#EFEFEF', border: '1px black solid', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                <div style={{ width: 531, alignSelf: 'stretch', border: '1px black solid' }} />
                <div style={{ width: 531, alignSelf: 'stretch', border: '1px black solid' }} />
            </div>
            <div style={{ alignSelf: 'stretch', height: 872, paddingLeft: 96, paddingRight: 96, paddingTop: 48, paddingBottom: 48, background: '#F6F6F6', border: '1px black solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
                <div style={{ border: '1px black solid', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                    <div style={{ color: 'black', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>探索设计方法</div>
                </div>
                <div style={{ width: 1166, flex: '1 1 0', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
                    <div style={{ width: 699, alignSelf: 'stretch', border: '1px black solid' }}>
                        <MainGraph data={graphData} />
                    </div>

                    <div style={{ flex: '1 1 0', alignSelf: 'stretch', border: '1px black solid' }}>
                        <ChatBox height={400}></ChatBox>

                    </div>
                </div>
            </div>
            <div style={{ alignSelf: 'stretch', height: 606 }} />
        </div>

    );
}
export default MainPage;