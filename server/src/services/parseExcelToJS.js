const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 设置文件路径
const EXCEL_PATH = path.resolve(__dirname, '../../data/methods-data.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '../../data/methodsData.js');

const parseExcelToJS = () => {
    // 读取 Excel 文件
    const workbook = XLSX.readFile(EXCEL_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // 处理数据，创建 nodes 和 edges
    const methods = [];
    const typeMap = {};

    // 跳过标题行，从第二行开始
    data.slice(1).forEach((row, index) => {
        if (row.length === 0) return;

        
        const method = {
            methodId: row[0], // method-id列
            englishName: row[1], // 英文名列
            chineseName: row[2], // 中文名列
            methodInputs: row[3] ? row[3].split('\n') : [], // 方法输入内容列
            methodOutputs: row[4] ? row[4].split('\n') : [], // 方法输出内容列
            briefIntroduction: row[5], // 一句话介绍列
            designPhase: row[7], // 设计阶段-双钻模型列
            methodIntroduction: row[8], // 方法介绍列
            comparison: row[9], // 比较辨析列
            usageProcess: row[10], // 使用流程列
            promptTemplate: row[11], // 设计产出的prompt模板列
            userInputExample: row[12], // 用户输入示例列
            learningMaterials: row[13], // 学习资料列
            difficultyLevel: row[14] // 应用难度列
        };
        methods.push(method);
    });

    const methodsData = { methods };

    // 将解析后的数据写入 JavaScript 文件
    fs.writeFileSync(OUTPUT_PATH, `module.exports = ${JSON.stringify(methodsData, null, 2)};`);
    console.log('methods data has been parsed and written successfully.');
};

parseExcelToJS();
