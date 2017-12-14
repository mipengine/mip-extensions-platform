# mip-jia-house-style

mip-jia-house-style 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-jia-house-style/mip-jia-house-style.js

## 示例

### 基本用法
```html
<mip-jia-house-style>
     <input type="tel" id="pm_area" />
      <div class="bm-house-style clearfix">
         <div class="minus-btn">-</div>
             <input type="number" name="shi1" /><span>室</span>
             <div class="add-btn">+</div>
      </div>
      <div class="bm-house-style clearfix">
             <div class="minus-btn">-</div>
              <input type="number" name="ting1" /><span>厅</span>
             <div class="add-btn">+</div>
      </div>
      <div class="bm-house-style clearfix">
             <div class="minus-btn">-</div>
             <input type="number" name="chu1" /><span>厨</span>
             <div class="add-btn">+</div>
      </div>
      <div class="bm-house-style clearfix">
             <div class="minus-btn">-</div>
             <input type="number" name="wei1" /><span>卫</span>
             <div class="add-btn">+</div>
      </div>
      <a href="javascript:;" class="fg-title">简约风格</a>
      <select class="zx-select" id="zx-select"><option>简约风格</option></select>
</mip-jia-house-style>
```


