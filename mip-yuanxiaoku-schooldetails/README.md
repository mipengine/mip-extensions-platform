# mip-yuanxiaoku-schooldetails

mip-yuanxiaoku-schooldetails 院校库学校详情

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-yuanxiaoku-schooldetails/mip-yuanxiaoku-schooldetails.js

## 示例

### 基本用法
```html
<mip-yuanxiaoku-schooldetails>
    <li on="tap:school-details.load(survey)">学校概况</li>
    <li on="tap:school-details.load(major-r)">招生专业</li>
    <li on="tap:school-details.load(major-l)">专业分数线</li>
    <li on="tap:school-details.load(history-l)">历史分数线</li>
    <li on="tap:school-details.load(information-r)">招生信息</li>
    <li on="tap:school-details.load(guide)">报考指南</li>
    <div class="survey"></div>
    <div class="major-r"></div>
    <div class="major-l"></div>
    <div class="history-l"></div>
    <div class="information-r"></div>
    <div class="guide"></div>
</mip-yuanxiaoku-schooldetails>
```


