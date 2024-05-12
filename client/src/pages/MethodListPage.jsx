// design-gpt-web/client/src/pages/MethodListPage.jsx
import React, { useState, useEffect } from 'react';
import { graphData } from '../assets/graphData';
import { Anchor } from 'antd';
import { Flex, Layout, Col, Row, Skeleton } from 'antd';

import { Input, Affix, Button } from 'antd';
import CustomHeader from '../components/CustomHeader';
import CustomFooter from '../components/CustomFooter';

import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
const cardStyle = {
  textAlign: 'left',
  minHeight: 120,
  minWidth: "240px",
  color: '#111',
  backgroundColor: '#fff',
  padding: '32px 32px',
  borderRadius: '2px',

};
const methodCardStyle = {
  textAlign: 'left',
  minHeight: 96,
  color: '#111',
  backgroundColor: '#fff',
  padding: '24px 32px',
  marginBottom: '16px',
  borderRadius: '2px',
  cursor: 'pointer'

};
const contentStyle = {
  minHeight: "120px",
  color: '#fff',
  margin: '32px 64px',
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
const MethodListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredMethods, setFilteredMethods] = useState([]);
  const [methodsByPhase, setMethodsByPhase] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleMethodCardClick = (method) => {
    console.log(`${window.location.origin}${method.link}`)
    // window.location.href = `${window.location.origin}${method.link}`;
    navigate(method.link);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    // 将方法按照阶段分类
    const groupedMethods = groupMethodsByPhase(graphData.nodes);
    setMethodsByPhase(groupedMethods);
    setLoading(false);
  
    if (searchParam) {
      setSearchKeyword(decodeURIComponent(searchParam));
      const filtered = searchMethods(decodeURIComponent(searchParam), groupedMethods);
      setFilteredMethods(filtered);
    }
  }, []);


  // 将方法按照阶段分类
  const groupMethodsByPhase = (methods) => {
    const groupedMethods = {};
    methods.forEach((method) => {
      const { phase } = method;
      if (!groupedMethods[phase]) {
        groupedMethods[phase] = [];
      }
      groupedMethods[phase].push(method);
    });

    // 对每个阶段的方法进行排序（这里按照方法名称排序）
    Object.values(groupedMethods).forEach((phaseMethods) => {
      phaseMethods.sort((a, b) => a.style.label.value.localeCompare(b.style.label.value));
    });

    return groupedMethods;
  };


  // 搜索方法
  const searchMethods = (keyword, methodsByPhase) => {
    if (!methodsByPhase) {
      console.error('Error: methodsByPhase is undefined or null!');
      return [];
    }
    const lowercaseKeyword = keyword.toLowerCase();


    // methods = [].concat(...Object.values(methodsByPhase));


    const methods = [].concat(...Object.values(methodsByPhase));
    
    console.log(methods);
    console.log(methodsByPhase);

    const filteredMethods = methods.filter((method) => {
      const { label } = method.style;
      const { description } = method;
      const lowercaseLabel = label.value.toLowerCase();
      const lowercaseDescription = description.toLowerCase();
      
      return (
        lowercaseLabel.includes(lowercaseKeyword) ||
        lowercaseDescription.includes(lowercaseKeyword)
      );
    });
  
    return filteredMethods;
  };


  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    if (keyword.trim() === '') {
      setFilteredMethods([]);
      navigate('/method-list');
    } else {
      const filtered = searchMethods(keyword,methodsByPhase);
      setFilteredMethods(filtered);
      navigate(`/method-list?search=${encodeURIComponent(keyword)}`);
    }
  };

  const renderMethodCards = (methods) => {
    return methods.map((method) => (
      <div style={methodCardStyle} onClick={() => handleMethodCardClick(method)} key={method.id} >
        <Title level={3} style={{ marginTop: "0" }}>{method.style.label.value}<Button type="link" style={{ padding: '0' }}><ArrowRightOutlined rotate={-45} /></Button>
        </Title>
        <div>{method.description}</div>
        {/* <div>{method.link}</div> */}
      </div>

    ));
  };
  const renderSkeletonCards = () => {
    const skeletonCards = [];
    for (let i = 0; i < 10; i++) {
      skeletonCards.push(
        <div style={methodCardStyle} key={i}>
          <Title level={3} style={{ marginTop: "0" }}>...</Title>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      );
    }
    return skeletonCards;
  };

  return (
    <Layout style={layoutStyle}>
      <CustomHeader></CustomHeader>
      <Row gutter={[24, 24]} justify="center" align="top" style={contentStyle}>
        <Col span={8}>
          <Affix offsetTop={96}>

            <div style={cardStyle}>
              <Input.Search
                placeholder="搜索方法"
                value={searchKeyword}
                onChange={handleSearch}
                allowClear
                style={{
                  marginBottom: "16px"
                }}
              />
              <Anchor
                affix={false}
                items={Object.entries(methodsByPhase).map(([phase, methods]) => ({
                  key: phase,
                  href: `#${phase}`,
                  title: phase,
                }))}
              />

            </div>
          </Affix>
        </Col>
        <Col span={16}>
          <Flex vertical={true} gap="middle">
            {loading ? (
              <div key="phase" id="phase">
                <Title level={3} style={{ color: '#111' }} id="phase">阶段</Title>
                {renderSkeletonCards()}
              </div>
            ) : filteredMethods.length > 0 ? (
              renderMethodCards(filteredMethods)
            ) : (
              Object.entries(methodsByPhase).map(([phase, methods]) => (
                <div key={phase} id={phase}>
                  <Title level={3} style={{ color: '#111' }} id={phase}>{phase}</Title>
                  {renderMethodCards(methods)}
                </div>
              ))
            )}
          </Flex>

        </Col>
      </Row>
      <CustomFooter></CustomFooter>
    </Layout>);
};

export default MethodListPage;
