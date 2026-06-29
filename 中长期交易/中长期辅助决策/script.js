// 全局状态
let tradeMode = 'daily';
let activePreset = 'conservative';
let tuned = null;
let generated = false;

// 交易方式配置
const TRADE_MODES = {
    daily: { name: '日滚动', desc: '连续撮合·贴日前现货报价' },
    intraMonth: { name: '月内', desc: '月度内分时段交易' },
    month: { name: '月度', desc: '按月签订·基准价浮动' },
    multiMonth: { name: '多月', desc: '多月份捆绑交易' },
    year: { name: '年度', desc: '年度长约·稳定收益' }
};


// 策略预设参数（精确匹配设计图）
const PRESETS = {
    conservative: { name: '保守方案', color: '#5b8ff9', alpha: 0.6, beta: -0.004, delta: 0.026 },
    balanced: { name: '稳健方案', color: '#52c41a', alpha: 0.85, beta: 0, delta: 0.004 },
    aggressive: { name: '激进方案', color: '#f56c6c', alpha: 0.99, beta: 0.04, delta: 0.006 }
};

// 模拟数据
const HOURS = Array.from({ length: 24 }, (_, i) => i + 1);
const predOutput = [88,86,84,82,83,85,87,90,92,94,95,93,91,89,88,87,86,85,84,83,84,86,88,90];
const daPrice = [342, 335, 328, 325, 330, 345, 368, 395, 412, 420, 418, 405, 390, 378, 365, 355, 348, 340, 335, 332, 338, 348, 355, 350];
const signed = {
    daily: [4,4,4,3,3,4,4,5,5,6,5,5,4,4,4,3,3,3,3,3,3,3,3,4],
    intraMonth: [7,6,6,5,5,6,7,8,9,10,9,8,7,7,6,6,5,5,4,4,4,5,5,6],
    month: [12,11,10,9,9,10,12,14,15,16,15,14,13,12,11,10,9,8,8,7,7,8,9,10],
    multiMonth: [20,19,18,17,18,19,20,22,24,25,24,22,21,20,19,18,17,16,15,14,14,15,17,18],
    year: [34,32,30,28,30,32,34,38,40,42,41,38,36,34,32,30,28,26,24,23,24,26,28,30]
};

// 中长期余量分析 - 堆叠面积图 + 参考线
const volumeAnalysisChart = echarts.init(document.getElementById('volume-analysis-chart'));
const hours = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00',
               '11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00',
               '21:00','22:00','23:00','24:00'];

const nianDu =   [34,32,30,28,30,32,34,38,40,42,41,38,36,34,32,30,28,26,24,23,24,26,28,30];
const duoYue =   [20,19,18,17,18,19,20,22,24,25,24,22,21,20,19,18,17,16,15,14,14,15,17,18];
const yueDu =    [12,11,10, 9, 9,10,12,14,15,16,15,14,13,12,11,10, 9, 8, 8, 7, 7, 8, 9,10];
const yueNei =   [ 7, 6, 6, 5, 5, 6, 7, 8, 9,10, 9, 8, 7, 7, 6, 6, 5, 5, 4, 4, 4, 5, 5, 6];
const riGunDong =[ 4, 4, 4, 3, 3, 4, 4, 5, 5, 6, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4];
const stackSum = nianDu.map((_, i) => nianDu[i] + duoYue[i] + yueDu[i] + yueNei[i] + riGunDong[i]);

