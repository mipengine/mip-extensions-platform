# mip-kmway-change

mip-kmway-change 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-kmway-change/mip-kmway-change.js

## 示例

### 基本用法
```html
<style type="text/css">
	.tabs-ctn .content{
	    display: none;
	    padding: 0 0.3rem;
	    margin-left: -0.24rem;
	    margin-bottom: -0.2rem;
	    overflow: hidden;
	}
	   .tabs-ctn .content:nth-of-type(1), .news-content:nth-of-type(1) {
	    display: block;
	}
	.btn-one-more {
	    color: #999;
	    font-size: .24rem;
	}
</style>
<div class="clearfix">
   <div class="related-tit mgt20 tabs-tit">
      <span class="jpxm"></span>
      <mip-kmway-change target='tabsNext' tabsNextThis='this' tabsNextI='0'>
	      <div class="btn-one-more fr" >
	         <span class="ic-one-more fl"></span>换一批
	      </div>
	   </mip-kmway-change>
   </div>
   <div class="tabs-ctn">
      <ul class="content cy-item ">
         <li><a href="javascript:;">  <!--5个li-->
            <img src="../images/new/imggg.jpg">
            <p class="online-title">1明洞欧巴年糕火锅招商中</p>
            <p class="online-name">成都氪星网络科技有限公司</p>
            <p class="online-money"><span class="rmb">￥</span>3-5万</p>
            <span class="timespan">2018-01-22</span>
         </a></li>
         <li><a href="javascript:;">
            <img src="../images/new/imggg.jpg">
            <p class="online-title">明洞欧巴年糕火锅招商中aaaaaaa</p>
            <p class="online-name">成都氪星网络科技有限公司</p>
            <p class="online-money"><span class="rmb">￥</span>3-5万</p>
            <span class="timespan">2018-01-22</span>
         </a></li>
      </ul>
      <ul class="content cy-item ">
         <li><a href="javascript:;">  <!--5个li-->
            <img src="../images/new/imggg.jpg">
            <p class="online-title">2明洞欧巴年糕火锅招商中</p>
            <p class="online-name">成都氪星网络科技有限公司</p>
            <p class="online-money"><span class="rmb">￥</span>3-5万</p>
            <span class="timespan">2018-01-22</span>
         </a></li>
      </ul>
      <ul class="content cy-item ">
         <li><a href="javascript:;">  <!--5个li-->
            <img src="../images/new/imggg.jpg">
            <p class="online-title">3明洞欧巴年糕火锅招商中</p>
            <p class="online-name">成都氪星网络科技有限公司</p>
            <p class="online-money"><span class="rmb">￥</span>3-5万</p>
            <span class="timespan">2018-01-22</span>
         </a></li>
      </ul>
      <ul class="content cy-item ">
         <li><a href="javascript:;">  <!--5个li-->
            <img src="../images/new/imggg.jpg">
            <p class="online-title">4明洞欧巴年糕火锅招商中</p>
            <p class="online-name">成都氪星网络科技有限公司</p>
            <p class="online-money"><span class="rmb">￥</span>3-5万</p>
            <span class="timespan">2018-01-22</span>
         </a></li>
      </ul>
      <ul class="content cy-item ">
         <li><a href="javascript:;">  <!--5个li-->
            <img src="../images/new/imggg.jpg">
            <p class="online-title">5明洞欧巴年糕火锅招商中</p>
            <p class="online-name">成都氪星网络科技有限公司</p>
            <p class="online-money"><span class="rmb">￥</span>3-5万</p>
            <span class="timespan">2018-01-22</span>
         </a></li>
      </ul>
   </div>
   <mip-yesky-rem data-rem="640"></mip-yesky-rem>
<script src="https://mipcache.bdstatic.com/extensions/platform/v1/mip-yesky-rem/mip-yesky-rem.js"></script>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

