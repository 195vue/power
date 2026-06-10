/* ─── 工具函数 ─── */

/** 生成平滑的15分钟间隔数据（96点），基于1小时间隔的24点做三次插值 */
function interpolate15min(hourlyData) {
    const result = [];
    for (let i = 0; i < 24; i++) {
        const curr = hourlyData[i];
        const next = hourlyData[(i + 1) % 24];
        const diff = next - curr;
        for (let j = 0; j < 4; j++) {
            // Catmull-Rom风格平滑插值
            const t = j / 4;
            const smooth = t * t * (3 - 2 * t); // smoothstep
            result.push(+(curr + diff * smooth).toFixed(3));
        }
    }
    return result;
}

/** 时间标签: 15分钟间隔 96点 */
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

/* ─── 共享渐变颜色 ─── */
const ACCENT = '#2f6feb';
const SUCCESS = '#17a34a';
const WARN = '#eab308';
const DANGER = '#dc2626';

/* ============================================================
   1. 1小时间隔预测对比（升级版）
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
                    const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:6px"></span>`;
                    html += `<div style="display:flex;justify-content:space-between;gap:20px;font-size:12px;padding:2px 0">${dot}${s.seriesName}<span style="font-weight:500;font-variant-numeric:tabular-nums">${s.value} MW</span></div>`;
                });
                return html;
            }
        },
        legend: {
            data: ['实际功率', '超短期功率', '短期功率'],
            top: 0,
            itemWidth: 14,
            itemHeight: 10,
            textStyle: { fontSize: 11, color: '#6b6b6b' }
        },
        grid: { left: 45, right: 16, bottom: 36, top: 38 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: hours,
            axisLine: { lineStyle: { color: '#e5e5e5' } },
            axisTick: { show: false },
            axisLabel: { color: '#999', fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: 'MW',
            nameTextStyle: { fontSize: 10, color: '#999' },
            min: -0.5,
            max: 7,
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10 }
        },
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
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    data: [
                        {
                            type: 'max',
                            name: '峰值',
                            label: {
                                formatter: '峰值 {c} MW',
                                fontSize: 10,
                                color: DANGER,
                                position: 'insideEndTop'
                            },
                            lineStyle: { color: DANGER, type: 'dashed', width: 1 }
                        },
                        {
                            type: 'min',
                            name: '谷值',
                            label: {
                                formatter: '谷值 {c} MW',
                                fontSize: 10,
                                color: ACCENT,
                                position: 'insideEndBottom'
                            },
                            lineStyle: { color: ACCENT, type: 'dashed', width: 1 }
                        }
                    ]
                }
            },
            {
                name: '超短期功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ultraShortHourly,
                lineStyle: { width: 2, type: 'dotted', color: SUCCESS },
                itemStyle: { color: SUCCESS },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: SUCCESS + '25' },
                            { offset: 1, color: SUCCESS + '03' }
                        ]
                    }
                }
            },
            {
                name: '短期功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: shortHourly,
                lineStyle: { width: 2, color: WARN },
                itemStyle: { color: WARN },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: WARN + '20' },
                            { offset: 1, color: WARN + '03' }
                        ]
                    }
                }
            }
        ]
    });
    window._pw1h = chart;
}

/* ============================================================
   2. 15分钟间隔预测对比（带数据缩放）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('power-15min-chart'));
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
                    if (s.seriesName.includes('置信区间')) return;
                    const dot = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.color};margin-right:6px"></span>`;
                    html += `<div style="display:flex;justify-content:space-between;gap:20px;font-size:11px;padding:1px 0">${dot}${s.seriesName}<span style="font-weight:500;font-variant-numeric:tabular-nums">${s.value} MW</span></div>`;
                });
                return html;
            }
        },
        legend: {
            data: ['实际功率', '超短期功率', '短期功率'],
            top: 0,
            itemWidth: 14,
            itemHeight: 10,
            textStyle: { fontSize: 11, color: '#6b6b6b' }
        },
        grid: { left: 42, right: 12, bottom: 56, top: 36 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times15,
            axisLine: { lineStyle: { color: '#e5e5e5' } },
            axisTick: { show: false },
            axisLabel: {
                color: '#999', fontSize: 9,
                interval: 11, // 每3小时显示一个标签
                formatter: v => v.endsWith('00') ? v : ''
            }
        },
        yAxis: {
            type: 'value',
            name: 'MW',
            nameTextStyle: { fontSize: 10, color: '#999' },
            min: -0.5,
            max: 7,
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10, fontVariantNumeric: 'tabular-nums' }
        },
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 25, // 默认显示6小时
                height: 20,
                bottom: 8,
                borderColor: '#e5e5e5',
                backgroundColor: '#fafafa',
                fillerColor: ACCENT + '15',
                handleStyle: { color: ACCENT, borderColor: ACCENT },
                textStyle: { fontSize: 9, color: '#999' },
                labelFormatter: (v) => times15[v] || ''
            },
            {
                type: 'inside',
                start: 0,
                end: 25
            }
        ],
        series: [
            {
                name: '实际功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: actual15,
                lineStyle: { width: 2, color: ACCENT },
                itemStyle: { color: ACCENT },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: ACCENT + '30' },
                            { offset: 1, color: ACCENT + '05' }
                        ]
                    }
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    data: [
                        {
                            type: 'max',
                            name: '峰值',
                            label: { formatter: '峰值 {c} MW', fontSize: 9, color: DANGER, position: 'insideEndTop' },
                            lineStyle: { color: DANGER, type: 'dashed', width: 1 }
                        }
                    ]
                }
            },
            {
                name: '超短期功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ultraShort15,
                lineStyle: { width: 1.5, type: 'dotted', color: SUCCESS },
                itemStyle: { color: SUCCESS }
            },
            {
                name: '短期功率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: short15,
                lineStyle: { width: 1.5, color: WARN },
                itemStyle: { color: WARN }
            }
        ]
    });
    window._pw15 = chart;
}

/* ============================================================
   3. 误差分布图（柱状 + 正态拟合曲线）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('error-distribution-chart'));
    // 模拟误差分布数据（MW）
    const errBins = ['-0.6~-0.4', '-0.4~-0.2', '-0.2~0.0', '0.0~0.2', '0.2~0.4', '0.4~0.6'];
    const errCounts = [2, 8, 22, 28, 12, 4];
    // 正态拟合曲线 y values (中心化)
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
   4. 近7天准确率（升级版）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('accuracy-7days-chart'));
    const dates7 = ['10/21', '10/22', '10/23', '10/24', '10/25', '10/26', '10/27'];
    const shortAcc = [85.2, 86.2, 85.8, 86.5, 86.0, 86.3, 85.8];
    const ultraShortAcc = [92.5, 93.2, 92.8, 93.5, 93.0, 92.8, 93.3];

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
            data: ['短期功率准确率', '超短期功率准确率'],
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
            min: 80,
            max: 100,
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10, fontVariantNumeric: 'tabular-nums' }
        },
        series: [
            {
                name: '超短期功率准确率',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 7,
                data: ultraShortAcc,
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
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    label: { fontSize: 9, color: SUCCESS },
                    data: [{
                        type: 'average',
                        name: '均值',
                        label: { formatter: '均值 {c}%' },
                        lineStyle: { color: SUCCESS, type: 'dashed', width: 1 }
                    }]
                }
            },
            {
                name: '短期功率准确率',
                type: 'line',
                smooth: true,
                symbol: 'diamond',
                symbolSize: 8,
                data: shortAcc,
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
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    label: { fontSize: 9, color: ACCENT },
                    data: [{
                        type: 'average',
                        name: '均值',
                        label: { formatter: '均值 {c}%' },
                        lineStyle: { color: ACCENT, type: 'dashed', width: 1 }
                    }]
                }
            }
        ]
    });
    window._pw7d = chart;
}

/* ============================================================
   5. 近30天准确率趋势（升级版）
   ============================================================ */
{
    const chart = echarts.init(document.getElementById('accuracy-30days-chart'));
    const dates30 = Array.from({length: 30}, (_, i) => {
        const day = i + 1;
        return `9/${String(day).padStart(2, '0')}`;
    });
    const short30 = Array.from({length: 30}, () => +(85 + Math.random() * 2).toFixed(1));
    const ultraShort30 = Array.from({length: 30}, () => +(92 + Math.random() * 2).toFixed(1));

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
            data: ['短期功率准确率', '超短期功率准确率'],
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
            min: 80,
            max: 100,
            splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } },
            axisLabel: { color: '#999', fontSize: 10, fontVariantNumeric: 'tabular-nums' }
        },
        series: [
            {
                name: '超短期功率准确率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: ultraShort30,
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
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    label: { fontSize: 9, color: SUCCESS },
                    data: [{
                        type: 'average',
                        name: '均值',
                        label: { formatter: '均值 {c}%' },
                        lineStyle: { color: SUCCESS, type: 'dashed', width: 1 }
                    }]
                }
            },
            {
                name: '短期功率准确率',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: short30,
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
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    label: { fontSize: 9, color: ACCENT },
                    data: [{
                        type: 'average',
                        name: '均值',
                        label: { formatter: '均值 {c}%' },
                        lineStyle: { color: ACCENT, type: 'dashed', width: 1 }
                    }]
                }
            }
        ]
    });
    window._pw30d = chart;
}

