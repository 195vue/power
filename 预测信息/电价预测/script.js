const timeLabels96 = Array.from({length: 96}, (_, i) => {
    const h = Math.floor(i / 4);
    const m = (i % 4) * 15;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});

let chartsInited = false;
let combinedChart, weekForecastChart, mediumLongTermChart;

function showToast(message, type) {
    const toast = document.getElementById('toast-message');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast-message toast-' + type;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function handleQuery() {
    const dateInput = document.getElementById('query-date');
    const dateStr = dateInput.value;
    
    if (!dateStr) {
        showToast('请先选择想要查看的日期', 'error');
        dateInput.focus();
        return;
    }
    
    updateSectionTitles(dateStr);
    
    if (!chartsInited) {
        showSections();
        initCharts();
        fillTables();
        chartsInited = true;
        showToast('已显示 ' + dateStr + ' 的预测数据', 'success');
    } else {
        showToast('已显示 ' + dateStr + ' 的预测数据', 'success');
    }
}

function setTodayDate() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const dateInput = document.getElementById('query-date');
    if (dateInput && !dateInput.value) {
        dateInput.value = todayStr;
    }
}

function updateSectionTitles(dateStr) {
    const d = dateStr || '2026-05-26';
    const titleCombined = document.getElementById('title-combined');
    const titleWeek = document.getElementById('title-week-forecast');
    const titleMedium = document.getElementById('title-medium-long-term');
    if (titleCombined) {
        titleCombined.textContent = '日前现货价格预测（' + d + '）';
    }
    if (titleWeek) {
        titleWeek.textContent = '未来 7 天现货价格预测（' + d + ' 起）单位：元/MWh';
    }
    if (titleMedium) {
        titleMedium.textContent = '中长期电价预测（' + d + ' 起）单位：元/MWh';
    }
}

function showSections() {
    const section1 = document.getElementById('section-combined');
    const section2 = document.getElementById('section-week-forecast');
    const section3 = document.getElementById('section-medium-long-term');
    if (section1) section1.style.display = 'block';
    if (section2) section2.style.display = 'block';
    if (section3) section3.style.display = 'block';
}

