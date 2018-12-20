# mip-component-filter

mip-component-filter 用于过滤框动态加载切换

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-component-filter/mip-component-filter.js

## 示例

### 基本用法
```html
<mip-component-filter>
     <p class="filter-show"> 您已选择： 全部分类
            <button class="btn-dropdown" >筛选</button>
           </p>
           <div class="filter">
                <div class="animate mask" >
                  <p class="search-line">
                      <em></em>
                      <input type="text" >
                      <button type="button" class="btn-default" data-url="xxx">搜索</button>
                  </p>
                  <div class="box">
                      <div class="ware">
                  <p class="scroll-filter" data-template="http://192.168.3.18:20184/join-{0}/" data-templateall="http://192.168.3.18:20184/join/">
                   <button data-loadid="0" class="selected">全部</button><button data-loadname="canyin" data-loadid="1">选项</button>
				   </p>
                  <div class="filter-box">
					<a href="xxx">选项1</a>
                      <a href="xxx">选项2</a>                
				</div>
               </div> <div class="fundMoney">
                  <div class="box-title">投资金额</div>
                  <div class="filter-box">
                        <a href="xxx">选项1</a>
                      <a href="xxx">选项2</a>
                  </div>
                </div>
                  </div>
              </div>
</mip-component-filter>
```

## 属性
无


## 注意事项

