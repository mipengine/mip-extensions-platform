# mip-lxn-picker

日期、城市选择组件

标题|内容
----|----
类型|公司通用组件
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-lxn-picker/mip-lxn-picker.js


- 城市选择的时候，把城市数据存入本地，7天之内不请求城市数据。
- 更换城市后，建筑物需要重新选择。

## 示例

### 基本用法


日期选择。具体参考：https://github.com/xingchou/datePicker

```html
<mip-lxn-picker class="mip-picker" id="myDatePicker">
<script type="application/json">
    {
        "title": "请选择搬家时间",
        "pickerType": "time",
        "type": 5,
        "defaultValue": "",
        "separator": ""
    }
</script>
</mip-lxn-picker>

<mip-lxn-picker class="mip-picker" id="mycityPicker" data-api="path/to/cityapi">
    <script type="application/json">
        {
            "title": "",
            "pickerType": "city",
            "type": 1,
            "keys": {
                "id":"id",
                "value": "name"
               
            }
        }
    </script>
</mip-lxn-picker>

    <input id="move-time" data-time='' on="tap:myDatePicker.open" placeholder="选择时间">
<!-- <div id="move-timess" data-time='' on="tap:mycityPicker.open('move-pop')">选择楼层</div> -->

<input   id="move-out-floor" type="text" disabled on="tap:mycityPicker.open('pop')" placehold="选择楼层">
<input   id="move-in-floor" type="text" disabled on="tap:mycityPicker.open('push')" placehold="选择楼层">

```


<!-- ```html
<mip-lxn-picker class="mip-picker" id="myCityPicker" data-api="path/to/cityapi">
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
    </mip-lxn-picker>
``` -->

页面中DOM用 on 来绑定事件调用
<!-- 
```html
<div on="tap:myDatePicker.open"></div>

<div on="tap:myCityPicker.open"></div>
``` -->

## 属性

### data-api

城市选择的时候需要传入获取城市的API


## 注意事项