/* ============================================================
   6. 响应式
   ============================================================ */
window.addEventListener('resize', () => {
    ['_pw1h', '_pw15', '_pwErr', '_pw7d', '_pw30d'].forEach(k => {
        if (window[k] && typeof window[k].resize === 'function') window[k].resize();
    });
});

/* ============================================================
   7. 数据表格
   ============================================================ */
const powerDataTableBody = document.getElementById('power-data-table-body');
const powerData = [
    { time: '00:00', actual: 0.2, short: 0.0, ultraShort: 0.15 },
    { time: '01:00', actual: 0.3, short: 0.1, ultraShort: 0.25 },
    { time: '02:00', actual: 0.5, short: 0.3, ultraShort: 0.45 },
    { time: '03:00', actual: 0.8, short: 0.6, ultraShort: 0.75 },
    { time: '04:00', actual: 1.2, short: 0.9, ultraShort: 1.15 },
    { time: '05:00', actual: 1.8, short: 1.6, ultraShort: 1.75 },
    { time: '06:00', actual: 2.5, short: 2.2, ultraShort: 2.45 },
    { time: '07:00', actual: 3.2, short: 2.9, ultraShort: 3.15 },
    { time: '08:00', actual: 4.0, short: 3.6, ultraShort: 3.95 },
    { time: '09:00', actual: 4.8, short: 4.6, ultraShort: 4.75 },
    { time: '10:00', actual: 5.2, short: 5.0, ultraShort: 5.15 },
    { time: '11:00', actual: 5.5, short: 5.3, ultraShort: 5.45 },
    { time: '12:00', actual: 5.8, short: 5.6, ultraShort: 5.75 },
    { time: '13:00', actual: 6.0, short: 5.8, ultraShort: 5.95 },
    { time: '14:00', actual: 5.9, short: 5.7, ultraShort: 5.85 },
    { time: '15:00', actual: 5.7, short: 5.5, ultraShort: 5.65 },
    { time: '16:00', actual: 5.3, short: 5.0, ultraShort: 5.25 },
    { time: '17:00', actual: 4.8, short: 4.6, ultraShort: 4.75 },
    { time: '18:00', actual: 4.2, short: 4.0, ultraShort: 4.15 },
    { time: '19:00', actual: 3.5, short: 3.2, ultraShort: 3.45 },
    { time: '20:00', actual: 2.8, short: 2.5, ultraShort: 2.75 },
    { time: '21:00', actual: 2.0, short: 1.7, ultraShort: 1.95 },
    { time: '22:00', actual: 1.2, short: 0.9, ultraShort: 1.15 },
    { time: '23:00', actual: 0.5, short: 0.2, ultraShort: 0.45 }
];

powerData.slice(0, 10).forEach(row => {
    const tr = document.createElement('tr');
    const deviation = row.actual - row.ultraShort;
    const deviationRate = row.actual !== 0 ? ((deviation / row.actual) * 100).toFixed(1) : '--';
    tr.innerHTML = `
        <td>${row.time}</td>
        <td>${row.actual.toFixed(1)}</td>
        <td>${row.ultraShort.toFixed(1)}</td>
        <td>${deviation.toFixed(2)}</td>
        <td>${deviationRate}</td>
    `;
    powerDataTableBody.appendChild(tr);
});

/* ============================================================
   8. 查询按钮交互
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
   9. 导出报表功能
   ============================================================ */
document.getElementById('export-btn').addEventListener('click', function() {
    let csvContent = '时间,实际功率(MW),预测功率(MW),偏差(MW),偏差率(%)\n';
    powerData.forEach(row => {
        const deviation = row.actual - row.ultraShort;
        const deviationRate = row.actual !== 0 ? (deviation / row.actual * 100).toFixed(1) : '--';
        csvContent += `${row.time},${+(row.actual).toFixed(1)},${+(row.ultraShort).toFixed(1)},${deviation.toFixed(2)},${deviationRate}\n`;
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