function initCharts() {
    const combinedEl = document.getElementById('combined-chart');
    const weekEl = document.getElementById('week-forecast-chart');
    const mediumEl = document.getElementById('medium-long-term-chart');
    
    if (!combinedEl || !weekEl || !mediumEl) {
        setTimeout(initCharts, 50);
        return;
    }
    
    combinedChart = echarts.init(combinedEl);
    const dayAheadLine = [285, 283.2, 281.5, 279.8, 278, 276.5, 275, 273.5, 272, 271.2, 270.5, 269.8, 269, 270.2, 271.5, 272.8, 274, 277, 280, 283, 286, 292.5, 299, 305.5, 312, 323.8, 335.5, 347.2, 359, 370, 381, 392, 403, 409.2, 415.5, 421.8, 428, 430, 432, 434, 436, 434.2, 432.5, 430.8, 429, 425.5, 422, 418.5, 415, 413.5, 412, 410.5, 409, 410, 411, 412, 413, 415.2, 417.5, 419.8, 422, 426, 430, 434, 438, 441.8, 445.5, 449.2, 453, 457.8, 462.5, 467.2, 472, 470.2, 468.5, 466.8, 465, 457.5, 450, 442.5, 435, 425.8, 416.5, 407.2, 398, 388, 378, 368, 358, 347.5, 337, 326.5, 316, 308.2, 300.5, 292.8];

    combinedChart.setOption({
        tooltip: { 
            trigger: 'axis',
            formatter: function(params) {
                let result = '<div style="font-weight:bold;margin-bottom:8px;">' + params[0].axisValue + '</div>';
                params.forEach(item => {
                    const val = item.value.toFixed(2);
                    result += '<div style="display:flex;justify-content:space-between;gap:20px;">' +
                        '<span>' + item.marker + item.seriesName + '</span>' +
                        '<span style="font-weight:bold;">' + val + ' 元/MWh</span>' +
                        '</div>';
                });
                return result;
            }
        },
        legend: {
            data: ['日前预测价格'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: '50', right: '20', bottom: '40', top: '45' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: timeLabels96,
            axisLabel: {
                color: '#999', fontSize: 11,
                formatter: function(v) { return v.endsWith(':00') ? v : ''; }
            }
        },
        yAxis: {
            type: 'value',
            name: '价格(元/MWh)',
            min: 250,
            max: 500,
            axisLabel: { color: '#999', fontSize: 11, formatter: '{value} 元/MWh' }
        },
        series: [{
            name: '日前预测价格',
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: dayAheadLine,
            itemStyle: { color: '#2f6feb' },
            lineStyle: { width: 2 },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(47,111,235,0.2)' },
                        { offset: 1, color: 'rgba(47,111,235,0)' }
                    ]
                }
            }
        }]
    });

    weekForecastChart = echarts.init(weekEl);
    const dates = ['06-29', '06-30', '07-01', '07-02', '07-03', '07-04', '07-05'];

    weekForecastChart.setOption({
        tooltip: { 
            trigger: 'axis',
            formatter: function(params) {
                let result = '<div style="font-weight:bold;margin-bottom:8px;">2026-' + params[0].axisValue + '</div>';
                params.forEach(item => {
                    const val = item.value.toFixed(2);
                    result += '<div style="display:flex;justify-content:space-between;gap:20px;">' +
                        '<span>' + item.marker + item.seriesName + '</span>' +
                        '<span style="font-weight:bold;">' + val + ' 元/MWh</span>' +
                        '</div>';
                });
                return result;
            }
        },
        legend: {
            data: ['最高价', '最低价', '均价'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: '30', right: '15', bottom: '40', top: '50' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '价格(元/MWh)',
            min: 250,
            max: 500,
            axisLabel: { color: '#999', fontSize: 11, formatter: '{value} 元/MWh' }
        },
        series: [
            {
                name: '最高价',
                type: 'line',
                smooth: true,
                data: [475.3, 468.7, 459.2, 472.8, 481.5, 465.9, 458.3],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#dc2626' },
                lineStyle: { width: 2 }
            },
            {
                name: '最低价',
                type: 'line',
                smooth: true,
                data: [269.3, 265.1, 261.8, 268.5, 272.3, 263.7, 259.6],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#999' },
                lineStyle: { width: 2 }
            },
            {
                name: '均价',
                type: 'line',
                smooth: true,
                data: [382.6, 378.9, 372.4, 380.1, 386.7, 375.8, 369.2],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#2f6feb' },
                lineStyle: { width: 2 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(47,111,235,0.15)' },
                            { offset: 1, color: 'rgba(47,111,235,0)' }
                        ]
                    }
                }
            }
        ]
    });

    mediumLongTermChart = echarts.init(mediumEl);
    const months = ['07月', '08月', '09月', '10月', '11月', '12月', '01月', '02月', '03月', '04月', '05月', '06月'];

    mediumLongTermChart.setOption({
        tooltip: { 
            trigger: 'axis',
            formatter: function(params) {
                let result = '<div style="font-weight:bold;margin-bottom:8px;">2026-' + params[0].axisValue + '</div>';
                params.forEach(item => {
                    const val = item.value.toFixed(2);
                    result += '<div style="display:flex;justify-content:space-between;gap:20px;">' +
                        '<span>' + item.marker + item.seriesName + '</span>' +
                        '<span style="font-weight:bold;">' + val + ' 元/MWh</span>' +
                        '</div>';
                });
                return result;
            }
        },
        legend: {
            data: ['最高价', '最低价', '均价'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: '30', right: '15', bottom: '40', top: '50' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: months,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '价格(元/MWh)',
            min: 280,
            max: 450,
            axisLabel: { color: '#999', fontSize: 11, formatter: '{value} 元/MWh' }
        },
        series: [
            {
                name: '最高价',
                type: 'line',
                smooth: true,
                data: [425.6, 438.2, 415.8, 398.5, 385.2, 378.9, 365.5, 358.2, 372.6, 389.5, 405.8, 418.3],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#dc2626' },
                lineStyle: { width: 2 }
            },
            {
                name: '最低价',
                type: 'line',
                smooth: true,
                data: [315.2, 328.6, 305.5, 298.2, 292.5, 288.6, 282.3, 278.5, 285.6, 295.2, 308.5, 318.9],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#999' },
                lineStyle: { width: 2 }
            },
            {
                name: '均价',
                type: 'line',
                smooth: true,
                data: [370.4, 383.4, 360.7, 348.4, 338.9, 333.8, 323.9, 318.4, 329.1, 342.4, 357.2, 368.6],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: { color: '#22c55e' },
                lineStyle: { width: 2 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(34,197,94,0.15)' },
                            { offset: 1, color: 'rgba(34,197,94,0)' }
                        ]
                    }
                }
            }
        ]
    });
}

