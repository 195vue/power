content = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>数据导入</title>
<link rel="stylesheet" href="../../styles.css">
<style>
.import-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;}
.import-card{background:var(--surface);border:1px dashed var(--border);border-radius:8px;padding:24px;text-align:center;cursor:pointer;position:relative;overflow:hidden;}
.import-card:hover{border-color:var(--accent);}
.import-card input[type="file"]{position:absolute;inset:0;opacity:0;cursor:pointer;}
</style>
</head>
<body>
<main class="main-content">
<div class="page-header">
<h2 class="page-title">数据导入</h2>
<p class="page-subtitle">批量导入场站数据、合约数据、交易数据等表格文件，支持 Excel 和 CSV 格式</p>
</div>
<div class="import-grid">
<div class="import-card" onclick="document.getElementById('f1').click()"><h3>场站数据导入</h3><p style="font-size:12px;color:var(--muted)">导入场站基础信息、装机容量、风机参数</p><input type="file" id="f1" accept=".xlsx,.xls,.csv" onchange="alert('导入成功')"></div>
<div class="import-card" onclick="document.getElementById('f2').click()"><h3>合约数据导入</h3><p style="font-size:12px;color:var(--muted)">导入中长期合约、签约电量、电价</p><input type="file" id="f2" accept=".xlsx,.xls,.csv" onchange="alert('导入成功')"></div>
<div class="import-card" onclick="document.getElementById('f3').click()"><h3>交易数据导入</h3><p style="font-size:12px;color:var(--muted)">导入现货出清电量、电价、交易结果</p><input type="file" id="f3" accept=".xlsx,.xls,.csv" onchange="alert('导入成功')"></div>
<div class="import-card" onclick="document.getElementById('f4').click()"><h3>气象数据导入</h3><p style="font-size:12px;color:var(--muted)">导入风速、辐照度、温度等气象数据</p><input type="file" id="f4" accept=".xlsx,.xls,.csv" onchange="alert('导入成功')"></div>
<div class="import-card" onclick="document.getElementById('f5').click()"><h3>电价预测数据导入</h3><p style="font-size:12px;color:var(--muted)">导入日前/实时电价预测数据</p><input type="file" id="f5" accept=".xlsx,.xls,.csv" onchange="alert('导入成功')"></div>
<div class="import-card" onclick="document.getElementById('f6').click()"><h3>功率预测数据导入</h3><p style="font-size:12px;color:var(--muted)">导入新能源出力预测、负荷预测数据</p><input type="file" id="f6" accept=".xlsx,.xls,.csv" onchange="alert('导入成功')"></div>
</div>
</main>
</body>
</html>"""
open(r'd:\yunwork\power\后台数据维护\数据导入\index.html', 'w', encoding='utf-8').write(content)
print('Done')