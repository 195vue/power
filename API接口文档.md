# 新能源电力交易辅助决策系统 - API接口文档

> 版本：v1.0  
> 基础路径：`/api`  
> 认证方式：Bearer Token（请求头 `Authorization: Bearer {token}`）  
> 数据格式：JSON  
> 日期格式：`yyyy-MM-dd`  
> 日期时间格式：`yyyy-MM-dd HH:mm:ss`

---

## 统一错误响应

所有接口在校验失败或业务异常时返回 HTTP 4xx/5xx，响应体格式统一为：

```json
{
  "code": 400,
  "message": "错误描述",
  "detail": "可选的详细错误信息"
}
```

| HTTP状态码 | code | 说明 |
|-----------|------|------|
| 400 | 400 | 请求参数错误 |
| 401 | 401 | 未授权或Token无效 |
| 403 | 403 | 无权限访问 |
| 404 | 404 | 资源不存在 |
| 500 | 500 | 服务器内部错误 |

---

## 一、场站信息管理接口

### 1.1 查询场站列表

**`GET /api/stations`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 场站名称模糊查询 |
| company | string | 否 | 所属公司（枚举值：新能源公司/传统能源公司/独立售电公司/电网企业） |
| stationType | string | 否 | 场站类型（枚举值：光伏电站/风电场/水电站/火电厂/储能电站/生物质垃圾发电站） |
| status | string | 否 | 状态（枚举值：正常/停运） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "桂阳月和风电场",
        "company": "新能源公司",
        "stationType": "风电场",
        "capacity": 50.00,
        "minOutput": 0.00,
        "rampUp": 2.00,
        "rampDown": 2.00,
        "startStop": 0,
        "turbineCount": 16,
        "turbineModel": "SE16433/SE15530",
        "ratedPower": "3300/3000",
        "bladeLength": "80.5/76",
        "hubHeight": 100.0,
        "altitude": 1150,
        "cutInSpeed": 3.0,
        "cutOutSpeed": 20.0,
        "longitude": 112.7765,
        "latitude": 25.6030,
        "accessScheme": "35kv场内集电+110kv升压送出",
        "commissionDate": "2022-07-30",
        "status": "正常",
        "createdAt": "2025-01-01 00:00:00",
        "updatedAt": "2025-01-01 00:00:00"
      }
    ],
    "total": 7,
    "page": 1,
    "size": 20
  }
}
```

### 1.2 查询场站详情

**`GET /api/stations/{id}`**

路径参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| id | int | 场站ID |

响应示例：同1.1中单条数据结构

### 1.3 新增场站

**`POST /api/stations`**

请求体：

```json
{
  "name": "桂阳月和风电场",
  "company": "新能源公司",
  "stationType": "风电场",
  "capacity": 50.00,
  "minOutput": 0.00,
  "rampUp": 2.00,
  "rampDown": 2.00,
  "startStop": 0,
  "turbineCount": 16,
  "turbineModel": "SE16433/SE15530",
  "ratedPower": "3300/3000",
  "bladeLength": "80.5/76",
  "hubHeight": 100.0,
  "altitude": 1150,
  "cutInSpeed": 3.0,
  "cutOutSpeed": 20.0,
  "longitude": 112.7765,
  "latitude": 25.6030,
  "accessScheme": "35kv场内集电+110kv升压送出",
  "commissionDate": "2022-07-30",
  "status": "正常"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 场站名称，VARCHAR(100) |
| company | string | 是 | 所属公司，对应数据字典company-type |
| stationType | string | 是 | 场站类型，对应数据字典station-type |
| capacity | decimal(10,2) | 是 | 装机容量(MW)，范围0-9999 |
| minOutput | decimal(10,2) | 是 | 最小技术出力(MW)，范围0-9999 |
| rampUp | decimal(8,2) | 是 | 爬坡率上限(MW/min)，范围0-999 |
| rampDown | decimal(8,2) | 是 | 爬坡率下限(MW/min)，范围0-999 |
| startStop | int | 是 | 启停约束(次/日)，范围0-99，0表示无限制 |
| turbineCount | int | 否 | 风机台数，非风电场填null |
| turbineModel | string | 否 | 风机型号，VARCHAR(50) |
| ratedPower | string | 否 | 额定功率(kW)，VARCHAR(50) |
| bladeLength | string | 否 | 叶片长度(m)，VARCHAR(30) |
| hubHeight | decimal(6,1) | 否 | 轮毂高度(m) |
| altitude | int | 否 | 海拔(m)，范围0-9999 |
| cutInSpeed | decimal(4,1) | 否 | 切入风速(m/s)，范围0-50 |
| cutOutSpeed | decimal(4,1) | 否 | 切出风速(m/s)，范围0-50 |
| longitude | decimal(10,6) | 否 | 经度，范围-180~180 |
| latitude | decimal(10,6) | 否 | 纬度，范围-90~90 |
| accessScheme | string | 否 | 接入方案，VARCHAR(100) |
| commissionDate | date | 否 | 投产日期，格式YYYY-MM-DD |
| status | string | 是 | 状态，枚举值：正常/停运 |

### 1.4 更新场站

**`PUT /api/stations/{id}`**

请求体：同1.3（所有字段均为可选，只更新传入的字段）

### 1.5 删除场站（软删除）

**`DELETE /api/stations/{id}`**

### 1.6 批量导入场站数据

**`POST /api/stations/import`**

Content-Type: `multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | Excel文件(.xlsx/.xls)或CSV文件 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "totalRows": 100,
    "successRows": 98,
    "failedRows": 2,
    "errors": [
      {"row": 5, "field": "name", "message": "场站名称不能为空"},
      {"row": 12, "field": "capacity", "message": "装机容量必须大于0"}
    ],
    "importId": "imp-202511010001"
  }
}
```

### 1.7 导出场站数据

**`POST /api/stations/export`**

请求体：

```json
{
  "ids": [1, 2, 3],
  "name": "新能源公司",
  "company": "新能源公司",
  "stationType": "风电场",
  "status": "正常"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | array[int] | 否 | 指定导出的场站ID列表，为空则按筛选条件导出 |
| name | string | 否 | 筛选条件 |
| company | string | 否 | 筛选条件 |
| stationType | string | 否 | 筛选条件 |
| status | string | 否 | 筛选条件 |

响应：Excel文件流（.xlsx格式）

---

## 二、合约管理接口

### 2.1 查询合约列表

**`GET /api/contracts`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 合约名称模糊查询 |
| type | string | 否 | 交易品类（枚举值：年度双边协商合约/月度集中竞价合约/月度双边协商合约/季度双边协商合约/年度集中竞价合约/现货） |
| year | int | 否 | 年度 |
| company | string | 否 | 所属公司 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "桂阳月和2025年度双边协商合约",
        "type": "年度双边协商合约",
        "period": "2025年1-12月",
        "share": 40.00,
        "price": 450.00,
        "year": 2025,
        "company": "新能源公司",
        "station": "桂阳月和风电场",
        "notes": "年度固定电价合约",
        "createdAt": "2025-01-01 00:00:00",
        "updatedAt": "2025-01-01 00:00:00"
      }
    ],
    "total": 8,
    "page": 1,
    "size": 20
  }
}
```

### 2.2 查询合约详情

**`GET /api/contracts/{id}`**

### 2.3 新增合约

**`POST /api/contracts`**

请求体：

```json
{
  "name": "桂阳月和2025年度双边协商合约",
  "type": "年度双边协商合约",
  "period": "2025年1-12月",
  "share": 40.00,
  "price": 450.00,
  "year": 2025,
  "company": "新能源公司",
  "station": "桂阳月和风电场",
  "notes": "年度固定电价合约"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 合约名称，VARCHAR(100) |
| type | string | 是 | 交易品类，对应数据字典contract-type |
| period | string | 是 | 交易时段，VARCHAR(50)，格式如"2025年1-12月" |
| share | decimal(5,2) | 是 | 电量占比(%)，范围0-100 |
| price | decimal(10,2) | 否 | 电价(元/MWh)，固定电价填数值，按均价执行填0 |
| year | int | 是 | 年度，范围2024-2030 |
| company | string | 否 | 所属公司，VARCHAR(100) |
| station | string | 否 | 关联场站，VARCHAR(255)，多个用逗号分隔 |
| notes | text | 否 | 备注说明 |

### 2.4 更新合约

**`PUT /api/contracts/{id}`**

### 2.5 删除合约（软删除）

**`DELETE /api/contracts/{id}`**

### 2.6 批量导入合约数据

**`POST /api/contracts/import`**

Content-Type: `multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | Excel文件(.xlsx/.xls)或CSV文件 |

响应：同1.6

### 2.7 导出合约数据

**`POST /api/contracts/export`**

请求体：

```json
{
  "ids": [1, 2, 3],
  "type": "年度双边协商合约",
  "year": 2025,
  "company": "新能源公司"
}
```

响应：Excel文件流

---

## 三、算法模型管理接口

### 3.1 查询算法方案列表

**`GET /api/algorithms`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 方案名称模糊查询 |
| module | string | 否 | 所属模块（枚举值：负荷预测/日前电价预测/实时电价预测/功率预测） |
| algoType | string | 否 | 算法类型（枚举值：时序预测模型/回归预测模型/神经网络模型/集成学习模型/混合架构/基线模型/机器学习模型/深度学习模型） |
| status | string | 否 | 状态（枚举值：已发布/草稿） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "负荷预测LSTM模型",
        "module": "负荷预测",
        "algoType": "神经网络模型",
        "version": "v2.1.0",
        "trainStart": "2025-01-01",
        "trainEnd": "2025-12-31",
        "status": "已发布",
        "metric": "RMSE=1.8%",
        "desc": "基于历史负荷数据训练的LSTM模型",
        "createdAt": "2025-01-01 00:00:00",
        "updatedAt": "2025-01-01 00:00:00"
      }
    ],
    "total": 7,
    "page": 1,
    "size": 20
  }
}
```

### 3.2 查询算法方案详情

**`GET /api/algorithms/{id}`**

### 3.3 新增算法方案

**`POST /api/algorithms`**

请求体：

```json
{
  "name": "负荷预测LSTM模型",
  "module": "负荷预测",
  "algoType": "神经网络模型",
  "version": "v2.1.0",
  "trainStart": "2025-01-01",
  "trainEnd": "2025-12-31",
  "status": "已发布",
  "metric": "RMSE=1.8%",
  "desc": "基于历史负荷数据训练的LSTM模型"
}
```

### 3.4 更新算法方案

**`PUT /api/algorithms/{id}`**

### 3.5 删除算法方案（软删除）

**`DELETE /api/algorithms/{id}`**

### 3.6 批量导入算法方案

**`POST /api/algorithms/import`**

Content-Type: `multipart/form-data`

### 3.7 导出算法方案数据

**`POST /api/algorithms/export`**

---

## 四、训练节点管理接口

### 4.1 查询训练节点列表

**`GET /api/train-nodes`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 节点名称模糊查询 |
| company | string | 否 | 所属公司 |
| status | string | 否 | 状态（枚举值：训练完成/训练中/训练失败/已过期） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "淮南矿业集团售电训练节点",
        "company": "独立售电公司",
        "station": "淮南光伏电站",
        "trainStart": "2025-10-01",
        "trainEnd": "2026-03-31",
        "duration": "2h 35m",
        "trainedAt": "2026-04-01 14:23",
        "version": "v1.0.0",
        "modelPath": "/models/price/huainan_v1/",
        "status": "训练完成",
        "notes": "基于2025Q4-2026Q1数据训练，RMSE=12.3",
        "createdAt": "2025-01-01 00:00:00",
        "updatedAt": "2025-01-01 00:00:00"
      }
    ],
    "total": 6,
    "page": 1,
    "size": 20
  }
}
```

