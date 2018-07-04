# mip-ilaw66-comment-raty

mip-ilaw66-comment-raty 组件说明
星星评分组件，点击星星改变星星状态，通过判断星星的的状态的属性值，显示有没有帮助的状态和切换标签页
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-comment-raty/mip-ilaw66-comment-raty.js

## 示例

### 基本用法
```html
<mip-ilaw66-comment-raty>
    <div class="star_div">
        <p>请您评价律师的服务</p>
        <span class="star_block" data-score="1">
        	 <div id="star-div"></div>
            <span class="no_help">没帮助</span>
            <span class="ok_help">对自己有帮助</span>
        </span>
    </div>
    <div class="comment_try">
        <p>律师是否解决了您的问题？</p>
        <div class="userFeedback_div">
            <input type="radio" value="1" name="jiejue" id="jiejueOK" data-jiejue="0" /><a href="">没解决</a>
            <input type="radio" value="2" name="jiejue" id="jiejueNG" data-jiejue="1" /><a href="">解决了</a>
        </div>
    </div>
    <div class="content_block service_block comment_block">
        <div class="content_block__msg">
            <div class="content_block__msg__up content_block__msg__level1">
                <div class="userFeedback_div">
                    <span class="userFeedback_unselect" data-scorenum="08">律师给了具体建议</span>
                    <span class="userFeedback_unselect" data-scorenum="09">让自己免遭损失</span>
                    <span class="userFeedback_unselect" data-scorenum="10">律师解答仔细、态度好</span>
                    <span class="userFeedback_unselect" data-scorenum="11">下次再来咨询</span>
                    <span class="userFeedback_unselect" data-scorenum="12">律师的解答很专业</span>
                    <span class="userFeedback_unselect" data-scorenum="13">咨询费花的值</span>
                </div>
            </div>
            <div class="content_block__msg__up content_block__msg__level2">
                <div class="userFeedback_div">
                    <span class="userFeedback_unselect" data-scorenum="14">没解决，希望律师回电</span>
                    <span class="userFeedback_unselect" data-scorenum="15">信号差听不清</span>
                    <span class="userFeedback_unselect" data-scorenum="16">律师不专业，答非所问</span>
                    <span class="userFeedback_unselect" data-scorenum="17">通话异常中断</span>
                    <span class="userFeedback_unselect" data-scorenum="18">律师无法解答</span>
                    <span class="userFeedback_unselect" data-scorenum="19">不知道服务收费</span>
                </div>
            </div>
            <div class="txt_block wordCount" id="wordCount">
                <div><textarea id="comment" class="wordType" rows="5" maxlength="300"></textarea></div>
                <span class="wordwrap"><var class="word">0</var>/300</span>
            </div>
        </div>
        <div class="allow_block">
            <div class="comment_icon">
            </div>
            <div class="comment_text">
                需要律师帮您打官司，请勾选<span>法率网将与您联系，推荐擅长处理您所遇事情的专业律师</span>
                <br />
                <input type="hidden" name="allow" /> <span class="allow_icon allow_icon1" style="display: none"></span> <span class="allow_icon allow_icon2" style="display: block"></span>
            </div>
        </div>
    </div>
</mip-ilaw66-comment-raty>
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

