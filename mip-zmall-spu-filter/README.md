# mip-zmall-spu-filter

商品列表SPU筛选组件，业务组件，与mip-zol-loadmore配合使用

标题|内容
----|----
类型|业务组件
所需脚本|https://c.mipcdn.com/static/v1/mip-zmall-spu-filter/mip-zmall-spu-filter.js

## 示例

### 基本用法

```html
<mip-fixed type="top" class="spu-filter-parent-element">
    <mip-zmall-spu-filter class="spu-filter-element" data-category-api="path/to/api" data-filter-fun="MyGoodsList.refresh">
        <ul class="spu-sort fix-flex">
            <li on="sort:MyGoodsList.refresh" data-sort="0" class="current"><span>综合</span></li>
            <li on="sort:MyGoodsList.refresh" data-sort="1" class="price-up flex-item"><span>价格升序</span></li>
            <li on="sort:MyGoodsList.refresh" data-sort="2" class="price-down flex-item"><span>价格降序</span></li>
            <li id="js_spu_category_trigger" class="category"><span>分类</span></li>
        </ul>
        <div id="js_spu_category" class="spu-category">
            <div class="category-list-box">
                <ul id="js_spu_category_list" class="category-list"></ul>
            </div>
            <div id="js_spu_category_back" class="spu-category-back">返回</div>
        </div>
    </mip-zmall-spu-filter>
</mip-fixed>
```

需要配合 `mip-zol-loadmore` 组件来使用，因为涉及到滚动加载更多。配合方式：

```html
<ul id="js_goods_list" class="goods-list clearfix"></ul>
<mip-zol-loadmore id="MyGoodsList" data-src="path/to/api" template="tpl-goods-list">
<!-- 此处为 mip-zol-loadmore 的配置参数。具体请参考 mip-zol-loadmore 的用法 -->
</mip-zol-loadmore>
```

mip-zol-loadmore 的用法 参考 https://github.com/mipengine/mip-extensions-platform/tree/master/mip-zol-loadmore


## 属性

### data-category-api

说明：获取分类筛选的API接口      
必选项：是      
类型：字符串    

### data-filter-fun

说明：为分类筛选传入的要执行的方法           
必选项：是      
类型：字符串

## 注意事项

属性 `data-filter-fun` 这个的值是一个方法，对应下面的 `mip-zol-loadmore` 对外提供的方法。