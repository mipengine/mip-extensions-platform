# mip-ilaw66-falv-preferential

mip-ilaw66-falv-preferential 组件说明
点击实现列表对应的弹框出现
标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ilaw66-falv-preferential/mip-ilaw66-falv-preferential.js

## 示例

### 基本用法
```html
<mip-ilaw66-falv-preferential>
    <div class="container">
        <ul>
           
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">“N分钟律师咨询卡”是什么？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li><div class="dropdown-menu__content">“N分钟律师咨询卡”是私人律师卡的一种，用于抵扣您问律师后的咨询费用。可抵扣相应咨询时长的费用、不限次数。</div></li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">“法律文书卡”是什么？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-menu__content">“法律文书卡”是私人律师卡的一种，可用于您合同审核/修改，律师函等法律文书服务。
                            <br />法律文书卡服务标准：
                            <br />1.启用后，系统将自动为您推荐专业律师。
                            <br />2.律师会与您联系沟通文书细节；
                            <br />3.一般2个工作日内完成文书初稿（加急可在24小时内完成）
                            <br />4.文书服务周期为7天，期间可免费与律师沟通修改文书细节。
                            <br />5服务说明：本卡仅提供15页以内的文书服务，如超出须增加费用；每一份文书，仅针对一个问题；服务启用后即不可更改、终止或退用服务。</div>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">“律师函”是什么？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-menu__content">“律师函”是私人律师卡的一种，可用于起草律师函。
                            <br />律师函服务标准：
                            <br />1、     启用后，系统将自动为您推荐专业律师
                            <br />2、     律师会与您联系，沟通律师函细节
                            <br />3、     陈述事实，提供证据材料
                            <br />4、     律师认定描述事实信息完整、证据充分
                            <br />5、     正常情况下，律师3个工作日内可完成律师函初稿
                            <br />6、     服务周期为7天，期间您可免费与律师沟通修改律师函细节</div>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">“律师约见卡”是什么？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-menu__content">“律师约见卡”是私人律师卡的一种，可用于您线下律师约见包括但不限于：商务谈判、突发事件处理、线下纠纷协调、打官司。
                            <br />法律文书服务标准：
                            <br />1.联系法律顾问，明确具体要求。
                            <br />2.服务顾问将基于您的要求，推荐专业律师给予用户。
                            <br />3.律师与您联系，商谈见面细节。
                            <br />4.服务时间视具体事项而定。
                            <br />5.服务说明：服务启用后即不可更改、终止或退用服务。</div>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">如何获得私人律师卡<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-menu__content">私人律师卡是预付费服务，您可通过平安金管家APP问律师服务的相关页面购买，也可通过朋友转赠获得私人律师卡。</div>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">如何使用？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li><div class="dropdown-menu__content">私人律师卡可用于结算您的问律师订单。<br />
                        您通过问律师下单并与律师进行电话沟通，电话结束后进入订单结算页面，在选择支付方式时请选择一种私人律师卡并确认支付。私人律师卡被使用后，您可在“我的卡券”中看到卡的状态已改变为“已完成”。
                    </div></li>
                    <li>
                        <a href="preferential_helpflow?flowid=4" class="preferential_help_flow">点击查看操作流程</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">如何转赠？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li><div class="dropdown-menu__content">“转赠”功能允许您将私人律师卡赠送给朋友使用。<br />
                        在“我的卡券”中，选择欲赠送的私人律师卡，点击“送朋友”，并输入欲赠送朋友的手机号，点击“送给朋友”，您的朋友将收到您赠送的私人律师卡。他将可以通过“问律师”服务咨询律师，并使用私人律师卡进行结算。请注意，请确保您输入的朋友的手机号码与其登陆平安金管家的手机号码一致；卡片一旦转赠成功，您将失去对这张卡片的使用权。
                    </div></li>
                    <li>
                        <a href="preferential_helpflow?flowid=5" class="preferential_help_flow">点击查看操作流程</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">咨询意外中断怎么办？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-menu__content">如果您在咨询过程突然遭遇通话中断，您的问题还未与律师沟通清楚，请致电问律师客服<i>021-80117789</i>，向客服说明情况后由客服帮助您解决。</div>
                    </li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" data-toggle="dropdown">服务不满意怎么办？<i class="icon-arrow"></i></a>
                <ul class="dropdown-menu">
                    <li>
                        <div class="dropdown-menu__content">如果您对律师的服务不满意，请致电问律师客服<i>021-80117789</i>进行投诉，客服将对您与律师的沟通情况进行调查，帮助您解决问题。</div>
                    </li>
                </ul>
            </li>

        </ul>
    </div></mip-ilaw66-falv-preferential>
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

