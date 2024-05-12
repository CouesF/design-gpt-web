import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SearchOutlined,
} from '@ant-design/icons';
import { Flex } from 'antd';
import { Input, Space } from 'antd';



const { Search } = Input;

const headerStyle = {
    textAlign: 'center',
    color: '#111',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
    width: "100%",
    boxShadow: "0px 0px 12px 0px #0965F427",
    zIndex: 2
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
    const [keyword, setKeyword] = useState('');

    // const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    const handleSearch = (value, _e, info) => {
        console.log(info?.source, value);
        navigate(`/method-list?search=${encodeURIComponent(value)}`);
      };
    return (
        <Flex justify="space-between" align="center" style={headerStyle}>
            <Flex justify="space-aroud" align="center" gap={24}>
                <img
                    src="../img/designlogo.svg"
                    style={headerImageStyle}
                    alt="Logo"
                />
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
                <Space.Compact style={{ width: '100%' }}>
                    <Search placeholder="Brainstorm" allowClear onSearch={handleSearch} style={{ width: 200 }} />

                    {/* <Input  placeholder="Brainstorm" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                    <Button type="link" onClick={handleSearch}><SearchOutlined /></Button> */}
                </Space.Compact>
            </Flex>
        </Flex>


    );
};

export default CustomHeader;
