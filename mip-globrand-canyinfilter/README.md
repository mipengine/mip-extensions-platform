# mip-globrand-canyinfilter

mip-globrand-canyinfilter 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-globrand-canyinfilter/mip-globrand-canyinfilter.js

## 示例

### 基本用法
```html
<mip-globrand-canyinfilter data-target="#canyin-list">
					<div class="box-filter">
                      <div class="box-tab">
                        <span class="box-tab-item" data-target="channelName">餐饮 <em></em></span><span class="box-tab-item" data-target="fundMoney">投资金额 <em></em>  </span>
                      </div>
                        <div class="box-container hidden">
                              <ul class="box-item hidden" data-id="channelName">
									<li data-id="xiaochi">小吃</li>
							  </ul>
                        </div> 
				  </div>
					<div class="bgfixed"></div>
                    </mip-globrand-canyinfilter>
```

## 属性

### data-target

说明：列表插入位置选择器 如#list  .list
必选项：是
类型：字符串

## 注意事项

