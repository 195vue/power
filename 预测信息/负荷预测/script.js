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

// 96个15分钟时间点 (带日期)
var timeSlots = [];
var timeSlotsWithDate = [];
for (var i = 0; i < 96; i++) {
    var h = Math.floor(i / 4), m = (i % 4) * 15;
    timeSlots.push(String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'));
}

// ===== 工具函数 =====

function interpolateTo96(arr) {
    var r = [];
    for (var i = 0; i < 24; i++) {
        var c = arr[i], n = arr[(i + 1) % 24];
        for (var j = 0; j < 4; j++) r.push(c + (n - c) * j / 4);
    }
    return r;
}

// 生成24h预测数据 (city, category)
function generateForecast(city, cat) {
    var pk = cityPeak[city] || 450;
    var co = industryCoeff[cat] || industryCoeff['全社会用电量'];
    var r = [];
    for (var i = 0; i < 24; i++) r.push(pk * basePattern[i] * co[i]);
    return r;
}

// 计算总用电量 (MWh) - 曲线下方面积积分
function calculateTotalConsumption(data, queryDate) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var query = new Date(queryDate);
    query.setHours(0, 0, 0, 0);
    
    if (query > today) {
        return '--';
    }
    
    var total = 0;
    var count = data.length;
    
    if (query.getTime() === today.getTime()) {
        var now = new Date();
        var currentIndex = Math.floor((now.getHours() * 60 + now.getMinutes()) / 15);
        count = Math.min(currentIndex + 1, 96);
    }
    
    for (var i = 0; i < count; i++) {
        total += data[i] * 0.25;
    }
    
    return total.toFixed(2);
}

// 判断日期类型
function getDateType(queryDate) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var query = new Date(queryDate);
    query.setHours(0, 0, 0, 0);
    
    if (query < today) return 'history';
    if (query.getTime() === today.getTime()) return 'today';
    return 'future';
}

// 显示提示消息
function showToast(message, type) {
    var toast = document.getElementById('toast-message');
    toast.textContent = message;
    toast.className = 'toast-message toast-' + type;
    toast.style.display = 'block';
    setTimeout(function() {
        toast.style.display = 'none';
    }, 3000);
}

// ===== ECharts 初始化 =====
var chart = null;

function initChart() {
    var chartEl = document.getElementById('load-forecast-chart');
    if (!chartEl) {
        setTimeout(initChart, 50);
        return;
    }
    chart = echarts.init(chartEl);
}

initChart();

// ===== 渲染主函数 =====
function render(queryDateOverride) {
    if (!chart) return;
    
    var city = document.getElementById('filter-city').value;
    var cat = document.getElementById('filter-cat').value;
    var date = queryDateOverride || document.getElementById('filter-query-date').value || '2026-05-26';
    
    // 生成带日期的时间槽
    timeSlotsWithDate = [];
    for (var i = 0; i < 96; i++) {
        var h = Math.floor(i / 4), m = (i % 4) * 15;
        timeSlotsWithDate.push(date + ' ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'));
    }
    
    var series = [];
    var dateType = getDateType(date);
    var isDefault = (city === '全省' && cat === '全社会用电量');
    
    // 更新副标题
    document.querySelector('.page-subtitle').textContent = city + ' ' + cat + '负荷预测分析';
    
    // 更新图表状态
    document.getElementById('chart-status').textContent = '数据已加载';
    
    // 实际负荷 - 根据日期类型显示
    var actual96 = interpolateTo96(actualProvince);
    if (isDefault && dateType !== 'future') {
        var actualData = actual96;
        
        if (dateType === 'today') {
            var now = new Date();
            var currentIndex = Math.floor((now.getHours() * 60 + now.getMinutes()) / 15);
            actualData = actual96.map(function(v, i) {
                return i <= currentIndex ? v : null;
            });
        }
        
        series.push({
            id: 'actual', name: '实际负荷', type: 'line', smooth: true,
            data: actualData,
            symbol: 'circle', symbolSize: 4,
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
        symbol: 'circle', symbolSize: 4,
        itemStyle: { color: '#2f6feb' },
        lineStyle: { width: 2.5, color: '#2f6feb' }
    });
    
    // 主曲线上下界 (95%置信区间)
    var up96 = fc96.map(function(v) { return v * 1.08; });
    var lo96 = fc96.map(function(v) { return v * 0.92; });
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
        tooltip: { 
            trigger: 'axis',
            formatter: function(params) {
                var result = '<div style="font-weight:bold;margin-bottom:8px;">' + params[0].axisValue + '</div>';
                var actualVal = null, forecastVal = null, upperVal = null, lowerVal = null;
                
                params.forEach(function(item) {
                    var val = item.value;
                    if (val === null || val === undefined) val = '--';
                    else val = val.toFixed(2);
                    
                    if (item.seriesName === '实际负荷') actualVal = val;
                    if (item.seriesName === '负荷预测') forecastVal = val;
                    if (item.seriesName === '负荷预测上限') upperVal = val;
                    if (item.seriesName === '负荷预测下限') lowerVal = val;
                    
                    result += '<div style="display:flex;justify-content:space-between;gap:20px;">' +
                        '<span>' + item.marker + item.seriesName + '</span>' +
                        '<span style="font-weight:bold;">' + val + ' MW</span>' +
                        '</div>';
                });
                
                if (upperVal !== null && lowerVal !== null && upperVal !== '--' && lowerVal !== '--') {
                    var bandWidth = (parseFloat(upperVal) - parseFloat(lowerVal)).toFixed(2);
                    result += '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #eee;">' +
                        '<span>置信带宽度：</span>' +
                        '<span style="font-weight:bold;">' + bandWidth + ' MW</span>' +
                        '</div>';
                }
                
                return result;
            }
        },
        legend: { top: 0, right: 0, textStyle: { fontSize: 12 } },
        grid: { left: '50', right: '30', bottom: '80', top: '30' },
        xAxis: {
            type: 'category', boundaryGap: false,
            data: timeSlots,
            axisLabel: { interval: 3, color: '#999', fontSize: 11 }
        },
        yAxis: {
            type: 'value', min: 0,
            axisLabel: { color: '#999', fontSize: 11, formatter: '{value} MW' }
        },
        series: series
    }, { replaceMerge: ['series'] });
    
    // 更新总用电量
    var total = calculateTotalConsumption(isDefault ? actual96 : fc96, date);
    document.getElementById('summary-label').textContent = '总用电量';
    document.getElementById('summary-value').textContent = total + ' MWh';
    
    // 更新表格
    updateTable(fc96, actual96, date);
}

