# mip-sn-shop-floor

mip-sn-shop-floor 实现了自定义实现了sn获取接口数据后，渲染列表数据的功能

标题|内容
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|http://c.mipcdn.com/extensions/platform/v1/mip-sn-shop-floor/mip-sn-shop-floor.js

## 示例

### 基本用法

```html
<mip-sn-shop-floor template="mip-template-id" src="//mois.suning.com/snardweb/storebasic/?_getStoreInfoCallback.html">

    <!--店铺信息模版-->
    <template type="mip-mustache" id="mip-template-id">
        <!--头部信息-->
        <div class="sn-nav">
            <div class="sn-nav-back"><a class="sn-iconbtn" href="javascript:window.history.go(-1);" target="_blank">返回</a></div>
            <div class="sn-nav-title of">{{storeInfo.name}}</div>
            <div class="flower"></div>
        </div>

        <!--banner-->
        <div class="banner">
            <ul>
                {{#storeHeadPhotoList}}
                <li><mip-img src="{{imgUrl}}"></mip-img></li>
                {{/storeHeadPhotoList}}
            </ul>
        </div>
        <div class="store-cont-radius"></div>

        <!--门店信息-->
        <div class="store-cont">
            <!--<span class="store-distance">10.3km</span>-->
            <div class="addr-cont">
                <mip-link href="//res.m.suning.com/project/sideSuning/store-address.html?storeId={{storeInfo.storeId}}" class="details-store">
                    <p class="store-addr"><span class="store-type">云店</span>{{storeInfo.name}}</p>
                    <p class="store-go">查看门店详情</p>
                </mip-link>
                <mip-link class="change-store" href="//res.m.suning.com/project/sideSuning/default-index.html?cityId=9173">切换门店</mip-link>
            </div>
        </div>

        <!--导航-->
        <div class="store-follow">
            {{#storSerProList}}
            <mip-link class="follow-list" href="{{productUrl}}">
                <mip-img src="{{imgUrl}}" class="follow-pic"></mip-img>
                <span>{{productName}}</span>
            </mip-link>
            {{/storSerProList}}
        </div>

        <!--本周执行-->
        <mip-link class="vbuy-leakage" href="{{guideInfo.weeklyTopGuiderUrl}}">
            <div class="vbuy-head">
                <mip-img src="{{guideInfo.guidePhoto}}" alt="" class="head-guide"></mip-img>
                <span class="vbuy-meta">本周之星</span>
            </div>
            <div class="vbuy-text">
                <p class="name"><span class="text-big">{{guideInfo.guideName}}</span>一对一全程导购</p>
                <p class="ment-situation">已有{{guideInfo.orderNum}}人预约TA</p>
            </div>
            <div class="vbuy-yue"></div>
        </mip-link>
    </template>

</mip-sn-shop-floor>
```


## 属性

### src

说明：异步请求的数据接口，如果没有其他参数结尾请不要带 ？
必选项：否
类型：字符串
取值范围：必须是https的
单位：无
默认值：无

## 注意事项  

1、接口格式参考：https://mois.suning.com/snardweb/storebasic/?_getStoreInfoCallback.html
