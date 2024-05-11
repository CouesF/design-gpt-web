import React from "react";
import { Flex } from 'antd';

// import zjulogo from '../../public/img/zjulogo.svg'

const footerStyle = {
    textAlign: 'center',
    color: '#111',
    height: 420,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
    width: "100%"
};
const footerTextStyle = {
    color:"#333",
    lineHeight: "24px"

}
const footerImageStyle = {
    width: "400px",
    height: "84px",
    marginBottom:"24px"
}


const CustomFooter = () => {
    return (
        <Flex vertical={true} justify="center" align="center" style={footerStyle}>
            <img
                src="../img/zjulogo.svg"
                style={footerImageStyle}
                alt="Logo"
            />
            
            <div style={footerTextStyle}>
                中国杭州浙江大学紫金港校区月牙楼303-403 310058
            </div>
            <div style={footerTextStyle}>
                邮箱：idi@zju.edu.cn
            </div>
            <div style={footerTextStyle}>
                电话：+86 571 88206978
            </div>
            <div style={footerTextStyle}>
                @Copyright 2024 IDI, Zhejiang University
            </div>


        </Flex>


    );
};

export default CustomFooter;
