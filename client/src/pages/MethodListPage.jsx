// design-gpt-web/client/src/pages/MethodListPage.jsx
import React, { useState, useEffect } from 'react';
import { graphData } from '../assets/graphData';
import { Anchor } from 'antd';
import { Flex, Layout, Col, Row } from 'antd';

import { Input, Affix, Button, Card } from 'antd';
import CustomHeader from '../components/CustomHeader';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

const { Link } = Anchor;
const cardStyle = {
  textAlign: 'left',
  minHeight: 120,
  color: '#111',
  backgroundColor: '#fff',
  padding: '32px 32px',

};
const methodCardStyle = {
  textAlign: 'left',
  minHeight: 96,
  color: '#111',
  backgroundColor: '#fff',
  padding: '16px 32px',
  marginBottom: '24px'
};
const contentStyle = {
  minHeight: 120,
  color: '#fff',
  margin: '32px 64px',
};
const layoutStyle = {
  borderRadius: 0,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  backgroundColor: '#e8eef3',

};
const MethodListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredMethods, setFilteredMethods] = useState([]);
  const [methodsByPhase, setMethodsByPhase] = useState({});
  const navigate = useNavigate();

  const handleMethodCardClick = (method) => {
    navigate(`/${method.link}`);
  };
  useEffect(() => {
    // 将方法按照阶段分类
    const groupedMethods = groupMethodsByPhase(graphData.nodes);
    setMethodsByPhase(groupedMethods);
  }, []);

  // 将方法按照阶段分类
  const groupMethodsByPhase = (methods) => {
    const groupedMethods = {};
    console.log(methods)

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
  const searchMethods = (keyword, methods) => {
    const lowercaseKeyword = keyword.toLowerCase();


    methods = [].concat(...Object.values(methodsByPhase));
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
    } else {
      const filtered = searchMethods(keyword);
      setFilteredMethods(filtered);
    }
  };

  const renderMethodCards = (methods) => {
    return methods.map((method) => (
      <Card hoverable={true} onClick={() => handleMethodCardClick(method)}>
        <Title level={3} style={{ marginTop: "0" }}>{method.style.label.value}</Title>
        <div>{method.description}</div>
        <div>{method.link}</div>
      </Card>

    ));
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
              />
              <Anchor affix={false}>
                {Object.keys(methodsByPhase).map((phase) => (
                  <Link key={phase} href={`#${phase}`} title={phase} />
                ))}
              </Anchor>
            </div>
          </Affix>


        </Col>
        <Col span={16}>
          <Flex vertical={true} gap="middle">
            {filteredMethods.length > 0 ? (
              renderMethodCards(filteredMethods)
            ) : (
              Object.entries(methodsByPhase).map(([phase, methods]) => (
                <div key={phase}>
                  <Title level={3} style={{color:'#111'}} id={phase}>{phase}</Title>
                  {renderMethodCards(methods)}
                </div>
              ))
            )}

          </Flex>

        </Col>
      </Row>
    </Layout>);
};

export default MethodListPage;
