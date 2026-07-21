/* ─── 工具函数 ─── */

function interpolate15min(hourlyData) {
    const result = [];
    for (let i = 0; i < 24; i++) {
        const curr = hourlyData[i];
        const next = hourlyData[(i + 1) % 24];
        const diff = next - curr;
        for (let j = 0; j < 4; j++) {
            const t = j / 4;
            const smooth = t * t * (3 - 2 * t);
            result.push(+(curr + diff * smooth).toFixed(3));
        }
    }
    return result;
}

function timeLabels15min() {
    const labels = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            labels.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
        }
    }
    return labels;
}

/* ─── 基础数据 ─── */
const hours = Array.from({length: 24}, (_, i) => `${String(i).padStart(2, '0')}:00`);
const times15 = timeLabels15min();

const actualHourly = [0.2, 0.3, 0.5, 0.8, 1.2, 1.8, 2.5, 3.2, 4.0, 4.8, 5.2, 5.5, 5.8, 6.0, 5.9, 5.7, 5.3, 4.8, 4.2, 3.5, 2.8, 2.0, 1.2, 0.5];
const ultraShortHourly = [0.15, 0.25, 0.45, 0.75, 1.15, 1.75, 2.45, 3.15, 3.95, 4.75, 5.15, 5.45, 5.75, 5.95, 5.85, 5.65, 5.25, 4.75, 4.15, 3.45, 2.75, 1.95, 1.15, 0.45];
const shortHourly = [0.0, 0.1, 0.3, 0.6, 0.9, 1.6, 2.2, 2.9, 3.6, 4.6, 5.0, 5.3, 5.6, 5.8, 5.7, 5.5, 5.0, 4.6, 4.0, 3.2, 2.5, 1.7, 0.9, 0.2];

const actual15 = interpolate15min(actualHourly);
const ultraShort15 = interpolate15min(ultraShortHourly);
const short15 = interpolate15min(shortHourly);

// 计算误差百分比数据
function calcRMSEPercent(actual, forecast) {
    return actual.map((a, i) => {
        const f = forecast[i];
        if (a === 0) return 0;
        return +(Math.abs(a - f) / a * 100).toFixed(2);
    });
}

const rmsePercentHourly = calcRMSEPercent(actualHourly, ultraShortHourly);
const rmsePercent15 = calcRMSEPercent(actual15, ultraShort15);

/* ─── 共享渐变颜色 ─── */
const ACCENT = '#2f6feb';
const SUCCESS = '#17a34a';
const WARN = '#eab308';
const DANGER = '#dc2626';