### 4.2 查询训练节点详情

**`GET /api/train-nodes/{id}`**

### 4.3 新增训练节点

**`POST /api/train-nodes`**

请求体：

```json
{
  "name": "淮南矿业集团售电训练节点",
  "company": "独立售电公司",
  "station": "淮南光伏电站",
  "trainStart": "2025-10-01",
  "trainEnd": "2026-03-31",
  "version": "v1.0.0",
  "modelPath": "/models/price/huainan_v1/",
  "status": "训练完成",
  "notes": "基于2025Q4-2026Q1数据训练"
}
```

### 4.4 更新训练节点

**`PUT /api/train-nodes/{id}`**

### 4.5 删除训练节点（软删除）

**`DELETE /api/train-nodes/{id}`**

---

## 五、现货数据管理接口

### 5.1 查询现货出清数据列表

**`GET /api/spot-data`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 否 | 交易日期，格式YYYY-MM-DD |
| startDate | string | 否 | 开始日期，与endDate配合使用 |
| endDate | string | 否 | 结束日期 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认96 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "date": "2025-11-01",
        "period": "00:15:00",
        "dayAheadPrices": {
          "provinceAvg": 360.695,
          "poyao": 370.63,
          "qiujiahu": 370.63,
          "qingshanjie": 370.63
        },
        "realTimePrices": {
          "provinceAvg": 372.549,
          "poyao": 330.89,
          "qiujiahu": 330.89,
          "qingshanjie": 330.89
        },
        "dayAheadVolumes": {
          "total": 23213,
          "thermal": 5469.26,
          "wind": 4103,
          "pv": 0,
          "storage": null
        },
        "realTimeVolumes": {
          "total": 23718,
          "thermal": 5628.52,
          "wind": 3855.67,
          "pv": 0,
          "storage": null
        },
        "dayAheadUnits": {
          "total": 46,
          "thermal": null,
          "wind": null,
          "pv": null,
          "storage": null
        },
        "realTimeUnits": {
          "total": 47,
          "thermal": null,
          "wind": null,
          "pv": null,
          "storage": null
        },
        "createdAt": "2025-11-01 00:15:00"
      }
    ],
    "total": 96,
    "page": 1,
    "size": 96
  }
}
```

### 5.2 查询现货数据详情

**`GET /api/spot-data/{id}`**

### 5.3 批量导入现货数据

**`POST /api/spot-data/import`**

Content-Type: `multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | Excel文件(.xlsx/.xls)或CSV文件 |

