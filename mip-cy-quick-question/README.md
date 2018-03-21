# mip-cy-quick-question

mip-cy-quick-question 春雨快速提问组件

标题|内容
----|----
类型|业务
支持布局|N/S
所需脚本|https://c.mipcdn.com/extensions/platform/v1/mip-cy-quick-question/mip-cy-quick-question.js

## 示例

### 基本用法
```html
<mip-cy-quick-question>
        <div class="ask-tip">系统指派医生，平均6分钟回复</div>
        <div class="ask-form">
            <div class="cyui-cell">
                <div class="cyui-cell__bd">
                    <textarea autofocus id="description" class="cyui-textarea ask-description" placeholder="请详细描述您的症状 疾病和身体状况，便于医生更准确的分析，春雨将确保您的隐私安全（字数限制为10~1000字）" rows="6"></textarea>
                </div>
            </div>
            <div class="cyui-cell">
                <div class="cyui-cell__bd">
                    <div id="cy-uploader" class="cyui-uploader">
                        <div class="cyui-uploader__bd">
                            <ul class="cyui-uploader__files" id="uploaderFiles"></ul>
                            <div class="cyui-uploader__input-box">
                                <input id="uploaderInput" class="cyui-uploader__input" type="file" accept="image/*" multiple="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cyui-cells">
                <div class="cyui-cell cyui-cells_radio-circle">
                    <div class="cyui-cell__bd">
                        <lable>性别</lable>
                    </div>
                    <div class="cyui-cell__ft">
                        <label class="cyui-check__label j-check-label">
                            <span>
                <input class="cyui-check" name="sex" type="radio" value="man" />
                <span class="cyui-icon-checked"></span>
                            </span>
                            <span class="radio-text">男</span>
                        </label>
                        <label class="cyui-check__label j-check-label">
                            <span>
                <input class="cyui-check" name="sex" type="radio" value="woman" />
                <span class="cyui-icon-checked"></span>
                            </span>
                            <span class="radio-text">女</span>
                        </label>
                    </div>
                </div>
                <div class="cyui-cell">
                    <div class="cyui-cell__bd">
                        <lable>年龄</lable>
                    </div>
                    <div class="cyui-cell__ft">
                        <span id="showDatePicker">请输入出生日期</span>
                        <input id="date" type="hidden" name="date" value="">
                    </div>
                </div>
            </div>
        </div>
        <div class="ask-btn-wrap">
            <button class="ask-btn j-ask-btn disabled">下一步</button>
        </div>
    </mip-cy-quick-question>
```
