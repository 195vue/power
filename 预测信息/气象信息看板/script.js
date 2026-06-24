// 场址点位数据
const SITE_DATA = [
    // 长沙市
    {name: '长沙望城风电场', city: '长沙市', coords: [112.82, 28.38], type: '风电', capacity: 48},
    {name: '长沙宁乡光伏站', city: '长沙市', coords: [112.55, 28.25], type: '光伏', capacity: 35},
    {name: '长沙浏阳风光互补', city: '长沙市', coords: [113.64, 28.16], type: '风电', capacity: 52},
    {name: '长沙星沙分布式光伏', city: '长沙市', coords: [113.08, 28.24], type: '光伏', capacity: 20},
    // 岳阳市
    {name: '岳阳君山风电场', city: '岳阳市', coords: [113.01, 29.45], type: '风电', capacity: 42},
    {name: '岳阳洞庭湖光伏', city: '岳阳市', coords: [112.95, 29.30], type: '光伏', capacity: 60},
    {name: '岳阳临湘风电场', city: '岳阳市', coords: [113.40, 29.50], type: '风电', capacity: 38},
    // 常德市
    {name: '常德桃源风电场', city: '常德市', coords: [111.55, 29.12], type: '风电', capacity: 55},
    {name: '常德鼎城光伏站', city: '常德市', coords: [111.88, 29.05], type: '光伏', capacity: 40},
    {name: '常德津市风电场', city: '常德市', coords: [111.92, 29.42], type: '风电', capacity: 36},
    // 衡阳市
    {name: '衡阳雁峰风电场', city: '衡阳市', coords: [112.40, 26.95], type: '风电', capacity: 45},
    {name: '衡阳耒阳光伏站', city: '衡阳市', coords: [112.70, 26.80], type: '光伏', capacity: 32},
    {name: '衡阳衡山风电场', city: '衡阳市', coords: [112.55, 27.30], type: '风电', capacity: 50},
    // 株洲市
    {name: '株洲炎陵风电场', city: '株洲市', coords: [113.50, 26.55], type: '风电', capacity: 40},
    {name: '株洲醴陵光伏站', city: '株洲市', coords: [113.45, 27.65], type: '光伏', capacity: 28},
    // 湘潭市
    {name: '湘潭韶山光伏站', city: '湘潭市', coords: [112.48, 27.93], type: '光伏', capacity: 25},
    {name: '湘潭湘乡风电场', city: '湘潭市', coords: [112.30, 27.73], type: '风电', capacity: 33},
    // 邵阳市
    {name: '邵阳隆回风电场', city: '邵阳市', coords: [111.05, 27.12], type: '风电', capacity: 48},
    {name: '邵阳武冈光伏站', city: '邵阳市', coords: [110.78, 26.73], type: '光伏', capacity: 30},
    // 益阳市
    {name: '益阳沅江风电场', city: '益阳市', coords: [112.48, 28.84], type: '风电', capacity: 35},
    {name: '益阳桃江光伏站', city: '益阳市', coords: [112.12, 28.52], type: '光伏', capacity: 22},
    // 永州市
    {name: '永州冷水滩风电场', city: '永州市', coords: [111.65, 26.55], type: '风电', capacity: 52},
    {name: '永州江华光伏站', city: '永州市', coords: [111.30, 25.20], type: '光伏', capacity: 38},
    // 怀化市
    {name: '怀化芷江风电场', city: '怀化市', coords: [109.68, 27.45], type: '风电', capacity: 44},
    {name: '怀化麻阳光伏站', city: '怀化市', coords: [109.80, 27.85], type: '光伏', capacity: 26},
    {name: '怀化通道风电场', city: '怀化市', coords: [109.80, 26.15], type: '风电', capacity: 50},
    // 娄底市
    {name: '娄底新化风电场', city: '娄底市', coords: [111.50, 27.75], type: '风电', capacity: 38},
    {name: '娄底涟源光伏站', city: '娄底市', coords: [111.70, 27.68], type: '光伏', capacity: 20},
    // 湘西州
    {name: '湘西凤凰风电场', city: '湘西土家族苗族自治州', coords: [109.42, 28.00], type: '风电', capacity: 42},
    {name: '湘西吉首光伏站', city: '湘西土家族苗族自治州', coords: [109.75, 28.28], type: '光伏', capacity: 24},
    // 张家界市
    {name: '张家界慈利风电场', city: '张家界市', coords: [110.90, 29.45], type: '风电', capacity: 46},
    {name: '张家界武陵源光伏', city: '张家界市', coords: [110.38, 29.32], type: '光伏', capacity: 18},
    // 郴州市
    {name: '郴州北湖风电场', city: '郴州市', coords: [112.90, 25.85], type: '风电', capacity: 54},
    {name: '郴州资兴光伏站', city: '郴州市', coords: [113.20, 25.95], type: '光伏', capacity: 36},
    {name: '郴州宜章风电场', city: '郴州市', coords: [112.80, 25.35], type: '风电', capacity: 42}
];

// ── 省级图表基准数据 ─────────────────────────────────────────────
var PROVINCE_WEATHER_WIND_RT = [4.2, 3.8, 5.5, 7.2, 7.5, 6.0, 5.0];
var PROVINCE_WEATHER_WIND_FC = [4.0, 3.9, 5.8, 7.0, 7.3, 6.2, 5.2];
var PROVINCE_WEATHER_IRR_RT = [0, 0, 300, 750, 700, 200, 0];
var PROVINCE_WEATHER_IRR_FC = [0, 0, 280, 780, 680, 220, 0];
var PROVINCE_POWER_WIND_FC = [280, 300, 450, 520, 500, 480, 350];
var PROVINCE_POWER_WIND_RT = [275, 310, 460, 530, 510, 475, 340];
var PROVINCE_POWER_SOLAR_FC = [0, 0, 150, 320, 300, 100, 0];
var PROVINCE_POWER_SOLAR_RT = [0, 0, 140, 310, 310, 90, 0];
var PROVINCE_STATS = { windAvg: 5.8, windFc: 6.3, dailyEnergy: 289, monthlyEnergy: 1850 };

