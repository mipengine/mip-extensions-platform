# mip-jia-log

mip-jia-log 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/extensions/platform/v1/mip-jia-log/mip-jia-log.js


## 示例

### 基本用法
```html
<mip-jia-log pageType="1" extInfo="'{serverName:1}'">
    <div class="zx-bm-btn js-bm-btn clearfix" bdsl-click-content>
        <label class="tit-left">计算装修报价</label>
    </div>
</mip-jia-log>
```

## 属性

### pageType

说明：百度统计参数 needLogid
必选项：是
类型：boolean string
取值范围：true or false
默认值：0

### extInfo

说明：百度统计参数 extraInfo
必选项：否
类型：object



## 注意事项

