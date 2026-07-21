// 合约电量情况 - 多折线图（基于桂阳月和合约模拟：1-9月年度双边40%+月度竞价60%；10-12月年度双边40%+月度竞价50%+现货10%）
const contractVolumeChart = echarts.init(document.getElementById('contract-volume-chart'));
contractVolumeChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['年度双边协商合约', '月度集中竞价合约', '现货交易', '累计交易限额'],
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
        top: '80'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
        type: 'value',
        name: 'MWh',
        max: 8000
    },
    series: [
        {
            name: '年度双边协商合约',
            type: 'line',
            smooth: true,
            data: [3200, 3400, 3500, 3600, 3800, 4000, 4200, 4300, 4100, 3800, 3700, 3600],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 2 }
        },
        {
            name: '月度集中竞价合约',
            type: 'line',
            smooth: true,
            data: [4800, 5000, 5200, 5400, 5600, 5800, 6200, 6400, 6100, 4700, 4600, 4500],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#91cc75' },
            lineStyle: { width: 2 }
        },
        {
            name: '现货交易',
            type: 'line',
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 950, 920, 900],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#fac858' },
            lineStyle: { width: 2 }
        },
        {
            name: '累计交易限额',
            type: 'line',
            smooth: true,
            data: [8000, 8400, 8700, 9000, 9400, 9800, 10400, 10700, 10200, 9450, 9220, 9000],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#fc8452' },
            lineStyle: { width: 2, type: 'dashed' }
        }
    ]
});

// 已签订合同完成情况占比 - 双环形图（左右布局）
const contractCompletionChart = echarts.init(document.getElementById('contract-completion-chart'));
contractCompletionChart.setOption({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'horizontal',
        bottom: '5%',
        left: 'center',
        data: ['已执行电量', '未执行电量', '已结算收益', '未来预测结算收益'],
        itemWidth: 14,
        itemHeight: 10,
        textStyle: { fontSize: 11 }
    },
    series: [
        {
            name: '合约电量',
            type: 'pie',
            radius: ['28%', '42%'],
            center: ['22%', '46%'],
            label: {
                show: true,
                position: 'center',
                formatter: function(params) {
                    return '合约电量\n' + params.value + '%';
                },
                fontSize: 13,
                fontWeight: 600,
                color: '#333'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 65, name: '已执行电量', itemStyle: { color: '#5470c6' } },
                { value: 35, name: '未执行电量', itemStyle: { color: '#91cc75' } }
            ]
        },
        {
            name: '收益',
            type: 'pie',
            radius: ['28%', '42%'],
            center: ['78%', '46%'],
            label: {
                show: true,
                position: 'center',
                formatter: function(params) {
                    return '收益\n' + params.value + '%';
                },
                fontSize: 13,
                fontWeight: 600,
                color: '#333'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 70, name: '已结算收益', itemStyle: { color: '#5470c6' } },
                { value: 30, name: '未来预测结算收益', itemStyle: { color: '#91cc75' } }
            ]
        }
    ]
});

// 合同增长分析 - 折线图
const contractGrowthChart = echarts.init(document.getElementById('contract-growth-chart'));
contractGrowthChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '30',
        right: '12',
        bottom: '40',
        top: '30'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
        type: 'value',
        name: '%',
        max: 60
    },
    series: [
        {
            name: '增长率',
            type: 'line',
            smooth: true,
            data: [25, 30, 35, 40, 45, 50, 55, 58, 55, 52, 48, 45],
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 2 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(84, 112, 198, 0.3)' },
                    { offset: 1, color: 'rgba(84, 112, 198, 0.05)' }
                ])
            }
        }
    ]
});

// 合同占比情况 - 饼图（基于桂阳月和合约模拟：年度双边40% + 月度竞价50-60% + 现货10%）
const contractProportionChart = echarts.init(document.getElementById('contract-proportion-chart'));
contractProportionChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}% ({d}%)'
    },
    legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        data: ['年度双边协商合约', '月度集中竞价合约', '现货交易']
    },
    series: [
        {
            name: '合同占比',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            label: {
                show: true,
                position: 'outside',
                formatter: '{b}'
            },
            data: [
                { value: 40, name: '年度双边协商合约', itemStyle: { color: '#5470c6' } },
                { value: 50, name: '月度集中竞价合约', itemStyle: { color: '#91cc75' } },
                { value: 10, name: '现货交易', itemStyle: { color: '#fac858' } }
            ]
        }
    ]
});

// 合同排名top5 - 柱状图
const contractRankingChart = echarts.init(document.getElementById('contract-ranking-chart'));
contractRankingChart.setOption({
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
        top: '30'
    },
    xAxis: {
        type: 'category',
        data: ['用户A', '用户B', '用户C', '用户D', '用户E'],
        axisLabel: {
            fontSize: 12
        }
    },
    yAxis: {
        type: 'value',
        name: 'MWh',
        max: 10000
    },
    series: [
        {
            name: '合同电量',
            type: 'bar',
            data: [10000, 8500, 7000, 5500, 4000],
            itemStyle: {
                color: '#5470c6'
            },
            barWidth: '50%'
        }
    ]
});

// 响应式调整
window.addEventListener('resize', () => {
    contractVolumeChart.resize();
    contractCompletionChart.resize();
    contractGrowthChart.resize();
    contractProportionChart.resize();
    contractRankingChart.resize();
});
