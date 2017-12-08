# mip-hc360-p4p

mip-hc360-p4p p4p商机扣费

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-hc360-p4p/mip-hc360-p4p.js

## 示例

### 基本用法
```html
<mip-hc360-p4p
	word="修正带"
	num="40"
	referrer="6"
	template="myTemplate">
	<script src="https://mipcache.bdstatic.com/static/v1/mip-mustache/mip-mustache.js"></script>
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
		        <a href="{{searchResultfoUrl}}">
		        <!-- <a> -->
		        	<mip-img src="{{searchResultfoImageBig}}"></mip-img>
		        </a>
		    </div>
		    <p class="botName">
		    	<a href="{{searchResultfoUrl}}">{{searchResultfoTitle}}</a>
		    	<!-- <a>{{searchResultfoTitle}}</a> -->
		    </p>
		    <p class="botPrice">¥{{searchResultfoUnitPrice}}</p>
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
