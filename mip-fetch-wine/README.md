# mip-fetch-wine

mip-fetch-wine 根据酒庄id异步加载酒庄的相关酒款
标题|内容
----|----
类型|通用
支持布局|container
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-fetch-wine/mip-fetch-wine.js

## 示例

```html
<mip-fetch-wine>
	<input type="hidden" id="chateauId" value="penfolds" />
	<div class="winery-jk winerytab" name="content">
		<div id="ulList">
			<div id="list_1">
			</div>
		</div>
	</div>
	<div class="chateau-all" id="jkshow">
		<div class="wineInfo">
			<div class="none-tipico iconfont icon-tip-line" id="wineIcon"></div>
			<div class="wine-text">--暂无酒庄详细资料--</div>
		</div>
    </div>
</mip-fetch-wine>
```