// 城市基准风速映射
var CITY_WIND_MAP = {
    '长沙市': 3.2, '岳阳市': 2.8, '常德市': 3.5, '衡阳市': 2.5,
    '株洲市': 2.3, '湘潭市': 2.1, '邵阳市': 1.8, '益阳市': 2.9,
    '永州市': 1.5, '怀化市': 1.7, '娄底市': 2.0, '湘西土家族苗族自治州': 1.6,
    '张家界市': 2.4, '郴州市': 1.9
};

// ── 多省份基准风速 ──────────────────────────────────────────────
var PROVINCE_BASE_WIND = {
    '湖南省': 2.5, '广东省': 3.8, '江西省': 2.2, '湖北省': 2.4, '贵州省': 2.0
};

// ── 多省份场站数据（右侧面板） ──────────────────────────────────
var PROVINCE_STATION_DATA = {
    '湖南省': SITE_DATA,
    '广东省': [
        {name: '广州南沙风电场', city: '广州市', type: '风电', capacity: 55},
        {name: '深圳大鹏光伏站', city: '深圳市', type: '光伏', capacity: 40},
        {name: '珠海桂山风电场', city: '珠海市', type: '风电', capacity: 48},
        {name: '东莞麻涌光伏站', city: '东莞市', type: '光伏', capacity: 30},
        {name: '惠州博罗光伏站', city: '惠州市', type: '光伏', capacity: 45},
        {name: '江门台山风电场', city: '江门市', type: '风电', capacity: 50}
    ],
    '江西省': [
        {name: '南昌进贤风电场', city: '南昌市', type: '风电', capacity: 42},
        {name: '九江庐山光伏站', city: '九江市', type: '光伏', capacity: 35},
        {name: '赣州于都风电场', city: '赣州市', type: '风电', capacity: 38},
        {name: '上饶三清山光伏站', city: '上饶市', type: '光伏', capacity: 28},
        {name: '宜春明月山风光互补', city: '宜春市', type: '风光互补', capacity: 45}
    ],
    '湖北省': [
        {name: '武汉东西湖光伏站', city: '武汉市', type: '光伏', capacity: 50},
        {name: '宜昌秭归风电场', city: '宜昌市', type: '风电', capacity: 45},
        {name: '襄阳枣阳光伏站', city: '襄阳市', type: '光伏', capacity: 32},
        {name: '黄冈大别山风电场', city: '黄冈市', type: '风电', capacity: 40},
        {name: '荆州洪湖风光互补', city: '荆州市', type: '风光互补', capacity: 36}
    ],
    '贵州省': [
        {name: '贵阳花溪风电场', city: '贵阳市', type: '风电', capacity: 52},
        {name: '遵义娄山关风电场', city: '遵义市', type: '风电', capacity: 48},
        {name: '六盘水梅花山光伏站', city: '六盘水市', type: '光伏', capacity: 35},
        {name: '毕节威宁风光互补', city: '毕节市', type: '风光互补', capacity: 55},
        {name: '黔西南兴义光伏站', city: '黔西南布依族苗族自治州', type: '光伏', capacity: 30}
    ]
};

// ── 多省份月度预测数据 ──────────────────────────────────────────
var PROVINCE_MONTHLY_FORECAST = {
    '湖南省': [
        {month: '6月', windAvg: 6.2, irradAvg: 580, tempAvg: 26, humidityAvg: 62, energyFc: 5200},
        {month: '7月', windAvg: 5.5, irradAvg: 620, tempAvg: 28, humidityAvg: 58, energyFc: 5800},
        {month: '8月', windAvg: 4.8, irradAvg: 650, tempAvg: 29, humidityAvg: 55, energyFc: 5500}
    ],
    '广东省': [
        {month: '6月', windAvg: 4.5, irradAvg: 720, tempAvg: 30, humidityAvg: 72, energyFc: 4800},
        {month: '7月', windAvg: 3.8, irradAvg: 750, tempAvg: 32, humidityAvg: 70, energyFc: 5200},
        {month: '8月', windAvg: 5.2, irradAvg: 680, tempAvg: 31, humidityAvg: 68, energyFc: 5100}
    ],
    '江西省': [
        {month: '6月', windAvg: 3.8, irradAvg: 620, tempAvg: 27, humidityAvg: 68, energyFc: 3800},
        {month: '7月', windAvg: 3.2, irradAvg: 680, tempAvg: 30, humidityAvg: 65, energyFc: 4200},
        {month: '8月', windAvg: 4.5, irradAvg: 640, tempAvg: 29, humidityAvg: 66, energyFc: 4000}
    ],
    '湖北省': [
        {month: '6月', windAvg: 3.5, irradAvg: 560, tempAvg: 27, humidityAvg: 70, energyFc: 3600},
        {month: '7月', windAvg: 3.0, irradAvg: 600, tempAvg: 30, humidityAvg: 68, energyFc: 4000},
        {month: '8月', windAvg: 4.2, irradAvg: 580, tempAvg: 29, humidityAvg: 65, energyFc: 3800}
    ],
    '贵州省': [
        {month: '6月', windAvg: 5.8, irradAvg: 450, tempAvg: 22, humidityAvg: 75, energyFc: 4500},
        {month: '7月', windAvg: 5.2, irradAvg: 480, tempAvg: 24, humidityAvg: 72, energyFc: 4900},
        {month: '8月', windAvg: 4.5, irradAvg: 500, tempAvg: 25, humidityAvg: 70, energyFc: 4600}
    ]
};

