# mip-stats-kad

mip-stats-kad 组件说明

| 标题     | 内容                                                          |
| -------- | ------------------------------------------------------------- |
| 类型     | 通用                                                          |
| 支持布局 | responsive,fixed-height,fill,container,fixed                  |
| 所需脚本 | https://mipcache.bdstatic.com/static/v1/mip-stats-kad/mip-stats-kad.js |

## 示例

### 基本用法

```html
<style>
.mip-i-android-scroll p:nth-of-type(1) {
  text-align: center !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  /* Firefox */
  -webkit-box-sizing: border-box;
  /* Safari */
  font-size: 18px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.container .row {
  width: 100%;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 5px;
}
</style>
<div class="container">
  <div class="row">
    <!--
      mip-stats-conf=encodeURIComponent(JSON.stringify({event: "click",data: ['_trackEvent', '百度mip页', '测试点击统计1', '0', 0]}
    -->
    <button
      mip-stats-conf="%7B%22event%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22%E7%99%BE%E5%BA%A6mip%E9%A1%B5%22%2C%22%E6%B5%8B%E8%AF%95%E7%82%B9%E5%87%BB%E7%BB%9F%E8%AE%A1%E6%8C%89%E9%92%AE1%22%2C%220%22%2C0%5D%7D"
    >
      测试点击统计1
    </button>
  </div>
  <div class="row">
    <button
      mip-stats-conf="%7B%22event%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22%E7%99%BE%E5%BA%A6mip%E9%A1%B5%22%2C%22%E6%B5%8B%E8%AF%95%E7%82%B9%E5%87%BB%E7%BB%9F%E8%AE%A1%E6%8C%89%E9%92%AE2%22%2C%220%22%2C0%5D%7D"
    >
      测试点击统计2
    </button>
  </div>
  <div class="row">
    <button
      mip-stats-conf="%7B%22event%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22%E7%99%BE%E5%BA%A6mip%E9%A1%B5%22%2C%22%E6%B5%8B%E8%AF%95%E7%82%B9%E5%87%BB%E7%BB%9F%E8%AE%A1%E6%8C%89%E9%92%AE3%22%2C%220%22%2C0%5D%7D"
    >
      测试点击统计3
    </button>
  </div>
  <div class="row">
    <button
      mip-stats-conf="%7B%22event%22%3A%22load%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22%E7%99%BE%E5%BA%A6mip%E9%A1%B5%22%2C%22%E6%B5%8B%E8%AF%95%E6%97%A0%E9%9C%80%E7%82%B9%E5%87%BB%E5%8D%B3%E7%BB%9F%E8%AE%A1%E6%8C%89%E9%92%AE%22%2C%220%22%2C0%5D%7D"
    >
      无需点击即统计
    </button>
  </div>
  <div class="row">
    <mip-stats-kad
      account=""
      config="%5B%5B%22_setAllowHash%22%2Cfalse%5D%2C%5B%22_addOrganic%22%2C%22soso%22%2C%22w%22%5D%2C%5B%22_addOrganic%22%2C%22youdao%22%2C%22q%22%5D%2C%5B%22_addOrganic%22%2C%22sogou%22%2C%22query%22%5D%2C%5B%22_addOrganic%22%2C%22360%22%2C%22q%22%5D%2C%5B%22_addOrganic%22%2C%22baidu%22%2C%22word%22%5D%2C%5B%22_addOrganic%22%2C%22baidu%22%2C%22q1%22%5D%2C%5B%22_addOrganic%22%2C%22so.com%22%2C%22q%22%5D%2C%5B%22_trackPageview%22%5D%5D"
    >
      mip-stats-kad 组件
    </mip-stats-kad>
  </div>
</div>
```

## GA统计账号配置

### account

说明：ga统计账号配置

必选项：否

类型：string

默认值：UA-3051632-5

## GA统计默认配置

### config

说明：ga统计配置,encodeURIComponent(JSON.stringify(默认值))

必选项：否

类型：string

默认值：[['_setAllowHash',false],['_addOrganic','soso','w'],['_addOrganic','youdao','q'],['_addOrganic','sogou','query'],['_addOrganic','360','q'],['_addOrganic','baidu','word'],['_addOrganic','baidu','q1'],['_addOrganic','so.com','q'],['_trackPageview']]

## GA统计事件配置

### mip-stats-conf

说明：GA统计事件配置,encodeURIComponent(JSON.stringify(默认值))

必选项：是

类型：string

默认值：{event:"click",data:['_trackEvent','百度mip页','点击事件','0',0]}

## 注意事项

无