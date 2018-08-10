# mip-otto-news

mip-otto-news 网校新闻页通用逻辑集合。

| 标题     | 内容                                                          |
| -------- | ------------------------------------------------------------- |
| 类型     | 定制                                                          |
| 支持布局 | responsive,fixed-height,fill,container,fixed                  |
| 所需脚本 | https://c.mipcdn.com/static/v1/mip-otto-news/mip-otto-news.js |

## 示例

### 基本用法

```html
<mip-otto-news data-sign="jsz">
    <div class="newsFixedTop nft">
        <i class="iconfont icon-fenlei nft__menu"></i>
    </div>
    <div class="nft__toggleNavWrap">
        <div class="nft__toggleNavBox">
            <a href="/mip/n/l/6193_0_0.html" class="nft__toggleNavItem">报考指南</a>
            <a href="/mip/n/l/6137_0_0.html" class="nft__toggleNavItem">考试动态</a>
            <a href="/mip/n/l/2177_0_0.html" class="nft__toggleNavItem">考试大纲</a>
            <a href="/mip/n/l/807_0_0.html" class="nft__toggleNavItem">辅导资料</a>
            <a href="/mip/n/l/802_0_0.html" class="nft__toggleNavItem">模拟试题</a>
            <a href="/mip/n/l/803_0_0.html" class="nft__toggleNavItem">历年真题</a>
            <a href="/Course/ExamTaocan/cjkjzc" class="nft__toggleNavItem">在线课堂</a>
        </div>
        <div class="nft__dropDownBtn">收起</div>
    </div>
    <div class="npt">
        <!-- banner -->

    </div>
    <div class="newsContent nc__raw">
        And who are you, the proud lord said,<br>
        that I must bow so low?<br>
        Only a cat of a different coat,<br>
        that's all the truth I know.<br>
        In a coat of gold or a coat of red,<br>
        a lion still has claws,<br>
        And mine are long and sharp, my lord,<br>
        as long and sharp as yours.<br>


        And so he spoke, and so he spoke,<br>
        that lord of Castamere,<br>
        But now the rains weep o'er his hall,<br>
        with no one there to hear.<br>
        Yes now the rains weep o'er his hall,<br>
        and not a soul to hear.
    </div>
    <div id="js__loadingMore" class="nc__loadBtn">点击加载更多内容</div>
    <!-- 每日一练内容 -->
    <div class="ndp__con">
        <p class="ndp__conTitle">
            20180807 《经济法基础》习题
        </p>
        <div class="ndp__conQuestion">

            关于基本养老保险，下列表述中正确的有(　　)。
        </div>
        <ul class="ndp__conOptions" data-answer="A,D" data-issingle="0">

            <li class="ndp__conOptionsItem" data-isright="1" data-option="A">
                <input type="checkbox" id="ndp__opton_e49e2ef5-4dfa-41fa-9f3a-d77782dbdeed" data-id="e49e2ef5-4dfa-41fa-9f3a-d77782dbdeed">
                <label for="ndp__opton_e49e2ef5-4dfa-41fa-9f3a-d77782dbdeed">
                    A. 基本养老金由统筹养老金和个人账户养老金组成
                </label>
            </li>
            <li class="ndp__conOptionsItem" data-isright="0" data-option="B">
                <input type="checkbox" id="ndp__opton_8d121834-16a6-4e3f-9589-20ce9aa10794" data-id="8d121834-16a6-4e3f-9589-20ce9aa10794">
                <label for="ndp__opton_8d121834-16a6-4e3f-9589-20ce9aa10794">
                    B. 个人缴纳养老保险费计征个人所得税
                </label>
            </li>
            <li class="ndp__conOptionsItem" data-isright="0" data-option="C">
                <input type="checkbox" id="ndp__opton_1727e864-48d3-46fa-9965-1b8b4a7a6d61" data-id="1727e864-48d3-46fa-9965-1b8b4a7a6d61">
                <label for="ndp__opton_1727e864-48d3-46fa-9965-1b8b4a7a6d61">
                    C. 参加职工基本养老保险的个人死亡后，其个人账户中的余额不可以依法继承
                </label>
            </li>
            <li class="ndp__conOptionsItem" data-isright="1" data-option="D">
                <input type="checkbox" id="ndp__opton_6294d420-7942-4fe0-a713-cf600688e07d" data-id="6294d420-7942-4fe0-a713-cf600688e07d">
                <label for="ndp__opton_6294d420-7942-4fe0-a713-cf600688e07d">
                    D. 参加基本养老保险的个人，在因病或者非因工致残完全丧失劳动能力的，可以领取病残津贴
                </label>
            </li>
        </ul>
        <div class="ndp__conBtn2" id="js__showRes">
            提交答案
        </div>
        <div class="ndp__conBtn go2down" id="js__showAnswer">
            试题解析</div>
    </div>
</mip-otto-news>
```

## 属性

无

## 注意事项

1.  网校定制。
