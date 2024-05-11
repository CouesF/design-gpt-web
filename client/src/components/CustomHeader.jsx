import React from 'react';
import { Flex, Layout } from 'antd';
const headerStyle = {
    textAlign: 'center',
    color: '#111',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
};

const CustomHeader = () => {
    return (
        <Flex justify="space-between" align="center" style={headerStyle}>
            <Flex justify="space-aroud" align="center">
                <div>icon</div>
                <div>|</div>
                <div>首页</div>
                <div>方法列表</div>

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