volumeAnalysisChart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['年度', '多月', '月度', '月内', '日滚动', '预测基准线', '总合同量', '剩余交易量'], top: 0, itemWidth: 14, itemHeight: 14, textStyle: { fontSize: 11 } },
    grid: { left: '45', right: '20', bottom: '40', top: '55' },
    xAxis: { type: 'category', boundaryGap: false, data: hours },
    yAxis: { type: 'value', name: '电量 (MWh)', nameLocation: 'middle', nameGap: 35, min: 0 },
    series: [
        { name: '年度', type: 'line', smooth: true, stack: 'trade', areaStyle: {}, emphasis: { focus: 'series' }, data: nianDu, symbol: 'none', itemStyle: { color: '#5470c6' }, lineStyle: { width: 1 } },
        { name: '多月', type: 'line', smooth: true, stack: 'trade', areaStyle: {}, emphasis: { focus: 'series' }, data: duoYue, symbol: 'none', itemStyle: { color: '#91cc75' }, lineStyle: { width: 1 } },
        { name: '月度', type: 'line', smooth: true, stack: 'trade', areaStyle: {}, emphasis: { focus: 'series' }, data: yueDu, symbol: 'none', itemStyle: { color: '#73c0de' }, lineStyle: { width: 1 } },
        { name: '月内', type: 'line', smooth: true, stack: 'trade', areaStyle: {}, emphasis: { focus: 'series' }, data: yueNei, symbol: 'none', itemStyle: { color: '#fc8452' }, lineStyle: { width: 1 } },
        { name: '日滚动', type: 'line', smooth: true, stack: 'trade', areaStyle: {}, emphasis: { focus: 'series' }, data: riGunDong, symbol: 'none', itemStyle: { color: '#9a60b4' }, lineStyle: { width: 1 } },
        { name: '预测基准线', type: 'line', smooth: true, data: predOutput, symbol: 'diamond', symbolSize: 4, itemStyle: { color: '#dc2626' }, lineStyle: { width: 2, type: 'dashed' } },
        { name: '剩余交易量', type: 'line', smooth: true, data: stackSum.map(s => Math.max(100 - s, 0)), symbol: 'none', itemStyle: { color: '#ea7ccc' }, lineStyle: { width: 2, type: 'dotted' } },
        { name: '总合同量', type: 'line', smooth: true, data: Array(24).fill(100), symbol: 'none', itemStyle: { color: '#fac858' }, lineStyle: { width: 2 } }
    ]
});

// 价格策略分析 - 折线图
const priceStrategyChart = echarts.init(document.getElementById('price-strategy-chart'));
let priceChartOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['日滚动', '年度', '多月', '月度', '月内', '日滚动-平均数'], top: 0, itemWidth: 14, itemHeight: 14, textStyle: { fontSize: 11 } },
    grid: { left: '30', right: '12', bottom: '40', top: '40' },
    xAxis: { type: 'category', boundaryGap: false, data: hours },
    yAxis: { type: 'value', name: '价格 (元/MWh)', min: 0 },
    series: [
        { name: '日滚动', type: 'line', smooth: true, data: daPrice, symbol: 'circle', symbolSize: 4, itemStyle: { color: '#5470c6' }, lineStyle: { width: 2 } },
        { name: '年度', type: 'line', smooth: true, data: [310, 305, 298, 295, 300, 312, 330, 352, 368, 375, 372, 360, 348, 338, 325, 318, 312, 305, 300, 298, 302, 310, 318, 315], symbol: 'diamond', symbolSize: 3, itemStyle: { color: '#91cc75' }, lineStyle: { width: 1.5, type: 'dashed' } },
        { name: '多月', type: 'line', smooth: true, data: [320, 315, 308, 305, 310, 322, 340, 362, 378, 385, 382, 370, 358, 348, 335, 328, 322, 315, 310, 308, 312, 320, 328, 325], symbol: 'triangle', symbolSize: 3, itemStyle: { color: '#73c0de' }, lineStyle: { width: 1.5, type: 'dashed' } },
        { name: '月度', type: 'line', smooth: true, data: [332, 325, 318, 315, 320, 335, 358, 385, 402, 410, 408, 395, 380, 368, 355, 345, 338, 330, 325, 322, 328, 338, 345, 340], symbol: 'rect', symbolSize: 3, itemStyle: { color: '#fc8452' }, lineStyle: { width: 1.5, type: 'dashed' } },
        { name: '月内', type: 'line', smooth: true, data: [338, 330, 322, 320, 325, 340, 365, 392, 408, 416, 414, 400, 386, 374, 360, 350, 344, 336, 330, 328, 334, 344, 350, 346], symbol: 'circle', symbolSize: 3, itemStyle: { color: '#9a60b4' }, lineStyle: { width: 1.5, type: 'dashed' } },
        { name: '日滚动-平均数', type: 'line', smooth: true, data: Array(24).fill(345), symbol: 'none', itemStyle: { color: '#dc2626' }, lineStyle: { width: 2, type: 'dotted' } }
    ]
};
priceStrategyChart.setOption(priceChartOption);

