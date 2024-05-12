import React from "react";
import { Flex } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;



const PhaseCard = ({method_title, method_info, method_list_link, method_logo}) =>
{
    const navigate = useNavigate();

    const handlePhaseCardClick = () => {
        console.log(`${window.location.origin}${method_list_link}`)
        // window.location.href = `${window.location.origin}${method.link}`;
        navigate(method_list_link);
      };
    return (
        <Flex 
        onClick={() => handlePhaseCardClick()}
        style={{
            textAlign: 'left',
            minHeight: 96,
            minWidth: 300,
            justifyContent: "space-between",
            color: '#111',
            backgroundColor: '#fff',
            padding: '32px',
            marginBottom: '16px',
            borderRadius: '2px',
            cursor: 'pointer',
            width:"100%"
        }}>
                <Flex vertical={true}>
                    <Title
                    level={3}
                    style={{
                        marginTop:"0px"
                    }}
                    >{method_title}</Title>
                    <div>{method_info}</div>
                    {/* <a className={styles.method_box_text_link} href={method_list_link}>
                        查看更多
                        <IconLaunch style={{fontSize: '23px'}}/>
                    </a> */}

                </Flex>

                <img
                    src={method_logo}
                    style={{
                        height:"96px",
                    }}
                />
        </Flex>
    );
}

export default PhaseCard;