// ── 场站级数据生成（基于场站属性派生出确定性数据） ──────────────
function generateStationData(station) {
    var baseWind = CITY_WIND_MAP[station.city] || 2.5;
    var capFactor = station.capacity / 40;

    // 风速日变化模式：夜间低→午后高→回落
    var windPattern = [0.65, 0.72, 0.92, 1.12, 1.15, 1.02, 0.72];
    var windSpeed = windPattern.map(function(f) {
        return Math.round((baseWind * f * (0.82 + capFactor * 0.18)) * 10) / 10;
    });
    var windFc = windPattern.map(function(f) {
        return Math.round((baseWind * f * (0.80 + capFactor * 0.20) + 0.2) * 10) / 10;
    });

    // 辐照：光伏站有日间曲线，风电站几乎没有
    var isSolar = station.type === '光伏' || station.type === '风光互补';
    var solarCurve = [0, 0, 350, 780, 650, 150, 0];
    var irradiance = isSolar ? solarCurve : [0, 0, 100, 250, 200, 50, 0];
    var irradianceFc = isSolar ? [0, 0, 330, 800, 630, 140, 0] : [0, 0, 90, 230, 180, 40, 0];

    // 功率
    var power, legendPower;
    if (station.type === '风电') {
        var maxP = Math.round(station.capacity * 0.80);
        var peak = baseWind * 1.15;
        power = windSpeed.map(function(ws) { return Math.round(maxP * Math.min(1, ws / peak)); });
        legendPower = ['出力预测', '实时出力'];
    } else if (station.type === '光伏') {
        var maxP = Math.round(station.capacity * 0.75);
        power = irradiance.map(function(irr) { return Math.round(maxP * (irr / 800)); });
        legendPower = ['出力预测', '实时出力'];
    } else {
        // 风光互补
        var wMax = Math.round(station.capacity * 0.4 * 0.80);
        var sMax = Math.round(station.capacity * 0.6 * 0.75);
        var peak = baseWind * 1.15;
        power = windSpeed.map(function(ws, i) {
            return Math.round(wMax * Math.min(1, ws / peak) + sMax * Math.min(1, irradiance[i] / 800));
        });
        legendPower = ['出力预测', '实时出力'];
    }

    var powerFc = power.map(function(v) { return v + Math.round((Math.random() - 0.3) * v * 0.08); });

    // 统计卡
    var avgWind = Math.round(windSpeed.reduce(function(a, b) { return a + b; }) / windSpeed.length * 10) / 10;
    var avgWindFc = Math.round(windFc.reduce(function(a, b) { return a + b; }) / windFc.length * 10) / 10;
    var dailyEn = Math.round(station.capacity * 5.5 + (Math.random() - 0.3) * station.capacity * 2);
    var monthlyEn = Math.round(station.capacity * 150 + (Math.random() - 0.3) * station.capacity * 30);

    return {
        windSpeed: windSpeed, windFc: windFc,
        irradiance: irradiance, irradianceFc: irradianceFc,
        power: power, powerFc: powerFc,
        legendPower: legendPower,
        stats: { windAvg: avgWind, windFc: avgWindFc, dailyEnergy: dailyEn, monthlyEnergy: monthlyEn }
    };
}

// ── 地图模块状态变量（模块级，供 DOMContentLoaded 内外函数共用） ──
var loadedGeo = {};
var currentProvince = '湖南省';

// 从GeoJSON中提取城市中心坐标（使用当前省份的GeoJSON）
function getCityCenter(cityName) {
    var entry = loadedGeo[currentProvince];
    if (!entry || !entry.geoJson) return null;
    var feature = entry.geoJson.features.find(function(f) {
        return f.properties.name === cityName;
    });
    return feature ? (feature.properties.center || null) : null;
}

// ── 右侧面板：场站气象数据生成 ──────────────────────────────────
function getStationWeather(station, province) {
    var baseWind = (PROVINCE_BASE_WIND[province] || 2.5) * (station.capacity / 40);
    var windRt = (baseWind * (0.85 + Math.random() * 0.3)).toFixed(1);
    var windFc = (parseFloat(windRt) * 1.05 + 0.2).toFixed(1);
    var isSolar = station.type === '光伏' || station.type === '风光互补';
    var irradRt = isSolar ? Math.round(400 + Math.random() * 500) : Math.round(50 + Math.random() * 150);
    var irradFc = isSolar ? Math.round(irradRt * 0.95 + 30) : Math.round(irradRt * 0.9 + 10);
    var temp = (22 + Math.random() * 8).toFixed(1);
    return { windRt: windRt, windFc: windFc, irradRt: irradRt, irradFc: irradFc, temp: temp };
}