/* ============================================================
   1. 预测对比曲线（合并为双Y轴图表）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('power-comparison-chart'));
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            textStyle: { fontSize: 12, color: '#111' },
            formatter: function(params) {
                const p = params[0];
                if (!p) return '';
                let html = `<div style="font-weight:600;margin-bottom:4px">${p.axisValue}</div>`;
                params.forEach(s => {
                    if (s.seriesName.includes('误差')) return;
                    const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:6px"></span>`;
                    html += `<div style="display:flex;justify-content:space-between;gap:20px;font-size:12px;padding:2px 0">${dot}${s.seriesName}<span style="font-weight:500;font-variant-numeric:tabular-nums">${s.value} MW</span></div>`;
                });
                const rmse = params.find(p => p.seriesName === '均方根百分比误差');
                if (rmse) {
                    html += `<div style="display:flex;justify-content:space-between;gap:20px;font-size:12px;padding:2px 0;color:#dc2626">均方根百分比误差: <span style="font-weight:500">${rmse.value}%</span></div>`;
                }
                return html;
            }
        },
        legend: {
            data: ['实际功率', '超短期功率', '短期功率', '均方根百分比误差'],
            top: 0,
            itemWidth: 14,
            itemHeight: 10,
            textStyle: { fontSize: 11, color: '#6b6b6b' }
        },
        grid: { left: 45, right: 60, bottom: 36, top: 38 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: hours,
            axisLine: { lineStyle: { color: '#e5e5e5' } },
            axisTick: { show: false },
            axisLabel: { color: '#999', fontSize: 10 }
        },
        yAxis: [
            {
                type: 'value',
                name: '功率 (MW)',
                nameTextStyle: { fontSize: 10, color: '#999' },
                min: -0.5,
                max: 7,
                splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
                axisLabel: { color: '#999', fontSize: 10 }
            },
            {
                type: 'value',
                name: '误差 (%)',
                nameTextStyle: { fontSize: 10, color: '#dc2626' },
                min: 0,
                max: 30,
                splitLine: { show: false },
                axisLabel: { color: '#dc2626', fontSize: 10, formatter: '{value}%' }
            }
        ],
        series: [
            {
                name: '实际功率',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                data: actualHourly,
                lineStyle: { width: 2.5, color: ACCENT },
                itemStyle: { color: ACCENT },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: ACCENT + '30' },
                            { offset: 1, color: ACCENT + '05' }
                        ]
                    }
                }
            },
            {
                name: '超短期功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ultraShortHourly,
                lineStyle: { width: 2, type: 'dotted', color: SUCCESS },
                itemStyle: { color: SUCCESS }
            },
            {
                name: '短期功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: shortHourly,
                lineStyle: { width: 2, color: WARN },
                itemStyle: { color: WARN }
            },
            {
                name: '均方根百分比误差',
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                symbol: 'none',
                data: rmsePercentHourly,
                lineStyle: { width: 2, color: DANGER, type: 'dashed' },
                itemStyle: { color: DANGER },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: DANGER + '20' },
                            { offset: 1, color: DANGER + '03' }
                        ]
                    }
                }
            }
        ]
    });
    window._pw1h = chart;
}

/* ============================================================
   2. 误差分布图（柱状 + 正态拟合曲线）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('error-distribution-chart'));
    const errBins = ['-0.6~-0.4', '-0.4~-0.2', '-0.2~0.0', '0.0~0.2', '0.2~0.4', '0.4~0.6'];
    const errCounts = [2, 8, 22, 28, 12, 4];
    const normCurve = [1.5, 8, 22, 28, 13, 3];

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            textStyle: { fontSize: 12, color: '#111' },
            formatter: function(params) {
                const bar = params.find(p => p.seriesName === '频次');
                const line = params.find(p => p.seriesName === '正态拟合');
                let html = `<div style="font-weight:600;margin-bottom:4px">误差区间 ${params[0].axisValue} MW</div>`;
                if (bar) html += `<div style="font-size:12px">频次: <strong>${bar.value}</strong> 次</div>`;
                if (line) html += `<div style="font-size:12px;color:#999">正态拟合: ${line.value}</div>`;
                return html;
            }
        },
        legend: {
            data: ['频次', '正态拟合'],
            top: 0,
            right: 0,
            itemWidth: 14,
            itemHeight: 10,
            textStyle: { fontSize: 11, color: '#6b6b6b' }
        },
        grid: { left: 42, right: 20, bottom: 32, top: 36 },
        xAxis: {
            type: 'category',
            data: errBins,
            axisLine: { lineStyle: { color: '#e5e5e5' } },
            axisLabel: { color: '#999', fontSize: 10 },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            name: '频次',
            nameTextStyle: { fontSize: 10, color: '#999' },
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10 }
        },
        series: [
            {
                name: '频次',
                type: 'bar',
                barWidth: '50%',
                data: errCounts,
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: ACCENT },
                            { offset: 1, color: ACCENT + '70' }
                        ]
                    }
                },
                emphasis: {
                    itemStyle: {
                        color: ACCENT,
                        shadowBlur: 8,
                        shadowColor: ACCENT + '40'
                    }
                }
            },
            {
                name: '正态拟合',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: normCurve,
                lineStyle: { width: 2, color: DANGER, type: 'dashed' },
                itemStyle: { color: DANGER },
                z: 2
            }
        ]
    });
    window._pwErr = chart;
}

/* ============================================================
   3. 近7天准确率（15分钟、1小时维度数据）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('accuracy-7days-chart'));
    const dates7 = ['10/21', '10/22', '10/23', '10/24', '10/25', '10/26', '10/27'];
    const shortAcc15 = [94.2, 95.1, 94.8, 95.5, 95.0, 95.3, 94.9];
    const ultraShortAcc15 = [97.5, 98.2, 97.8, 98.5, 98.0, 97.8, 98.3];
    const shortAcc1h = [91.2, 92.1, 91.8, 92.5, 92.0, 92.3, 91.9];
    const ultraShortAcc1h = [95.5, 96.2, 95.8, 96.5, 96.0, 95.8, 96.3];

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            textStyle: { fontSize: 12, color: '#111' },
            formatter: function(params) {
                const p = params[0];
                if (!p) return '';
                let html = `<div style="font-weight:600;margin-bottom:4px">${p.axisValue}</div>`;
                params.forEach(s => {
                    const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:6px"></span>`;
                    html += `<div style="display:flex;justify-content:space-between;gap:20px;font-size:12px;padding:2px 0">${dot}${s.seriesName}<span style="font-weight:500;font-variant-numeric:tabular-nums">${s.value}%</span></div>`;
                });
                return html;
            }
        },
        legend: {
            data: ['15min短期准确率', '15min超短期准确率', '1h短期准确率', '1h超短期准确率'],
            top: 0,
            right: 0,
            itemWidth: 14,
            itemHeight: 10,
            textStyle: { fontSize: 11, color: '#6b6b6b' }
        },
        grid: { left: 42, right: 16, bottom: 36, top: 38 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates7,
            axisLine: { lineStyle: { color: '#e5e5e5' } },
            axisTick: { show: false },
            axisLabel: { color: '#999', fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '%',
            nameTextStyle: { fontSize: 10, color: '#999' },
            min: 85,
            max: 100,
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10, fontVariantNumeric: 'tabular-nums' }
        },
        series: [
            {
                name: '15min超短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                data: ultraShortAcc15,
                lineStyle: { width: 2.5, color: SUCCESS },
                itemStyle: { color: SUCCESS },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: SUCCESS + '30' },
                            { offset: 1, color: SUCCESS + '05' }
                        ]
                    }
                }
            },
            {
                name: '15min短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'diamond',
                symbolSize: 8,
                data: shortAcc15,
                lineStyle: { width: 2, color: ACCENT },
                itemStyle: { color: ACCENT },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: ACCENT + '25' },
                            { offset: 1, color: ACCENT + '03' }
                        ]
                    }
                }
            },
            {
                name: '1h超短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                data: ultraShortAcc1h,
                lineStyle: { width: 2, color: SUCCESS, type: 'dashed' },
                itemStyle: { color: SUCCESS }
            },
            {
                name: '1h短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'diamond',
                symbolSize: 6,
                data: shortAcc1h,
                lineStyle: { width: 2, color: ACCENT, type: 'dashed' },
                itemStyle: { color: ACCENT }
            }
        ]
    });
    window._pw7d = chart;
}

/* ============================================================
   4. 近30天准确率趋势（15分钟、1小时维度数据）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('accuracy-30days-chart'));
    const dates30 = Array.from({length: 30}, (_, i) => {
        const day = i + 1;
        return `9/${String(day).padStart(2, '0')}`;
    });
    const short30_15 = Array.from({length: 30}, () => +(93 + Math.random() * 2).toFixed(1));
    const ultraShort30_15 = Array.from({length: 30}, () => +(96 + Math.random() * 2).toFixed(1));
    const short30_1h = Array.from({length: 30}, () => +(90 + Math.random() * 2).toFixed(1));
    const ultraShort30_1h = Array.from({length: 30}, () => +(94 + Math.random() * 2).toFixed(1));

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderColor: '#e5e5e5',
            borderWidth: 1,
            textStyle: { fontSize: 11, color: '#111' },
            formatter: function(params) {
                const p = params[0];
                if (!p) return '';
                let html = `<div style="font-weight:600;margin-bottom:4px">${p.axisValue}</div>`;
                params.forEach(s => {
                    const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:6px"></span>`;
                    html += `<div style="display:flex;justify-content:space-between;gap:20px;font-size:11px;padding:1px 0">${dot}${s.seriesName}<span style="font-weight:500;font-variant-numeric:tabular-nums">${s.value}%</span></div>`;
                });
                return html;
            }
        },
        legend: {
            data: ['15min短期准确率', '15min超短期准确率', '1h短期准确率', '1h超短期准确率'],
            top: 0,
            right: 0,
            itemWidth: 14,
            itemHeight: 10,
            textStyle: { fontSize: 11, color: '#6b6b6b' }
        },
        grid: { left: 42, right: 16, bottom: 36, top: 38 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates30,
            axisLine: { lineStyle: { color: '#e5e5e5' } },
            axisTick: { show: false },
            axisLabel: { color: '#999', fontSize: 9, interval: 4 }
        },
        yAxis: {
            type: 'value',
            name: '%',
            nameTextStyle: { fontSize: 10, color: '#999' },
            min: 85,
            max: 100,
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10, fontVariantNumeric: 'tabular-nums' }
        },
        series: [
            {
                name: '15min超短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ultraShort30_15,
                lineStyle: { width: 2, color: SUCCESS },
                itemStyle: { color: SUCCESS },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: SUCCESS + '20' },
                            { offset: 1, color: SUCCESS + '03' }
                        ]
                    }
                }
            },
            {
                name: '15min短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: short30_15,
                lineStyle: { width: 2, color: ACCENT },
                itemStyle: { color: ACCENT },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: ACCENT + '18' },
                            { offset: 1, color: ACCENT + '03' }
                        ]
                    }
                }
            },
            {
                name: '1h超短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ultraShort30_1h,
                lineStyle: { width: 1.5, color: SUCCESS, type: 'dashed' },
                itemStyle: { color: SUCCESS }
            },
            {
                name: '1h短期准确率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: short30_1h,
                lineStyle: { width: 1.5, color: ACCENT, type: 'dashed' },
                itemStyle: { color: ACCENT }
            }
        ]
    });
    window._pw30d = chart;
}

/* ============================================================
   5. 响应式
   ============================================================ */
