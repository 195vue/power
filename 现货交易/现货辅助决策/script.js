// 96点时间标签 (00:00 ~ 23:45)
const TIME_96 = (function() {
    const t = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            t.push(String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0'));
        }
    }
    return t;
})();

// 24点源数据插值为96点
const OUTPUT_24 = [100, 140, 230, 100, 130, 160, 200, 210, 220, 140, 150, 100,
                   145, 190, 155, 120, 115, 130, 125, 110, 125, 150, 120, 105];
const PRICE_24 = [150, 100, 200, 140, 100, 115, 220, 165, 150, 190, 165, 165,
                  155, 210, 135, 120, 115, 118, 135, 135, 112, 230, 145, 105];

function to96(src) {
    const out = [];
    for (let i = 0; i < 24; i++) {
        const cur = src[i];
        const nxt = src[(i + 1) % 24];
        for (let j = 0; j < 4; j++) {
            out.push(Math.round((cur + (nxt - cur) * j / 4) * 10) / 10);
        }
    }
    return out;
}

const OUTPUT_96 = to96(OUTPUT_24);
const PRICE_96 = to96(PRICE_24);

// ─── 出力及价格曲线（双Y轴） ───
const outputPriceChart = echarts.init(document.getElementById('output-price-chart'));
outputPriceChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: {
        data: ['出力', '电价'],
        top: 0,
        itemWidth: 14, itemHeight: 14,
        textStyle: { fontSize: 11 }
    },
    grid: { left: 55, right: 55, bottom: 28, top: 35 },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: TIME_96,
        axisLabel: { color: '#666', fontSize: 10, interval: 3 }
    },
    yAxis: [
        {
            type: 'value', name: '出力 (MW)', min: 0, max: 250, interval: 50,
            axisLabel: { color: '#666', fontSize: 11 },
            splitLine: { lineStyle: { color: '#f0f0f0' } }
        },
        {
            type: 'value', name: '价格 (元/MWh)', min: 0, max: 250, interval: 50,
            axisLabel: { color: '#666', fontSize: 11 },
            splitLine: { show: false }
        }
    ],
    series: [
        {
            name: '出力', type: 'line', smooth: false,
            data: OUTPUT_96, yAxisIndex: 0,
            symbol: 'none',
            itemStyle: { color: '#5470c6' },
            lineStyle: { width: 2 }
        },
        {
            name: '电价', type: 'line', smooth: false,
            data: PRICE_96, yAxisIndex: 1,
            symbol: 'none',
            itemStyle: { color: '#91cc75' },
            lineStyle: { width: 2 }
        }
    ]
});

// ─── 预期收益曲线 ───
const revenueChart = echarts.init(document.getElementById('revenue-chart'));
revenueChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: {
        data: ['预期收益'],
        top: 0,
        itemWidth: 14, itemHeight: 14,
        textStyle: { fontSize: 11 }
    },
    grid: { left: 55, right: 20, bottom: 28, top: 35 },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: TIME_96,
        axisLabel: { color: '#666', fontSize: 10, interval: 3 }
    },
    yAxis: {
        type: 'value', name: '收益 (元)', min: 0, max: 250, interval: 50,
        axisLabel: { color: '#666', fontSize: 11 },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [{
        name: '预期收益', type: 'line', smooth: false,
        data: PRICE_96,
        symbol: 'none',
        areaStyle: {
            color: {
                type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                    { offset: 0, color: 'rgba(84,112,198,0.3)' },
                    { offset: 1, color: 'rgba(84,112,198,0.02)' }
                ]
            }
        },
        itemStyle: { color: '#5470c6' },
        lineStyle: { width: 2 }
    }]
});

// ─── 生成申报方案表格（96行） ───
(function() {
    const tbody = document.getElementById('declaration-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (let i = 0; i < 96; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML =
            '<td class="time-cell">' + TIME_96[i] + '</td>' +
            '<td><input type="number" class="cell-input" value="' + OUTPUT_96[i] + '" step="0.1"></td>' +
            '<td><input type="number" class="cell-input" value="' + PRICE_96[i] + '" step="0.1"></td>' +
            '<td class="price-cell">' + PRICE_96[i] + '</td>';
        tbody.appendChild(tr);
    }
    updateSummary();
})();

