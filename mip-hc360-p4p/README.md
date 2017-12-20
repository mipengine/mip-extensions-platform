# mip-hc360-p4p

mip-hc360-p4p p4p商机扣费

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-hc360-p4p/mip-hc360-p4p.js

## 示例

### 基本用法
```html
<mip-hc360-p4p
	id="p4p"
	word="修正带"
	referrer="38"
	num="6"
	hideid="pageid"
	template="myTemplate">
	<script src="https://c.mipcdn.com/static/v1/mip-mustache/mip-mustache.js"></script>
	<script type="application/json">
        {
			"mc":"seller",
			"sys":"js",
			"p4p":1,
			"bus":"p4p_reco",
			"source":38
        }
    </script>
	<template id="myTemplate" type="mip-mustache">
        <li>
            <div class="botImgBox">
                <a href="http://js.hc360.com/supplyself/{{searchResultfoId}}.html" title="{{searchResultfoTitle}}" target="_blank">
                    <mip-img layout="container" src="{{searchResultfoImageSmall}}" alt="{{searchResultfoTitle}}"></mip-img>
                </a>
            </div>
            <p class="botName">
                <a href="http://js.hc360.com/supplyself/{{searchResultfoId}}.html"><span>{{searchResultfoText}}</span></a>
            </p>
            <p class="botPrice">￥{{searchResultfoUnitPrice}}</p>
        </li>
    </template>
</mip-hc360-p4p>
```

## 属性

### word

说明：数据关键词
必选项：是
类型：String

### quality

说明：是否开启优质数据过滤
必选项：否
类型：String
取值范围：quality


### num

说明：展示N条数据
必选项：否
类型：Number
取值范围：1-40
默认值：6
注意事项：最大值为40, 如果关键词取不到数据，则提示页面正在建设中,如果开启quality过滤数据 则获取过滤之后的数据;

### fill

说明：当关键词所取p4p数据不够 num 条数 , 补充搜索接口数据;
必选项：否
类型：String
取值范围：fill
注意事项：如果关键词取不到数据，则不显示,如果开启quality过滤数据 则获取过滤之后的数据;

### template

说明：关联模板Id;
必选项：是
类型：String
取值范围：任意值
注意事项：template的值必须和模板id值相同;

### hideid

说明：当数据没有获取到，或者少于指定 (num数量) 条,隐藏获取的hideid id元素;
必选项：否
类型：String
取值范围：元素id属性
注意事项：如果没有获取到id则不做操作，如果没有传入num值,则按照num默认值判断;