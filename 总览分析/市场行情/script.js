function refreshData() {
    const dateValue = document.getElementById('date-input-month').value;
    console.log('刷新数据 - 月份:', dateValue);
    updateChartTimeLabels(dateValue);
}

function updateChartTimeLabels(dateValue) {
    const monthStr = dateValue ? dateValue.replace('-', '年') + '月' : '2026年05月';
    document.querySelectorAll('.chart-time-label').forEach(el => {
        el.textContent = monthStr;
    });
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
        name: '功率 (MW)',
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
        name: '电量 (MWh)',
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
    clearingVolumeChart.resize();
});
