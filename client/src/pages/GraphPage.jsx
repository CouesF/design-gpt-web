// import Header from '../components/Header';
import React from 'react';
import MainGraph from '../components/MainGraph';
import { graphData } from '../assets/graphData';  // 确保路径正确

// import parseGraphData from '../services/parseGraphData';

const GraphPage = () => {
    //const data = parseGraphData(); // 解析 Excel 数据

    return (
        <div style={{ height: '100%', width: '100%', position: 'absolute', left: '0', top: '0' }}>
            <MainGraph data={graphData} />
        </div>
    );
};

export default GraphPage;
