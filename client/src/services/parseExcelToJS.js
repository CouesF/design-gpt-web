const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 设置文件路径
const EXCEL_PATH = path.resolve(__dirname, '../assets/graph-data.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '../assets/graphData.js');

/**
 * Excel数据要求：
 * A列 - 方法英文名称
 * B列 - 方法中文名称（如果没有为"-"）
 * C列 - 方法输入类型（可能多行，一行代表一个类型）
 * D列 - 方法输出类型（可能多行，一行代表一个类型）
 * E列 - 方法的一句话简要描述
 * F列 - 方法的超链接
 * G列 - 方法阶段
 */
const parseExcelToJS = () => {
    // 读取 Excel 文件
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // 处理数据，创建 nodes 和 edges
    const nodes = [];
    const edges = [];
    const typeMap = {};

    // 跳过标题行，从第二行开始
    data.slice(1).forEach((row, index) => {
        if (row.length === 0) return;

        // 创建 node
        const nodeId = `node-${index}`;
        const node = {
            id: nodeId,
            style: {
                label: {
                    value: row[0] || 'Unnamed Method', // A列
                    fontSize: 8
                },
                keyshape:{
                    size: 16,
                    fill: '#EBF0F5',
                    fillOpacity: 0.2,
                    stroke: '#0965F4',

                }
            },
            description: row[4], // E列
            link: row[5], // F列
            inputs: row[2] ? row[2].split('\n') : [], // C列
            outputs: row[3] ? row[3].split('\n') : [], // D列
            phase: row[6] // G列
        };
        nodes.push(node);

        // 为输入输出类型建立映射
        node.inputs.forEach(inputType => {
            typeMap[inputType] = typeMap[inputType] || [];
            typeMap[inputType].push({ node: nodeId, type: 'input' });
        });
        node.outputs.forEach(outputType => {
            typeMap[outputType] = typeMap[outputType] || [];
            typeMap[outputType].push({ node: nodeId, type: 'output' });
        });
    });

    // 创建 edges
    Object.keys(typeMap).forEach(type => {
        const items = typeMap[type];
        const inputs = items.filter(item => item.type === 'input');
        const outputs = items.filter(item => item.type === 'output');

        outputs.forEach(output => {
            inputs.forEach(input => {
                if (output.node !== input.node) { // 避免自连接
                    edges.push({
                        source: output.node,
                        target: input.node,
                        style:{
                            // label: {
                            //     value: type,
                            //     fontSize: 6,

                            // },
                            // halo: {
                            //     fill: '#ddd',
                            //     visible: false
                            // },
                            keyshape: {
                                
                                lineDash: [8, 4],
                                lineWidth: 1,
                              },
                              animate: {
                                type: 'line-dash',
                                repeat: true,
                              },
                            
                        },
                        
                    });
                }
            });
        });
    });

    const graphData = { nodes, edges };

    // 将解析后的数据写入 JavaScript 文件
    fs.writeFileSync(OUTPUT_PATH, `export const graphData = ${JSON.stringify(graphData, null, 2)};`);
    console.log('Graph data has been parsed and written successfully.');
};

parseExcelToJS();