function fillTables() {
    const dateStr = document.getElementById('forecast-date').value || '2026-05-26';
    
    const dayAheadPrice96 = [286.5, 284.4, 282.4, 280.3, 278.2, 276.6, 275, 273.4, 271.8, 271.2, 270.6, 269.9, 269.3, 270.4, 271.4, 272.4, 273.5, 276.6, 279.6, 282.6, 285.7, 292.4, 299, 305.7, 312.4, 324, 335.6, 347.3, 358.9, 369.8, 380.8, 391.7, 402.6, 409, 415.4, 421.9, 428.3, 430.2, 432, 433.8, 435.7, 434, 432.4, 430.8, 429.1, 425.6, 422.2, 418.8, 415.3, 413.6, 412, 410.3, 408.6, 409.6, 410.7, 411.8, 412.8, 415, 417.2, 419.3, 421.5, 425.7, 429.8, 434, 438.2, 441.8, 445.4, 449.1, 452.7, 457.7, 462.8, 467.8, 472.8, 470.9, 469, 467.2, 465.3, 457.8, 450.2, 442.7, 435.2, 426, 416.8, 407.7, 398.5, 388.4, 378.4, 368.4, 358.3, 347.9, 337.6, 327.2, 316.8, 309.2, 301.6, 294.1];
    const dayAheadDev96 = [2.3, 2.3, 2.4, 2.4, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.7, 2.6, 2.6, 2.6, 2.5, 2.4, 2.4, 2.4, 2.3, 2.2, 2.2, 2.2, 2.2, 2.1, 2.1, 2, 2, 2, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.7, 1.7, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.6, 1.7, 1.8, 1.8, 1.8, 1.9, 2, 2, 2, 2.1, 2.2, 2.2, 2.2];

    const tableBody = document.getElementById('combined-table-body');
    if (!tableBody) return;
    
    for (let i = 0; i < 96; i++) {
        const h = Math.floor(i / 4);
        const m = (i % 4) * 15;
        const timeStr = `${dateStr} ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
        const daPrice = dayAheadPrice96[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${timeStr}</td><td>${daPrice.toFixed(2)}</td><td>[${(daPrice - 8).toFixed(2)}, ${(daPrice + 8).toFixed(2)}]</td><td>${dayAheadDev96[i].toFixed(2)}</td>`;
        tableBody.appendChild(tr);
    }

    const weekForecastTableBody = document.getElementById('week-forecast-table-body');
    if (!weekForecastTableBody) return;
    
    const weekData = [
        { date: '2026-06-29', high: 475.3, low: 269.3, avg: 382.6, volatility: 18.2 },
        { date: '2026-06-30', high: 468.7, low: 265.1, avg: 378.9, volatility: 17.9 },
        { date: '2026-07-01', high: 459.2, low: 261.8, avg: 372.4, volatility: 17.5 },
        { date: '2026-07-02', high: 472.8, low: 268.5, avg: 380.1, volatility: 18.0 },
        { date: '2026-07-03', high: 481.5, low: 272.3, avg: 386.7, volatility: 18.5 },
        { date: '2026-07-04', high: 465.9, low: 263.7, avg: 375.8, volatility: 17.7 },
        { date: '2026-07-05', high: 458.3, low: 259.6, avg: 369.2, volatility: 17.3 }
    ];
    weekData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.date}</td><td>${row.high.toFixed(2)}</td><td>${row.low.toFixed(2)}</td><td>${row.avg.toFixed(2)}</td><td>${row.volatility.toFixed(2)}</td>`;
        weekForecastTableBody.appendChild(tr);
    });

    const mediumLongTermTableBody = document.getElementById('medium-long-term-table-body');
    if (!mediumLongTermTableBody) return;
    
    const mediumData = [
        { month: '2026-07', high: 425.6, low: 315.2, avg: 370.4, volatility: 12.5 },
        { month: '2026-08', high: 438.2, low: 328.6, avg: 383.4, volatility: 13.1 },
        { month: '2026-09', high: 415.8, low: 305.5, avg: 360.7, volatility: 11.8 },
        { month: '2026-10', high: 398.5, low: 298.2, avg: 348.4, volatility: 10.5 },
        { month: '2026-11', high: 385.2, low: 292.5, avg: 338.9, volatility: 9.8 },
        { month: '2026-12', high: 378.9, low: 288.6, avg: 333.8, volatility: 9.2 },
        { month: '2027-01', high: 365.5, low: 282.3, avg: 323.9, volatility: 8.5 },
        { month: '2027-02', high: 358.2, low: 278.5, avg: 318.4, volatility: 8.2 },
        { month: '2027-03', high: 372.6, low: 285.6, avg: 329.1, volatility: 8.8 },
        { month: '2027-04', high: 389.5, low: 295.2, avg: 342.4, volatility: 9.5 },
        { month: '2027-05', high: 405.8, low: 308.5, avg: 357.2, volatility: 10.2 },
        { month: '2027-06', high: 418.3, low: 318.9, avg: 368.6, volatility: 11.0 }
    ];
    mediumData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.month}</td><td>${row.high.toFixed(2)}</td><td>${row.low.toFixed(2)}</td><td>${row.avg.toFixed(2)}</td><td>${row.volatility.toFixed(2)}</td>`;
        mediumLongTermTableBody.appendChild(tr);
    });
}

