# mip-jia-city-select

mip-jia-city-select 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-city-select/mip-jia-city-select.js

## 示例

### 基本用法
```html
<mip-jia-city-select>
    <mip-jia-swiper></mip-jia-swiper>
             <script type="application/json">
                {
                   "ak": "243f68afdbfe0aa70ca23117c4606b94"
                }
              </script>
         <div class="area-layer">
             <div class="area-select-box clearfix">
                  <div class="sub-more-classify">
                       <div class="province-box" id="province-box">
                            <ul class="swiper-wrapper"></ul>
                      </div>
                      <div class="city-box">
                            <ul class="swiper-wrapper"></ul>
                       </div>
                  </div>
             </div>
         </div>
         <input type="text" class="input-city" readonly=""  value="" placeholder="请选择房屋所在的城市" />
         <input type="hidden" id="city_code" value="" />
         <input type="hidden" id="provinceCn" value="" />
         <input type="hidden" id="areaCn" value="" />
</mip-jia-city-select>
```


### ak

使用地图组件之前必须要申请成为百度开发者，并创建百度服务密钥（ak），这里的 ak 参数即代表该功能。具体申请方式可以参见[百度地图 Javascript api 文档](http://in.lbsyun.baidu.com/index.php?title=jspopular/guide/getkey)。

### 使用说明
需要结合mip-jia-swiper的组件一起使用

