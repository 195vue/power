// 96个15分钟时间标签
const timeLabels96 = Array.from({length: 96}, (_, i) => {
    const h = Math.floor(i / 4);
    const m = (i % 4) * 15;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});

let chartsInited = false;
let combinedChart, weekForecastChart;

// 查询按钮点击
document.getElementById('query-btn').addEventListener('click', function() {
    const dateStr = document.getElementById('forecast-date').value;
    updateSectionTitles(dateStr);
    if (!chartsInited) {
        showSections();
        initCharts();
        fillTables();
        chartsInited = true;
    }
});

function updateSectionTitles(dateStr) {
    const d = dateStr || '2026-05-26';
    document.getElementById('title-combined').textContent = '日前 & 实时现货价格预测对比（' + d + '）';
    document.getElementById('title-week-forecast').textContent = '未来 7 天现货价格预测（' + d + ' 起）单位：元/MWh';
}

function showSections() {
    document.getElementById('section-combined').style.display = 'block';
    document.getElementById('section-week-forecast').style.display = 'block';
}

function initCharts() {
    // 日前+实时现货价格预测对比图表（同96点/15分钟粒度，双线对比）
    combinedChart = echarts.init(document.getElementById('combined-chart'));
    const dayAheadLine = [285, 283.2, 281.5, 279.8, 278, 276.5, 275, 273.5, 272, 271.2, 270.5, 269.8, 269, 270.2, 271.5, 272.8, 274, 277, 280, 283, 286, 292.5, 299, 305.5, 312, 323.8, 335.5, 347.2, 359, 370, 381, 392, 403, 409.2, 415.5, 421.8, 428, 430, 432, 434, 436, 434.2, 432.5, 430.8, 429, 425.5, 422, 418.5, 415, 413.5, 412, 410.5, 409, 410, 411, 412, 413, 415.2, 417.5, 419.8, 422, 426, 430, 434, 438, 441.8, 445.5, 449.2, 453, 457.8, 462.5, 467.2, 472, 470.2, 468.5, 466.8, 465, 457.5, 450, 442.5, 435, 425.8, 416.5, 407.2, 398, 388, 378, 368, 358, 347.5, 337, 326.5, 316, 308.2, 300.5, 292.8];
    const realTimeLine = [290, 288.2, 286.5, 284.8, 283, 281.2, 279.5, 277.8, 276, 275.2, 274.5, 273.8, 273, 274.2, 275.5, 276.8, 278, 281, 284, 287, 290, 297, 304, 311, 318, 329.8, 341.5, 353.2, 365, 376.2, 387.5, 398.8, 410, 416.2, 422.5, 428.8, 435, 436.2, 437.5, 438.8, 440, 438.2, 436.5, 434.8, 433, 428.8, 424.5, 420.2, 416, 415.5, 415, 414.5, 414, 415, 416, 417, 418, 420, 422, 424, 426, 429.5, 433, 436.5, 440, 444.5, 449, 453.5, 458, 463, 468, 473, 478, 476, 474, 472, 470, 462, 454, 446, 438, 428, 418, 408, 398, 388.5, 379, 369.5, 360, 350, 340, 330, 320, 312.5, 305, 297.5];

    combinedChart.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['日前预测价格', '实时预测价格'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: '50', right: '20', bottom: '40', top: '45' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: timeLabels96,
            axisLabel: {
                color: '#999', fontSize: 11,
                formatter: function(v) { return v.endsWith(':00') ? v : ''; }
            }
        },
        yAxis: {
            type: 'value',
            name: '价格(元/MWh)',
            min: 250,
            max: 500,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        series: [{
            name: '日前预测价格',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: dayAheadLine,
            itemStyle: { color: '#2f6feb' },
            lineStyle: { width: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(47,111,235,0.2)' },
                        { offset: 1, color: 'rgba(47,111,235,0)' }
                    ]
                }
            }
        }, {
            name: '实时预测价格',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: realTimeLine,
            itemStyle: { color: '#17a34a' },
            lineStyle: { width: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(23,163,74,0.2)' },
                        { offset: 1, color: 'rgba(23,163,74,0)' }
                    ]
                }
            }
        }]
    });

    // 未来7天现货价格预测图表
    weekForecastChart = echarts.init(document.getElementById('week-forecast-chart'));
    const dates = ['04-01', '04-02', '04-03', '04-04', '04-05', '04-06', '04-07'];

    weekForecastChart.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['最高价', '最低价', '均价'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: '30', right: '15', bottom: '40', top: '50' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '价格(元/MWh)',
            min: 250,
            max: 500,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        series: [
            {
                name: '最高价',
                type: 'line',
                smooth: true,
                data: [475.3, 468.7, 459.2, 472.8, 481.5, 465.9, 458.3],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#dc2626' },
                lineStyle: { width: 2 }
            },
            {
                name: '最低价',
                type: 'line',
                smooth: true,
                data: [269.3, 265.1, 261.8, 268.5, 272.3, 263.7, 259.6],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#999' },
                lineStyle: { width: 2 }
            },
            {
                name: '均价',
                type: 'line',
                smooth: true,
                data: [382.6, 378.9, 372.4, 380.1, 386.7, 375.8, 369.2],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#2f6feb' },
                lineStyle: { width: 2 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(47,111,235,0.15)' },
                            { offset: 1, color: 'rgba(47,111,235,0)' }
                        ]
                    }
                }
            }
        ]
    });
}