window.resizeReviewCharts = function() {
    if (combinedChart) combinedChart.resize();
    if (weekForecastChart) weekForecastChart.resize();
    if (mediumLongTermChart) mediumLongTermChart.resize();
};

function initPriceForecast() {
    const queryBtn = document.getElementById('query-btn');
    const dayBtn = document.getElementById('btn-day-ahead');
    
    if (!queryBtn || !dayBtn) {
        setTimeout(initPriceForecast, 50);
        return;
    }
    
    setTodayDate();
    queryBtn.addEventListener('click', handleQuery);

    dayBtn.addEventListener('click', function() {
        const btn = this;
        const scheme = document.getElementById('day-ahead-scheme').value;
        
        if (scheme === '请选择算法方案') {
            showToast('请先选择算法方案', 'error');
            return;
        }
        
        btn.disabled = true;
        btn.textContent = '预测中...';
        
        setTimeout(() => {
            btn.textContent = '日前预测';
            btn.disabled = false;
            const dateStr = document.getElementById('forecast-date').value;
            updateSectionTitles(dateStr);
            if (!chartsInited) {
                showSections();
                initCharts();
                fillTables();
                chartsInited = true;
            }
            showToast('日前预测完成', 'success');
        }, 1500);
    });
    
    handleQuery();
}

initPriceForecast();