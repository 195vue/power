// 生成2026年3月日历
const calendarBody = document.getElementById('calendar-body');

// 2026年3月1日是星期日，2月有28天
// 日历从2月23日(周一)开始
const calendarData = [
    // 第一行：2月23日-3月1日
    [
        { day: 23, month: 'other', prices: null },
        { day: 24, month: 'other', prices: null },
        { day: 25, month: 'other', prices: null },
        { day: 26, month: 'other', prices: null },
        { day: 27, month: 'other', prices: null },
        { day: 28, month: 'other', prices: null },
        { day: 1, month: 'current', prices: { dayAhead: 0, realTime: 0 } }
    ],
    // 第二行：3月2日-8日
    [
        { day: 2, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 3, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 4, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 5, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 6, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 7, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 8, month: 'current', prices: { dayAhead: 0, realTime: 0 } }
    ],
    // 第三行：3月9日-15日
    [
        { day: 9, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 10, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 11, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 12, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 13, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 14, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 15, month: 'current', prices: { dayAhead: 0, realTime: 0 } }
    ],
    // 第四行：3月16日-22日
    [
        { day: 16, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 17, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 18, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 19, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 20, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 21, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 22, month: 'current', prices: { dayAhead: 0, realTime: 0 } }
    ],
    // 第五行：3月23日-29日
    [
        { day: 23, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 24, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 25, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 26, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 27, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 28, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 29, month: 'current', prices: { dayAhead: 0, realTime: 0 } }
    ],
    // 第六行：3月30日-4月5日
    [
        { day: 30, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 31, month: 'current', prices: { dayAhead: 0, realTime: 0 } },
        { day: 1, month: 'other', prices: null },
        { day: 2, month: 'other', prices: null },
        { day: 3, month: 'other', prices: null },
        { day: 4, month: 'other', prices: null },
        { day: 5, month: 'other', prices: null }
    ]
];

// 生成日历HTML
calendarData.forEach(week => {
    const row = document.createElement('tr');
    week.forEach(dayData => {
        const cell = document.createElement('td');
        
        if (dayData.month === 'other') {
            cell.className = 'other-month';
            cell.innerHTML = `<div class="day-number">${dayData.day}</div>`;
        } else {
            cell.className = 'current-month';
            let priceHtml = '';
            if (dayData.prices) {
                priceHtml = `
                    <div class="price-info">
                        <div>日前价格：${dayData.prices.dayAhead}</div>
                        <div>实时价格：${dayData.prices.realTime}</div>
                    </div>
                `;
            }
            cell.innerHTML = `
                <div class="day-number">${dayData.day}</div>
                ${priceHtml}
            `;
        }
        
        row.appendChild(cell);
    });
    calendarBody.appendChild(row);
});