function renderStationOverview(province, filterCity, highlightStation) {
    var data = PROVINCE_STATION_DATA[province];
    if (!data) { province = '湖南省'; data = PROVINCE_STATION_DATA['湖南省']; }
    var stations = data;
    if (filterCity) {
        stations = stations.filter(function(s) { return s.city === filterCity; });
    }
    var tbody = document.getElementById('overview-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    var totals = { windRt: 0, windFc: 0, irradRt: 0, irradFc: 0 };
    var count = Math.min(stations.length, 20);
    for (var i = 0; i < count; i++) {
        var s = stations[i];
        var w = getStationWeather(s, province);
        var tr = document.createElement('tr');
        if (highlightStation && s.name === highlightStation) tr.className = 'hl-row';
        tr.innerHTML = '<td class="c-name">' + s.name + '</td><td>' + s.type + '</td><td class="c-num">' + w.windRt + '</td><td class="c-num">' + w.windFc + '</td><td class="c-num">' + w.irradRt + '</td><td class="c-num">' + w.irradFc + '</td>';
        tbody.appendChild(tr);
        totals.windRt += parseFloat(w.windRt);
        totals.windFc += parseFloat(w.windFc);
        totals.irradRt += w.irradRt;
        totals.irradFc += w.irradFc;
    }
    var n = count || 1;
    var sr = document.createElement('tr');
    sr.className = 's-row';
    sr.innerHTML = '<td class="c-name">合计/平均</td><td></td><td class="c-num">' + (totals.windRt / n).toFixed(1) + '</td><td class="c-num">' + (totals.windFc / n).toFixed(1) + '</td><td class="c-num">' + Math.round(totals.irradRt / n) + '</td><td class="c-num">' + Math.round(totals.irradFc / n) + '</td>';
    tbody.appendChild(sr);
    var titleEl = document.querySelector('.station-section .section-header h3');
    if (titleEl) titleEl.textContent = '场站气象要素一览' + (filterCity ? ' — ' + filterCity : ' — ' + province);
}

function renderMonthlyForecast(province) {
    var fc = PROVINCE_MONTHLY_FORECAST[province] || PROVINCE_MONTHLY_FORECAST['湖南省'];
    var tbody = document.getElementById('forecast-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    fc.forEach(function(item) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td class="c-name">' + item.month + '</td><td class="c-num">' + item.windAvg.toFixed(1) + '</td><td class="c-num">' + item.irradAvg + '</td><td class="c-num">' + item.tempAvg + '</td><td class="c-num">' + item.humidityAvg + '</td><td class="c-num c-fc">' + item.energyFc + '</td>';
        tbody.appendChild(tr);
    });
}

