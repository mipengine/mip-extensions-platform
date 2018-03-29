# mip-zol-picker

日期、城市选择组件

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-zol-picker/mip-zol-picker.js

## 示例

### 基本用法


日期选择。具体参考：https://github.com/xingchou/datePicker

```html
<mip-zol-picker class="mip-picker" id="myDatePicker">
<script type="application/json">
    {
        "title": "请选择日期",
        "pickerType": "time",
        "type": 3,
        "maxYear": "2030",
        "minYear": "2014",
        "defaultValue": "",
        "separator": "-"
    }
</script>
</mip-zol-picker>
```

城市选择。具体参考：https://github.com/xingchou/picker

```html
<mip-zol-picker class="mip-picker" id="myCityPicker" data-api="path/to/cityapi">
    <script type="application/json">
        {
            "title": "请选择",
            "pickerType": "city",
            "type": 2,
            "keys": {
                "id": "id",
                "value": "name",
                "childData": "level"
            }
        }
    </script>
    </mip-zol-picker>
```

页面中DOM用 on 来绑定事件调用

```html
<div on="tap:myDatePicker.open"></div>

<div on="tap:myCityPicker.open"></div>
```

## 属性

### data-api

城市选择的时候需要传入获取城市的API


## 注意事项