// ===== 数据表格 =====
function updateTable(forecast96, actual96, date) {
    var tbody = document.getElementById('load-forecast-table-body');
    if (!tbody) return;
    
    var dateType = getDateType(date);
    var isDefault = (document.getElementById('filter-city').value === '全省' && 
                     document.getElementById('filter-cat').value === '全社会用电量');
    
    var html = '';
    for (var i = 0; i < 96; i++) {
        var load = forecast96[i].toFixed(2);
        var upper = (forecast96[i] * 1.08).toFixed(2);
        var lower = (forecast96[i] * 0.92).toFixed(2);
        
        var actualVal = '--';
        var devRate = '--';
        
        if (isDefault && dateType !== 'future') {
            if (dateType === 'today') {
                var now = new Date();
                var currentIndex = Math.floor((now.getHours() * 60 + now.getMinutes()) / 15);
                if (i <= currentIndex) {
                    actualVal = actual96[i].toFixed(2);
                    var actual = parseFloat(actualVal);
                    if (actual !== 0) {
                        devRate = ((forecast96[i] - actual) / actual * 100).toFixed(2);
                    }
                }
            } else {
                actualVal = actual96[i].toFixed(2);
                var actual = parseFloat(actualVal);
                if (actual !== 0) {
                    devRate = ((forecast96[i] - actual) / actual * 100).toFixed(2);
                }
            }
        }
        
        html += '<tr>' +
            '<td>' + timeSlotsWithDate[i] + '</td>' +
            '<td>' + load + '</td>' +
            '<td>' + actualVal + '</td>' +
            '<td>[' + lower + ', ' + upper + ']</td>' +
            '<td>' + devRate + '</td>' +
            '</tr>';
    }
    
    tbody.innerHTML = html;
}

// ===== 事件绑定 =====

// 负荷预测按钮
document.getElementById('btn-forecast').addEventListener('click', function() {
    var btn = this;
    var forecastDate = document.getElementById('filter-date').value;
    
    if (!forecastDate) {
        showToast('请先选择预测日期', 'error');
        return;
    }
    
    btn.disabled = true;
    btn.textContent = '预测中...';
    
    setTimeout(function() {
        // 同步查询日期为预测日期
        document.getElementById('filter-query-date').value = forecastDate;
        
        // 触发渲染
        render(forecastDate);
        
        btn.textContent = '负荷预测';
        btn.disabled = false;
        
        showToast('预测完成', 'success');
    }, 1500);
});

// 查询按钮 — 重新加载当前视图
document.getElementById('btn-query').addEventListener('click', function() {
    render();
});

// 响应式
window.resizeReviewCharts = function() {
    if (chart) chart.resize();
};

// ===== 初始渲染 =====
function initRender() {
    if (document.getElementById('load-forecast-chart')) {
        render();
    } else {
        setTimeout(initRender, 50);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRender);
} else {
    initRender();
}