响应：同1.6

### 5.4 导出现货数据

**`POST /api/spot-data/export`**

请求体：

```json
{
  "ids": [1, 2, 3],
  "date": "2025-11-01",
  "startDate": "2025-11-01",
  "endDate": "2025-11-30"
}
```

响应：Excel文件流

---

## 六、SCADA实时数据管理接口

### 6.1 查询SCADA数据列表

**`GET /api/scada-data`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 否 | 日期，格式YYYY-MM-DD |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |
| stationName | string | 否 | 场站名称 |
| unitNo | string | 否 | 机组编号（枚举值：汇总/1#/2#/.../16#） |
| status | string | 否 | 状态（枚举值：正常/异常/缺失） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认100 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "date": "2025-11-01",
        "period": "00:00",
        "stationName": "桂阳月和风电场",
        "unitNo": "汇总",
        "actualPower": 38.50,
        "predictedPower": 40.00,
        "status": "正常",
        "createdAt": "2025-11-01 00:00:00"
      },
      {
        "id": 2,
        "date": "2025-11-01",
        "period": "00:00",
        "stationName": "桂阳月和风电场",
        "unitNo": "1#",
        "actualPower": 2.40,
        "predictedPower": 2.50,
        "status": "正常",
        "createdAt": "2025-11-01 00:00:00"
      }
    ],
    "total": 17,
    "page": 1,
    "size": 100
  }
}
```

### 6.2 批量导入SCADA数据

**`POST /api/scada-data/import`**

Content-Type: `multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | Excel文件(.xlsx/.xls)或CSV文件 |

