// 全局函数定义
function updateDateInput() {
    const period = document.getElementById('data-period').value;
    const dateLabelDay = document.getElementById('date-label-day');
    const dateInputDay = document.getElementById('date-input-day');
    const dateLabelMonth = document.getElementById('date-label-month');
    const dateInputMonth = document.getElementById('date-input-month');

    if (period === 'day') {
        dateLabelDay.style.display = 'block';
        dateInputDay.style.display = 'block';
        dateLabelMonth.style.display = 'none';
        dateInputMonth.style.display = 'none';
    } else if (period === 'month') {
        dateLabelDay.style.display = 'none';
        dateInputDay.style.display = 'none';
        dateLabelMonth.style.display = 'block';
        dateInputMonth.style.display = 'block';
    }
    
    // 切换周期后自动刷新数据
    refreshData();
}

function refreshData() {
    const period = document.getElementById('data-period').value;
    let dateValue;
    
    if (period === 'day') {
        dateValue = document.getElementById('date-input-day').value;
    } else if (period === 'month') {
        dateValue = document.getElementById('date-input-month').value;
    }
    
    console.log('刷新数据 - 周期:', period, ', 日期:', dateValue);
    
    // 这里可以根据周期和日期刷新图表数据
    // 模拟数据刷新
    if (period === 'day') {
        console.log('加载日维度数据');
    } else if (period === 'month') {
        console.log('加载月维度数据');
    }
}

// 湖南省电源装机结构 - 环形图
const powerStructureChart = echarts.init(document.getElementById('power-structure-chart'));
powerStructureChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'horizontal',
        top: 0,
        data: ['光伏', '风电', '水电', '火电'],
        itemWidth: 14,
        itemHeight: 14
    },
    series: [
        {
            name: '装机结构',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 8,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{b}\n{c}'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            data: [
                { value: 100, name: '光伏', itemStyle: { color: '#5470c6' } },
                { value: 150, name: '风电', itemStyle: { color: '#91cc75' } },
                { value: 206, name: '水电', itemStyle: { color: '#fac858' } },
                { value: 224, name: '火电', itemStyle: { color: '#ee6666' } }
            ]
        }
    ]
});

// 各类交易价格对比 - 柱状图
const priceComparisonChart = echarts.init(document.getElementById('price-comparison-chart'));
priceComparisonChart.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
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
        data: ['中长期集中', '中长期双边', '绿电', '现货日前', '现货实时'],
        axisLabel: {
            rotate: 0,
            fontSize: 12
        }
    },
    yAxis: {
        type: 'value',
        name: '价格 (元/MWh)',
        max: 500,
        min: 0
    },
    series: [
        {
            name: '市场均价',
            type: 'bar',
            data: [362.8, 375.6, 418.2, 385.5, 400],
            itemStyle: {
                color: '#5470c6'
            },
            barWidth: '50%'
        }
    ]
});

// 供需情况 - 折线图
const supplyDemandChart = echarts.init(document.getElementById('supply-demand-chart'));
supplyDemandChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['总负荷', '新能源'],
        top: 0,
        right: 0,
        itemWidth: 14,
        itemHeight: 14
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
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
        type: 'value',
        name: '',
        min: 0,
        max: 300,
        interval: 100,
        axisLabel: {
            formatter: function(value) {
                return value;
            }
        }
    },
    series: [
        {
            name: '总负荷',
            type: 'line',
            smooth: true,
            data: [280, 275, 285, 295, 290, 285, 280],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#5470c6'
            },
            lineStyle: {
                width: 2
            }
        },
        {
            name: '新能源',
            type: 'line',
            smooth: true,
            data: [120, 118, 125, 135, 132, 128, 122],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#91cc75'
            },
            lineStyle: {
                width: 2
            }
        }
    ]
});

// 市场价格曲线 - 折线图
const marketPriceChart = echarts.init(document.getElementById('market-price-chart'));
marketPriceChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['中长期', '日前', '实时'],
        top: 0,
        right: 0,
        itemWidth: 14,
        itemHeight: 14
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
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
        type: 'value',
        name: '价格 (元/MWh)',
        min: 0,
        max: 500
    },
    series: [
        {
            name: '中长期',
            type: 'line',
            smooth: true,
            data: [350, 355, 360, 365, 362, 358, 355],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#5470c6'
            },
            lineStyle: {
                width: 2
            }
        },
        {
            name: '日前',
            type: 'line',
            smooth: true,
            data: [355, 360, 365, 370, 368, 365, 360],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#91cc75'
            },
            lineStyle: {
                width: 2
            }
        },
        {
            name: '实时',
            type: 'line',
            smooth: true,
            data: [360, 365, 370, 375, 372, 370, 365],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#fac858'
            },
            lineStyle: {
                width: 2
            }
        }
    ]
});

// 出力预测偏差率 - 折线图
const forecastDeviationChart = echarts.init(document.getElementById('forecast-deviation-chart'));
forecastDeviationChart.setOption({
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            return params[0].name + '<br/>' +
                   params[0].seriesName + ': ' + params[0].value + '%';
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
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
        type: 'value',
        name: '偏差率 (%)',
        min: 0,
        max: 5,
        interval: 1,
        axisLabel: {
            formatter: '{value}%'
        }
    },
    series: [
        {
            name: '偏差率',
            type: 'line',
            smooth: true,
            data: [2.1, 1.8, 1.5, 2.5, 3.2, 3.5, 2.8],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#5470c6'
            },
            lineStyle: {
                width: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(84, 112, 198, 0.3)' },
                    { offset: 1, color: 'rgba(84, 112, 198, 0.05)' }
                ])
            }
        }
    ]
});

// 全省出清电量统计 - 柱状图
const clearingVolumeChart = echarts.init(document.getElementById('clearing-volume-chart'));
clearingVolumeChart.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function(params) {
            return params[0].name + '<br/>' + 
                   params[0].seriesName + ': ' + params[0].value.toLocaleString() + ' MWh';
        }
    },
    grid: {
        left: '40',
        right: '12',
        bottom: '60',
        top: '40'
    },
    xAxis: {
        type: 'category',
        data: ['集中', '双边', '绿电', '日前', '实时'],
        axisLabel: {
            fontSize: 13
        }
    },
    yAxis: {
        type: 'value',
        name: '',
        max: 1500000,
        min: 0,
        interval: 300000,
        axisLabel: {
            formatter: function(value) {
                return value.toLocaleString();
            }
        }
    },
    series: [
        {
            name: '出清电量',
            type: 'bar',
            data: [1250000, 900000, 280000, 320000, 180000],
            itemStyle: {
                color: '#5470c6'
            },
            barWidth: '50%',
            label: {
                show: false
            }
        }
    ]
});

// 响应式调整
window.addEventListener('resize', () => {
    powerStructureChart.resize();
    priceComparisonChart.resize();
    supplyDemandChart.resize();
    marketPriceChart.resize();
    forecastDeviationChart.resize();
    clearingVolumeChart.resize();
});
