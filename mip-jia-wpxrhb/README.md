# mip-jia-wpxrhb

旺铺新人红包

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-wpxrhb/mip-jia-wpxrhb.js

## 示例

### 基本用法
```html
    <mip-jia-wpxrhb>
        <script type="application/json">
            {
                "bindEle":".headline-btn",
                "encrypt":"wp",
                "params":{
                    "shopId":340,
                    "mobile":"#redPhone"
                },
                "request":{
                    "url":"//qa.m.jia.com/wangpu/shop/red-packet/obtain/64868"
                },
                "response":{
                    "statusName":"obtainResult",
                    "statusVal":[
                        {
                            "n":"SUCCESS",
                            "v":"skipto"
                        },
                        {
                            "n":"PART_SUCCESS",
                            "v":"skipto"
                        },
                        {
                            "n":"FAILURE",
                            "v":"message"
                        }
                    ],
                    "skipurl":"//m.jia.com/wangpu/jchbsuccess/?shopId=340"
                }
            }
        </script>
        <div class="hb-popup">
            <em class="close" on="tap:shopHbPop.toggle"></em>
            <div class="top">
                <div class="img-box"></div>
                <p class="name">黄晓明</p>
                <p class="event">给您发了一个建材红包</p>
                <h3 class="title">免费领取1000元新人红包</h3>
                <div class="input-box">
                    <input type="tel" id="redPhone" class="form-input" maxlength="11" placeholder="请输入您的手机号" request="true" validatereg="^1[3|4|5|6|7|8|9]\d{9}$" errortxt="请输入您的手机号"  regtxt="请输入正确的手机号">
                </div>
            </div>
            <div class="circle-wrap">
                <div class="circle-box"></div>
            </div>
            <span class="headline-btn"></span>
            <div class="bottom"><i></i></div>
        </div>
    </mip-jia-wpxrhb>
```

## 属性

### {bindEle}

说明：绑定事件元素
必选项：是
类型：String


### {encrypt}

说明：加密参数
必选项：否
可选范围：'tg' 'zx' 'wp'
类型：String
默认值：'zx'


### {params}

说明：请求参数
必选项：是
类型：Object

## 注意事项
必须加载加密组件mip-jia-jsencrypt
