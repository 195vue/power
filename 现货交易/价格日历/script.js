// 价格日历 - 完整版

function initPriceCalendar() {
    console.log('价格日历初始化...');
    
    var monthInput = document.getElementById('month-input');
    var monthTitle = document.getElementById('month-title');
    var calendarBody = document.getElementById('calendar-body');
    
    // 检查DOM元素是否存在
    if (!monthInput || !monthTitle || !calendarBody) {
        console.warn('DOM元素未找到，稍后重试...');
        setTimeout(initPriceCalendar, 100);
        return;
    }

    // 模拟数据 - 包含多月份数据
    var priceData = {
        '2026-05': {
            '2026-05-01': { dayAhead: 320.5, realTime: 315.2, high: 340.8, low: 295.2, peakValleySpread: 45.6 },
            '2026-05-02': { dayAhead: 295.8, realTime: 290.5, high: 315.2, low: 270.8, peakValleySpread: 44.4 },
            '2026-05-03': { dayAhead: 310.2, realTime: 305.8, high: 330.5, low: 285.2, peakValleySpread: 45.3 },
            '2026-05-04': { dayAhead: 280.5, realTime: 275.2, high: 300.2, low: 260.5, peakValleySpread: 39.7 },
            '2026-05-05': { dayAhead: 265.2, realTime: 260.8, high: 285.2, low: 245.5, peakValleySpread: 39.7 },
            '2026-05-06': { dayAhead: 290.8, realTime: 285.5, high: 310.5, low: 270.8, peakValleySpread: 39.7 },
            '2026-05-07': { dayAhead: 305.5, realTime: 300.2, high: 325.5, low: 285.2, peakValleySpread: 40.3 },
            '2026-05-08': { dayAhead: 320.8, realTime: 315.5, high: 340.8, low: 295.5, peakValleySpread: 45.3 },
            '2026-05-09': { dayAhead: 335.2, realTime: 330.8, high: 355.5, low: 310.5, peakValleySpread: 45.0 },
            '2026-05-10': { dayAhead: 350.5, realTime: 345.2, high: 370.8, low: 325.5, peakValleySpread: 45.3 },
            '2026-05-11': { dayAhead: 365.8, realTime: 360.5, high: 385.8, low: 340.5, peakValleySpread: 45.3 },
            '2026-05-12': { dayAhead: 380.2, realTime: 375.8, high: 400.5, low: 355.5, peakValleySpread: 45.0 },
            '2026-05-13': { dayAhead: 375.5, realTime: 370.2, high: 395.5, low: 350.5, peakValleySpread: 45.0 },
            '2026-05-14': { dayAhead: 360.8, realTime: 355.5, high: 380.8, low: 335.5, peakValleySpread: 45.3 },
            '2026-05-15': { dayAhead: 345.2, realTime: 340.8, high: 365.5, low: 320.5, peakValleySpread: 45.0 },
            '2026-05-16': { dayAhead: 330.5, realTime: 325.2, high: 350.5, low: 305.2, peakValleySpread: 45.3 },
            '2026-05-17': { dayAhead: 315.8, realTime: 310.5, high: 335.5, low: 290.5, peakValleySpread: 45.0 },
            '2026-05-18': { dayAhead: 300.2, realTime: 295.8, high: 320.5, low: 275.5, peakValleySpread: 45.0 },
            '2026-05-19': { dayAhead: 285.5, realTime: 280.2, high: 305.5, low: 260.2, peakValleySpread: 45.3 },
            '2026-05-20': { dayAhead: 290.8, realTime: 285.5, high: 310.8, low: 265.5, peakValleySpread: 45.3 },
            '2026-05-21': { dayAhead: 305.5, realTime: 300.2, high: 325.5, low: 280.2, peakValleySpread: 45.3 },
            '2026-05-22': { dayAhead: 320.8, realTime: 315.5, high: 340.8, low: 295.5, peakValleySpread: 45.3 },
            '2026-05-23': { dayAhead: 335.2, realTime: 330.8, high: 355.5, low: 310.8, peakValleySpread: 44.7 },
            '2026-05-24': { dayAhead: 350.5, realTime: 345.2, high: 370.8, low: 325.2, peakValleySpread: 45.6 },
            '2026-05-25': { dayAhead: 365.8, realTime: 360.5, high: 385.8, low: 340.5, peakValleySpread: 45.3 },
            '2026-05-26': { dayAhead: 380.2, realTime: 375.8, high: 400.5, low: 355.8, peakValleySpread: 44.7 },
            '2026-05-27': { dayAhead: 375.5, realTime: 370.2, high: 395.5, low: 350.2, peakValleySpread: 45.3 },
            '2026-05-28': { dayAhead: 360.8, realTime: 355.5, high: 380.8, low: 335.5, peakValleySpread: 45.3 },
            '2026-05-29': { dayAhead: 345.2, realTime: 340.8, high: 365.5, low: 320.8, peakValleySpread: 44.7 },
            '2026-05-30': { dayAhead: 330.5, realTime: 325.2, high: 350.5, low: 305.2, peakValleySpread: 45.3 },
            '2026-05-31': { dayAhead: 315.8, realTime: 310.5, high: 335.8, low: 290.5, peakValleySpread: 45.3 }
        },
        '2026-06': {
            '2026-06-01': { dayAhead: 340.2, realTime: 335.8, high: 360.5, low: 315.8, peakValleySpread: 44.7 },
            '2026-06-02': { dayAhead: 355.5, realTime: 350.2, high: 375.5, low: 330.2, peakValleySpread: 45.3 },
            '2026-06-03': { dayAhead: 370.8, realTime: 365.5, high: 390.8, low: 345.5, peakValleySpread: 45.3 },
            '2026-06-04': { dayAhead: 385.2, realTime: 380.8, high: 405.5, low: 360.8, peakValleySpread: 44.7 },
            '2026-06-05': { dayAhead: 378.5, realTime: 373.2, high: 398.5, low: 353.2, peakValleySpread: 45.3 },
            '2026-06-06': { dayAhead: 362.8, realTime: 357.5, high: 382.8, low: 337.5, peakValleySpread: 45.3 },
            '2026-06-07': { dayAhead: 348.2, realTime: 343.8, high: 368.5, low: 323.8, peakValleySpread: 44.7 },
            '2026-06-08': { dayAhead: 335.5, realTime: 330.2, high: 355.5, low: 310.2, peakValleySpread: 45.3 },
            '2026-06-09': { dayAhead: 320.8, realTime: 315.5, high: 340.8, low: 295.5, peakValleySpread: 45.3 },
            '2026-06-10': { dayAhead: 305.2, realTime: 300.8, high: 325.5, low: 280.8, peakValleySpread: 44.7 },
            '2026-06-11': { dayAhead: 290.5, realTime: 285.2, high: 310.5, low: 265.2, peakValleySpread: 45.3 },
            '2026-06-12': { dayAhead: 285.8, realTime: 280.5, high: 305.8, low: 260.5, peakValleySpread: 45.3 },
            '2026-06-13': { dayAhead: 295.2, realTime: 290.8, high: 315.5, low: 270.8, peakValleySpread: 44.7 },
            '2026-06-14': { dayAhead: 310.5, realTime: 305.2, high: 330.8, low: 285.2, peakValleySpread: 45.6 },
            '2026-06-15': { dayAhead: 325.8, realTime: 320.5, high: 345.8, low: 300.5, peakValleySpread: 45.3 },
            '2026-06-16': { dayAhead: 340.2, realTime: 335.8, high: 360.5, low: 315.8, peakValleySpread: 44.7 },
            '2026-06-17': { dayAhead: 355.5, realTime: 350.2, high: 375.5, low: 330.2, peakValleySpread: 45.3 },
            '2026-06-18': { dayAhead: 370.8, realTime: 365.5, high: 390.8, low: 345.5, peakValleySpread: 45.3 },
            '2026-06-19': { dayAhead: 385.2, realTime: 380.8, high: 405.5, low: 360.8, peakValleySpread: 44.7 },
            '2026-06-20': { dayAhead: 398.5, realTime: 393.2, high: 418.5, low: 373.2, peakValleySpread: 45.3 },
            '2026-06-21': { dayAhead: 410.8, realTime: 405.5, high: 430.8, low: 385.5, peakValleySpread: 45.3 },
            '2026-06-22': { dayAhead: 405.2, realTime: 400.8, high: 425.5, low: 380.8, peakValleySpread: 44.7 },
            '2026-06-23': { dayAhead: 390.5, realTime: 385.2, high: 410.5, low: 365.2, peakValleySpread: 45.3 },
            '2026-06-24': { dayAhead: 375.8, realTime: 370.5, high: 395.8, low: 350.5, peakValleySpread: 45.3 },
            '2026-06-25': { dayAhead: 360.2, realTime: 355.8, high: 380.5, low: 335.8, peakValleySpread: 44.7 },
            '2026-06-26': { dayAhead: 345.5, realTime: 340.2, high: 365.5, low: 320.2, peakValleySpread: 45.3 },
            '2026-06-27': { dayAhead: 330.8, realTime: 325.5, high: 350.8, low: 305.5, peakValleySpread: 45.3 },
            '2026-06-28': { dayAhead: 315.2, realTime: 310.8, high: 335.5, low: 290.8, peakValleySpread: 44.7 },
            '2026-06-29': { dayAhead: 300.5, realTime: 295.2, high: 320.5, low: 275.2, peakValleySpread: 45.3 },
            '2026-06-30': { dayAhead: 295.8, realTime: 290.5, high: 315.8, low: 270.5, peakValleySpread: 45.3 }
        },
        '2026-04': {
            '2026-04-01': { dayAhead: 285.5, realTime: 280.2, high: 305.5, low: 260.2, peakValleySpread: 45.3 },
            '2026-04-02': { dayAhead: 295.8, realTime: 290.5, high: 315.8, low: 270.5, peakValleySpread: 45.3 },
            '2026-04-03': { dayAhead: 310.2, realTime: 305.8, high: 330.5, low: 285.8, peakValleySpread: 44.7 },
            '2026-04-04': { dayAhead: 325.5, realTime: 320.2, high: 345.5, low: 300.2, peakValleySpread: 45.3 },
            '2026-04-05': { dayAhead: 340.8, realTime: 335.5, high: 360.8, low: 315.5, peakValleySpread: 45.3 },
            '2026-04-06': { dayAhead: 355.2, realTime: 350.8, high: 375.5, low: 330.8, peakValleySpread: 44.7 },
            '2026-04-07': { dayAhead: 348.5, realTime: 343.2, high: 368.5, low: 323.2, peakValleySpread: 45.3 },
            '2026-04-08': { dayAhead: 332.8, realTime: 327.5, high: 352.8, low: 307.5, peakValleySpread: 45.3 },
            '2026-04-09': { dayAhead: 317.2, realTime: 312.8, high: 337.5, low: 292.8, peakValleySpread: 44.7 },
            '2026-04-10': { dayAhead: 302.5, realTime: 297.2, high: 322.5, low: 277.2, peakValleySpread: 45.3 },
            '2026-04-11': { dayAhead: 287.8, realTime: 282.5, high: 307.8, low: 262.5, peakValleySpread: 45.3 },
            '2026-04-12': { dayAhead: 282.2, realTime: 277.8, high: 302.5, low: 257.8, peakValleySpread: 44.7 },
            '2026-04-13': { dayAhead: 292.5, realTime: 287.2, high: 312.5, low: 267.2, peakValleySpread: 45.3 },
            '2026-04-14': { dayAhead: 307.8, realTime: 302.5, high: 327.8, low: 282.5, peakValleySpread: 45.3 },
            '2026-04-15': { dayAhead: 322.2, realTime: 317.8, high: 342.5, low: 297.8, peakValleySpread: 44.7 },
            '2026-04-16': { dayAhead: 337.5, realTime: 332.2, high: 357.5, low: 312.2, peakValleySpread: 45.3 },
            '2026-04-17': { dayAhead: 352.8, realTime: 347.5, high: 372.8, low: 327.5, peakValleySpread: 45.3 },
            '2026-04-18': { dayAhead: 367.2, realTime: 362.8, high: 387.5, low: 342.8, peakValleySpread: 44.7 },
            '2026-04-19': { dayAhead: 378.5, realTime: 373.2, high: 398.5, low: 353.2, peakValleySpread: 45.3 },
            '2026-04-20': { dayAhead: 372.8, realTime: 367.5, high: 392.8, low: 347.5, peakValleySpread: 45.3 },
            '2026-04-21': { dayAhead: 357.2, realTime: 352.8, high: 377.5, low: 332.8, peakValleySpread: 44.7 },
            '2026-04-22': { dayAhead: 342.5, realTime: 337.2, high: 362.5, low: 317.2, peakValleySpread: 45.3 },
            '2026-04-23': { dayAhead: 327.8, realTime: 322.5, high: 347.8, low: 302.5, peakValleySpread: 45.3 },
            '2026-04-24': { dayAhead: 312.2, realTime: 307.8, high: 332.5, low: 287.8, peakValleySpread: 44.7 },
            '2026-04-25': { dayAhead: 297.5, realTime: 292.2, high: 317.5, low: 272.2, peakValleySpread: 45.3 },
            '2026-04-26': { dayAhead: 292.8, realTime: 287.5, high: 312.8, low: 267.5, peakValleySpread: 45.3 },
            '2026-04-27': { dayAhead: 302.2, realTime: 297.8, high: 322.5, low: 277.8, peakValleySpread: 44.7 },
            '2026-04-28': { dayAhead: 317.5, realTime: 312.2, high: 337.5, low: 292.2, peakValleySpread: 45.3 },
            '2026-04-29': { dayAhead: 332.8, realTime: 327.5, high: 352.8, low: 307.5, peakValleySpread: 45.3 },
            '2026-04-30': { dayAhead: 347.2, realTime: 342.8, high: 367.5, low: 322.8, peakValleySpread: 44.7 }
        }
    };

    // 获取当前日期（从系统时间）
    var currentDate = new Date();

    function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    function formatMonth(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        return year + '-' + month;
    }

    function isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    // 计算分位数
    function calculateQuantiles(values) {
        if (values.length === 0) return { p20: 0, p40: 0, p60: 0, p80: 0 };
        
        var sorted = values.slice().sort(function(a, b) { return a - b; });
        var n = sorted.length;
        
        return {
            p20: sorted[Math.floor(n * 0.2)],
            p40: sorted[Math.floor(n * 0.4)],
            p60: sorted[Math.floor(n * 0.6)],
            p80: sorted[Math.floor(n * 0.8)]
        };
    }

    // 根据价格获取热力颜色
    function getHeatColor(price, quantiles) {
        if (!price || isNaN(price)) return '#ffffff';
        
        if (price <= quantiles.p20) {
            return '#1e40af'; // 深蓝色 - 低价日
        } else if (price <= quantiles.p40) {
            return '#60a5fa'; // 浅蓝色 - 偏低价格
        } else if (price <= quantiles.p60) {
            return '#f3f4f6'; // 浅灰/白色 - 中间水平
        } else if (price <= quantiles.p80) {
            return '#fca5a5'; // 浅红/浅橙 - 偏高价格
        } else {
            return '#dc2626'; // 深红色 - 高价日
        }
    }

    function renderCalendar(monthValue) {
        var parts = monthValue.split('-').map(Number);
        var year = parts[0];
        var month = parts[1];
        monthTitle.textContent = year + '年 ' + month + '月';
        calendarBody.innerHTML = '';

        var firstDay = new Date(year, month - 1, 1);
        var lastDay = new Date(year, month, 0);

        var startDay = firstDay.getDay();
        startDay = startDay === 0 ? 7 : startDay;

        var startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - (startDay - 1));

        // 收集本月所有日前价格用于计算分位数
        var prices = [];
        var monthData = priceData[monthValue];
        if (monthData) {
            for (var key in monthData) {
                if (monthData[key] && monthData[key].dayAhead) {
                    prices.push(monthData[key].dayAhead);
                }
            }
        }
        
        var quantiles = calculateQuantiles(prices);
        var enableHeatMap = prices.length >= 5;

        var weeks = [];
        var currentWeek = [];
        var currentDateIter = new Date(startDate);

        while (currentDateIter <= lastDay || currentWeek.length > 0) {
            var dateStr = formatDate(currentDateIter);
            var isCurrentMonth = currentDateIter.getMonth() === month - 1;
            var isToday = isSameDate(currentDateIter, currentDate);
            var isFuture = currentDateIter > currentDate;

            currentWeek.push({
                day: currentDateIter.getDate(),
                isCurrentMonth: isCurrentMonth,
                isToday: isToday,
                isFuture: isFuture,
                dateStr: dateStr,
                prices: isCurrentMonth && monthData && monthData[dateStr]
            });

            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }

            currentDateIter.setDate(currentDateIter.getDate() + 1);

            if (currentDateIter > lastDay && currentWeek.length > 0 && currentWeek.length < 7) {
                weeks.push(currentWeek);
                break;
            }
        }

        weeks.forEach(function(week) {
            var row = document.createElement('tr');
            week.forEach(function(dayData) {
                var cell = document.createElement('td');
                
                if (!dayData.isCurrentMonth) {
                    cell.className = 'other-month';
                    cell.innerHTML = '<div class="day-number">' + dayData.day + '</div>';
                } else {
                    var dayClass = 'day-number';
                    if (dayData.isToday) dayClass += ' today';
                    if (dayData.isFuture) dayClass += ' future';

                    var priceHtml = '';
                    var tooltipContent = '';
                    var bgColor = '#ffffff';
                    
                    if (dayData.prices) {
                        priceHtml = '<div class="price-info"><div>日前价格: ' + dayData.prices.dayAhead.toFixed(1) + '</div><div>实时价格: ' + dayData.prices.realTime.toFixed(1) + '</div></div>';
                        
                        // 设置悬浮提示
                        tooltipContent = '日前均价: ' + dayData.prices.dayAhead.toFixed(1) + ' 元/MWh\n' +
                                        '实时均价: ' + dayData.prices.realTime.toFixed(1) + ' 元/MWh\n' +
                                        '日内最高价: ' + dayData.prices.high.toFixed(1) + ' 元/MWh\n' +
                                        '日内最低价: ' + dayData.prices.low.toFixed(1) + ' 元/MWh\n' +
                                        '峰谷价差: ' + dayData.prices.peakValleySpread.toFixed(1) + ' 元/MWh';
                        
                        // 热力着色
                        if (enableHeatMap) {
                            bgColor = getHeatColor(dayData.prices.dayAhead, quantiles);
                        }
                    } else {
                        priceHtml = '<div class="price-info"><div>日前价格: --</div><div>实时价格: --</div></div>';
                    }

                    cell.className = 'current-month';
                    cell.innerHTML = '<div class="' + dayClass + '">' + dayData.day + '</div>' + priceHtml;
                    
                    // 设置背景颜色
                    cell.style.backgroundColor = bgColor;
                    
                    // 设置悬浮提示
                    if (tooltipContent) {
                        cell.setAttribute('title', tooltipContent);
                    }

                    // 添加点击跳转功能
                    cell.addEventListener('click', function() {
                        if (dayData.prices) {
                            // 模拟跳转 - 在实际项目中会跳转到现货市场页面
                            console.log('跳转到现货市场页面，日期: ' + dayData.dateStr);
                            alert('点击了日期: ' + dayData.dateStr + '\n在实际项目中会跳转到现货市场页面查看详情');
                        }
                    });
                }
                
                row.appendChild(cell);
            });
            calendarBody.appendChild(row);
        });
    }

    // 初始化月份选择器为当前月份
    var currentMonth = formatMonth(currentDate);
    if (priceData[currentMonth]) {
        monthInput.value = currentMonth;
    } else {
        monthInput.value = '2026-05';
    }

    monthInput.addEventListener('change', function() {
        renderCalendar(this.value);
    });

    renderCalendar(monthInput.value);
    console.log('价格日历初始化完成');
}

// 启动初始化 - 使用延迟确保DOM就绪
setTimeout(initPriceCalendar, 50);