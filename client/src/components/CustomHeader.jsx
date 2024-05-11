import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from 'antd';
const headerStyle = {
    textAlign: 'center',
    color: '#111',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
    width: "100%"
};
const headerImageStyle = {
  height: "36px",
}
const headerLinkStyle = {
    cursor: 'pointer',
    minWidth: '72px',
    fontSize: '16px'

};
const headerLinkHoverStyle = {
    color: '#0965F4',
    // boxShadow: '0 0 10px #0965F4',
    cursor: 'pointer',
    minWidth: '72px',
    fontSize: '16px',
    boxShadow: 'inset 0 -4px 0 0 #0965F4', // 添加一个内部阴影


};

const CustomHeader = () => {
    const navigate = useNavigate();
    const [homeHover, setHomeHover] = useState(false);
    const [methodListHover, setMethodListHover] = useState(false);

    return (
        <Flex justify="space-between" align="center" style={headerStyle}>
            <Flex justify="space-aroud" align="center">
                <img
                    src="../img/designlogo.svg"
                    style={headerImageStyle}
                    alt="Logo"
                />
                <div>|</div>
                <div 
                    style={homeHover ? headerLinkHoverStyle : headerLinkStyle} 
                    onMouseEnter={() => setHomeHover(true)} 
                    onMouseLeave={() => setHomeHover(false)} 
                    onClick={() => navigate('/')}
                >
                    首页
                </div>
                <div 
                    style={methodListHover ? headerLinkHoverStyle : headerLinkStyle} 
                    onMouseEnter={() => setMethodListHover(true)} 
                    onMouseLeave={() => setMethodListHover(false)} 
                    onClick={() => navigate('/method-list')}
                >
                    方法列表
                </div>

            </Flex>
            <Flex >
                <Flex justify="space-between" align="center">
                    text input
                </Flex>
                <Flex>
                    search icon
                </Flex>
            </Flex>
        </Flex>


    );
};

export default CustomHeader;
