# mip-zol-blockload

区块加载，适用于整个区块的后加载

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-zol-blockload/mip-zol-blockload.js

## 版本介绍

### 1.0.2

- 增加对无数据的时候的处理

### 1.0.1

- 加载数据源增加 `token` 的判断

## 示例

### 基本用法
```html
<mip-zol-blockload appkey="wap" token="true" data-src="//path/to/api" data-limit="3" data-location="true" data-empty-remove="true">
    <script type="application/json">
    {
        "appkey": "",
        "secrect": "",
        "token": "",
        "proId": 340414
    }
    </script>
    <div class="lazy-load-placeholder">正在加载中...</div>
</mip-zol-blockload>
```

## 属性

### data-src

说明：接口地址   
必选项：是    
类型：字符串   

### data-limit

说明：限制类型，比如说条数         
必选项：否        
类型：数字     

### data-location

说明：是否需要IP识别             
必选项：否        
取值：`true` or `false`  

### data-empty-remove

说明：加载无数据是否要移除该区块        
必选项：否        
取值：`true` or `false`    

## 注意事项

- `<script type="application/json">` 传需要的查询字段
- 返回结果格式为：
```js
    {
        status: 0, // 0 表示成功， 1 表示失败
        data: {
            list: '', // 目前只支持 html片段
            total: '' // 总条数（如果有的话）
        }
    }
```
