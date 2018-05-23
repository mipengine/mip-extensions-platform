# mip-lxn-tab

封装了 tab切换功能以及数据选择功能

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-lxn-tab/mip-lxn-tab.js

## 示例

### 基本用法
```html
<style>

</style>
<mip-lxn-tab>
      <div id="car-type"  class="lxn-tab lxn-tab-two lxn-tab-three" >
         <ul class="lxn-tab-title">
            <li id="car-small" data-for='.tab-item-one' data-items='.tab-li-one' class="tab-li-one tab-li lxn-this"><span>小面</span></li>
            <li id="car-middle" data-for='.tab-item-two' data-items='.tab-li-two' class="tab-li-two tab-li"><span>金杯</span></li>
            <li id="car-big" data-for='.tab-item-three' data-items='.tab-li-three' class="tab-li-three tab-li"><span>箱货</span></li>
        </ul>
        <div class="lxn-tab-content">
            <div class="tab-item-one lxn-tab-item lxn-show">
                <div class="img">
                    <!-- <img width="116" height="54" src="./Public/xiaomian.png"> -->
                </div>
                <div class="explain">
                    <div class="item">
                        <p>600KG</p>
                        <p>载重</p>
                    </div>
                    <div class="item">
                        <p>1.7m*1.1m*1.0m</p>
                        <p>长*宽*高</p>
                    </div>
                    <div class="item">
                        <p>1.87立方</p>
                        <p>体积</p>
                    </div>
                </div>
            </div>
            <div class="tab-item-two lxn-tab-item">
                <div class="img">
                    <!-- <img width="116" height="54" src="./Public/jinbei.png"> -->
                </div>
                <div class="explain">
                    <div class="item">
                        <p>1500KG</p>
                        <p>载重</p>
                    </div>
                    <div class="item">
                        <p>2.7m*1.4m*1.2m</p>
                        <p>长*宽*高</p>
                    </div>
                    <div class="item">
                        <p>4.5立方</p>
                        <p>体积</p>
                    </div>
                </div>
            </div>
            <div class="tab-item-three lxn-tab-item">
                <div class="img">
                    <!-- <img width="116" height="54" src="./Public/xianghuo.png"> -->
                </div>
                <div class="explain">
                    <div class="item">
                        <p>3000KG</p>
                        <p>载重</p>
                    </div>
                    <div class="item">
                        <p>4.2m*1.8m*1.8m</p>
                        <p>长*宽*高</p>
                    </div>
                    <div class="item">
                        <p>13立方</p>
                        <p>体积</p>
                    </div>
                </div>
            </div>
          
        </div>
    </div>
</mip-lxn-tab>
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

