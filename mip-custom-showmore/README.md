# mip-custom-showmore

mip-custom-showmore 折叠组件，1.5屏折叠内容。特殊情况下0.5屏折叠。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-custom-showmore/mip-custom-showmore.js

## 示例

### 基本用法

- 在按钮中增加 `on` 属性，注意 `on` 属性中需要填写对应 `<mip-showmore>` 的 `id`。
- 比如本例中，`on` 属性需要写成 `on="tap:showmore01.toggle"`。
- `bottomshadow` 设置折叠边界是否透明渐变。

```html
<mip-custom-showmore
    animate-time=".3"
    bottom-shadow="1"
    id="showmore01">
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <div>MIP （Mobile Instant Pages - 移动网页加速器）, 是一套应用于移动网页的开放性技术标准。通过提供MIP-HTML规范、MIP-JS运行环境以及MIP-Cache页面缓存系统，实现移动网页加速。</div>
    <span on="tap:showmore01.toggle" data-tofoldtext="收起" class="mip-custom-showmore-btn">展开全部内容</span>
</mip-custom-showmore>
```

## 属性

### animatetime

- 说明：展开收起动画时间。数字单位为秒，`'animatetime=0.3'` 为 0.3 秒
- 必选项：否
- 类型：数字（0-1之间）  
- 默认值： 0.3
- 备注: 如果不需要动画，填写 `'animatetime=0'`  

### bottomshadow

- 说明：折叠边界是否渐变
- 取值：只能为 '0' 或 '1'
- 必选项：否

## 注意事项
- 按钮中增加 `on` 属性，注意 `on` 属性中需要填写对应 `<mip-showmore>` 的 `id`。
