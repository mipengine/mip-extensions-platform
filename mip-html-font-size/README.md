# mip-html-font-size

mip-html-font-size 组件说明 将组件直接引用，可将html的font-size设置成当前屏幕尺寸的10%,比如320px的手机屏，html根元素的font-size:32px;

标题|内容
----|----
类型|通用

所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-html-font-size/mip-html-font-size.js

## 示例

### 基本用法
```html
<mip-html-font-size min-fontSizeW="320" max-fontSizeW="540" min-width='320' max-width='750'></mip-html-font-size>
```



## 注意事项
1:min-fontSizeW表示最大屏幕下的fontSize，不要单位。比如min-fontSizeW="320" 表示，最大屏幕为320时,html{font-size:32px;};
2:max-fontSizeW同上。最大的font-size为54px;
3:min-width表示html, body的最小宽度值 。默认为320，不要带单位;
4:max-width表示html, body的最大宽度值 。默认为750,不要带单位;
