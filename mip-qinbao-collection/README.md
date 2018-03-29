# mip-qinbao-collection

mip-qinbao-collection 加入我的收藏夹

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-qinbao-collection/mip-qinbao-collection.js

## 示例

### 基本用法
```html
<mip-qinbao-collection class="collection">
	<span class="collection">收藏</span>
	<mip-form url="https://m.qbaobei.com/"><input type="hidden" id="data-login-status" value="0"></mip-form>
    <mip-form url="https://m.qbaobei.com/">
	    <input type="hidden" id="tj-user" name="tj-user" value="73" />
	    <input type="hidden" id="doc-id" name="doc-id" value="721664" data-id="721664" data-model="document" />
	    <input type="hidden" id="doc-cid" name="doc-cid" value="121" />
	    <input type="hidden" id="doc-type" name="doc-type" value="1" />
	    <input type="hidden" id="doc-pcid" name="doc-pcid" value="80" />
	    <input type="hidden" name="doc-tags" id="doc-tags" value="134885" />
    </mip-form>
</mip-qinbao-collection>
```

## 注意事项
触发事件必须增加类名 collection
