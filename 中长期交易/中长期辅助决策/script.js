// 中长期余量分析 - 堆叠面积图 + 参考线
const volumeAnalysisChart = echarts.init(document.getElementById('volume-analysis-chart'));
const hours = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00',
               '11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00',
               '21:00','22:00','23:00','24:00'];

// 各交易类型电量数据 (堆叠)
const nianDu =   [34,32,30,28,30,32,34,38,40,42,41,38,36,34,32,30,28,26,24,23,24,26,28,30];
const duoYue =   [20,19,18,17,18,19,20,22,24,25,24,22,21,20,19,18,17,16,15,14,14,15,17,18];
const yueDu =    [12,11,10, 9, 9,10,12,14,15,16,15,14,13,12,11,10, 9, 8, 8, 7, 7, 8, 9,10];
const yueNei =   [ 7, 6, 6, 5, 5, 6, 7, 8, 9,10, 9, 8, 7, 7, 6, 6, 5, 5, 4, 4, 4, 5, 5, 6];
const riGunDong =[ 4, 4, 4, 3, 3, 4, 4, 5, 5, 6, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4];

// 计算堆叠总和
const stackSum = nianDu.map((_, i) => nianDu[i] + duoYue[i] + yueDu[i] + yueNei[i] + riGunDong[i]);

volumeAnalysisChart.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
    },
    legend: {
        data: ['年度', '多月', '月度', '月内', '日滚动', '预测基准线', '总合同量', '剩余交易量'],
        top: 0,
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
            fontSize: 11
        }
    },
    grid: {
        left: '45',
        right: '20',
        bottom: '40',
        top: '55'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hours
    },
    yAxis: {
        type: 'value',
        name: '电量 (MWh)',
        nameLocation: 'middle',
        nameGap: 35,
        min: 0
    },
    series: [
        {
            name: '年度',
            type: 'line',
            smooth: true,
            stack: 'trade',
            areaStyle: {},
            emphasis: { focus: 'series' },
            data: nianDu,
            symbol: 'none',
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 1 }
        },
        {
            name: '多月',
            type: 'line',
            smooth: true,
            stack: 'trade',
            areaStyle: {},
            emphasis: { focus: 'series' },
            data: duoYue,
            symbol: 'none',
            itemStyle: { color: '#91cc75' },
            lineStyle: { width: 1 }
        },
        {
            name: '月度',
            type: 'line',
            smooth: true,
            stack: 'trade',
            areaStyle: {},
            emphasis: { focus: 'series' },
            data: yueDu,
            symbol: 'none',
            itemStyle: { color: '#73c0de' },
            lineStyle: { width: 1 }
        },
        {
            name: '月内',
            type: 'line',
            smooth: true,
            stack: 'trade',
            areaStyle: {},
            emphasis: { focus: 'series' },
            data: yueNei,
            symbol: 'none',
            itemStyle: { color: '#fc8452' },
            lineStyle: { width: 1 }
        },
        {
            name: '日滚动',
            type: 'line',
            smooth: true,
            stack: 'trade',
            areaStyle: {},
            emphasis: { focus: 'series' },
            data: riGunDong,
            symbol: 'none',
            itemStyle: { color: '#9a60b4' },
            lineStyle: { width: 1 }
        },
        {
            name: '预测基准线',
            type: 'line',
            smooth: true,
            data: [88,86,84,82,83,85,87,90,92,94,95,93,91,89,88,87,86,85,84,83,84,86,88,90],
            symbol: 'diamond',
            symbolSize: 4,
            itemStyle: { color: '#dc2626' },
            lineStyle: { width: 2, type: 'dashed' }
        },
        {
            name: '剩余交易量',
            type: 'line',
            smooth: true,
            data: stackSum.map(s => Math.max(100 - s, 0)),
            symbol: 'none',
            itemStyle: { color: '#ea7ccc' },
            lineStyle: { width: 2, type: 'dotted' }
        },
        {
            name: '总合同量',
            type: 'line',
            smooth: true,
            data: Array(24).fill(100),
            symbol: 'none',
            itemStyle: { color: '#fac858' },
            lineStyle: { width: 2 }
        }
    ]
});

// 价格策略分析 - 折线图
const priceStrategyChart = echarts.init(document.getElementById('price-strategy-chart'));
priceStrategyChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['日滚动', '年度', '多月', '月度', '月内', '日滚动-平均数'],
        top: 0,
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
            fontSize: 11
        }
    },
    grid: {
        left: '30',
        right: '12',
        bottom: '40',
        top: '40'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
               '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
               '21:00', '22:00', '23:00', '24:00']
    },
    yAxis: {
        type: 'value',
        name: '价格 (元/MWh)',
        min: 0
    },
    series: [
        {
            name: '日滚动',
            type: 'line',
            smooth: true,
            data: [342, 335, 328, 325, 330, 345, 368, 395, 412, 420, 418, 405, 390, 378, 365, 355, 348, 340, 335, 332, 338, 348, 355, 350],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 2 }
        },
        {
            name: '年度',
            type: 'line',
            smooth: true,
            data: [310, 305, 298, 295, 300, 312, 330, 352, 368, 375, 372, 360, 348, 338, 325, 318, 312, 305, 300, 298, 302, 310, 318, 315],
            symbol: 'diamond',
            symbolSize: 3,
            itemStyle: { color: '#91cc75' },
            lineStyle: { width: 1.5, type: 'dashed' }
        },
        {
            name: '多月',
            type: 'line',
            smooth: true,
            data: [320, 315, 308, 305, 310, 322, 340, 362, 378, 385, 382, 370, 358, 348, 335, 328, 322, 315, 310, 308, 312, 320, 328, 325],
            symbol: 'triangle',
            symbolSize: 3,
            itemStyle: { color: '#73c0de' },
            lineStyle: { width: 1.5, type: 'dashed' }
        },
        {
            name: '月度',
            type: 'line',
            smooth: true,
            data: [332, 325, 318, 315, 320, 335, 358, 385, 402, 410, 408, 395, 380, 368, 355, 345, 338, 330, 325, 322, 328, 338, 345, 340],
            symbol: 'rect',
            symbolSize: 3,
            itemStyle: { color: '#fc8452' },
            lineStyle: { width: 1.5, type: 'dashed' }
        },
        {
            name: '月内',
            type: 'line',
            smooth: true,
            data: [338, 330, 322, 320, 325, 340, 365, 392, 408, 416, 414, 400, 386, 374, 360, 350, 344, 336, 330, 328, 334, 344, 350, 346],
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: { color: '#9a60b4' },
            lineStyle: { width: 1.5, type: 'dashed' }
        },
        {
            name: '日滚动-平均数',
            type: 'line',
            smooth: true,
            data: Array(24).fill(345),
            symbol: 'none',
            itemStyle: { color: '#dc2626' },
            lineStyle: { width: 2, type: 'dotted' }
        }
    ]
});

// 生成策略表格数据
const strategyTableBody = document.getElementById('strategy-table-body');
const strategyHours = Array.from({length: 23}, (_, i) => `${i + 1}时`);

strategyHours.forEach(hour => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${hour}</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>日滚动</td>
    `;
    strategyTableBody.appendChild(row);
});

// 生成收益表格数据
const revenueTableBody = document.getElementById('revenue-table-body');
const revenueHours = Array.from({length: 24}, (_, i) => `${i + 1}时`);

revenueHours.forEach(hour => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${hour}</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
    `;
    revenueTableBody.appendChild(row);
});

// 响应式调整
window.addEventListener('resize', () => {
    volumeAnalysisChart.resize();
    priceStrategyChart.resize();
});
