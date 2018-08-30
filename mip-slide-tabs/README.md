# mip-slide-tabs

mip-slide-tabs 双层tabs切换

标题|内容
----|----
类型|通用
支持布局|container

## 示例

### 基本用法
```html
<mip-slide-tabs>
<div id="box">
       <div id="tabl" class="tabL">
           <a class="active">酒庄</a>
           <a>产区</a>
           <a>酿酒葡萄</a>
       </div>
       <ul id="tabr" class="tabR">
           <li class="tabr_li">
               <div class="tab1-tit">
                   <a class="active">简介</a>
                   <a>资料</a>
                   <a>酒庄酒款</a>
				   <a>扩展信息</a>
               </div>
               <ul class="tab1-con">
                   <li>位于法国波尔多梅多克产区（Medoc）的</li>
                   <li>赤霞珠（Cabernet Sauvignon）81%，梅洛（Merlot ）15%，品丽珠（Cabernet Franc）3%，味而多（Petit Verdot）1%</li>
                   <li>木桐酒庄红葡萄酒</li>
				   <li>地址：Chateau Mouton Rothschild 33250 Pauillac, France</li>
               </ul>
           </li>
           <li class="tabr_li" >
			   <p>以出产优质的红葡萄酒而著称。在1855年梅多克的分级制度中，共评出四个一级酒庄，分别为：拉菲古堡、拉图酒庄、玛歌酒庄、侯伯王酒庄，再加上1973年由二级酒庄升为一级酒庄的木桐酒庄，总共有五个一级酒庄。而波雅克村就占有其中三个，这也许就是这个名不见经传的小村庄名扬天下的原因。</P>
           </li>
           <li class="tabr_li" >
               <div class="tab1-tit">
                   <a class="active">赤霞珠</a>
                   <a>梅洛</a>
                   <a>吕丽珠</a>
               </div>
               <ul class="tab1-con">
                   <li>赤霞珠：作为世界上最著名的红葡萄品种，</li>
                   <li>梅洛：作为世界上最著名的红葡萄品种，</li>
                   <li>吕丽珠：作为世界上最著名的红葡萄品种，</li>
               </ul>
           </li>
       </ul>
   </div>
</mip-slide-tabs>
```

