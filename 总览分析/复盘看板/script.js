// 初始化图表
document.addEventListener('DOMContentLoaded', function() {
    initTradingVolumeChart();
    initPriceChart();
});

// 当日交易电量曲线
function initTradingVolumeChart() {
    const chartDom = document.getElementById('trading-volume-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const hours = ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'];
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['实际执行电量', '日前出清电量(预测)'],
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '40',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: hours
        },
        yAxis: {
            type: 'value',
            name: '电量 (MWh)',
            max: 20
        },
        series: [
            {
                name: '实际执行电量',
                type: 'line',
                smooth: true,
                data: [7, 11.5, 10.5, 14.5, 13, 15.5, 11],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#2f6feb'
                },
                lineStyle: {
                    width: 2
                }
            },
            {
                name: '日前出清电量(预测)',
                type: 'line',
                smooth: true,
                data: [8, 9.5, 9, 12.5, 11.5, 13.5, 10],
                symbol: 'none',
                itemStyle: {
                    color: '#17a34a'
                },
                lineStyle: {
                    width: 2,
                    type: 'dashed'
                }
            }
        ]
    };
    myChart.setOption(option);
}

// 电价曲线
function initPriceChart() {
    const chartDom = document.getElementById('price-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const hours = ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'];
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['实际出清电价', '日前出清电价(预测)'],
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '40',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: hours
        },
        yAxis: {
            type: 'value',
            name: '电价 (元/MWh)',
            min: 150,
            max: 600
        },
        series: [
            {
                name: '实际出清电价',
                type: 'line',
                smooth: true,
                data: [350, 420, 400, 460, 440, 470, 400],
                symbol: 'none',
                itemStyle: {
                    color: '#eab308'
                },
                lineStyle: {
                    width: 2
                }
            },
            {
                name: '日前出清电价(预测)',
                type: 'line',
                smooth: true,
                data: [310, 340, 320, 380, 360, 410, 350],
                symbol: 'none',
                itemStyle: {
                    color: '#dc2626'
                },
                lineStyle: {
                    width: 2,
                    type: 'dashed'
                }
            }
        ]
    };
    myChart.setOption(option);
}

// 窗口大小改变时重新调整图表
window.addEventListener('resize', () => {
    echarts.init(document.getElementById('trading-volume-chart'))?.resize();
    echarts.init(document.getElementById('price-chart'))?.resize();
});
