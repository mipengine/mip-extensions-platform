# mip-hunliji-selectCity

mip-hunliji-selectCity 获取自定义城市列表

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hunliji-selectCity/mip-hunliji-selectCity.js

## 示例

### 基本用法
```html
<mip-hunliji-selectCity urlApi='http://172.16.12.144:8000/city.json'>
    <dl id="selectCity">
        <dt>
            <input type="text" name="username" placeholder="姓名" id="select_city"/>
            <input type="text" name="cid" id="select_cid"/>
        </dt>
        <dd id="select_cityname">
            <span>1</span>/* 获取到的城市列表 */
            <span>2</span>
            <span>3</span>
            <span>4</span>
        </dd>
    </dl>
</mip-hunliji-selectCity>
```

## 属性

### {urlApi}

说明：{获取城市的api地址}
必选项：{是}
类型：{字符串}

## 注意事项