// 页面加载完成后初始化图表
document.addEventListener('DOMContentLoaded', function() {
    // ── 省份地图配置 ────────────────────────────────────────────────
    var PROVINCE_MAP_CFG = {
        '湖南省': { mapName: 'hunan', file: './hunan.json', center: [111.7, 27.5], windRange: [1.5, 4] },
        '广东省': { mapName: 'guangdong', file: './guangdong.json', center: [113.5, 23.5], windRange: [2.0, 5.5] },
        '江西省': { mapName: 'jiangxi', file: './jiangxi.json', center: [115.9, 27.0], windRange: [1.5, 3.5] },
        '湖北省': { mapName: 'hubei', file: './hubei.json', center: [112.4, 31.0], windRange: [1.5, 4.0] },
        '贵州省': { mapName: 'guizhou', file: './guizhou.json', center: [106.7, 26.5], windRange: [1.8, 4.5] }
    };
    loadedGeo = {};
    currentProvince = '湖南省';

    function loadProvinceGeo(province, callback) {
        var cfg = PROVINCE_MAP_CFG[province];
        if (!cfg) { callback(); return; }
        if (loadedGeo[province]) { callback(); return; }
        // 从预加载的全局变量中读取GeoJSON（避免 file:// CORS 限制）
        var geo = window['geo_' + cfg.mapName];
        if (!geo) {
            console.warn(province + ' GeoJSON 预加载数据未找到');
            callback(); return;
        }
        echarts.registerMap(cfg.mapName, geo);
        var cities = [];
        geo.features.forEach(function(f) { cities.push(f.properties.name); });
        loadedGeo[province] = { cities: cities, geoJson: geo };
        callback();
    }
function startInit() {
        loadProvinceGeo('湖南省', function() {
            initMap('湖南省');
        });
    }

    // 气象要素趋势
    var weatherTrend = echarts.init(document.getElementById('weather-trend-chart'));
    var provinceWeatherOption = {
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['实时风速', '风速预测', '实时辐照', '辐照预测'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: 35, right: 35, bottom: 40, top: 40 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLabel: { color: '#999', fontSize: 11 }
        },
        yAxis: [
            {
                type: 'value',
                name: '风速(m/s)',
                min: 0,
                max: 8,
                position: 'left',
                axisLabel: { color: '#999', fontSize: 11 }
            },
            {
                type: 'value',
                name: '辐照(W/m²)',
                min: 0,
                max: 1000,
                position: 'right',
                axisLabel: { color: '#999', fontSize: 11 }
            }
        ],
        series: [
            {
                name: '实时风速',
                type: 'line',
                smooth: true,
                data: PROVINCE_WEATHER_WIND_RT.slice(),
                itemStyle: { color: '#2f6feb' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 }
            },
            {
                name: '风速预测',
                type: 'line',
                smooth: true,
                data: PROVINCE_WEATHER_WIND_FC.slice(),
                itemStyle: { color: '#faad14' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2, type: 'dashed' }
            },
            {
                name: '实时辐照',
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                data: PROVINCE_WEATHER_IRR_RT.slice(),
                itemStyle: { color: '#dc2626' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 }
            },
            {
                name: '辐照预测',
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                data: PROVINCE_WEATHER_IRR_FC.slice(),
                itemStyle: { color: '#eab308' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2, type: 'dashed' }
            }
        ]
    };
    weatherTrend.setOption(provinceWeatherOption);

    // 新能源出力预测
    var powerForecast = echarts.init(document.getElementById('power-forecast-chart'));
    var provincePowerOption = {
        tooltip: { trigger: 'axis' },
        legend: {
            data: ['风电预测', '风电实时', '光伏预测', '光伏实时'],
            top: 0,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: { fontSize: 11 }
        },
        grid: { left: 30, right: 15, bottom: 40, top: 40 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            axisLabel: { color: '#999', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '功率(MW)',
            min: 0,
            max: 2100,
            axisLabel: { color: '#999', fontSize: 11 }
        },
        series: [
            {
                name: '风电预测',
                type: 'line',
                smooth: true,
                data: PROVINCE_POWER_WIND_FC.slice(),
                itemStyle: { color: '#2f6feb' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 }
            },
            {
                name: '风电实时',
                type: 'line',
                smooth: true,
                data: PROVINCE_POWER_WIND_RT.slice(),
                itemStyle: { color: '#17a34a' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 }
            },
            {
                name: '光伏预测',
                type: 'line',
                smooth: true,
                data: PROVINCE_POWER_SOLAR_FC.slice(),
                itemStyle: { color: '#faad14' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 }
            },
            {
                name: '光伏实时',
                type: 'line',
                smooth: true,
                data: PROVINCE_POWER_SOLAR_RT.slice(),
                itemStyle: { color: '#dc2626' },
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { width: 2 }
            }
        ]
    };
    powerForecast.setOption(provincePowerOption);

    // 初始渲染右侧面板
        renderStationOverview('湖南省', null, null);
        renderMonthlyForecast('湖南省');

        // ── 气象数据源选择器事件 ────────────────────────────────────────
        document.getElementById('data-source-select').addEventListener('change', function() {
            document.getElementById('current-source').textContent = this.options[this.selectedIndex].text;
        });

        // ── 查询数据按钮事件 ────────────────────────────────────────────
        document.getElementById('query-data-btn').addEventListener('click', function() {
            var btn = this;
            var originalText = btn.textContent;
            btn.textContent = '查询中...';
            btn.disabled = true;
            
            setTimeout(function() {
                btn.textContent = '查询完成';
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1500);
        });

        // ── 刷新按钮事件 ────────────────────────────────────────────────
        document.getElementById('refresh-btn').addEventListener('click', function() {
            var now = new Date();
            var timeStr = now.getFullYear() + '-' + 
                         String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                         String(now.getDate()).padStart(2, '0') + ' ' + 
                         String(now.getHours()).padStart(2, '0') + ':' + 
                         String(now.getMinutes()).padStart(2, '0') + ':' + 
                         String(now.getSeconds()).padStart(2, '0');
            document.getElementById('last-update-time').textContent = timeStr;
        });

        

    // ── 地图 drill-down ────────────────────────────────────────────
    var mapChart, drillLevel = 'province', currentCity = null;
    var selectedSite = null;
    var statValueEls = document.querySelectorAll('.stat-value');
    var chartTitleEls = document.querySelectorAll('.chart-title');

    function updateRightPanel() {
        var p = currentProvince;
        renderStationOverview(p, !selectedSite && drillLevel === 'city' ? currentCity : null, selectedSite ? selectedSite.name : null);
        renderMonthlyForecast(p);
    }

    // 获取当前省份的 GeoJSON 数据
    function getCurrentGeo() {
        var entry = loadedGeo[currentProvince];
        return entry ? entry.geoJson : null;
    }

    function buildCityWindData(province) {
        var geo = loadedGeo[province];
        if (!geo || !geo.geoJson) return [];
        var baseWind = PROVINCE_BASE_WIND[province] || 2.5;
        return geo.geoJson.features.map(function(f) {
            var cName = f.properties.name;
            var hash = cName.charCodeAt(0) + (cName.charCodeAt(cName.length - 1) || 0);
            var offset = ((hash % 20) - 10) / 10 * 1.2;
            return { name: cName, value: Math.round((baseWind + offset) * 10) / 10 };
        });
    }

    function getStationSites(province) {
        if (province !== '湖南省') return [];
        return SITE_DATA.map(function(s) {
            return { value: s.coords.concat([s.capacity]), name: s.name, type: s.type };
        });
    }

    function initMap(province) {
        var cfg = PROVINCE_MAP_CFG[province];
        if (!cfg || !loadedGeo[province]) { console.log('waiting geo', province); setTimeout(function() { initMap(province); }, 500); return; }
        if (!echarts.getMap(cfg.mapName)) { console.log('waiting map reg', cfg.mapName); setTimeout(function() { initMap(province); }, 500); return; }
        try {
            var el = document.getElementById('map-chart');
            if (!el) { console.log('waiting dom'); setTimeout(function() { initMap(province); }, 500); return; }
            if (!mapChart) mapChart = echarts.init(el);
            else mapChart.clear();

            var cityWindData = buildCityWindData(province);
            var windRange = cfg.windRange || [1.5, 4];

            mapChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if (params.seriesType === 'scatter') {
                            var cap = params.value ? params.value[2] : '';
                            var ptype = params.data ? (params.data.type || '') : '';
                            return '<strong>' + params.name + '</strong><br/>类型：' + ptype + '<br/>容量：' + cap + ' MW';
                        }
                        if (params.name) {
                            var val = params.value || '--';
                            return params.name + '<br/>平均风速：' + val + ' m/s';
                        }
                        return '';
                    }
                },
                visualMap: {
                    min: windRange[0],
                    max: windRange[1],
                    calculable: true,
                    inRange: { color: ['#e0f3ff', '#87ceeb', '#4682b4', '#1e3a8a', '#0d1b2a'] },
                    orient: 'vertical',
                    left: 'left',
                    bottom: 'bottom',
                    text: ['高', '低'],
                    textStyle: { fontSize: 11, color: '#666' }
                },
                geo: {
                    map: cfg.mapName,
                    roam: true,
                    center: cfg.center,
                    zoom: 1,
                    label: { show: true, fontSize: 10, color: '#333' },
                    itemStyle: { areaColor: '#e0f3ff', borderColor: '#fff', borderWidth: 1 },
                    emphasis: {
                        label: { color: '#111', fontWeight: 'bold' },
                        itemStyle: { areaColor: '#f0f8ff' }
                    }
                },
                series: [{
                    id: 'map-series',
                    type: 'map',
                    geoIndex: 0,
                    data: cityWindData,
                    selectedMode: false
                }]
            });

            // 注册地图点击事件（省市钻取）

            mapChart.off('click');
            mapChart.on('click', function(params) {
                if (params.componentType === 'series' && params.seriesType === 'map' && (drillLevel === 'province' || drillLevel === 'city')) {
                    drillToCity(params.name);
                }
            });
            mapChart.on('click', function(params) {
                if (params.componentType === 'series' && params.seriesType === 'scatter' && params.name) {
                    var found = null;
                    for (var i = 0; i < SITE_DATA.length; i++) {
                        if (SITE_DATA[i].name === params.name) { found = SITE_DATA[i]; break; }
                    }
                    if (found) updateForStation(found);
                }
            });

        } catch (error) {
            console.warn('地图初始化失败:', error);
        }
    }

    // 按钮事件只绑定一次
    document.getElementById('drill-back-btn').addEventListener('click', backToProvince);
    document.getElementById('clear-site-btn').addEventListener('click', clearStationSelection);

    // 更新气象预测标题
    function updateForecastTitle(regionName) {
        var titleEl = document.getElementById('forecast-region');
        if (titleEl) {
            titleEl.textContent = regionName;
        }
    }

    // ── 省份切换 ──────────────────────────────────────────────────
    function switchMapProvince(province) {
        if (province === currentProvince && mapChart) return;
        currentProvince = province;
        drillLevel = 'province';
        currentCity = null;
        clearStationSelection();
        document.getElementById('drill-indicator').style.display = 'none';
        document.getElementById('map-province-title').textContent = province;
        document.getElementById('drill-path-label').textContent = province;
        updateForecastTitle(province);

        if (loadedGeo[province]) {
            initMap(province);
            return;
        }
        loadProvinceGeo(province, function() {
            initMap(province);
        });
    }

    // 地图省份切换事件
    document.getElementById('map-province-select').addEventListener('change', function() {
        var province = this.value;
        if (drillLevel === 'city' || selectedSite) {
            backToProvince();
        }
        renderStationOverview(province, null, null);
        renderMonthlyForecast(province);
        switchMapProvince(province);
    });

    function generateCityData(cityName) {
        if (currentProvince !== '湖南省') {
            var base = PROVINCE_BASE_WIND[currentProvince] || 2.5;
            return {
                windSpeed: [3.5, 3.2, 4.8, 6.5, 6.8, 5.5, 4.5].map(function(v) { return Math.round((v * base / 2.5) * 10) / 10; }),
                windFc: [3.3, 3.3, 5.0, 6.3, 6.6, 5.7, 4.7].map(function(v) { return Math.round((v * base / 2.5) * 10) / 10; }),
                irradiance: [0, 0, 280, 700, 650, 180, 0],
                irradianceFc: [0, 0, 260, 720, 630, 200, 0],
                power: [220, 240, 380, 460, 440, 410, 290],
                stats: { windAvg: Math.round(base * 10) / 10, windFc: Math.round((base * 1.1) * 10) / 10, dailyEnergy: 180, monthlyEnergy: 1200 }
            };
        }
        var citySites = SITE_DATA.filter(function(s) { return s.city === cityName; });
        if (citySites.length === 0) return null;

        var allData = citySites.map(function(s) { return generateStationData(s); });

        var avgWind = allData.reduce(function(s, d) { return s + d.stats.windAvg; }, 0) / allData.length;
        var avgWindFc = allData.reduce(function(s, d) { return s + d.stats.windFc; }, 0) / allData.length;
        var dailyEn = allData.reduce(function(s, d) { return s + d.stats.dailyEnergy; }, 0);
        var monthlyEn = allData.reduce(function(s, d) { return s + d.stats.monthlyEnergy; }, 0);

        var n = allData[0].windSpeed.length;
        var windSpeed = new Array(n).fill(0);
        var windFc = new Array(n).fill(0);
        var irrad = new Array(n).fill(0);
        var irradFc = new Array(n).fill(0);
        allData.forEach(function(d) {
            for (var i = 0; i < n; i++) {
                windSpeed[i] += d.windSpeed[i] / allData.length;
                windFc[i] += d.windFc[i] / allData.length;
                irrad[i] += d.irradiance[i] / allData.length;
                irradFc[i] += d.irradianceFc[i] / allData.length;
            }
        });

        var powerSum = new Array(n).fill(0);
        allData.forEach(function(d) {
            for (var i = 0; i < n; i++) powerSum[i] += d.power[i];
        });

        return {
            windSpeed: windSpeed.map(function(v) { return Math.round(v * 10) / 10; }),
            windFc: windFc.map(function(v) { return Math.round(v * 10) / 10; }),
            irradiance: irrad.map(function(v) { return Math.round(v); }),
            irradianceFc: irradFc.map(function(v) { return Math.round(v); }),
            power: powerSum,
            stats: { windAvg: Math.round(avgWind * 10) / 10, windFc: Math.round(avgWindFc * 10) / 10, dailyEnergy: Math.round(dailyEn), monthlyEnergy: Math.round(monthlyEn) }
        };
    }

    function drillToCity(cityName) {
        if (currentProvince !== '湖南省') {
            drillLevel = 'city';
            currentCity = cityName;
            var dn = cityName.replace('市', '').replace('土家族苗族自治州', '州').replace('湘西州', '湘西');
            document.getElementById('drill-current').textContent = dn;
            document.getElementById('drill-indicator').style.display = 'flex';
            updateForecastTitle(cityName);
            updateRightPanel();
            return;
        }
        clearStationSelection();
        var center = getCityCenter(cityName);
        if (!center) return;

        drillLevel = 'city';
        currentCity = cityName;

        var displayName = cityName.replace('市', '').replace('土家族苗族自治州', '州').replace('湘西州', '湘西');
        document.getElementById('drill-current').textContent = displayName;
        document.getElementById('drill-indicator').style.display = 'flex';
        updateForecastTitle(cityName);

        var citySites = SITE_DATA.filter(function(s) { return s.city === cityName; });

        // 更新地图：聚焦到城市，隐藏热力图，显示场址点位
        mapChart.setOption({
            visualMap: { show: false },
            geo: {
                center: center,
                zoom: 6.5
            },
            series: [
                { id: 'map-series' },
                {
                    id: 'scatter-series',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: 18,
                    zlevel: 2,
                    label: { show: true, formatter: '{b}', position: 'right', fontSize: 10, color: '#1a1a2e' },
                    itemStyle: { color: '#dc2626' },
                    emphasis: { label: { show: true, fontWeight: 'bold' }, itemStyle: { color: '#ef4444' } },
                    tooltip: {
                        formatter: function(params) {
                            if (!params || !params.data) return '';
                            var cap = params.data.value ? params.data.value[2] : '';
                            var ptype = params.data.type || '';
                            return '<strong>' + params.name + '</strong><br/>类型：' + ptype + '<br/>容量：' + cap + ' MW';
                        }
                    },
                    data: citySites.map(function(s) { return { value: s.coords.concat([s.capacity]), name: s.name, type: s.type }; })
                }
            ]
        });

        var cityData = generateCityData(cityName);
        if (!cityData) return;

        statValueEls[0].innerHTML = cityData.stats.windAvg + '<span class="stat-unit">m/s</span>';
        statValueEls[1].innerHTML = cityData.stats.windFc + '<span class="stat-unit">m/s</span>';
        statValueEls[2].innerHTML = cityData.stats.dailyEnergy + '<span class="stat-unit">MWh</span>';
        statValueEls[3].innerHTML = cityData.stats.monthlyEnergy + '<span class="stat-unit">MWh</span>';

        chartTitleEls[0].textContent = displayName + ' — 气象要素趋势';
        chartTitleEls[1].textContent = displayName + ' — 出力预测曲线';

        weatherTrend.setOption({
            series: [
                { name: '实时风速', data: cityData.windSpeed, itemStyle: { color: '#2f6feb' } },
                { name: '风速预测', data: cityData.windFc, itemStyle: { color: '#faad14' } },
                { name: '实时辐照', data: cityData.irradiance, itemStyle: { color: '#dc2626' } },
                { name: '辐照预测', data: cityData.irradianceFc, itemStyle: { color: '#eab308' } }
            ]
        });

        var powerMax = Math.max.apply(null, cityData.power);
        powerForecast.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['出力预测', '实时出力'], top: 0, itemWidth: 14, itemHeight: 14, textStyle: { fontSize: 11 } },
            grid: { left: 30, right: 15, bottom: 40, top: 40 },
            xAxis: { type: 'category', boundaryGap: false, data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'], axisLabel: { color: '#999', fontSize: 11 } },
            yAxis: { type: 'value', name: '功率(MW)', min: 0, max: Math.max(powerMax + 50, 100), axisLabel: { color: '#999', fontSize: 11 } },
            series: [
                { name: '出力预测', type: 'line', smooth: true, data: cityData.power, itemStyle: { color: '#2f6feb' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } },
                { name: '实时出力', type: 'line', smooth: true, data: cityData.power.map(function(v) { return v + Math.round((Math.random() - 0.3) * v * 0.08); }), itemStyle: { color: '#17a34a' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } }
            ]
        }, true);
        updateRightPanel();
    }

    function backToProvince() {
        drillLevel = 'province';
        currentCity = null;
        clearStationSelection();

        document.getElementById('drill-indicator').style.display = 'none';
        updateForecastTitle(currentProvince);

        var cfg = PROVINCE_MAP_CFG[currentProvince];

        mapChart.setOption({
            visualMap: { show: true },
            geo: {
                center: cfg.center,
                zoom: 1
            },
            series: [
                { id: 'map-series', data: buildCityWindData(currentProvince) },
                { id: 'scatter-series', type: 'scatter', coordinateSystem: 'geo', symbol: 'pin', data: [] }
            ]
        });
        updateRightPanel();
    }

    // ── 场站选中：更新统计卡 + 图表 ─────────────────────────────────
    function updateForStation(site) {
        selectedSite = site;
        var data = generateStationData(site);

        // 更新选中栏
        document.getElementById('selected-site-name').textContent = site.name;
        document.getElementById('selected-site-meta').textContent = site.type + ' | 容量 ' + site.capacity + ' MW | ' + site.city;
        document.getElementById('selected-site-bar').style.display = 'flex';

        // 更新统计卡
        statValueEls[0].innerHTML = data.stats.windAvg + '<span class="stat-unit">m/s</span>';
        statValueEls[1].innerHTML = data.stats.windFc + '<span class="stat-unit">m/s</span>';
        statValueEls[2].innerHTML = data.stats.dailyEnergy + '<span class="stat-unit">MWh</span>';
        statValueEls[3].innerHTML = data.stats.monthlyEnergy + '<span class="stat-unit">MWh</span>';

        // 更新图表标题
        chartTitleEls[0].textContent = site.name + ' — 气象要素趋势';
        chartTitleEls[1].textContent = site.name + ' — 出力预测曲线';

        // 更新气象趋势图（用 merge 模式只更新 series，保留原有轴配置）
        weatherTrend.setOption({
            series: [
                { name: '实时风速', data: data.windSpeed, itemStyle: { color: '#2f6feb' } },
                { name: '风速预测', data: data.windFc, itemStyle: { color: '#faad14' } },
                { name: '实时辐照', data: data.irradiance, itemStyle: { color: '#dc2626' } },
                { name: '辐照预测', data: data.irradianceFc, itemStyle: { color: '#eab308' } }
            ]
        });

        // 更新出力预测图（根据场站类型动态调整系列）
        var isSolar = site.type === '光伏' || site.type === '风光互补';
        var isWind = site.type === '风电' || site.type === '风光互补';
        var powerLegend = [];
        var powerSeries = [];

        if (isSolar) { powerLegend.push('光伏出力'); powerSeries.push({ name: '光伏出力', type: 'line', smooth: true, data: data.power, itemStyle: { color: '#faad14' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } }); }
        if (isWind) { powerLegend.push('风电出力'); powerSeries.push({ name: '风电出力', type: 'line', smooth: true, data: data.power, itemStyle: { color: '#2f6feb' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } }); }
        if (site.type === '风光互补') {
            // 分别展示风电和光伏贡献
            var wMax = Math.round(site.capacity * 0.4 * 0.80);
            var sMax = Math.round(site.capacity * 0.6 * 0.75);
            var baseWind = CITY_WIND_MAP[site.city] || 2.5;
            var peak = baseWind * 1.15;
            var windData = data.windSpeed.map(function(ws) { return Math.round(wMax * Math.min(1, ws / peak)); });
            var solarData = data.irradiance.map(function(irr) { return Math.round(sMax * Math.min(1, irr / 800)); });
            powerSeries = [
                { name: '风电出力', type: 'line', smooth: true, data: windData, itemStyle: { color: '#2f6feb' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } },
                { name: '光伏出力', type: 'line', smooth: true, data: solarData, itemStyle: { color: '#faad14' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } }
            ];
            powerLegend = ['风电出力', '光伏出力'];
        }

        var powerYMax = isWind && !isSolar ? Math.round(site.capacity * 0.9) :
                        isSolar && !isWind ? Math.round(site.capacity * 0.85) :
                        Math.round(site.capacity * 0.95) + 10;

        powerForecast.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: powerLegend, top: 0, itemWidth: 14, itemHeight: 14, textStyle: { fontSize: 11 } },
            grid: { left: 30, right: 15, bottom: 40, top: 40 },
            xAxis: { type: 'category', boundaryGap: false, data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'], axisLabel: { color: '#999', fontSize: 11 } },
            yAxis: { type: 'value', name: '功率(MW)', min: 0, max: Math.max(powerYMax, 10), axisLabel: { color: '#999', fontSize: 11 } },
            series: powerSeries
        }, true);
        updateRightPanel();
    }

    function clearStationSelection() {
        if (!selectedSite) return;
        selectedSite = null;

        // 隐藏选中栏
        document.getElementById('selected-site-bar').style.display = 'none';

        // 恢复统计卡
        statValueEls[0].innerHTML = PROVINCE_STATS.windAvg + '<span class="stat-unit">m/s</span>';
        statValueEls[1].innerHTML = PROVINCE_STATS.windFc + '<span class="stat-unit">m/s</span>';
        statValueEls[2].innerHTML = PROVINCE_STATS.dailyEnergy + '<span class="stat-unit">MWh</span>';
        statValueEls[3].innerHTML = PROVINCE_STATS.monthlyEnergy + '<span class="stat-unit">MWh</span>';

        // 恢复图表标题
        chartTitleEls[0].textContent = '全省气象要素趋势';
        chartTitleEls[1].textContent = '新能源出力预测曲线';

        // 恢复气象趋势图（merge 模式，保留轴配置）
        weatherTrend.setOption({
            series: [
                { name: '实时风速', data: PROVINCE_WEATHER_WIND_RT, itemStyle: { color: '#2f6feb' } },
                { name: '风速预测', data: PROVINCE_WEATHER_WIND_FC, itemStyle: { color: '#faad14' } },
                { name: '实时辐照', data: PROVINCE_WEATHER_IRR_RT, itemStyle: { color: '#dc2626' } },
                { name: '辐照预测', data: PROVINCE_WEATHER_IRR_FC, itemStyle: { color: '#eab308' } }
            ]
        });

        // 恢复出力预测图（完整配置 + notMerge，确保系列被完全替换）
        powerForecast.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['风电预测', '风电实时', '光伏预测', '光伏实时'], top: 0, itemWidth: 14, itemHeight: 14, textStyle: { fontSize: 11 } },
            grid: { left: 30, right: 15, bottom: 40, top: 40 },
            xAxis: { type: 'category', boundaryGap: false, data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'], axisLabel: { color: '#999', fontSize: 11 } },
            yAxis: { type: 'value', name: '功率(MW)', min: 0, max: 2100, axisLabel: { color: '#999', fontSize: 11 } },
            series: [
                { name: '风电预测', type: 'line', smooth: true, data: PROVINCE_POWER_WIND_FC, itemStyle: { color: '#2f6feb' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } },
                { name: '风电实时', type: 'line', smooth: true, data: PROVINCE_POWER_WIND_RT, itemStyle: { color: '#17a34a' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } },
                { name: '光伏预测', type: 'line', smooth: true, data: PROVINCE_POWER_SOLAR_FC, itemStyle: { color: '#faad14' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } },
                { name: '光伏实时', type: 'line', smooth: true, data: PROVINCE_POWER_SOLAR_RT, itemStyle: { color: '#dc2626' }, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2 } }
            ]
        }, true);
        updateRightPanel();
    }

    startInit();
    updateForecastTitle(currentProvince);

    // 响应式调整
    window.addEventListener('resize', function() {
        try { mapChart && mapChart.resize(); } catch(e) {}
        try { weatherTrend.resize(); } catch(e) {}
        try { powerForecast.resize(); } catch(e) {}
    });
});


