// design-gpt-web/client/src/pages/MethodPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from 'antd';
import { Flex, Layout } from 'antd';
import { Anchor, Col, Row } from 'antd';
import { Affix, Button } from 'antd';
import {
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';

import ChatBox from '../components/ChatBox';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

const contentStyle = {
  minHeight: 120,
  color: '#fff',
  margin: '32px 64px',
};
const cardStyle = {
  textAlign: 'left',
  minHeight: 120,
  color: '#111',
  backgroundColor: '#fff',
  padding: '32px 32px',

};

const layoutStyle = {
  borderRadius: 0,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  backgroundColor: '#e8eef3',

};

const MethodPage = () => {
  const { id } = useParams();
  const [method, setMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMethodData = async () => {
      try {
        const response = await axios.get(`/api/method/${id}`);
        if (response.data.status === 'success') {
          setMethod(response.data.data);
        } else {
          console.error('Error fetching method data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching method data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMethodData();
  }, [id]);

  const handleBackButtonClicked = () => {
    navigate("/method-list");
  }

  if (isLoading || !method) {
    return (
      <Layout style={layoutStyle}>
        <CustomHeader></CustomHeader>
        <Row gutter={[24, 24]} justify="center" align="top" style={contentStyle}>
          <Col span={16}>
            <Flex vertical={true} gap="middle">


              <div style={cardStyle}>
                <Button type="link" style={{ padding: '0' }} onClick={handleBackButtonClicked}><ArrowLeftOutlined />返回</Button>


                <Title style={{ marginTop: "0" }}>Method Name</Title>

                <Title id="introduction" level={2}>简介与背景</Title>
                <Skeleton title={false} active paragraph={{ rows: 4, }} />
                <Title id="comparison" level={2}>相关方法比较与辨析</Title>
                <Skeleton title={false} active paragraph={{ rows: 4, }} />
                <Title id="workflow" level={2}>方法使用流程</Title>
                <Skeleton title={false} active paragraph={{ rows: 4, }} />
              </div>
              <div style={cardStyle}>
                <Flex justify='space-between' align='center'>
                  <Title id="methodprompt" level={2}>设计方法的提示词模板</Title>
                  {/* <Flex align='center'>
                    <CopyOutlined />
                    <div>复制</div>
                  </Flex> */}
                </Flex>
                <Skeleton title={false} active paragraph={{ rows: 4, }} />
                <Title id="userprompt" level={2}>提示词模板使用示例</Title>
                <Skeleton title={false} active paragraph={{ rows: 4, }} />
                <ChatBox height={400}></ChatBox>

              </div>
              <div style={cardStyle}>

                <Title id="resources" level={2}>相关学习资料</Title>
                <Skeleton title={false} active paragraph={{ rows: 4, }} />
              </div>

              <div style={cardStyle}>

                <Title level={2}>下一节</Title>
              </div>

            </Flex>

          </Col>
          <Col span={8}>
            <Affix offsetTop={96}>
              <div style={cardStyle}>
                <Anchor
                  affix={false}
                  items={[
                    {
                      key: 'introduction',
                      href: '#introduction',
                      title: '简介与背景',
                    },
                    {
                      key: 'comparison',
                      href: '#comparison',
                      title: '比较与辨析',
                    },
                    {
                      key: 'workflow',
                      href: '#workflow',
                      title: '方法使用流程',
                    },
                    {
                      key: 'methodprompt',
                      href: '#methodprompt',
                      title: '设计方法提示词模板',
                    },
                    {
                      key: 'userprompt',
                      href: '#userprompt',
                      title: '提示词模板使用示例',
                    },
                    {
                      key: 'resources',
                      href: '#resources',
                      title: '相关学习资料',
                    },
                  ]}
                />
              </div>
            </Affix>
          </Col>
        </Row>
        <CustomFooter></CustomFooter>
      </Layout>);
  }
  else if (false) {
    return (
      <div>
        <h1><Skeleton /></h1>
        <Title>Brief Introduction</Title>
        <Skeleton />
        <Title>Design Phase</Title>
        <Skeleton />
        <Title>Method Introduction</Title>
        <Skeleton />
        <Title>Comparison</Title>
        <Skeleton />
        <Title>Usage Process</Title>
        <Skeleton />
        <Title>Prompt Template</Title>
        <Skeleton />
        <Title>User Input Example</Title>
        <Skeleton />
        <Title>Learning Materials</Title>
        <Skeleton />
        <Title>Difficulty Level</Title>
        <Skeleton />
        <ChatBox height={400}></ChatBox>

      </div>);
  }
  else {
    return (
      <div>
        <Title>{method.englishName} ({method.chineseName})</Title>
        <Title level={2}>Brief Introduction</Title>
        <p>{method.briefIntroduction}</p>
        <Title level={2}>Design Phase</Title>
        <p>{method.designPhase}</p>
        <Title level={2}>Method Introduction</Title>
        <p>{method.methodIntroduction}</p>
        <Title level={2}>Comparison</Title>
        <p>{method.comparison}</p>
        <Title level={2}>Usage Process</Title>
        <p>{method.usageProcess}</p>
        <Title level={2}>Prompt Template</Title>
        <p>{method.promptTemplate}</p>
        <Title level={2}>User Input Example</Title>
        <p>{method.userInputExample}</p>
        <Title level={2}>Learning Materials</Title>
        <p>{method.learningMaterials}</p>
        <Title level={2}>Difficulty Level</Title>
        <p>{method.difficultyLevel}</p>
        <ChatBox height={400}></ChatBox>
      </div>
    );
  }
};

export default MethodPage;