响应：同1.6

### 6.3 导出SCADA数据

**`POST /api/scada-data/export`**

请求体：

```json
{
  "ids": [1, 2, 3],
  "date": "2025-11-01",
  "stationName": "桂阳月和风电场",
  "unitNo": "汇总"
}
```

响应：Excel文件流

---

## 七、预测数据管理接口

### 7.1 查询历史中长期均价

**`GET /api/midlong/price/history`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| companyId | string | 是 | 场站/公司标识；可传全省口径标识 |
| asOfMonth | string | 是 | 基准月，返回其之前（含）的历史，格式YYYY-MM |
| lookback | int | 否 | 返回最近多少月，默认6 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "companyId": "全省口径",
    "unit": "元/MWh",
    "points": [
      { "ym": "2025-12", "price": 380.74, "isForecast": false, "low": null, "high": null },
      { "ym": "2026-01", "price": 436.69, "isForecast": false, "low": null, "high": null }
    ]
  }
}
```

### 7.2 生成中长期电价预测

**`POST /api/midlong/price/forecast`**

请求体：

```json
{
  "asOfMonth": "2026-06",
  "companyId": "全省口径",
  "horizon": 6,
  "lookback": 6,
  "confZ": 1.28,
  "forceModel": null,
  "history": null
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| asOfMonth | string | 是 | 基准月，其之前为历史，格式YYYY-MM |
| companyId | string | 是 | 公司/口径标识 |
| horizon | int | 否 | 预测月数，1~12，默认6 |
| lookback | int | 否 | 展示回看月数，默认6 |
| confZ | float | 否 | 区间z值：1.28≈80% / 1.645≈90% / 1.96≈95%，默认1.28 |
| forceModel | string | 否 | 指定模型id跳过自动择优（naive/ma3/ses/damped/drift/seasonal），默认null自动择优 |
| history | array | 否 | 前端已查到的历史可带上避免重复查库，为空则后端自查 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "unit": "元/MWh",
    "model": "seasonal",
    "modelName": "季节分解(seasonal)",
    "backtestMae": 34.94,
    "scores": { "naive": 34.94, "ma3": 52.13, "ses": 42.45, "damped": 42.99, "drift": 45.07, "seasonal": 41.93 },
    "sigma": 49.20,
    "history": [
      { "ym": "2025-12", "price": 380.74, "isForecast": false, "low": null, "high": null },
      { "ym": "2026-01", "price": 436.69, "isForecast": false, "low": null, "high": null }
    ],
    "forecast": [
      { "ym": "2026-06", "price": 310.72, "isForecast": true, "low": 247.74, "high": 373.70 },
      { "ym": "2026-07", "price": 325.50, "isForecast": true, "low": 260.00, "high": 391.00 }
    ]
  }
}
```

### 7.3 查询日前现货价格预测数据

**`GET /api/forecast/spot-price`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 否 | 预测日期，格式YYYY-MM-DD |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "date": "2025-11-02",
        "maxPrice": 420.00,
        "minPrice": 350.00,
        "avgPrice": 385.00,
        "modelName": "LSTM模型",
        "notes": "基于历史数据预测",
        "createdAt": "2025-11-01 00:00:00"
      }
    ],
    "total": 7,
    "page": 1,
    "size": 20
  }
}
```

### 7.4 批量导入中长期电价预测数据

**`POST /api/forecast/ml-price/import`**

Content-Type: `multipart/form-data`

### 7.5 导出中长期电价预测数据

**`POST /api/forecast/ml-price/export`**

### 7.6 批量导入日前现货价格预测数据

**`POST /api/forecast/spot-price/import`**

Content-Type: `multipart/form-data`

### 7.7 导出日前现货价格预测数据

**`POST /api/forecast/spot-price/export`**

---

## 八、市场交易数据管理接口

### 8.1 查询市场交易数据列表