window.addEventListener('resize', () => {
    ['_pw1h', '_pwErr', '_pw7d', '_pw30d'].forEach(k => {
        if (window[k] && typeof window[k].resize === 'function') window[k].resize();
    });
});

/* ============================================================
   6. 查询按钮交互
   ============================================================ */
document.getElementById('query-btn').addEventListener('click', function() {
    const btn = this;
    const statusEl = document.getElementById('query-status');
    const originalText = btn.textContent;
    
    btn.textContent = '查询中...';
    btn.disabled = true;
    statusEl.textContent = '';
    
    setTimeout(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        statusEl.textContent = '查询完成';
        statusEl.style.color = '#28a745';
        
        setTimeout(function() {
            statusEl.textContent = '';
        }, 3000);
    }, 1000);
});

/* ============================================================
   7. 导出报表功能
   ============================================================ */
document.getElementById('export-btn').addEventListener('click', function() {
    const powerData = [];
    hours.forEach((time, i) => {
        const actual = actualHourly[i];
        const ultraShort = ultraShortHourly[i];
        const deviation = actual - ultraShort;
        const deviationRate = actual !== 0 ? (deviation / actual * 100).toFixed(1) : '--';
        powerData.push({ time, actual, ultraShort, deviation: deviation.toFixed(2), deviationRate });
    });
    
    let csvContent = '时间,实际功率(MW),超短期功率(MW),偏差(MW),偏差率(%)\n';
    powerData.forEach(row => {
        csvContent += `${row.time},${+(row.actual).toFixed(1)},${+(row.ultraShort).toFixed(1)},${row.deviation},${row.deviationRate}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `功率预测数据_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

/* ============================================================
   8. 误差筛选下拉框交互
   ============================================================ */
document.getElementById('error-filter-select').addEventListener('change', function() {
    const chart = window._pwErr;
    const errBins = ['-0.6~-0.4', '-0.4~-0.2', '-0.2~0.0', '0.0~0.2', '0.2~0.4', '0.4~0.6'];
    
    let errCounts, normCurve;
    if (this.value === 'mae') {
        errCounts = [2, 8, 22, 28, 12, 4];
        normCurve = [1.5, 8, 22, 28, 13, 3];
    } else {
        errCounts = [1, 5, 18, 32, 15, 6];
        normCurve = [0.5, 6, 20, 32, 15, 5];
    }
    
    chart.setOption({
        xAxis: { data: errBins },
        series: [
            { name: '频次', data: errCounts },
            { name: '正态拟合', data: normCurve }
        ]
    });
});