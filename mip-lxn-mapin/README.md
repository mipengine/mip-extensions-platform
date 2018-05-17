# mip-lxn-mapin

搬入地址选择

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-lxn-mapin/mip-lxn-mapin.js

## 示例

### 基本用法
```html
<mip-lxn-mapin>
        <div id="l-map"></div> 

     <div class="lxn-address-title">
        <div class="left item"><span class="span-one"></span><span class="span-two"></span></div>
        <div class="center item">搬入地址选择</div>
        <div class="right item"><span>北京</span><span class="ss-icon"></span></div>
    </div>
    <div class='detail'>
        <ul>
            <li class="address"><span></span><input id="suggestId" type="text" placeholder="请输入搬入地址(必填)">
                <div class="address-list"></div>
            </li>
            <li class="address-sub"><span></span><input type="text" id="move-in-xx" placeholder="详细信息,如几号楼几单元(选填)"></li>
            <li class="add-person"><span></span><input type="text" id="move-in-person" placeholder="联系人(选填)"></li>
            <li class="add-phone"><span></span><input type="number" id="move-in-phone" placeholder="联系电话(选填)"></li>
        </ul>
    </div>
    <div class="div-confirm">
        <a id="move-in-address" class="order-confirm">确定</a>
    </div>
</mip-lxn-mapin>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