// ─── 批量调整 ───
document.getElementById('batch-apply').addEventListener('click', function() {
    const om = parseFloat(document.getElementById('output-multiplier').value) || 1;
    const pm = parseFloat(document.getElementById('price-multiplier').value) || 1;

    const rows = document.querySelectorAll('#declaration-table-body tr');
    rows.forEach((tr, i) => {
        const inputs = tr.querySelectorAll('.cell-input');
        if (inputs.length >= 2) {
            const newOutput = Math.round((OUTPUT_96[i] * om) * 10) / 10;
            inputs[0].value = Math.max(0, newOutput);
            const newPrice = Math.round((PRICE_96[i] * pm) * 10) / 10;
            inputs[1].value = Math.max(0, newPrice);
        }
    });
    updateSummary();
});

// ─── 更新汇总卡 ───
function updateSummary() {
    const rows = document.querySelectorAll('#declaration-table-body tr');
    let totalEnergy = 0, totalPriceSum = 0, totalRevenue = 0;
    let maxOutput = -Infinity, minOutput = Infinity;
    let maxPrice = -Infinity, minPrice = Infinity;
    let outputSum = 0, priceSum = 0;

    rows.forEach((tr, i) => {
        const inputs = tr.querySelectorAll('.cell-input');
        const out = parseFloat(inputs[0].value) || 0;
        const price = parseFloat(inputs[1].value) || 0;
        totalEnergy += out * 0.25;
        totalPriceSum += price;
        totalRevenue += out * price * 0.25;
        maxOutput = Math.max(maxOutput, out);
        minOutput = Math.min(minOutput, out);
        maxPrice = Math.max(maxPrice, price);
        minPrice = Math.min(minPrice, price);
        outputSum += out;
        priceSum += price;
    });

    const count = rows.length || 1;
    const avgPrice = priceSum / count;
    const avgOutput = outputSum / count;

    document.getElementById('sum-energy').textContent = totalEnergy.toFixed(1);
    document.getElementById('avg-price').textContent = avgPrice.toFixed(2);
    document.getElementById('total-revenue').textContent = totalRevenue.toFixed(0);
    document.getElementById('max-output').textContent = maxOutput.toFixed(1);
    document.getElementById('min-output').textContent = minOutput.toFixed(1);
    document.getElementById('avg-output').textContent = avgOutput.toFixed(1);
    document.getElementById('max-price').textContent = maxPrice.toFixed(2);
    document.getElementById('min-price').textContent = minPrice.toFixed(2);
    document.getElementById('avg-price-val').textContent = avgPrice.toFixed(2);
}

// ─── 单元格手动编辑后更新汇总 ───
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('cell-input')) {
        updateSummary();
    }
});

// ─── 策略选择联动 ───
const historyStrategies = {
    '20251024': { calcMethod: 'day-ahead', station: '电场A（默认）', strategy: 'neutral' },
    '20251023': { calcMethod: 'real-time', station: '电场B', strategy: 'conservative' },
    '20251022': { calcMethod: 'day-ahead', station: '电场A（默认）', strategy: 'aggressive' },
    '20251021': { calcMethod: 'real-time', station: '电场C', strategy: 'neutral' },
    '20251020': { calcMethod: 'day-ahead', station: '电场A（默认）', strategy: 'neutral' },
    '20251019': { calcMethod: 'real-time', station: '电场B', strategy: 'conservative' },
    '20251018': { calcMethod: 'day-ahead', station: '电场C', strategy: 'aggressive' },
    '20251017': { calcMethod: 'real-time', station: '电场A（默认）', strategy: 'neutral' },
    '20251016': { calcMethod: 'day-ahead', station: '电场B', strategy: 'neutral' },
    '20251015': { calcMethod: 'real-time', station: '电场A（默认）', strategy: 'conservative' }
};

document.getElementById('strategy-select').addEventListener('change', function() {
    const selected = this.value;
    if (selected && historyStrategies[selected]) {
        const config = historyStrategies[selected];
        document.getElementById('calc-method').value = config.calcMethod;
        document.getElementById('station-select').value = config.station;
        document.getElementById('quote-strategy').value = config.strategy;
        console.log('已载入方案:', selected, '配置已自动回填');
    }
});

// ─── 响应式 ───
window.addEventListener('resize', () => {
    outputPriceChart.resize();
    revenueChart.resize();
});