**`GET /api/market-data`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ym | string | 否 | 报告月份，格式YYYY-MM |
| startYm | string | 否 | 开始月份 |
| endYm | string | 否 | 结束月份 |
| tradeType | string | 否 | 交易类型（枚举值：省内直接交易/省间交易/现货交易/中长期交易） |
| powerType | string | 否 | 电源类型（枚举值：光伏/风电/水电/燃煤火电/燃气火电/独立储能/生物质垃圾/其他） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "ym": "2025-01",
        "tradeType": "省内直接交易",
        "powerType": "燃煤火电",
        "volume": 58.25,
        "price": 468.65,
        "maxLoad": null,
        "supplyMargin": null,
        "reportName": null,
        "createdAt": "2025-02-01 00:00:00"
      }
    ],
    "total": 3,
    "page": 1,
    "size": 20
  }
}
```

### 8.2 批量导入市场交易数据

**`POST /api/market-data/import`**

Content-Type: `multipart/form-data`

### 8.3 导出市场交易数据

**`POST /api/market-data/export`**

### 8.4 上传PDF报告

**`POST /api/market-data/pdf/upload`**

Content-Type: `multipart/form-data`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | PDF文件 |
| reportMonth | string | 是 | 报告月份，格式YYYY-MM |

响应示例：

```json
{
  "code": 0,
  "data": {
    "id": 1,
    "fileName": "2025年1月市场信息披露报告.pdf",
    "reportMonth": "2025-01",
    "uploader": "管理员",
    "uploadTime": "2025-02-01 10:00:00",
    "filePath": "/uploads/pdf/2025-01-01_市场信息披露报告.pdf",
    "fileSize": 2048000
  }
}
```

### 8.5 查询PDF报告列表

**`GET /api/market-data/pdf`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| reportMonth | string | 否 | 报告月份 |
| fileName | string | 否 | 文件名模糊查询 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

### 8.6 下载PDF报告

**`GET /api/market-data/pdf/{id}/download`**

响应：PDF文件流

### 8.7 删除PDF报告

**`DELETE /api/market-data/pdf/{id}`**

---

## 九、清算结算数据管理接口

### 9.1 查询结算单列表

**`GET /api/settlement/bills`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| month | string | 否 | 结算月份，格式YYYY-MM |
| startMonth | string | 否 | 开始月份 |
| endMonth | string | 否 | 结束月份 |
| billNo | string | 否 | 结算单号模糊查询 |
| billType | string | 否 | 结算类型（枚举值：日前结算/实时结算/偏差结算/清算分摊） |
| stationName | string | 否 | 场站名称 |
| status | string | 否 | 结算状态（枚举值：待结算/已结算/已审核） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "month": "2025-11",
        "billNo": "JS-202511-001",
        "billType": "日前结算",
        "volume": 125000.00,
        "price": 450.00,
        "amount": 5625.00,
        "stationName": "桂阳月和风电场",
        "status": "已结算",
        "createdAt": "2025-12-01 00:00:00",
        "updatedAt": "2025-12-05 10:00:00"
      }
    ],
    "total": 10,
    "page": 1,
    "size": 20
  }
}
```

### 9.2 查询结算单详情

**`GET /api/settlement/bills/{id}`**

### 9.3 导出结算单数据

**`POST /api/settlement/bills/export`**

请求体：

```json
{
  "ids": [1, 2, 3],
  "month": "2025-11",
  "billType": "日前结算",
  "stationName": "桂阳月和风电场"
}
```

响应：Excel文件流

### 9.4 查询可用日期

**`GET /api/electricity/clear-electricity/dates`**

查询清算电价/电量数据表中哪些天有数据，按MarketType分组返回可用日期列表。

响应示例：

```json
{
  "code": 0,
  "data": [
    {
      "marketType": "DayAhead",
      "dates": ["2025-01-01", "2025-01-02", "2025-01-03"],
      "count": 3
    },
    {
      "marketType": "RealTime",
      "dates": ["2025-01-01", "2025-01-03"],
      "count": 2
    }
  ]
}
```

### 9.5 查询时间段内清算电价/电量数据

**`GET /api/electricity/clear-electricity/range`**

查询指定时间段内所有MetricType的值，按MetricType分组返回时间序列数据。

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | string | 是 | 起始时间，格式yyyy-MM-ddTHH:mm:ss（如2025-01-01T00:00:00） |
| endTime | string | 是 | 结束时间，格式同上，须>=startTime |
| marketType | int | 是 | 市场类型：0=DayAhead（日前），1=RealTime（实时） |

响应示例：

```json
{
  "code": 0,
  "data": {
    "startTime": "2025-01-01T00:00:00",
    "endTime": "2025-01-01T23:59:59",
    "marketType": "DayAhead",
    "metrics": [
      {
        "metricType": "AvgPrice",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 360.695 },
          { "timestamp": "2025-01-01T00:15:00", "value": 360.695 }
        ]
      },
      {
        "metricType": "PriceBayushan",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 370.63 },
          { "timestamp": "2025-01-01T00:15:00", "value": 370.63 }
        ]
      },
      {
        "metricType": "PriceYinjiashan",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 370.63 },
          { "timestamp": "2025-01-01T00:15:00", "value": 370.63 }
        ]
      },
      {
        "metricType": "PriceQingshanjie",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 370.63 },
          { "timestamp": "2025-01-01T00:15:00", "value": 370.63 }
        ]
      },
      {
        "metricType": "TotalEnergy",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 23213.00 },
          { "timestamp": "2025-01-01T00:15:00", "value": 23016.00 }
        ]
      },
      {
        "metricType": "ThermalEnergy",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 5469.26 },
          { "timestamp": "2025-01-01T00:15:00", "value": 5252.86 }
        ]
      },
      {
        "metricType": "WindEnergy",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 4103 },
          { "timestamp": "2025-01-01T00:15:00", "value": 4046 }
        ]
      },
      {
        "metricType": "PvEnergy",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": 0 },
          { "timestamp": "2025-01-01T00:15:00", "value": 0 }
        ]
      },
      {
        "metricType": "StorageEnergy",
        "values": [
          { "timestamp": "2025-01-01T00:00:00", "value": null },
          { "timestamp": "2025-01-01T00:15:00", "value": null }
        ]
      }
    ]
  }
}
```

