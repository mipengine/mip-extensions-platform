# mip-hs-replayshow

mip-hs-replayshow 组件说明
此组件用于详情页评论内容的交互，回复功能的实现，点击页面回复显示回复输入框；
根据组件传过去后台的user-id参数，；data-url参数，user-pid参数，然后点击回复按钮后进行异步提交，并处理数据渲染页面；
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-hs-replayshow/mip-hs-replayshow.js

## 示例

### 基本用法
```html
<mip-hs-replayshow>
    <mip-hs-replayshow user-id='1024' data-url='http://hsanswer.xxx.cn/comment' user-pid='1024}'><span class="btn_back">回复</span>
          <div class="replay_show">
            		<div class="replay_show_text subgo" contenteditable="true" >回复 他</div>
        				<div class="replay_show_btn">
        					<span class="off_btn">取消</span>
        					<span class="on_btn ajaxSubmit">回复</span>
						</div>
			</div>
    </mip-hs-replayshow>
</mip-hs-replayshow>
```

## 属性
user-id参数，data-url参数，user-pid参数，需要传到后台返回数据，三者必选。
### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

