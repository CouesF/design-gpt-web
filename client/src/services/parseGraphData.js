import * as XLSX from 'xlsx';

const parseGraphData = () => {
    // 获取 Excel 文件内容
    const workbook = XLSX.readFile('./src/assets/graph-data.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // 将 Excel 表数据解析成 JavaScript 对象
    const data = XLSX.utils.sheet_to_json(sheet);

    // 处理数据，将其转换为 Graphin 所需的 `nodes` 和 `edges` 结构
    const nodes = data.map((item, index) => ({
        id: `node-${index}`,
        label: item['Label'] || `Node ${index}`,
    }));

    const edges = data.map((item, index) => ({
        source: `node-${item['Source']}`,
        target: `node-${item['Target']}`,
    }));

    return { nodes, edges };
};

export default parseGraphData;
