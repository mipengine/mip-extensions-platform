# mip-k73shield-data
功能介绍：通过接口获取数据进行多种逻辑判断和处理，因为数据繁多，所以为了减少请求次数，把多种功能基于一个组件中；


标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-k73shield-data/mip-k73shield-data.js
## 示例

### 基本用法
```html
<mip-k73shield-data>
<section class="info">
    <mip-img class="tu f-game-img" src="http://pic1.uzzf.com/uzzf/mb/up/2017-7/20177121836493238_120_120.png"></mip-img>
    <h1 class="f-game-h1">网易终结者2审判日官方版1.104236.104289安卓正式版</h1>
    <p class="info1">
      <span class="f-tags-system">系统：<i>Android</i></span>
      <span>大小：<i>600M</i></span>
    </p>
    <p class="info1">
      <span>类型：<i>动作格斗</i></span>
      <span>语言：<i>中文</i></span>
    </p>
    <div>
      <ul id="downAddress" class="m-down-ul f-downbtn-url">
         <li class="m-down-last"><a target="_blank" class="down button" href="http://fxz.didiwl.com/apk/fengkdsj.apk" id="address">立即下载</a></li>
      </ul>
     </div>
</section>
</mip-k73shield-data>




```
## 用法
- 通过接口获取数据进行多种逻辑判断和处理。


## 属性

###  data-hitsurl
- 说明：json接口地址。
- 取值：url。
- 必选项：是
- 类型：指定字符串

###  data-hitsid
- 说明：当前页面id号。
- 取值：数字。
- 必选项：是
- 类型：id

## 注意事项

- 对应的显示id必须为 `hits` 。
- 地址必须为 `https` 。 