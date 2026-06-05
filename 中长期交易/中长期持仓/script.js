// 合约电量情况 - 多折线图
const contractVolumeChart = echarts.init(document.getElementById('contract-volume-chart'));
contractVolumeChart.setOption({
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['优先发电合约', '双边协商', '集中竞价', '挂牌交易', '绿电交易', '合同转让', '累计交易限额'],
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
            name: '优先发电合约',
            type: 'line',
            smooth: true,
            data: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1100, 1050, 1000, 950],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 2 }
        },
        {
            name: '双边协商',
            type: 'line',
            smooth: true,
            data: [3000, 3200, 3250, 3500, 3750, 4000, 4200, 4300, 4000, 3800, 3700, 3600],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#91cc75' },
            lineStyle: { width: 2 }
        },
        {
            name: '集中竞价',
            type: 'line',
            smooth: true,
            data: [1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850, 1800, 1750, 1700, 1650],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#fac858' },
            lineStyle: { width: 2 }
        },
        {
            name: '挂牌交易',
            type: 'line',
            smooth: true,
            data: [1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1700, 1650, 1600, 1550],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#ee6666' },
            lineStyle: { width: 2 }
        },
        {
            name: '绿电交易',
            type: 'line',
            smooth: true,
            data: [600, 650, 700, 750, 800, 850, 900, 950, 900, 850, 800, 750],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#73c0de' },
            lineStyle: { width: 2 }
        },
        {
            name: '合同转让',
            type: 'line',
            smooth: true,
            data: [400, 420, 440, 460, 480, 500, 520, 540, 520, 500, 480, 460],
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#3ba272' },
            lineStyle: { width: 2 }
        },
        {
            name: '累计交易限额',
            type: 'line',
            smooth: true,
            data: [6000, 6200, 6500, 6800, 7000, 7300, 7600, 7800, 7600, 7400, 7200, 7000],
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
                formatter: '合约电量',
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
                formatter: '收益',
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

// 合同占比情况 - 饼图
const contractProportionChart = echarts.init(document.getElementById('contract-proportion-chart'));
contractProportionChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        data: ['用户A', '用户B', '用户C']
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
                { value: 35, name: '用户A', itemStyle: { color: '#5470c6' } },
                { value: 30, name: '用户B', itemStyle: { color: '#91cc75' } },
                { value: 35, name: '用户C', itemStyle: { color: '#fac858' } }
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
