// 出力及价格曲线 - 双Y轴折线图
const outputPriceChart = echarts.init(document.getElementById('output-price-chart'));
outputPriceChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '65',
        right: '65',
        bottom: '40',
        top: '55'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        axisLabel: {
            color: '#999',
            fontSize: 11
        }
    },
    yAxis: [
        {
            type: 'value',
            name: '出力 (MW)',
            nameTextStyle: { color: '#91cc75', fontSize: 11, padding: [0, 0, 0, 4] },
            min: 0,
            max: 600,
            interval: 100,
            position: 'left',
            axisLabel: {
                color: '#999',
                fontSize: 11
            },
            splitLine: {
                lineStyle: {
                    color: '#f0f0f0'
                }
            }
        },
        {
            type: 'value',
            name: '价格 (元/MWh)',
            nameTextStyle: { color: '#5470c6', fontSize: 11, padding: [0, 4, 0, 0] },
            min: 0,
            max: 600,
            interval: 100,
            position: 'right',
            axisLabel: {
                color: '#999',
                fontSize: 11
            },
            splitLine: {
                show: false
            }
        }
    ],
    series: [
        {
            name: '出力',
            type: 'line',
            smooth: true,
            data: [320, 310, 300, 350, 420, 480, 520, 550, 530, 490, 450, 380],
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: { color: '#91cc75' },
            lineStyle: { width: 2 },
            yAxisIndex: 0
        },
        {
            name: '价格',
            type: 'line',
            smooth: true,
            data: [280, 265, 250, 315, 380, 450, 490, 520, 480, 420, 360, 310],
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 2 },
            yAxisIndex: 1
        }
    ]
});

// 收益曲线 - 面积图
const revenueChart = echarts.init(document.getElementById('revenue-chart'));
revenueChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '65',
        right: '45',
        bottom: '40',
        top: '55'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        axisLabel: {
            color: '#999',
            fontSize: 11
        }
    },
    yAxis: {
        type: 'value',
        name: '收益 (元)',
        nameTextStyle: { color: '#fac858', fontSize: 11, padding: [0, 0, 0, 4] },
        min: 0,
        max: 50,
        interval: 10,
        axisLabel: {
            color: '#999',
            fontSize: 11
        },
        splitLine: {
            lineStyle: {
                color: '#f0f0f0'
            }
        }
    },
    series: [
        {
            name: '收益',
            type: 'line',
            smooth: true,
            data: [12, 15, 18, 25, 32, 38, 45, 50, 46, 39, 30, 22],
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: { color: '#fac858' },
            lineStyle: { width: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(250, 200, 88, 0.4)' },
                        { offset: 1, color: 'rgba(250, 200, 88, 0.05)' }
                    ]
                }
            }
        }
    ]
});

// 响应式调整
window.addEventListener('resize', () => {
    outputPriceChart.resize();
    revenueChart.resize();
});