### 9.6 查询收益分析数据

**`GET /api/settlement/analysis`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| month | string | 否 | 月份，格式YYYY-MM |
| startMonth | string | 否 | 开始月份 |
| endMonth | string | 否 | 结束月份 |
| stationName | string | 否 | 场站名称 |

响应示例：

```json
{
  "code": 0,
  "data": [
    {
      "month": "2025-11",
      "stationName": "桂阳月和风电场",
      "totalRevenue": 2350.00,
      "dayAheadRevenue": 1800.00,
      "realTimeRevenue": 550.00,
      "deviationRevenue": 0.00,
      "avgPrice": 450.00,
      "totalVolume": 5222.00
    }
  ]
}
```

---

## 十、中长期辅助决策接口

### 10.1 查询基础数据

**`GET /api/midlong/base`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 查询日期，格式YYYY-MM-DD |
| companyId | string | 是 | 公司/场站标识 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "date": "2026-05-26",
    "companyId": "ST001",
    "predOutput": [21.3, 20.1, 19.5, 18.8, 18.2, 17.9, 18.5, 20.2, 22.8, 25.1, 26.8, 27.5, 27.2, 26.5, 25.3, 23.8, 22.1, 20.5, 19.3, 18.6, 18.2, 17.8, 17.5, 17.2],
    "signed": [
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0},
      {"year": 8.2, "multiMonth": 2.1, "month": 1.0, "intraMonth": 0.0, "daily": 0.0}
    ],
    "daPrice": [352, 348, 345, 342, 340, 345, 360, 385, 410, 425, 430, 432, 430, 425, 418, 405, 390, 375, 365, 358, 355, 352, 350, 348],
    "priceFloor": 100,
    "priceCap": 1300
  }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| predOutput | array[float] | 24时段预测出力，单位MWh |
| signed | array[object] | 24时段已签合约分解量，单位MWh |
| daPrice | array[float] | 24时段日前现货预测价，单位元/MWh |
| priceFloor | float | 报价下限，单位元/MWh |
| priceCap | float | 报价上限，单位元/MWh |

### 10.2 生成三档策略

**`POST /api/midlong/generate`**

请求体：

```json
{
  "date": "2026-05-26",
  "companyId": "ST001",
  "tradeMode": "month",
  "activePreset": null,
  "params": null,
  "base": null
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 查询日期，格式YYYY-MM-DD |
| companyId | string | 是 | 公司/场站标识 |
| tradeMode | string | 是 | 交易方式：daily/intraMonth/month/multiMonth/year |
| activePreset | string | 否 | 当前选中档位：conservative/steady/aggressive |
| params | object | 否 | 自定义参数，覆盖预设 |
| base | object | 否 | 前端已查到的基础数据，避免重复查库 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "refPrice": [350, 348, 345, 342, 340, 345, 360, 385, 410, 425, 430, 432, 430, 425, 418, 405, 390, 375, 365, 358, 355, 352, 350, 348],
    "strategies": {
      "conservative": {
        "rows": [
          {
            "hour": 0,
            "qBid": 7.86,
            "priceLow": 327.25,
            "priceHigh": 343.50,
            "prob": 68.5,
            "tradeType": "month",
            "overbought": false,
            "clamped": false,
            "mid": 335.37,
            "refPrice": 350
          }
        ],
        "summary": {
          "expQty": 125.6,
          "totQty": 186.2,
          "wAvgPrice": 338.50,
          "estProfit": -1580.50,
          "overboughtHours": 0
        }
      },
      "steady": {
        "rows": [...],
        "summary": {
          "expQty": 175.2,
          "totQty": 208.5,
          "wAvgPrice": 350.00,
          "estProfit": 0,
          "overboughtHours": 0
        }
      },
      "aggressive": {
        "rows": [...],
        "summary": {
          "expQty": 198.5,
          "totQty": 212.8,
          "wAvgPrice": 364.00,
          "estProfit": 2850.60,
          "overboughtHours": 0
        }
      }
    }
  }
}
```

rows 单时段结构：

| 字段 | 类型 | 说明 |
|------|------|------|
| hour | int | 时段0-23 |
| qBid | float | 申报电量，单位MWh |
| priceLow | float | 报价下限，单位元/MWh |
| priceHigh | float | 报价上限，单位元/MWh |
| prob | float | 成交概率，0-100 |
| tradeType | string | 交易方式 |
| overbought | bool | 是否超签 |
| clamped | bool | 是否触限 |
| mid | float | 报价中枢，单位元/MWh |
| refPrice | float | 参考价，单位元/MWh |

summary 结构：

| 字段 | 类型 | 说明 |
|------|------|------|
| expQty | float | 预计成交电量，单位MWh |
| totQty | float | 申报总量，单位MWh |
| wAvgPrice | float | 加权均价，单位元/MWh |
| estProfit | float | 预计收益，单位元 |
| overboughtHours | int | 超签时段数 |

