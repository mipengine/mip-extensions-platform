# mip-anlian-search

mip-anlian-search 网站内自用搜索组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-anlian-search/mip-anlian-search.js

## 示例

### 基本用法
```html
<mip-anlian-search>
       <div class="tab-bar clearfix">
           <div class="tab-tit flo-left" data-type="area">
               <h2 class="text1 blu">马来西亚</h2>
               <i class="act"></i>
           </div>
           <div class="flo-left tab-bor"></div>
           <div class="tab-tit flo-left" data-type="type">
               <h2 class="text1 ">类型</h2>
               <i class=""></i>
           </div>
           <div class="flo-left tab-bor"></div>
           <div class="tab-tit flo-left" data-type="price">
               <h2 class="text1 ">价格</h2>
               <i class=""></i>
           </div>
           <div class="flo-left tab-bor"></div>
           <div class="tab-tit flo-left" data-type="more">
               <h2 class="text1">更多</h2>
               <i></i>
           </div>
       </div>  
       <section class="zhe hidden">
           <div class="tab-bar clearfix">
               <div class="tab-tit flo-left" data-type="area">
                   <h2 class="text1">区域</h2>
                   <i></i>
               </div>
               <div class="flo-left tab-bor"></div>
               <div class="tab-tit flo-left" data-type="type">
                   <h2 class="text1">类型</h2>
                   <i></i>
               </div>
               <div class="flo-left tab-bor"></div>
               <div class="tab-tit flo-left" data-type="price">
                   <h2 class="text1">价格</h2>
                   <i></i>
               </div>
               <div class="flo-left tab-bor"></div>
               <div class="tab-tit flo-left" data-type="more">
                   <h2 class="text1">更多</h2>
                   <i></i>
               </div>
           </div>
           <div class="list">
               <div class="area item">
                   <ul>
                       <li><a href="#">不限</a></li><li><a href="#">新加坡</a></li>
                       <li><a href="#">马来西亚</a></li><li><a href="#">泰国</a></li>
                       <li><a href="#">澳大利亚</a></li><li><a href="#">日本</a></li>
                       <li><a href="#">英国</a></li><li><a href="#">柬埔寨</a></li>
                   </ul>
               </div>               
               <div class="more item">
                   <div class="more-content">
                       <div class="more-content-list">
                           <p class="more-type">区域</p>
                           <div class="more-list">
                               <span class="on nr" data-va="不限">不限</span>
                               <span data-va="新加坡">新加坡</span><span data-va="马来西亚">马来西亚</span>
                               <span data-va="泰国">泰国</span><span data-va="澳大利亚">澳大利亚</span>
                               <span data-va="日本">日本</span><span data-va="英国">英国</span>
                               <span data-va="柬埔寨">柬埔寨</span><span data-va="越南">越南</span>                    </div>
                       </div>  
                       <div class="set">
                           <button class="reset">重置</button><button class="ok">完成</button>
                       </div>
                   </div>
               </div>
           </div>
           <div class="close"></div>
       </section>
</mip-anlian-search>
```

## 属性

## 注意事项
网站内自用搜索组件
