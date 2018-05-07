# mip-jia-tukuscreen

mip-jia-tukuscreen 图库筛选tab切换

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-tukuscreen/mip-jia-tukuscreen.js

## 示例

### 基本用法
```html
<mip-jia-tukuscreen class="tuku-images-screen" tab-element=".nav-li" tab-current="cur" tab-contain=".nav-show-menu" menu-more=".menu-li-more" menu-down="down">
	<mip-semi-fixed >
        <div mip-semi-fixed-container class="tuku-images-nav">
            <ul class="nav-ul">
                <li class="nav-li"><p class="nav-a"><span class="nav-span">户型</span><em class="nav-em"></em></p></li>
                <li class="nav-li"><p class="nav-a"><span class="nav-span">户型</span><em class="nav-em"></em></p></li>
                <li class="nav-li"><p class="nav-a"><span class="nav-span">户型</span><em class="nav-em"></em></p></li>
            </ul>
	        <div class="nav-show-menu">
			    <ul class="menu-ul clearfix">
			        <li class="menu-li  cur">
			            <a href="/tuku/tag/" class="menu-a">
			                不限
			            </a>
			        </li>
			        <li class="menu-li ">
			            <a href="/tuku/tag/list1-1170/" class="menu-a">
			                三居室
			            </a>
			        </li>
			        <li class="menu-li-more">
			            <a href="javascript:;" class="menu-a-more">
			                查看全部
			            </a>
			        </li>
			    </ul>
			</div>
			<div class="nav-show-menu">
			    <ul class="menu-ul clearfix">
			        <li class="menu-li  cur">
			            <a href="/tuku/tag/" class="menu-a">
			                不限
			            </a>
			        </li>
			        <li class="menu-li ">
			            <a href="/tuku/tag/list1-1170/" class="menu-a">
			                三居室
			            </a>
			        </li>
			        <li class="menu-li-more">
			            <a href="javascript:;" class="menu-a-more">
			                查看全部
			            </a>
			        </li>
			    </ul>
			</div>
			<div class="nav-show-menu">
			    <ul class="menu-ul clearfix">
			        <li class="menu-li  cur">
			            <a href="/tuku/tag/" class="menu-a">
			                不限
			            </a>
			        </li>
			        <li class="menu-li ">
			            <a href="/tuku/tag/list1-1170/" class="menu-a">
			                三居室
			            </a>
			        </li>
			        <li class="menu-li-more">
			            <a href="javascript:;" class="menu-a-more">
			                查看全部
			            </a>
			        </li>
			    </ul>
			</div>
		</div>
   </mip-semi-fixed>
</mip-jia-tukuscreen>
```

## 属性

### {tab-element}

说明：{点击元素class}
必选项：{是}
类型：{string}

### {tab-current}

说明：{当前元素class}
必选项：{否}
类型：{string}
默认值: {cur}

### {tab-contain}

说明：{切换元素class}
必选项：{是}
类型：{string}

### {menu-more}

说明：{查看更多按钮class}
必选项：{是}
类型：{string}
默认值: {.menu-li-more}

### {menu-down}

说明：{收起按钮class}
必选项：{是}
类型：{string}
默认值: {down}

## 注意事项