### 10.3 保存策略

**`POST /api/midlong/strategy`**

请求体：

```json
{
  "date": "2026-05-26",
  "companyId": "ST001",
  "tradeMode": "month",
  "preset": "steady",
  "params": {"alpha": 0.85, "beta": 0, "delta": 0.04},
  "rows": [...],
  "summary": {...}
}
```

响应示例：

```json
{
  "code": 0,
  "data": {
    "strategyId": "strat-20260526-001",
    "msg": "saved"
  }
}
```

---

## 十一、数据字典接口

### 11.1 查询数据字典列表

**`GET /api/dictionary`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| typeCode | string | 否 | 字典类型编码，如power-type、contract-type等 |
| name | string | 否 | 字典名称模糊查询 |
| status | string | 否 | 状态（枚举值：启用/禁用） |

响应示例：

```json
{
  "code": 0,
  "data": [
    {
      "typeCode": "power-type",
      "typeName": "电源类型",
      "items": [
        { "code": "PV", "name": "光伏", "sort": 1, "status": "启用" },
        { "code": "WIND", "name": "风电", "sort": 2, "status": "启用" },
        { "code": "HYDRO", "name": "水电", "sort": 3, "status": "启用" },
        { "code": "THERMAL_COAL", "name": "燃煤火电", "sort": 4, "status": "启用" },
        { "code": "THERMAL_GAS", "name": "燃气火电", "sort": 5, "status": "启用" },
        { "code": "STORAGE", "name": "独立储能", "sort": 6, "status": "启用" },
        { "code": "BIOMASS", "name": "生物质垃圾", "sort": 7, "status": "启用" },
        { "code": "OTHER", "name": "其他", "sort": 8, "status": "启用" }
      ]
    }
  ]
}
```

### 11.2 查询字典类型详情

**`GET /api/dictionary/{typeCode}`**

### 11.3 新增字典类型

**`POST /api/dictionary`**

请求体：

```json
{
  "typeCode": "test-type",
  "typeName": "测试类型",
  "fieldName": "test_type"
}
```

### 11.4 更新字典类型

**`PUT /api/dictionary/{typeCode}`**

### 11.5 删除字典类型

**`DELETE /api/dictionary/{typeCode}`**

### 11.6 新增字典项

**`POST /api/dictionary/{typeCode}/items`**

请求体：

```json
{
  "code": "TEST1",
  "name": "测试项1",
  "sort": 1,
  "status": "启用"
}
```

### 11.7 更新字典项

**`PUT /api/dictionary/{typeCode}/items/{code}`**

### 11.8 删除字典项

**`DELETE /api/dictionary/{typeCode}/items/{code}`**

---

## 十一、系统参数配置接口

### 11.1 查询系统参数列表

**`GET /api/system/config`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | string | 否 | 参数键模糊查询 |
| category | string | 否 | 参数分类 |

响应示例：

```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "key": "PRICE_FLOOR",
      "value": "0",
      "category": "电价配置",
      "description": "电价下限(元/MWh)",
      "dataType": "numeric",
      "createdAt": "2025-01-01 00:00:00",
      "updatedAt": "2025-01-01 00:00:00"
    }
  ]
}
```

### 11.2 更新系统参数

**`PUT /api/system/config/{key}`**

请求体：

```json
{
  "value": "100",
  "description": "更新后的描述"
}
```

---

## 十三、导入任务记录接口

### 13.1 查询导入任务记录列表

**`GET /api/import-tasks`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| module | string | 否 | 业务模块（枚举值：场站信息管理/合约管理/算法模型管理/现货数据管理/SCADA实时数据管理/预测数据管理/市场交易数据管理/清算结算数据管理） |
| status | string | 否 | 状态（枚举值：待解析/已解析/已导入/部分成功/导入失败） |
| startTime | string | 否 | 开始时间 |
| endTime | string | 否 | 结束时间 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": "imp-202511010001",
        "module": "场站信息管理",
        "fileName": "场站信息导入专用模板.xlsx",
        "filePath": "/uploads/import/20251101/场站信息导入专用模板.xlsx",
        "fileSize": 204800,
        "uploader": "管理员",
        "uploadTime": "2025-11-01 10:00:00",
        "totalRows": 100,
        "successRows": 98,
        "failedRows": 2,
        "status": "部分成功",
        "errorLog": "/logs/import/imp-202511010001_error.log",
        "createdAt": "2025-11-01 10:00:00"
      }
    ],
    "total": 50,
    "page": 1,
    "size": 20
  }
}
```

### 12.2 查询导入任务详情

**`GET /api/import-tasks/{id}`**

### 13.3 删除导入任务记录

**`DELETE /api/import-tasks/{id}`**

> 注：仅删除任务记录和上传的文件，不删除已导入的数据

### 13.4 下载错误日志

**`GET /api/import-tasks/{id}/error-log`**

响应：文本文件流

---

## 十四、数据回收站接口

### 13.1 查询回收站数据

**`GET /api/recycle-bin`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| module | string | 否 | 业务模块 |
| startTime | string | 否 | 删除开始时间 |
| endTime | string | 否 | 删除结束时间 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "module": "场站信息管理",
        "recordId": 10,
        "recordName": "测试场站",
        "deletedAt": "2025-11-01 10:00:00",
        "deletedBy": "管理员",
        "dataSnapshot": "{\"name\":\"测试场站\",\"company\":\"新能源公司\",...}"
      }
    ],
    "total": 20,
    "page": 1,
    "size": 20
  }
}
```

