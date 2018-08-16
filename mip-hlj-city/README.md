# mip-hlj-city

mip-hlj-city 选择城市组件，选择省市区，以及模糊查询

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hlj-city/mip-hlj-city.js

## 示例

### 基本用法
```html
    <mip-hlj-city data-api="/json/city.json" data-city-storage-key="history-city">
        <div class="input-group">
            <input id="search" type="text" placeholder="输入城市名或拼音查询">
            <div class="icon"></div>
            <span class="cancel">取消</span>
        </div>
        <div class="panel">
            <ul id="province" class="province">
            </ul>
            <div class="hots">
                <div class="title">当前定位</div>
                <div class="current-city">杭州</div>
                <div id="last-city-title" class="title">最近访问</div>
                <ul id="last-city">
                </ul>
                <div class="title">热门城市</div>
                <ul id="hots-city">
                </ul>
            </div>
            <ul id="citys" class="citys">
            </ul>
            <ul id="groups" class="citys">
            </ul>
        </div>
        <div class="search-content">
            <ul>
            </ul>
        </div>
    </mip-hlj-city>
```


## 属性

### data-api

说明：获取省市区数据api地址   
必选项：是   
类型：字符串   
单位：无   
取值：无   
默认值：无

### data-city-storage-key
说明：storage中数据存储最近访问城市key     
必选项：是   
类型：字符串   
单位：无   
取值：无   
默认值：无


## 注意事项

