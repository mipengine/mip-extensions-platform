# mip-wygx-views

mip-wygx-views 我要个性网头像栏目内容页图片展示

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-wygx-views/mip-wygx-views.js
## 示例

### 基本用法
```html
<mip-wygx-views
data-nexturl = "http://mip.woyaogexing.com/touxiang/nv/2017/541178.html"
>
<ul>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/27d6bae6207c78d1!400x400_big.jpg" data-index=0 data-original="http://img2.woyaogexing.com/2017/10/31/27d6bae6207c78d1!400x400_big.jpg">
  </li>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/ca404625fec596b5!200x200.jpg" data-index=1 data-original="http://img2.woyaogexing.com/2017/10/31/ca404625fec596b5!200x200.jpg">
  </li>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/4a561e023635127d!400x400_big.jpg" data-index=2 data-original="http://img2.woyaogexing.com/2017/10/31/4a561e023635127d!400x400_big.jpg">
  </li>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/c647fa4ca19fd46e!400x400_big.jpg" data-index=3 data-original="http://img2.woyaogexing.com/2017/10/31/c647fa4ca19fd46e!400x400_big.jpg">
  </li>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/7fe73fcb056a2c83!200x200.jpg" data-index=4 data-original="http://img2.woyaogexing.com/2017/10/31/7fe73fcb056a2c83!200x200.jpg">
  </li>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/c130e2a54b2718ac!400x400_big.jpg" data-index=5 data-original="http://img2.woyaogexing.com/2017/10/31/c130e2a54b2718ac!400x400_big.jpg">
  </li>
  <li>
  <mip-img src="http://img2.woyaogexing.com/2017/10/31/b206a9007a406c43!400x400_big.jpg" data-index=6 data-original="http://img2.woyaogexing.com/2017/10/31/b206a9007a406c43!400x400_big.jpg">
  </li>
</ul>
</mip-wygx-views>
```

## 属性


### data-nexturl

说明：下一页地址URL

必选项：是

类型：string

### data-downText

说明：下载图片文字

必选项：否

类型：string

## 注意事项
1. 组件内的图片必须使用mip-img标签

2. 组件内的图片必须含有data-index属性

3. 组件内的图片必须含有data-original属性

## 更新
1.0.4 修改下载地址到mip服务器，webp链接转换

1.0.3 下载窗口打开新页面