### 14.2 恢复数据

**`POST /api/recycle-bin/{id}/restore`**

### 14.3 永久删除数据

**`DELETE /api/recycle-bin/{id}`**

---

## 十五、操作日志接口

### 15.1 查询操作日志

**`GET /api/operation-logs`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| operator | string | 否 | 操作人 |
| module | string | 否 | 业务模块 |
| action | string | 否 | 操作类型（枚举值：新增/编辑/删除/导入/导出/查询） |
| startTime | string | 否 | 开始时间 |
| endTime | string | 否 | 结束时间 |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "operator": "管理员",
        "module": "场站信息管理",
        "action": "新增",
        "targetName": "桂阳月和风电场",
        "targetId": 1,
        "ip": "192.168.1.100",
        "detail": "{\"name\":\"桂阳月和风电场\",\"company\":\"新能源公司\",...}",
        "createdAt": "2025-11-01 10:00:00"
      }
    ],
    "total": 100,
    "page": 1,
    "size": 20
  }
}
```

---

## 十六、用户管理接口

### 16.1 查询用户列表

**`GET /api/users`**

请求参数：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 否 | 用户名模糊查询 |
| role | string | 否 | 用户角色（枚举值：管理员/预测分析师/交易员/运维人员） |
| status | string | 否 | 状态（枚举值：启用/禁用） |
| page | int | 否 | 页码，默认1 |
| size | int | 否 | 每页条数，默认20 |

响应示例：

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin",
        "realName": "管理员",
        "email": "admin@example.com",
        "phone": "13800138000",
        "role": "管理员",
        "status": "启用",
        "createdAt": "2025-01-01 00:00:00",
        "updatedAt": "2025-01-01 00:00:00"
      }
    ],
    "total": 10,
    "page": 1,
    "size": 20
  }
}
```

### 16.2 查询用户详情

**`GET /api/users/{id}`**

### 16.3 新增用户

**`POST /api/users`**

请求体：

```json
{
  "username": "admin",
  "realName": "管理员",
  "email": "admin@example.com",
  "phone": "13800138000",
  "role": "管理员",
  "password": "password123"
}
```

### 16.4 更新用户

**`PUT /api/users/{id}`**

### 16.5 删除用户（软删除）

**`DELETE /api/users/{id}`**

### 16.6 启用/禁用用户

**`PUT /api/users/{id}/status`**

请求体：

```json
{
  "status": "启用"
}
```

### 16.7 修改密码

**`PUT /api/users/{id}/password`**

请求体：

```json
{
  "oldPassword": "oldPassword",
  "newPassword": "newPassword"
}
```

---

## 十七、登录认证接口

### 17.1 用户登录

**`POST /api/auth/login`**

请求体：

```json
{
  "username": "admin",
  "password": "password123"
}
```

响应示例：

```json
{
  "code": 0,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "realName": "管理员",
      "role": "管理员",
      "permissions": ["station:read", "station:write", "contract:read", "contract:write"]
    }
  }
}
```

### 17.2 获取当前用户信息

**`GET /api/auth/me`**

响应示例：同17.1中user字段

### 17.3 用户登出

**`POST /api/auth/logout`**

---

## 附录：数据字典类型编码对照表

| 字典类型编码 | 字典类型名称 | 数据库字段名 |
|-------------|-------------|-------------|
| trade-type | 交易品种 | trade_type |
| power-type | 电源类型 | power_type |
| generation-type | 发电类型 | generation_type |
| station-type | 场站类型 | station_type |
| unit-type | 计量单位 | unit_type |
| midlong-trade-mode | 中长期交易方式 | trade_mode |
| spot-market-type | 现货市场类型 | market_type |
| risk-level | 风险偏好 | risk_level |
| weather-type | 气象类型 | weather_type |
| weather-source | 气象数据源 | weather_source |
| forecast-duration | 预测时长 | forecast_duration |
| forecast-interval | 预测间隔 | forecast_interval |
| algorithm-type | 算法方案类型 | algorithm_type |
| train-node-type | 训练节点类型 | node_type |
| user-role | 用户角色 | user_role |
| company-type | 公司类型 | company_type |
| device-status | 设备状态 | device_status |
| alarm-level | 告警级别 | alarm_level |
| node-type | 交易节点 | node_type |
| market-entity-type | 市场主体类型 | market_entity_type |
| contract-period | 合约周期 | contract_period |
| contract-type | 合约类型 | contract_type |
| settlement-type | 结算类型 | settlement_type |
| settlement-cycle | 结算周期 | settlement_cycle |
| metric-type | 预测指标类型 | metric_type |
| model-source | 模型来源 | model_source |
| data-source | 数据来源 | data_source |
| data-channel | 数据采集渠道 | data_channel |
| data-status | 数据状态 | data_status |