function fillTables() {
    // 日前+实时合并表格数据（96行/15分钟）
    const dayAheadPrice96 = [286.5, 284.4, 282.4, 280.3, 278.2, 276.6, 275, 273.4, 271.8, 271.2, 270.6, 269.9, 269.3, 270.4, 271.4, 272.4, 273.5, 276.6, 279.6, 282.6, 285.7, 292.4, 299, 305.7, 312.4, 324, 335.6, 347.3, 358.9, 369.8, 380.8, 391.7, 402.6, 409, 415.4, 421.9, 428.3, 430.2, 432, 433.8, 435.7, 434, 432.4, 430.8, 429.1, 425.6, 422.2, 418.8, 415.3, 413.6, 412, 410.3, 408.6, 409.6, 410.7, 411.8, 412.8, 415, 417.2, 419.3, 421.5, 425.7, 429.8, 434, 438.2, 441.8, 445.4, 449.1, 452.7, 457.7, 462.8, 467.8, 472.8, 470.9, 469, 467.2, 465.3, 457.8, 450.2, 442.7, 435.2, 426, 416.8, 407.7, 398.5, 388.4, 378.4, 368.4, 358.3, 347.9, 337.6, 327.2, 316.8, 309.2, 301.6, 294.1];
    const dayAheadDev96 = [2.3, 2.3, 2.4, 2.4, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.7, 2.6, 2.6, 2.6, 2.5, 2.4, 2.4, 2.4, 2.3, 2.2, 2.2, 2.2, 2.2, 2.1, 2.1, 2, 2, 2, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.7, 1.7, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.6, 1.7, 1.8, 1.8, 1.8, 1.9, 2, 2, 2, 2.1, 2.2, 2.2, 2.2];
    const realTimePrice96 = [290.2, 288.5, 286.8, 285.2, 283.5, 281.8, 280.2, 278.5, 276.8, 275.9, 275, 274.1, 273.2, 274.5, 275.8, 277.1, 278.4, 281.4, 284.5, 287.6, 290.6, 297.5, 304.4, 311.3, 318.2, 329.9, 341.6, 353.4, 365.1, 376.4, 387.7, 399, 410.3, 416.6, 423, 429.3, 435.6, 436.8, 437.9, 439, 440.2, 438.5, 436.8, 435.2, 433.5, 429.3, 425.2, 421, 416.8, 416.2, 415.5, 414.8, 414.2, 415.3, 416.4, 417.4, 418.5, 420.4, 422.4, 424.4, 426.3, 429.9, 433.4, 437, 440.6, 445, 449.4, 453.8, 458.2, 463.3, 468.4, 473.4, 478.5, 476.4, 474.4, 472.4, 470.3, 462.4, 454.4, 446.4, 438.5, 428.5, 418.6, 408.6, 398.6, 389, 379.4, 369.8, 360.2, 350.3, 340.4, 330.4, 320.5, 312.9, 305.4, 297.8];
    const realTimeDev96 = [2.2, 2.2, 2.2, 2.3, 2.3, 2.3, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.4, 2.4, 2.4, 2.4, 2.3, 2.2, 2.2, 2.2, 2.2, 2.1, 2.1, 2, 2, 2, 1.9, 1.8, 1.8, 1.8, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.7, 1.7, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.6, 1.7, 1.8, 1.8, 1.8, 1.9, 2, 2, 2, 2.1, 2.1, 2.2, 2.2];

    const tableBody = document.getElementById('combined-table-body');
    for (let i = 0; i < 96; i++) {
        const h = Math.floor(i / 4);
        const m = (i % 4) * 15;
        const nextM = m + 15;
        const timeStr = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}-${String(nextM === 60 ? h + 1 : h).padStart(2,'0')}:${String(nextM === 60 ? 0 : nextM).padStart(2,'0')}`;
        const daPrice = dayAheadPrice96[i];
        const rtPrice = realTimePrice96[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${timeStr}</td><td>${daPrice.toFixed(1)}</td><td>[${(daPrice - 8).toFixed(1)}, ${(daPrice + 8).toFixed(1)}]</td><td>${dayAheadDev96[i].toFixed(1)}</td><td>${rtPrice.toFixed(1)}</td><td>[${(rtPrice - 9.5).toFixed(1)}, ${(rtPrice + 9.5).toFixed(1)}]</td><td>${realTimeDev96[i].toFixed(1)}</td>`;
        tableBody.appendChild(tr);
    }

    // 生成7天价格预测表格
    const weekForecastTableBody = document.getElementById('week-forecast-table-body');
    const weekData = [
        { date: '2026-04-01', high: 475.3, low: 269.3, avg: 382.6, volatility: 18.2 },
        { date: '2026-04-02', high: 468.7, low: 265.1, avg: 378.9, volatility: 17.9 },
        { date: '2026-04-03', high: 459.2, low: 261.8, avg: 372.4, volatility: 17.5 },
        { date: '2026-04-04', high: 472.8, low: 268.5, avg: 380.1, volatility: 18.0 },
        { date: '2026-04-05', high: 481.5, low: 272.3, avg: 386.7, volatility: 18.5 },
        { date: '2026-04-06', high: 465.9, low: 263.7, avg: 375.8, volatility: 17.7 },
        { date: '2026-04-07', high: 458.3, low: 259.6, avg: 369.2, volatility: 17.3 }
    ];
    weekData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.date}</td><td>${row.high}</td><td>${row.low}</td><td>${row.avg}</td><td>${row.volatility}</td>`;
        weekForecastTableBody.appendChild(tr);
    });
}

// 响应式调整
window.addEventListener('resize', () => {
    if (combinedChart) combinedChart.resize();
    if (weekForecastChart) weekForecastChart.resize();
});