// 渲染策略卡片（精确匹配设计图）
function renderStrategyCards() {
    const container = document.getElementById('strategy-cards');
    const currentParams = tuned || PRESETS[activePreset];
    
    const cardsHTML = Object.entries(PRESETS).map(([key, preset]) => {
        const isActive = activePreset === key;
        const p = tuned && isActive ? tuned : preset;
        const summary = genStrategySummary(key, daPrice);
        return `
            <div class="strategy-card ${isActive ? 'active' : ''}" onclick="setPreset('${key}')" style="--card-color: ${preset.color}">
                <div class="card-header">
                    <span class="card-dot" style="background: ${preset.color}"></span>
                    <span class="card-title">${preset.name}</span>
                    ${isActive ? '<span class="card-badge">已选中</span>' : ''}
                </div>
                <div class="card-params">
                    <span class="param-tag">α ${(p.alpha * 100).toFixed(2)}%</span>
                    <span class="param-tag">β ${(p.beta * 100).toFixed(2)}%</span>
                    <span class="param-tag">δ ${(p.delta * 100).toFixed(2)}%</span>
                </div>
                <div class="card-body">
                    <div class="stat-grid">
                        <div class="stat-item">
                            <span class="stat-label">预估成交电量</span>
                            <span class="stat-value">${summary.expQty.toFixed(0)} MWh</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">加权均价</span>
                            <span class="stat-value">${summary.wAvg.toFixed(0)} 元</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">预估价差收益</span>
                            <span class="stat-value ${summary.profit >= 0 ? 'profit-positive' : 'profit-negative'}">${summary.profit >= 0 ? '+' : ''}${summary.profit.toFixed(0)} 元</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">超时时段</span>
                            <span class="stat-value">${summary.over} 个</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = cardsHTML;
}

// 生成策略摘要
function genStrategySummary(key, ref) {
    const p = tuned || PRESETS[key];
    let expQty = 0, totQty = 0, totW = 0, over = 0;
    
    HOURS.forEach(h => {
        const s = getTotalSigned(h - 1);
        const free = predOutput[h - 1] - s;
        if (free > 0) {
            let q = free * p.alpha;
            if (key === 'aggressive') {
                const sorted = [...ref].sort((a, b) => b - a);
                const hi = sorted[Math.floor(sorted.length * 0.2)];
                if (ref[h - 1] >= hi) q *= 0.6;
            }
            expQty += q;
            totQty += free;
            totW += q * ref[h - 1] * (1 + p.beta);
        } else {
            over++;
        }
    });
    
    return {
        expQty,
        totQty,
        wAvg: totQty > 0 ? totW / expQty : 0,
        profit: expQty * (totQty > 0 ? totW / expQty : 0),
        over
    };
}

// 获取总签约量
function getTotalSigned(h) {
    return signed.daily[h] + signed.intraMonth[h] + signed.month[h] + signed.multiMonth[h] + signed.year[h];
}

// 渲染参数微调面板（精确匹配设计图）
function renderTunePanel() {
    const container = document.getElementById('tune-panel');
    const params = tuned || PRESETS[activePreset];
    
    container.innerHTML = `
        <div class="tune-header">
            <span class="tune-title">微调（${tradeMode === 'daily' ? '日滚动' : TRADE_MODES[tradeMode].name}·${PRESETS[activePreset].name}）参数（即时生效）</span>
        </div>
        <div class="tune-body">
            <div class="tune-item">
                <div class="tune-label-row">
                    <span class="tune-label">申报系数 α</span>
                    <span class="tune-value">${(params.alpha * 100).toFixed(2)}%</span>
                </div>
                <input type="range" min="0" max="100" value="${(params.alpha * 100).toFixed(2) * 100}" step="1"
                       oninput="updateTune('alpha', this.value / 10000)" class="tune-slider">
                <div class="tune-hint">申报电量占剩余可交易量的比例</div>
            </div>
            <div class="tune-item">
                <div class="tune-label-row">
                    <span class="tune-label">报价偏移 β</span>
                    <span class="tune-value">${(params.beta * 100).toFixed(2)}%</span>
                </div>
                <input type="range" min="-1000" max="1000" value="${(params.beta * 10000).toFixed(0)}" step="1"
                       oninput="updateTune('beta', this.value / 10000)" class="tune-slider">
                <div class="tune-hint">报价中枢相对参考价的偏移</div>
            </div>
            <div class="tune-item">
                <div class="tune-label-row">
                    <span class="tune-label">区间宽度 δ</span>
                    <span class="tune-value">${(params.delta * 100).toFixed(2)}%</span>
                </div>
                <input type="range" min="0" max="100" value="${(params.delta * 10000).toFixed(0)}" step="1"
                       oninput="updateTune('delta', this.value / 10000)" class="tune-slider">
                <div class="tune-hint">电价上下限相对中枢的幅度</div>
            </div>
        </div>
    `;
}

// 切换微调面板
function toggleTune() {
    const panel = document.getElementById('tune-panel');
    const btn = document.getElementById('tuneBtn');
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.textContent = '收起参数';
    } else {
        panel.style.display = 'none';
        btn.textContent = '微调参数';
    }
}

// 更新微调参数（即时联动更新）
function updateTune(key, value) {
    if (!tuned) tuned = { ...PRESETS[activePreset] };
    tuned[key] = value;
    renderStrategyCards();
    renderTunePanel();
    renderStrategyTable();
}

// 重置参数（联动恢复默认状态）
function resetTune() {
    tuned = null;
    renderStrategyCards();
    renderTunePanel();
    renderStrategyTable();
}

// 设置交易方式（联动更新所有模块）
function setTradeMode(mode) {
    tradeMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.getElementById('mode-desc').textContent = TRADE_MODES[mode].desc;
    renderStrategyCards();
    renderTunePanel();
    renderStrategyTable();
}

// 设置预设策略（联动更新所有模块）
function setPreset(key) {
    activePreset = key;
    tuned = null;
    renderStrategyCards();
    renderTunePanel();
    renderStrategyTable();
}

// 生成策略并回填（联动更新表格和图表）
function generateStrategy() {
    generated = true;
    document.getElementById('saveBtn').disabled = false;
    renderStrategyTable();
    renderPriceChartWithCenter();
    // 同步更新策略卡片显示状态
    renderStrategyCards();
}

// 渲染策略表格
function renderStrategyTable() {
    const tbody = document.getElementById('strategy-table-body');
    const params = tuned || PRESETS[activePreset];
    const modeName = TRADE_MODES[tradeMode].name;
    const ref = daPrice;
    
    const rowsHTML = HOURS.map(h => {
        const s = getTotalSigned(h - 1);
        const free = predOutput[h - 1] - s;
        
        if (free <= 0) {
            return `<tr class="over-row">
                <td>${h}时</td>
                <td class="editable-cell" data-field="volume">0</td>
                <td class="editable-cell" data-field="price">-</td>
                <td>0</td>
                <td>${modeName}</td>
            </tr>`;
        }
        
        let q = free * params.alpha;
        if (activePreset === 'aggressive') {
            const sorted = [...ref].sort((a, b) => b - a);
            const hi = sorted[Math.floor(sorted.length * 0.2)];
            if (ref[h - 1] >= hi) q *= 0.6;
        }
        
        const mid = ref[h - 1] * (1 + params.beta);
        const low = mid * (1 - params.delta);
        const high = mid * (1 + params.delta);
        
        return `<tr>
            <td>${h}时</td>
            <td class="editable-cell" data-field="volume">${q.toFixed(1)}</td>
            <td class="editable-cell" data-field="price">${Math.round(low)} - ${Math.round(high)}</td>
            <td>${Math.round(50 + Math.random() * 40)}</td>
            <td>${modeName}</td>
        </tr>`;
    }).join('');
    
    tbody.innerHTML = rowsHTML;
    setupEditableCells();
    
    // 检查是否全时段过签
    const overCount = HOURS.filter(h => getTotalSigned(h - 1) >= predOutput[h - 1]).length;
    document.getElementById('over-sign-warning').style.display = overCount === 24 ? 'block' : 'none';
}

// 渲染价格图表（带报价中枢线）
function renderPriceChartWithCenter() {
    const params = tuned || PRESETS[activePreset];
    const centerLine = daPrice.map(p => p * (1 + params.beta));
    
    priceChartOption.series.push({
        name: '报价中枢',
        type: 'line',
        smooth: true,
        data: centerLine,
        symbol: 'none',
        itemStyle: { color: params.color },
        lineStyle: { width: 3 }
    });
    
    priceStrategyChart.setOption(priceChartOption);
}

// 生成收益表格数据
function renderRevenueTable() {
    const tbody = document.getElementById('revenue-table-body');
    const rowsHTML = HOURS.map(h => {
        const d = Math.round(12 + Math.random() * 8);
        const y = Math.round(8 + Math.random() * 5);
        const m = Math.round(10 + Math.random() * 6);
        const mm = Math.round(9 + Math.random() * 5);
        const inM = Math.round(11 + Math.random() * 7);
        const total = Math.round((d + y + m + mm + inM) / 5);
        return `<tr>
            <td>${h}时</td>
            <td>${d.toFixed(2)}</td>
            <td>${y.toFixed(2)}</td>
            <td>${mm.toFixed(2)}</td>
            <td>${m.toFixed(2)}</td>
            <td>${inM.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
        </tr>`;
    }).join('');
    tbody.innerHTML = rowsHTML;
}

// 双击编辑功能
function setupEditableCells() {
    const cells = document.querySelectorAll('.strategy-table .editable-cell');
    cells.forEach(cell => {
        cell.removeEventListener('dblclick', makeCellEditableHandler);
        cell.addEventListener('dblclick', makeCellEditableHandler);
    });
}

function makeCellEditableHandler(e) {
    makeCellEditable(e.target);
}

function makeCellEditable(cell) {
    if (cell.querySelector('input')) return;
    const originalValue = cell.textContent.trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalValue;
    input.style.cssText = 'width: 100%; padding: 8px; border: 1px solid #3b82f6; border-radius: 4px; font-size: 13px; text-align: center;';
    cell.textContent = '';
    cell.appendChild(input);
    input.focus();
    input.select();
    cell.dataset.originalValue = originalValue;
    
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') confirmEdit(cell, input.value);
        else if (e.key === 'Escape') cancelEdit(cell);
    });
    input.addEventListener('blur', () => confirmEdit(cell, input.value));
}

function confirmEdit(cell, newValue) {
    cell.textContent = newValue.trim();
    cell.style.color = '#3b82f6';
    cell.style.fontWeight = '500';
}

function cancelEdit(cell) {
    cell.textContent = cell.dataset.originalValue;
}

function queryData() {
    console.log('查询数据...');
}

// 初始化
renderStrategyCards();
renderStrategyTable();
renderRevenueTable();
renderTunePanel();

// 响应式调整
window.addEventListener('resize', () => {
    volumeAnalysisChart.resize();
    priceStrategyChart.resize();
});