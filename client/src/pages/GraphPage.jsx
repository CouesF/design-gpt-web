// import Header from '../components/Header';
import React from 'react';
import MainGraph from '../components/MainGraph';
import Sider from '../components/Sider';
import { graphData } from '../assets/graphData';  // 确保路径正确

// import parseGraphData from '../services/parseGraphData';

const GraphPage = () => {
    //const data = parseGraphData(); // 解析 Excel 数据

    return (
        <div style={{ height: '100%', width: '100%', position: 'absolute', left: '0', top: '0' }}>
            {/* <Header /> */}
            graph page
            <MainGraph data={graphData} />
            {/* <Sider /> */}
        </div>
    );
};

export default GraphPage;
