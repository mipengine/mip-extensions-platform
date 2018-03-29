# mip-jia-signup

mip-jia-signup 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-jia-signup/mip-jia-signup.js

## 示例

### 基本用法
```html
<mip-jia-signup>
 <script type="application/json">
         {
             "url":[
                 "http://m.jia.com/ask/index/ajaxindex?page=1",
                 "http://tg.jia.com/services/rest/call/wap_actions/get_appoint_pro_by_actions_id",
                 "http://tg.jia.com/services/rest/call/tg_home/getActionsInfo?actions_id=32458",
                 "http://www.jia.com/pro/cms_api.php?action=show_time",
                 "http://tg.jia.com/services/rest/call/jia_actions/activite_signup"
             ],
             "jsonptypes":["callback","callback","cb","callback","callback"],
             "params":[
                 {
                     "username":"",
                     "code":"nocode",
                     "city":"city-",//city-area_py(市英文) city-area_cn(市中文) city-city_cn(省中文) city-city_py(省英文)
                     "source":"m-mip",
                     "mobileName":"#mobile",//正则验证的话，在对应元素上写属性validatereg,是否必传属性request,必传错误信息errortxt,验证错误信息regtxt
                     "memo":"[#area]平方,[#style]",
                     "encrypt":"tg"//加密手机号使用,tg or zx or wp
                 },
                 {"actions_id":"32458"},
                 {"actions_id":"32458"},
                 "",
                 {"actions_id":"32458","realname":"noCode","signup_remark":"shanghai","source":"refer_url","mobile":"#mobile","refer_url":true}
             ],
             "success":[
                 {"type":"html","element":"#element","status":"","statusval":"","failed":"a.b.c","suc":"a.b.c"},//插入一段html,接口返回数据参数suc
                 {"type":"form","element":"#element","status":"","statusval":"","failed":"a.b.c","suc":"a.b.c"},//给表单元素赋值,接口返回数据参数suc
                 {"type":"text","value":"预约成功","status":"","statusval":"","failed":"a.b.c","suc":"a.b.c"},//value可以是一段html,优先接口返回数据参数suc
                 {"type":"url","value":"http://m.jia.com","status":"","statusval":"","failed":"a.b.c","suc":"a.b.c"},//url跳转,优先接口返回数据参数suc
                 {"type":"class","element":"#class","value":"class","status":"","statusval":"","failed":"a.b.c"}//成功后添加class
             ],
             "button":".bm-btn"
         }
 </script>
 <span class="bm-btn">提交按钮</span>
</mip-jia-signup>
```

## 属性

### url

说明：请求地址
必选项：是
类型：数组
取值范围：字符串


### jsonptypes

说明：ajax请求jsonp的值
必选项：否
类型：数组
取值范围：字符串


### params

说明：参数对象
必选项：否

#### encrypt
说明: 手机号加密来源(zx、tg、wp)
必选项：否

### success

说明：请求成功参数
必选项：是
类型：数组
取值范围：字符串

### button

说明：点击元素,不填或传空则直接发送请求
必选项：否

## 注意事项：
url如果带参数,而且是动态的,则url必须encodeURIComponent处理,动态参数示例
'http://m.jia.com/JiaZhuangxiuTmp/yusuan_success_20160825/?qj_from=new&type=app&yusuanRequest={"pro":"$city-city_cn$","areaname":"$city-area_cn$","area":"$#zxErea$","areaflag":"$city-area_py$","fj_num":"$#zx_level_s$","kt_num":"$#zx_level_t$","wsj_num":"$#zx_level_w$","cfj_num":"$#zx_level_c$","yt_num":"$#zx_level_y$"}'