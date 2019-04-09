# mip-chinacn-getvideourl

mip-chinacn-getvideourl 获取组件内video并触发其play事件请求接口获取视频播放地址，一定程度防止视频地址泄露

标题|内容
----|----
类型|业务
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-chinacn-getvideourl/mip-chinacn-getvideourl.js

## 示例

### 基本使用

```html
<mip-chinacn-getvideourl>
    <mip-video controls layout="responsive" width="640" height="360"
        title=""
        src="https://sjz.china.cn/4211335368da4a64831439a098a0469c/f31981f1b2e048caba412c557cea6c2e-51592fb0c0b18c3c331e13fc986295af-ld.mp4"
        poster="">
    </mip-video>
    <input type="hidden" id="id" value="">
</mip-chinacn-getvideourl>
```
## 属性

## 注意事项