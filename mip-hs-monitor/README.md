# mip-hs-monitor

mip-hs-monitor 组件说明
此组件用于所有的消息提醒，如有关注和其他消息，有消息进行标红提示，并显示消息数量,每隔一段时间进行去后台异步获取状态判断。
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-monitor/mip-hs-monitor.js

## 示例

### 基本用法
```html
<mip-hs-monitor>
    <mip-hs-monitor>
	            <div class="showself">
	                <a href="/users" id="notice_dot" class="notice">我的主页</a>
	                <a href="/user" id="digg_dot" class="digg">消息中心<i id="msg_num" class="msg_num">10</i></a>
	                <a href="/profile" id="comment_dot" class="comment">个人资料</a>
	                <a href="/logout" id="follow_dot" class="follow">退出</a>
	            </div>
            </mip-hs-monitor>
</mip-hs-monitor>
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

