// ===== 数据引擎 — 14地市 × 5产业 × 24点 =====

// 地市基础峰值 (MW)
var cityPeak = {
    '全省': 450, '长沙': 95, '株洲': 52, '湘潭': 45,
    '衡阳': 58, '岳阳': 55, '常德': 50, '益阳': 38,
    '郴州': 46, '永州': 42, '邵阳': 44, '娄底': 40,
    '怀化': 42, '湘西': 28, '张家界': 25
};

// 日负荷形态 (24h 归一化 0-1)
var basePattern = [0.45,0.38,0.35,0.33,0.32,0.35,0.48,0.68,0.82,0.88,0.85,0.75,
                   0.70,0.72,0.76,0.80,0.84,0.90,0.95,0.92,0.88,0.78,0.65,0.52];

// 产业用电形态系数 (24h, 乘以 basePattern 得到分产业曲线)
var industryCoeff = {
    '全社会用电量': [1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,
                    1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00],
    '居民生活用电量': [0.55,0.50,0.48,0.45,0.45,0.55,0.75,0.90,0.65,0.50,0.48,0.45,
                    0.42,0.45,0.48,0.50,0.55,0.80,0.95,0.92,0.82,0.70,0.60,0.55],
    '第一产业用电量': [0.30,0.25,0.22,0.20,0.22,0.40,0.65,0.80,0.92,0.95,0.90,0.85,
                    0.80,0.82,0.85,0.88,0.82,0.72,0.60,0.48,0.38,0.32,0.30,0.28],
    '第二产业用电量': [0.65,0.60,0.58,0.55,0.55,0.60,0.72,0.90,0.97,1.00,0.95,0.85,
                    0.72,0.82,0.90,0.93,0.90,0.78,0.65,0.58,0.52,0.48,0.45,0.55],
    '第三产业用电量': [0.45,0.40,0.38,0.35,0.38,0.42,0.55,0.72,0.85,0.92,0.95,0.90,
                    0.85,0.82,0.83,0.85,0.90,0.92,0.88,0.82,0.75,0.65,0.55,0.45]
};

// 全省+全社会用电量的实际负荷 (原始 24h 数据)
var actualProvince = [205,165,185,160,145,195,295,405,395,420,400,280,265,310,250,280,265,410,420,415,425,275,265,260];

// 96个15分钟时间点
var timeSlots = [];
for (var i = 0; i < 96; i++) {
    var h = Math.floor(i / 4), m = (i % 4) * 15;
    timeSlots.push(String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'));
}

// ===== 工具函数 =====

function interpolateTo96(arr) {
    var r = [];
    for (var i = 0; i < 24; i++) {
        var c = arr[i], n = arr[(i + 1) % 24];
        for (var j = 0; j < 4; j++) r.push(Math.round(c + (n - c) * j / 4));
    }
    return r;
}

// 生成24h预测数据 (city, category)
function generateForecast(city, cat) {
    var pk = cityPeak[city] || 450;
    var co = industryCoeff[cat] || industryCoeff['全社会用电量'];
    var r = [];
    for (var i = 0; i < 24; i++) r.push(Math.round(pk * basePattern[i] * co[i]));
    return r;
}

// ===== ECharts 初始化 =====
var chart = echarts.init(document.getElementById('load-forecast-chart'));

// ===== 渲染主函数 =====
function render() {
    var city = document.getElementById('filter-city').value;
    var cat = document.getElementById('filter-cat').value;
    var date = document.getElementById('filter-date').value || '2026-05-26';
    var series = [];

    // 更新副标题
    document.querySelector('.page-subtitle').textContent = city + ' ' + cat + '负荷预测分析';

    // 实际负荷 (仅全省+全社会时显示)
    var isDefault = (city === '全省' && cat === '全社会用电量');
    if (isDefault) {
        series.push({
            id: 'actual', name: '实际负荷', type: 'line', smooth: true,
            data: interpolateTo96(actualProvince),
            symbol: 'none',
            itemStyle: { color: '#17a34a' },
            lineStyle: { width: 2, color: '#17a34a' }
        });
    }

    // 主预测曲线
    var fc = generateForecast(city, cat);
    var fc96 = interpolateTo96(fc);
    series.push({
        id: 'forecast', name: '负荷预测',
        type: 'line', smooth: true,
        data: fc96,
        symbol: 'none',
        itemStyle: { color: '#2f6feb' },
        lineStyle: { width: 2.5, color: '#2f6feb' }
    });

    // 主曲线上下界 (±6%~14%)
    var up96 = fc96.map(function(v) { return Math.round(v * 1.08 + 10); });
    var lo96 = fc96.map(function(v) { return Math.round(v * 0.92 - 10); });
    series.push({
        id: 'upper', name: '负荷预测上限', type: 'line', smooth: true,
        data: up96, symbol: 'none',
        itemStyle: { color: '#dc2626' },
        lineStyle: { width: 1, type: 'dashed', color: '#dc2626' }
    });
    series.push({
        id: 'lower', name: '负荷预测下限', type: 'line', smooth: true,
        data: lo96, symbol: 'none',
        itemStyle: { color: '#eab308' },
        lineStyle: { width: 1, type: 'dashed', color: '#eab308' }
    });

    chart.setOption({
        tooltip: { trigger: 'axis' },
        legend: { top: 0, right: 0, textStyle: { fontSize: 12 } },
        grid: { left: '30', right: '15', bottom: '60', top: '20' },
        xAxis: {
            type: 'category', boundaryGap: false,
            data: timeSlots,
            axisLabel: { interval: 3, color: '#999', fontSize: 11 }
        },
        yAxis: {
            type: 'value', min: 0,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        series: series
    }, { replaceMerge: ['series'] });

    // 更新摘要 — 取主曲线96点均值
    var avg = Math.round(fc96.reduce(function(a, b) { return a + b; }, 0) / 96);
    document.querySelector('.summary-label').textContent = city + ' ' + cat + ' 均值';
    document.querySelector('.summary-value').textContent = avg + ' MW';

    updateTable(fc96);
}

// ===== 数据表格 =====
function updateTable(forecast96) {
    var tbody = document.getElementById('load-forecast-table-body');
    if (!tbody) return;
    var html = '';
    for (var i = 0; i < 96; i++) {
        var load = forecast96[i];
        var range = Math.round(load * 0.06 + 8);
        var lower = load - range, upper = load + range;
        var dev = (range / load * 100).toFixed(1);
        html += '<tr><td>' + timeSlots[i] + '</td><td>' + load + '</td><td>[' + lower + ', ' + upper + ']</td><td>' + dev + '%</td></tr>';
    }
    tbody.innerHTML = html;
}

// ===== 事件绑定 =====

// 负荷预测按钮
document.getElementById('btn-forecast').addEventListener('click', function() {
    render();
});

// 查询按钮 — 重新加载当前视图
document.getElementById('btn-query').addEventListener('click', function() {
    render();
});

// 响应式
window.addEventListener('resize', function() { chart.resize(); });

// ===== 初始渲染 =====
render();
