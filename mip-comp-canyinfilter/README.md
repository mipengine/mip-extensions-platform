# mip-comp-canyinfilter

mip-comp-canyinfilter 用于下拉框与列表联动

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-comp-canyinfilter/mip-comp-canyinfilter.js

## 示例

### 基本用法
```html
   <mip-comp-canyinfilter data-target="#canyin-list">
					<div class="box-filter">
                      <div class="box-tab">
                        <span class="box-tab-item" data-target="target1">Tab1 <em></em></span>
						<span class="box-tab-item" data-target="target2">Tab2 <em></em>  </span>
                      </div>
                        <div class="box-container hidden">
                              <ul class="box-item hidden" data-id="target1">
									<li data-id="xiaochi">小吃</li>
							  </ul>
							   <ul class="box-item hidden" data-id="target2">
									<li data-id="xiaochi">小吃</li>
							  </ul>
                        </div> 
				  </div>
					<div class="bgfixed"></div>
                    </mip-comp-canyinfilter>
```

## 属性

### data-target

说明：列表插入位置选择器 如#list  .list
必选项：是
类型：字符串

## 注意事项



